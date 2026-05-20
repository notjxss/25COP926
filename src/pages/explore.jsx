import { useState } from "react";
import { Link } from "react-router-dom";
import roadMap from "../Images/road-map.png";

export default function Explore() {
  const { user } = useContext(AuthContext);

  // which region the user is hovering over
  const [hoverRegion, setHoverRegion] = useState(null);

  // logs a visit to backend (only if logged in)
  const logVisit = (areaName) => {
    if (!user) return;

    fetch("/backend/logVisit.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        area_name: areaName
      })
    }).catch(err => console.error("Visit log failed:", err));
  };

  const regionInfo = {
    "Park": `The park is a calm, green place full of trees, animals, and little hidden habitats. It is where nature does its thing and keeps the town feeling fresh and happy. Explore it to see how wildlife and people can share the same space.`,
    "Supermarket": `The supermarket is where all our food choices begin. Some food is grown nearby and some travels from far away. Take a look around to discover how the way we shop can help the planet while still keeping meals fun and tasty.`,
    "Fuel Station": `The power station shows how the town gets its energy. Some power is clean and renewable and some is not. Explore this area to see how different energy choices can change the world around us.`,
    "Transport Station": `The transport station is full of movement with bikes, buses, cars, and trains all heading somewhere. Each one affects the planet in a different way. Check it out to learn how choosing greener travel can make the town cleaner and healthier.`,
    "Town Hall": `The town hall is where important decisions are made. It is all about jobs, money, and planning what the town needs next. Explore this place to see how choices about work and budgets shape the whole community.`
  };

  return (
    <>
      <div className="map-layout">
        <div className="map-container">
          // svg overlay for the map
          <svg
            className="map-overlay"
            viewBox="0 0 1400 926.8"
            preserveAspectRatio="xMidYMid meet"
          >
            <image xlinkHref={roadMap} width="1400" height="926.8" />
            
            {/* each polygon is clickable and redirects to relevant page, logs visit and shows info on hover */}
            <Link to="/park" onClick={() => logVisit("Park")}>
              <polygon
                points="557.2,76.3 623.7,280.7 735.7,495.6 722.4,569.1 66.5,711.9 67.2,621.6 193.9,513.1 319.2,299.6 412.3,139.3"
                className="viewpoly"
                onMouseEnter={() => setHoverRegion("Park")}
                onMouseLeave={() => setHoverRegion(null)}
              />
            </Link>

            <Link to="/shop">
              <polygon
                points="680.4,0 1344.7,0 1192.8,101.5 1181.6,164.5 1061.2,276.5 705.6,137.9"
                className="viewpoly"
                onMouseEnter={() => setHoverRegion("Supermarket")}
                onMouseLeave={() => setHoverRegion(null)}
              />
            </Link>

            <Link to="/fuels">
              <polygon
                points="1399.3,161.7 1399.3,389.2 1204,374.5 1127,331.8 1201.9,240.8 1294.3,171.5"
                className="viewpoly"
                onMouseEnter={() => setHoverRegion("Fuel Station")}
                onMouseLeave={() => setHoverRegion(null)}
              />
            </Link>

            <Link to="/town-hall">
              <polygon
                points="898.8,690.2 1176.7,758.1 1208.2,847 1201.9,926.1 1071,926.1 888.3,868.7"
                className="viewpoly"
                onMouseEnter={() => setHoverRegion("Town Hall")}
                onMouseLeave={() => setHoverRegion(null)}
              />
            </Link>

            <Link to="/station">
              <polygon
                points="249.2,774.9 509.6,722.4 744.8,637 824.6,692.3 824.6,926.1 199.5,926.1 169.4,845.6"
                className="viewpoly"
                onMouseEnter={() => setHoverRegion("Transport Station")}
                onMouseLeave={() => setHoverRegion(null)}
              />
            </Link>
          </svg>
        </div>


        {/* info box that updates based on which region is being hovered over */}
        <div className="region-info-box card">
          {hoverRegion ? (
            <h3>{hoverRegion}</h3>
          ) : (
            <p>Hover over a region to see details</p>
          )}
        </div>
      </div>
      
      <div className="facts">
          <h2>temp text ayyayaya</h2>
        </div>
    </>
  );
}
