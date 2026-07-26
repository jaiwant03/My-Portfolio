import { lazy, Suspense } from "react";
import "./codingstats.css";
import ActivityBackground from "./ActivityBackground";

// Lazy load the stats cards for performance optimizer ("Lazy load charts")
const GitHubCard = lazy(() =>
  import("./GitHubCard").then((module) => ({ default: module.GitHubCard }))
);
const LeetCodeCard = lazy(() =>
  import("./LeetCodeCard").then((module) => ({ default: module.LeetCodeCard }))
);
const HackerRankCard = lazy(() =>
  import("./HackerRankCard").then((module) => ({ default: module.HackerRankCard }))
);
const CodeChefCard = lazy(() =>
  import("./CodeChefCard").then((module) => ({ default: module.CodeChefCard }))
);

// Loading skeleton for lazy loading fallback suspension
function CardSkeleton() {
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

export default function CodingStats() {
  return (
    <section className="coding-stats-section" id="coding-activity">
      {/* Isolated premium luxury animated canvas background */}
      <ActivityBackground />
      
      <div className="coding-stats-container">
        {/* Section Header */}
        <div className="coding-stats-header">
          <div className="small-title">ACTIVITY</div>
          <h2 className="main-heading">Coding Stats</h2>
          <p className="subtitle">
            A real-time journey through coding metrics across GitHub, LeetCode, HackerRank, and CodeChef.
          </p>
        </div>

        {/* Desktop / Tablet / Mobile Layout Cards */}
        <div className="coding-stats-cards-grid">
          <Suspense fallback={<CardSkeleton />}>
            <GitHubCard username="jaiwant03" />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <LeetCodeCard username="Jaiwant_Karrun_SA" />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <HackerRankCard username="jaiwant03" />
          </Suspense>

          <Suspense fallback={<CardSkeleton />}>
            <CodeChefCard username="kpr24ad048" />
          </Suspense>
        </div>
      </div>


    </section>
  );
}
