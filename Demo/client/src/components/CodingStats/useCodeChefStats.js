import { useState, useEffect } from "react";
import axios from "axios";

// Convert a numeric rating into a star rank, matching CodeChef's classic scheme
function ratingToStars(rating) {
  if (rating >= 2500) return "7★";
  if (rating >= 2200) return "6★";
  if (rating >= 2000) return "5★";
  if (rating >= 1800) return "4★";
  if (rating >= 1600) return "3★";
  if (rating >= 1400) return "2★";
  return "1★";
}

export function useCodeChefStats(username = "kpr24ad048") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchStats() {
      setLoading(true);
      setError(null);

      const cacheKey = `codechef-stats-${username}`;
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
        // Cache read failure — ignore, fall through to live fetch
      }

      // Strategies, tried in order. Each one either returns a normalized
      // stats object or throws so the next strategy gets a turn.
      const strategies = [
        // Strategy A: codechef-stats-api (primary) — clean JSON, no proxy needed
        async () => {
          const base = `https://codechef-stats-api-two.vercel.app/${username}`;

          // Required: contest data. Optional: summary/stats/profile — fetched
          // independently so a failure in one doesn't take down the others.
          const contestsRes = await axios.get(`${base}/contests`, { timeout: 6000 });
          const [summaryRes, statsRes, profileRes] = await Promise.allSettled([
            axios.get(base, { timeout: 6000 }),
            axios.get(`${base}/stats`, { timeout: 6000 }),
            axios.get(`${base}/profile`, { timeout: 6000 })
          ]);

          const contests = contestsRes.data;
          if (contests?.status !== "success" || !contests.data) {
            throw new Error("codechef-stats-api: invalid contests response");
          }

          const s = summaryRes.status === "fulfilled" ? (summaryRes.value.data?.data || {}) : {};
          const stats = statsRes.status === "fulfilled" ? (statsRes.value.data?.data || {}) : {};
          const p = profileRes.status === "fulfilled" ? (profileRes.value.data?.data || {}) : {};

          const c = contests.data;

          const currentRating = c.rating ?? 0;
          const history = Array.isArray(c.history) ? c.history : [];
          const sortedHistory = [...history].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

          // Two different endpoints can carry totalSolved — take whichever
          // one actually returned a number.
          const problemsSolved = [s.totalSolved, stats.totalSolved].find(
            (v) => typeof v === "number"
          ) ?? null;

          if (problemsSolved === null) {
            console.warn(
              `codechef-stats-api: totalSolved missing for "${username}" on both / and /stats — check the raw responses in the Network tab.`
            );
          }

          return {
            username,
            currentRating,
            highestRating: c.maxRating ?? currentRating,
            stars: ratingToStars(currentRating),
            globalRank: c.globalRanking ?? "N/A",
            countryRank: "N/A", // not exposed by this endpoint
            problemsSolved,
            lastContest: sortedHistory[0]?.name || "Last contest recently",
            contests: sortedHistory.map(h => ({
              name: h.name,
              rating: h.rating ?? null,
              rank: h.ranking ?? null,
              date: h.date
            })),
            avatar: p.avatar || null,
            lastUpdated: Date.now()
          };
        },

        // Strategy B: cp-rating-api (secondary fallback)
        async () => {
          const api = `https://cp-rating-api.vercel.app/codechef/${username}`;
          const res = await axios.get(api, { timeout: 5000 });
          const raw = res.data;

          if (!raw || !raw.username) {
            throw new Error("cp-rating-api: invalid response");
          }

          // Accept rating whether it comes back as a string or a number
          const currentRating = Number.parseInt(raw.rating, 10);
          if (Number.isNaN(currentRating)) {
            throw new Error("cp-rating-api: unparseable rating");
          }

          return {
            username: raw.username,
            currentRating,
            highestRating: currentRating,
            stars: raw.stars ? `${raw.stars}★` : ratingToStars(currentRating),
            globalRank: raw.globalRank || "N/A",
            countryRank: raw.countryRank || "N/A",
            problemsSolved: raw.problemsSolved ?? null,
            lastContest: raw.contests?.[0]?.name || "Last contest recently",
            contests: Array.isArray(raw.contests) ? raw.contests : [],
            avatar: raw.avatar || null,
            lastUpdated: Date.now()
          };
        }
      ];

      let finalResponseData = null;
      let success = false;

      for (const executeStrategy of strategies) {
        try {
          const resData = await executeStrategy();
          if (resData && Number.isFinite(resData.currentRating)) {
            finalResponseData = resData;
            success = true;
            break;
          }
        } catch (err) {
          console.warn("A CodeChef fetch strategy failed:", err.message);
        }
      }

      if (success && active) {
        setData(finalResponseData);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: finalResponseData })
          );
        } catch (e) {
          // Storage full or unavailable — non-fatal
        }
        setLoading(false);
      } else if (cachedData && active) {
        // Live fetch failed entirely — fall back to stale cache rather than an error
        setData(cachedData);
        setLoading(false);
      } else if (active) {
        setError("Live statistics cannot be retrieved at the moment.");
        setLoading(false);
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