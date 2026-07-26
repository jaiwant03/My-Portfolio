import { useEffect, useState, memo } from "react";
import { useCodeChefStats } from "./useCodeChefStats";

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

export const CodeChefCard = memo(function CodeChefCard({ username = "kpr24ad048" }) {
  const { data, loading, error } = useCodeChefStats(username);

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
            <svg className="title-icon" viewBox="0 0 24 24" style={{ fill: "currentColor" }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            CodeChef Stats
          </h3>
          <span className="stats-card-username">@{username}</span>
        </div>
        <div className="stats-error-state" style={{ margin: "auto 0" }}>
          <svg className="title-icon" viewBox="0 0 24 24" style={{ width: "48px", height: "48px", fill: "var(--gold-warm)" }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h4 style={{ color: "#fff", marginTop: "12px", fontSize: "1.1rem" }}>CodeChef Link Offline</h4>
          <p style={{ fontSize: "0.85rem", opacity: 0.7, maxWidth: "260px", margin: "8px auto" }}>
            The scrapers & CP API servers are temporarily rate-limited.
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
          {/* Custom SVG logo representing a chef hat / code chef symbol */}
          <svg className="title-icon" viewBox="0 0 24 24" style={{ fill: "var(--gold-warm)" }}>
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.56 10.53 20 12 20c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61l.62-.62c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-.62.62C16.07 3.26 14.12 3 12 3zm0 2c3.87 0 7 3.13 7 7 0 1.25-.33 2.41-.91 3.42l-9.51-9.51C9.59 5.33 10.75 5 12 5zm-3.58 1.58 9.51 9.51c-1.01.58-2.17.91-3.42.91-3.87 0-7-3.13-7-7 0-1.25.33-2.41.91-3.42z" />
          </svg>
          CodeChef Stats
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {data.avatar && (
            <img 
              src={data.avatar} 
              alt="CodeChef Profile" 
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
          <div className="stat-num-label">Current Rating</div>
          <div className="stat-num-value" style={{ color: "#FFD54A" }}>
            {data.currentRating ? <CountUp end={data.currentRating} /> : "N/A"}{" "}
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "normal" }}>({data.stars})</span>
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Highest Rating</div>
          <div className="stat-num-value" style={{ color: "#FFC107" }}>
            {data.highestRating ? <CountUp end={data.highestRating} /> : "N/A"}
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Problems Solved</div>
          <div className="stat-num-value" style={{ color: "#FFE082" }}>
            {data.problemsSolved ? <CountUp end={data.problemsSolved} /> : <span style={{ fontSize: "1rem" }}>N/A</span>}
          </div>
        </div>
      </div>

      {/* Extra layout details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "16.5px 0" }}>
        <div className="stat-num-box" style={{ padding: "12px", background: "rgba(255, 255, 255, 0.01)" }}>
          <div className="stat-num-label" style={{ fontSize: "0.7rem" }}>Global Rank</div>
          <div className="stat-num-value" style={{ fontSize: "1rem", color: "#FFD54A", marginTop: "4px" }}>
            {typeof data.globalRank === "number" ? <CountUp end={data.globalRank} /> : data.globalRank}
          </div>
        </div>

        <div className="stat-num-box" style={{ padding: "12px", background: "rgba(255, 255, 255, 0.01)" }}>
          <div className="stat-num-label" style={{ fontSize: "0.7rem" }}>Country Rank</div>
          <div className="stat-num-value" style={{ fontSize: "1rem", color: "#FFC107", marginTop: "4px" }}>
            {typeof data.countryRank === "number" ? <CountUp end={data.countryRank} /> : data.countryRank}
          </div>
        </div>
      </div>

      {/* Contest status & history */}
      <div className="codechef-contest-section" style={{ background: "rgba(255,255,255,0.015)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,215,0,0.04)" }}>
        <div className="cc-info-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "8px" }}>
          <span className="cc-field-label" style={{ opacity: 0.6 }}>Last Contest Participated:</span>
          <span className="cc-field-val" style={{ color: "var(--gold-warm)", fontWeight: "600" }}>{data.lastContest}</span>
        </div>
        
        {data.contests && data.contests.length > 0 && (
          <div className="cc-history-list" style={{ marginTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.04)", paddingTop: "10px" }}>
            <h4 style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recent Rating History</h4>
            <div style={{ maxHeight: "110px", overflowY: "auto", paddingRight: "4px" }}>
              {data.contests.slice(0, 5).map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", padding: "5px 0", borderBottom: i < 4 && i < data.contests.length - 1 ? "1px solid rgba(255, 255, 255, 0.02)" : "none" }}>
                  <span style={{ color: "#eee", fontWeight: "500", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "160px" }} title={c.name}>{c.name}</span>
                  <span style={{ color: "var(--text-secondary)" }}>Rank: <strong style={{ color: "#FFE082" }}>{c.rank || "N/A"}</strong> | Rating: <strong style={{ color: "#FFD54A" }}>{c.rating || "N/A"}</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
