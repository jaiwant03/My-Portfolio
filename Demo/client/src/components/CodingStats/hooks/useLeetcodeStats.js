import { useState, useEffect } from "react";
import axios from "axios";

export function useLeetcodeStats(username = "Jaiwant_Karrun_SA") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchStats() {
      setLoading(true);
      setError(null);

      const cacheKey = `leetcode-stats-${username}`;
      let cachedData = null;

      // 1. Try to read cached data from localStorage first
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          cachedData = parsed.data;
          
          // Cache validity check (30 minutes)
          const age = Date.now() - parsed.timestamp;
          if (age < 1800000 && active) {
            setData(cachedData);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        // Cache read failure
      }

      let fetchSuccess = false;
      let solvedData = null;
      let profileData = null;
      let contestData = null;

      // Helper for proxy fetch
      const getWithProxy = async (url, timeout = 5000) => {
        try {
          return await axios.get(url, { timeout });
        } catch (err) {
          console.warn(`Direct fetch failed for ${url}, trying via CORS proxy...`);
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
          const proxyRes = await axios.get(proxyUrl, { timeout: timeout + 2000 });
          
          // Parse proxy response envelope if it's there
          let raw = proxyRes.data;
          if (raw && raw.contents && typeof raw.contents === "string") {
            try {
              raw = JSON.parse(raw.contents); // parse double-encoded
            } catch (e) {}
          } else if (raw && raw.contents && typeof raw.contents === "object") {
            raw = raw.contents;
          }
          return { data: raw };
        }
      };

      // --- STRATEGY A: Alfa LeetCode API (Render) ---
      try {
        console.log("LeetCode Strategy A: Fetching Alfa LeetCode API stats...");
        const statsRes = await getWithProxy(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, 5000);
        if (statsRes.data && (statsRes.data.totalSolved !== undefined || statsRes.data.easySolved !== undefined)) {
          solvedData = statsRes.data;
          fetchSuccess = true;

          // Fetch profile for avatar
          try {
            console.log("LeetCode Strategy A: Fetching Alfa LeetCode API profile...");
            const profileRes = await getWithProxy(`https://alfa-leetcode-api.onrender.com/${username}`, 4000);
            if (profileRes.data && profileRes.data.avatar) {
              profileData = profileRes.data;
            }
          } catch (pe) {
            console.warn("Failed to retrieve profile avatar, proceeding without profile image", pe.message);
          }

          // Fetch contest info
          try {
            console.log("LeetCode Strategy A: Fetching Alfa LeetCode API contest rating...");
            const contestRes = await getWithProxy(`https://alfa-leetcode-api.onrender.com/${username}/contest`, 4000);
            if (contestRes.data && contestRes.data.contestRating !== undefined) {
              contestData = contestRes.data;
            }
          } catch (ce) {
            console.warn("Failed to retrieve contest info", ce.message);
          }
        }
      } catch (err) {
        console.warn("LeetCode Strategy A failed:", err.message);
      }

      // --- STRATEGY B: Pied Vercel API ---
      if (!fetchSuccess) {
        try {
          console.log("LeetCode Strategy B: Fetching Vercel API...");
          const res = await getWithProxy(`https://leetcode-api-pied.vercel.app/api/${username}`, 5000);
          if (res.data && res.data.totalSolved !== undefined) {
            solvedData = res.data;
            fetchSuccess = true;
          }
        } catch (err) {
          console.warn("LeetCode Strategy B failed:", err.message);
        }
      }

      // --- STRATEGY C: Heroku Stats API ---
      if (!fetchSuccess) {
        try {
          console.log("LeetCode Strategy C: Fetching Heroku Stats API...");
          const res = await getWithProxy(`https://leetcode-stats-api.herokuapp.com/${username}`, 5000);
          if (res.data && (res.data.status === "success" || res.data.totalSolved !== undefined)) {
            solvedData = res.data;
            fetchSuccess = true;
          }
        } catch (err) {
          console.warn("LeetCode Strategy C failed:", err.message);
        }
      }

      // Final compilation of metrics
      if (fetchSuccess && solvedData) {
        let parsedCalendar = {};
        if (solvedData.submissionCalendar) {
          if (typeof solvedData.submissionCalendar === "string") {
            try {
              parsedCalendar = JSON.parse(solvedData.submissionCalendar);
            } catch (e) {
              parsedCalendar = {};
            }
          } else {
            parsedCalendar = solvedData.submissionCalendar;
          }
        }

        const finalData = {
          username: username,
          avatar: profileData?.avatar || null,
          ranking: solvedData.ranking || profileData?.ranking || "N/A",
          totalSolved: solvedData.totalSolved || 0,
          totalQuestions: solvedData.totalQuestions || 3200,
          easySolved: solvedData.easySolved || 0,
          totalEasy: solvedData.totalEasy || 800,
          mediumSolved: solvedData.mediumSolved || 0,
          totalMedium: solvedData.totalMedium || 1600,
          hardSolved: solvedData.hardSolved || 0,
          totalHard: solvedData.totalHard || 800,
          acceptanceRate: solvedData.acceptanceRate || (solvedData.totalSolved ? 48.5 : 0),
          submissionCalendar: parsedCalendar,
          contestRating: contestData?.contestRating ? Math.round(contestData.contestRating) : null,
          contestGlobalRanking: contestData?.contestGlobalRanking || null,
          contestAttendCount: contestData?.contestAttendCount || null,
          lastUpdated: Date.now()
        };

        if (active) {
          setData(finalData);
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({ timestamp: Date.now(), data: finalData })
            );
          } catch (e) {}
          setLoading(false);
        }
      } else {
        // Fallback to cache
        if (cachedData && active) {
          setData(cachedData);
          setLoading(false);
        } else if (active) {
          setError("Live statistics cannot be retrieved at the moment.");
          setLoading(false);
        }
      }
    }

    if (username) {
      fetchStats();
    }

    return () => {
      active = false;
    };
  }, [username]);

  return { data, loading, error };
}
