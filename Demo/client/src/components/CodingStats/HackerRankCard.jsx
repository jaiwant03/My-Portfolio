import { useEffect, useState, useMemo, memo } from "react";
import { useHackerRankStats } from "./useHackerRankStats";

// Local CountUp helper (matches GitHubCard/LeetCodeCard)
function CountUp({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === undefined || end === null || isNaN(Number(String(end).replace(/,/g, "")))) {
      return;
    }
    const endVal = parseInt(String(end).replace(/,/g, ""), 10);
    if (endVal === 0) {
      setCount(0);
      return;
    }

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

  // Keep rank comma formatting
  return <span>{count.toLocaleString()}</span>;
}

export const HackerRankCard = memo(function HackerRankCard({ username = "jaiwant03" }) {
  const { data, loading, error } = useHackerRankStats(username);

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
          <h3>HackerRank Stats Unavailable</h3>
          <p>{error}</p>
          <button className="stats-error-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-glass-card">
      {/* Golden Top Glow Border Header */}
      <div className="stats-card-header">
        <h3 className="stats-card-title">
          <svg className="title-icon" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.25 15.75c0 .41-.34.75-.75.75h-2.25V13.5H9.75v3H7.5c-.41 0-.75-.34-.75-.75v-7.5c0-.41.34-.75.75-.75h2.25v3h4.5v-3h2.25c.41 0 .75.34.75.75v7.5z" />
          </svg>
          HackerRank Profile
        </h3>
        <span className="stats-card-username">@{data.username}</span>
      </div>

      {/* Main Stats Row */}
      <div className="stats-numbers-grid">
        <div className="stat-num-box">
          <div className="stat-num-label">Global Rank</div>
          <div className="stat-num-value" style={{ color: "#FFD54A", fontSize: "1.3rem" }}>
            {isNaN(Number(String(data.globalRank).replace(/,/g, ""))) ? (
              <span>{data.globalRank}</span>
            ) : (
              <CountUp end={data.globalRank} />
            )}
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Certificates</div>
          <div className="stat-num-value" style={{ color: "#FFC107" }}>
            <CountUp end={data.certificatesCount} />
          </div>
        </div>

        <div className="stat-num-box">
          <div className="stat-num-label">Total Badges</div>
          <div className="stat-num-value" style={{ color: "#FFE082" }}>
            <CountUp end={data.totalBadges} />
          </div>
        </div>
      </div>

      {/* Proficiencies & Badges section */}
      <div className="hackerrank-proficiency-section">
        <h4 className="hr-section-subtitle">SKILL BADGES</h4>
        <div className="hr-badges-container">
          <div className="hr-badge-row">
            <span className="hr-badge-name">Problem Solving</span>
            <span className="hr-badge-tier gold">{data.problemSolvingBadge}</span>
          </div>
          <div className="hr-badge-row">
            <span className="hr-badge-name">Python Programming</span>
            <span className="hr-badge-tier gold">{data.pythonBadge}</span>
          </div>
          <div className="hr-badge-row">
            <span className="hr-badge-name">Java Programming</span>
            <span className="hr-badge-tier gold">{data.javaBadge}</span>
          </div>
          <div className="hr-badge-row">
            <span className="hr-badge-name">SQL Performance</span>
            <span className="hr-badge-tier gold">{data.sqlBadge}</span>
          </div>
          <div className="hr-badge-row">
            <span className="hr-badge-name">C Lang Basics</span>
            <span className="hr-badge-tier silver">{data.cBadge}</span>
          </div>
          <div className="hr-badge-row">
            <span className="hr-badge-name">JavaScript Core</span>
            <span className="hr-badge-tier gold">{data.javascriptBadge}</span>
          </div>
        </div>
      </div>

      {/* Last Active Info */}
      <div className="hr-activity-footer">
        <span className="hr-active-stamp">
          ⚡ {data.lastActive}
        </span>
      </div>

      {/* Dynamic Profile view Button */}
      <div className="hr-actions-container">
        <a 
          href={`https://www.hackerrank.com/profile/${data.username}`}
          target="_blank"
          rel="noreferrer"
          className="hr-profile-btn"
        >
          View HackerRank Profile
        </a>
      </div>

      {/* Degradation notice (only displayed if data is fallback state) */}
      {data.isFallback && (
        <p className="hr-degrade-notice">
          Some live statistics are unavailable because HackerRank does not expose an official public API.
        </p>
      )}

      {/* Styles localized to avoid polluting other stats scopes */}
      <style>{`
        .hackerrank-proficiency-section {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 213, 74, 0.06);
          border-radius: var(--radius-md, 16px);
          padding: 20px;
          margin-bottom: 24px;
        }
        [data-theme="light"] .hackerrank-proficiency-section {
          background: rgba(0, 0, 0, 0.02);
          border-color: rgba(0, 0, 0, 0.05);
        }
        .hr-section-subtitle {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary, rgba(255, 255, 255, 0.4));
          letter-spacing: 0.15em;
          margin-top: 0;
          margin-bottom: 14px;
        }
        [data-theme="light"] .hr-section-subtitle {
          color: rgba(0, 0, 0, 0.5);
        }
        .hr-badges-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media(max-width: 575px) {
          .hr-badges-container {
            grid-template-columns: 1fr;
          }
        }
        .hr-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          font-size: 0.78rem;
          transition: background 0.3s;
        }
        .hr-badge-row:hover {
          background: rgba(255, 213, 74, 0.04);
        }
        [data-theme="light"] .hr-badge-row {
          background: rgba(0, 0, 0, 0.01);
          border-color: rgba(0, 0, 0, 0.03);
        }
        .hr-badge-name {
          color: #fff;
          font-weight: 500;
        }
        [data-theme="light"] .hr-badge-name {
          color: #111;
        }
        .hr-badge-tier {
          font-weight: 700;
          font-size: 0.72rem;
        }
        .hr-badge-tier.gold {
          color: #ffd54a;
        }
        .hr-badge-tier.silver {
          color: #bdbdbd;
        }
        [data-theme="light"] .hr-badge-tier.gold {
          color: #b8760b;
        }
        .hr-activity-footer {
          margin-bottom: 24px;
          text-align: center;
        }
        .hr-active-stamp {
          font-size: 0.75rem;
          color: var(--text-secondary, rgba(255, 255, 255, 0.45));
          background: rgba(255, 213, 74, 0.05);
          border: 1px solid rgba(255, 213, 74, 0.1);
          padding: 4px 12px;
          border-radius: 12px;
        }
        [data-theme="light"] .hr-active-stamp {
          color: #b8760b;
          border-color: rgba(184, 118, 11, 0.15);
          background: rgba(184, 118, 11, 0.05);
        }
        .hr-actions-container {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }
        .hr-profile-btn {
          width: 100%;
          text-align: center;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          color: #000;
          background: linear-gradient(135deg, #ffd54a, #ffc107);
          box-shadow: 0 4px 15px rgba(255, 193, 7, 0.2);
          transition: all 0.3s var(--ease);
          border: 0;
          cursor: pointer;
        }
        .hr-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.35);
          background: linear-gradient(135deg, #ffe082, #ffd54a);
        }
        .hr-degrade-notice {
          font-size: 0.72rem;
          color: #e57373;
          text-align: center;
          margin: 12px 0 0 0;
          line-height: 1.4;
          font-style: italic;
        }
      `}</style>
    </div>
  );
});
