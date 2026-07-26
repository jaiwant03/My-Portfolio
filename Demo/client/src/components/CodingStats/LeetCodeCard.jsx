import { useEffect, useState, useMemo, memo } from "react";
import { useLeetcodeStats } from "./hooks/useLeetcodeStats";

// Local CountUp helper
function CountUp({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === undefined || end === null || isNaN(Number(end))) {
      return;
    }
    const endVal = parseInt(end, 10);
    if (endVal === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    function updateCount(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(easeProgress * endVal);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endVal);
      }
    }

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export const LeetCodeCard = memo(function LeetCodeCard({ username = "Jaiwant_Karrun_SA" }) {
  const { data, loading, error } = useLeetcodeStats(username);
  
  // State for circular progress animation
  const [animatedOffset, setAnimatedOffset] = useState(282.74); // circumference for r=45

  const radius = 45;
  const circumference = 2 * Math.PI * radius; // ~282.74

  const solvedPercentage = useMemo(() => {
    if (!data?.totalSolved || !data?.totalQuestions) return 0;
    return Math.min(Math.round((data.totalSolved / data.totalQuestions) * 100), 100);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const pct = data.totalSolved / data.totalQuestions;
    const target = circumference - (pct * circumference);
    
    const timer = setTimeout(() => {
      setAnimatedOffset(target);
    }, 450);

    return () => clearTimeout(timer);
  }, [data, circumference]);

  // Submission calendar calculations (84 cells: 12 weeks of 7 days)
  const heatmapData = useMemo(() => {
    if (!data?.submissionCalendar) return [];

    const submissionMap = {};
    Object.entries(data.submissionCalendar).forEach(([timestamp, count]) => {
      try {
        const dateStr = new Date(parseInt(timestamp, 10) * 1000)
          .toISOString()
          .split("T")[0];
        submissionMap[dateStr] = (submissionMap[dateStr] || 0) + count;
      } catch (e) {
        // Bad timestamp fallback
      }
    });

    const cells = [];
    const today = new Date();
    
    for (let i = 83; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = submissionMap[dateStr] || 0;
      
      let level = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 5) level = 2;
      else if (count > 5 && count <= 8) level = 3;
      else if (count > 8) level = 4;

      const dateOpts = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = d.toLocaleDateString("en-US", dateOpts);

      cells.push({
        date: dateStr,
        count,
        level,
        tooltip: `${count} solves on ${formattedDate}`
      });
    }

    const weeks = [];
    for (let col = 0; col < 12; col++) {
      weeks.push(cells.slice(col * 7, (col + 1) * 7));
    }

    return weeks;
  }, [data]);

  if (loading) {
    return (
      <div className="stats-glass-card stats-skeleton-card">
        <div className="skeleton-shimmer skeleton-title" style={{ height: "36px", width: "40%" }} />
        <div className="stats-numbers-grid">
          <div className="skeleton-shimmer skeleton-stat-box" />
          <div className="skeleton-shimmer skeleton-stat-box" />
          <div className="skeleton-shimmer skeleton-stat-box" />
        </div>
        <div className="skeleton-shimmer skeleton-chart-box" />
      </div>
    );
  }

  // Graceful visual warning card if API failed completely
  if (error && !data) {
    return (
      <div className="stats-glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "480px" }}>
        <div className="stats-card-header">
          <h3 className="stats-card-title">
            <svg className="title-icon" viewBox="0 0 24 24">
              <path d="M14.242 12.825 10.428 8.956c-.366-.372-.857-.577-1.378-.577-.52 0-1.012.205-1.379.577L3.75 12.72c-.77.78-1.196 1.82-1.196 2.924 0 1.104.426 2.144 1.196 2.923l3.921 3.922c.366.372.858.577 1.378.577.521 0 1.013-.205 1.379-.577l3.814-3.869c.14-.142.274-.29.403-.443.14-.165.263-.339.37-.52.096-.165.176-.339.24-.52.046-.135.086-.273.12-.413l1.839-7.234c.05-.197.086-.398.106-.603.023-.23.033-.463.033-.699 0-.46-.07-.907-.208-1.336-.144-.43-.377-.82-.693-1.157-.315-.337-.714-.596-1.173-.767-.457-.17-.954-.256-1.472-.256-.518 0-1.015.085-1.472.256-.459.17-.858.43-1.173.767-.316.337-.549.727-.693 1.157-.138.429-.208.876-.208 1.336 0 .236.01.47.033.7l.106.603 1.839 7.234c.034.14.074.278.12.413.064.181.144.355.24.52.107.181.23.355.37.52.129.153.263.301.403.443zm4.566 4.708-3.722 3.722c-.366.372-.857.577-1.378.577-.52 0-1.012-.205-1.379-.577l-1.144-1.144c-.77-.78-1.196-1.82-1.196-2.923 0-1.104.426-2.144 1.196-2.923l3.722-3.722c.77-.78 1.81-1.21 2.924-1.21 1.114 0 2.155.43 2.924 1.21l1.144 1.144c.77.78 1.196 1.82 1.196 2.923s-.426 2.144-1.196 2.923z" />
            </svg>
            LeetCode Stats
          </h3>
          <span className="stats-card-username">@{username}</span>
        </div>
        <div className="stats-error-state" style={{ margin: "auto 0" }}>
          <svg className="title-icon" viewBox="0 0 24 24" style={{ width: "48px", height: "48px", fill: "var(--gold-warm)" }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h4 style={{ color: "#fff", marginTop: "12px", fontSize: "1.1rem" }}>LeetCode Stats Offline</h4>
          <p style={{ fontSize: "0.85rem", opacity: 0.7, maxWidth: "260px", margin: "8px auto" }}>
            The API endpoints are temporarily rate-limited or unavailable.
          </p>
          <button className="stats-error-btn" onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: "0.72rem", opacity: 0.4 }}>
          Last retrieval attempt: {new Date().toLocaleTimeString()}
        </div>
      </div>
    );
  }

  return (
    <div className="stats-glass-card">
      <div className="stats-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className="stats-card-title">
          <svg className="title-icon" viewBox="0 0 24 24">
            <path d="M14.242 12.825 10.428 8.956c-.366-.372-.857-.577-1.378-.577-.52 0-1.012.205-1.379.577L3.75 12.72c-.77.78-1.196 1.82-1.196 2.924 0 1.104.426 2.144 1.196 2.923l3.921 3.922c.366.372.858.577 1.378.577.521 0 1.013-.205 1.379-.577l3.814-3.869c.14-.142.274-.29.403-.443.14-.165.263-.339.37-.52.096-.165.176-.339.24-.52.046-.135.086-.273.12-.413l1.839-7.234c.05-.197.086-.398.106-.603.023-.23.033-.463.033-.699 0-.46-.07-.907-.208-1.336-.144-.43-.377-.82-.693-1.157-.315-.337-.714-.596-1.173-.767-.457-.17-.954-.256-1.472-.256-.518 0-1.015.085-1.472.256-.459.17-.858.43-1.173.767-.316.337-.549.727-.693 1.157-.138.429-.208.876-.208 1.336 0 .236.01.47.033.7l.106.603 1.839 7.234c.034.14.074.278.12.413.064.181.144.355.24.52.107.181.23.355.37.52.129.153.263.301.403.443zm4.566 4.708-3.722 3.722c-.366.372-.857.577-1.378.577-.52 0-1.012-.205-1.379-.577l-1.144-1.144c-.77-.78-1.196-1.82-1.196-2.923 0-1.104.426-2.144 1.196-2.923l3.722-3.722c.77-.78 1.81-1.21 2.924-1.21 1.114 0 2.155.43 2.924 1.21l1.144 1.144c.77.78 1.196 1.82 1.196 2.923s-.426 2.144-1.196 2.923z" />
          </svg>
          LeetCode Progress
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {data.avatar && (
            <img 
              src={data.avatar} 
              alt="LeetCode Profile" 
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 213, 74, 0.3)",
                objectFit: "cover"
              }}
            />
          )}
          <span className="stats-card-username" style={{ fontFamily: "monospace" }}>@{username}</span>
        </div>
      </div>

      {/* Main stats boxes */}
      <div className="stats-numbers-grid">
        <div className="stat-num-box">
          <div className="stat-num-label">Global Ranking</div>
          <div className="stat-num-value" style={{ color: "#FFD54A", fontSize: "1.25rem" }}>
            {typeof data.ranking === "number" ? <CountUp end={data.ranking} /> : data.ranking}
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Acceptance Rate</div>
          <div className="stat-num-value" style={{ color: "#FFC107" }}>
            <span>{parseFloat(data.acceptanceRate).toFixed(1)}%</span>
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Contest Rating</div>
          <div className="stat-num-value" style={{ color: "#FFE082" }}>
            {data.contestRating ? <CountUp end={data.contestRating} /> : <span style={{ fontSize: "1rem" }}>N/A</span>}
          </div>
        </div>
      </div>

      {/* Circular details & difficulty breakdown */}
      <div className="leetcode-profile-body">
        {/* SVG Circular progress */}
        <div className="leetcode-circular-progress">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#FFD54A"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={animatedOffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
          </svg>
          <div className="leetcode-progress-text">
            <span className="leetcode-progress-val">
              <CountUp end={data.totalSolved} />
            </span>
            <span className="leetcode-progress-max">/ {data.totalQuestions}</span>
            <span className="leetcode-progress-pct">{solvedPercentage}%</span>
          </div>
        </div>

        {/* Diff bar items */}
        <div className="leetcode-difficulty-bars">
          <div className="diff-bar-item">
            <div className="diff-bar-info">
              <span className="diff-bar-label easy">Easy</span>
              <span className="diff-bar-nums">
                <CountUp end={data.easySolved} /> / {data.totalEasy}
              </span>
            </div>
            <div className="diff-track">
              <div
                className="diff-fill easy"
                style={{ width: `${(data.easySolved / data.totalEasy) * 100}%` }}
              />
            </div>
          </div>

          <div className="diff-bar-item">
            <div className="diff-bar-info">
              <span className="diff-bar-label medium">Medium</span>
              <span className="diff-bar-nums">
                <CountUp end={data.mediumSolved} /> / {data.totalMedium}
              </span>
            </div>
            <div className="diff-track">
              <div
                className="diff-fill medium"
                style={{ width: `${(data.mediumSolved / data.totalMedium) * 100}%` }}
              />
            </div>
          </div>

          <div className="diff-bar-item">
            <div className="diff-bar-info">
              <span className="diff-bar-label hard">Hard</span>
              <span className="diff-bar-nums">
                <CountUp end={data.hardSolved} /> / {data.totalHard}
              </span>
            </div>
            <div className="diff-track">
              <div
                className="diff-fill hard"
                style={{ width: `${(data.hardSolved / data.totalHard) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mini submission calendar heatmap */}
      {heatmapData.length > 0 && (
        <div className="leetcode-heatmap-section">
          <div className="leetcode-heatmap-title">Submission Heatmap (12 Weeks)</div>
          <div className="leetcode-heatmap-grid">
            {heatmapData.map((week, wIdx) => (
              <div key={wIdx} className="heatmap-col">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className="heatmap-cell"
                    data-count={day.count}
                    data-level={day.level}
                    data-tooltip={day.tooltip}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last updated timestamp */}
      <div className="stats-last-updated" style={{
        marginTop: "20px",
        textAlign: "center",
        fontSize: "0.72rem",
        color: "var(--text-muted, rgba(255,255,255,0.35))",
        borderTop: "1px solid rgba(255, 215, 0, 0.05)",
        paddingTop: "12px"
      }}>
        Last updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : new Date().toLocaleTimeString()}
      </div>
    </div>
  );
});
