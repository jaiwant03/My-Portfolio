import { useEffect, useState } from "react";
import { useGithubStats } from "./hooks/useGithubStats";

// Local CountUp helper to animate statistics numbers
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
      
      // Ease out cubic
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

export function GitHubCard({ username = "jaiwant03" }) {
  const { data, loading, error } = useGithubStats(username);

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

  if (error) {
    return (
      <div className="stats-glass-card">
        <div className="stats-error-state">
          <svg className="title-icon" viewBox="0 0 24 24" style={{ width: "40px", height: "40px", fill: "#ef4743" }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h3>GitHub Stats Unavailable</h3>
          <p>{error}</p>
          <button className="stats-error-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-glass-card">
      <div className="stats-card-header">
        <h3 className="stats-card-title">
          <svg className="title-icon" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          GitHub Contributions
        </h3>
        <span className="stats-card-username">@{data.login}</span>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-numbers-grid">
        <div className="stat-num-box">
          <div className="stat-num-label">Total Contributions</div>
          <div className="stat-num-value" style={{ color: "#FFD54A" }}>
            <CountUp end={data.totalContributions} />
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            Current Streak
            <svg viewBox="0 0 24 24" style={{ width: "13px", height: "13px", fill: "#ff8c00" }}>
              <path d="M17.66 11.2c-.22-.3-.51-.56-.87-.77-.85-.51-1.9-.35-2.61.18-.37.28-.62.66-.75 1.08-.2.65-.05 1.34.33 1.83.2.26.47.46.77.58-.1-.13-.19-.28-.27-.44-.31-.62-.17-1.4.32-1.89.47-.48 1.22-.57 1.79-.22.42.26.69.69.75 1.16.03.22.01.44-.06.65.65.1 1.26-.06 1.77-.45.92-.7 1.2-1.94.63-2.96zm-5.74 3.73c-.09-.34-.13-.7-.11-1.05.07-.98.57-1.86 1.33-2.43.32-.24.69-.43 1.09-.57.8-.28 1.48-.82 1.91-1.53.85-1.4 0-3.3-1.62-3.64-.17-.03-.35-.05-.52-.05-.88 0-1.74.37-2.34 1.03-.31.34-.55.74-.7 1.18-.32.96-1.04 1.73-1.95 2.1-.47.19-.97.3-1.48.33.6-.47.88-1.28.66-2.03-.22-.76-.85-1.32-1.62-1.46-.87-.16-1.76.24-2.19.99-.6 1.04-.32 2.45.64 3.19.46.36.75.9.82 1.48.06.49-.07.98-.35 1.38-.85 1.24-2.29 1.84-3.76 1.54 1.47 1.7 3.92 2.5 6.13 1.8 1.47-.46 2.65-1.5 3.25-2.88.2-.46.34-.95.42-1.46-.77.88-1.92 1.31-3.07 1.05z" />
            </svg>
          </div>
          <div className="stat-num-value" style={{ color: "#FFC107" }}>
            <CountUp end={data.currentStreak} /> <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>days</span>
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Longest Streak</div>
          <div className="stat-num-value" style={{ color: "#FFE082" }}>
            <CountUp end={data.longestStreak} /> <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>days</span>
          </div>
        </div>
      </div>

      {/* Repo Stats Grid */}
      <div className="stats-numbers-grid" style={{ marginBottom: "26px" }}>
        <div className="stat-num-box">
          <div className="stat-num-label">Public Repos</div>
          <div className="stat-num-value" style={{ color: "#fff", fontSize: "1.3rem" }}>
            <CountUp end={data.publicRepos} />
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Followers</div>
          <div className="stat-num-value" style={{ color: "#fff", fontSize: "1.3rem" }}>
            <CountUp end={data.followers} />
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Following</div>
          <div className="stat-num-value" style={{ color: "#fff", fontSize: "1.3rem" }}>
            <CountUp end={data.following} />
          </div>
        </div>
      </div>

      {/* Heatmap Graph */}
      <div className="github-heatmap-container">
        <div className="stat-num-label" style={{ marginBottom: "12px", width: "100%", textAlign: "left" }}>
          Contribution Calendar
        </div>
        <img
          className="github-heatmap-img"
          src={`https://ghchart.rshah.org/ffd54a/${username}`}
          alt={`${username}'s GitHub Contributions`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Interactive Streaks Badge */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <img
          className="github-readme-stats-img"
          src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=ffd54a&text_color=ffffff&icon_color=ffc107&border_color=ffd54a22&hide_border=false`}
          alt="GitHub Profile Stats Badge"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </div>
  );
}
