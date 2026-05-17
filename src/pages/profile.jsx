import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/authcontext";
import { useNavigate } from "react-router-dom";
import BadgeTooltip from "../components/badgeTooltip";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [earnedBadges, setEarnedBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    name: "",
    description: ""
  });

  const [stats, setStats] = useState({
    totalVisits: 0,
    mostVisited: "—",
    lastExplored: "—"
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Fetch earned badges
  useEffect(() => {
    if (!user) return;

    fetch("/backend/getUserBadges.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id })
    })
      .then(res => res.json())
      .then(data => setEarnedBadges(data))
      .catch(err => console.error("Badge fetch error:", err));
  }, [user]);

  // Fetch ALL badges
  useEffect(() => {
    fetch("/backend/getBadges.php")
      .then(res => res.json())
      .then(data => setAllBadges(data))
      .catch(err => console.error("All badges fetch error:", err));
  }, []);

  if (!user) return null;

  // Normalize + merge (fixes string vs number ID issue)
  const mergedBadges = allBadges.map(b => {
    const badgeId = Number(b.id);
    const earned = earnedBadges.find(ub => Number(ub.id) === badgeId);

    return {
      id: badgeId,
      name: earned ? earned.badge_name : b.name,
      description: earned ? earned.description : b.description,
      icon: earned ? earned.badge_icon : b.icon,
      earned: !!earned,
      earned_at: earned ? earned.earned_at : null
    };
  });

  useEffect(() => {
    if (!user) return;

    fetch("/backend/getUserStats.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id })
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Stats fetch error:", err));
  }, [user]);

  return (
    <main className="profile-layout">
      <div id="left-side">
        <h1>Welcome back, {user.firstname}</h1>

        <div className="profile-stats">
          <h3>Stats</h3>
          <p>Total Visits: {stats.totalVisits}</p>
          <p>Most Visited Area: {stats.mostVisited}</p>
          <p>Last Explored: {stats.lastExplored}</p>
        </div>
      </div>


      <div id="right-side">
        <h2>Your Badges</h2>

        <div className="badge-grid">
          {mergedBadges.map((b, i) => (
            <div
              className={`badge-card ${b.earned ? "" : "locked"}`}
              key={i}
              onMouseEnter={(e) => {
                setTooltip({
                  visible: true,
                  x: e.clientX,
                  y: e.clientY,
                  name: b.name,
                  description: b.earned
                    ? `${b.description}\nEarned: ${new Date(b.earned_at).toLocaleDateString()}`
                    : "Locked: visit this location to unlock"

                });
              }}
              onMouseMove={(e) => {
                setTooltip(t => ({
                  ...t,
                  x: e.clientX,
                  y: e.clientY
                }));
              }}
              onMouseLeave={() => {
                setTooltip(t => ({ ...t, visible: false }));
              }}
            >
              <img src={`/backend/badge_icons/${b.icon}`} alt={b.name} />
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <BadgeTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        name={tooltip.name}
        description={tooltip.description}
      />
    </main>
  );
}
