import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Explore() {
  return (
    <>
      <Header />

      <div className="map-container">
        <svg
          className="map-overlay"
          viewBox="0 0 1400 926.8"
          preserveAspectRatio="xMidYMid meet"
        >
          <image href="/Images/road-map.png" width="1400" height="926.8" />

          <Link to="/park">
            <polygon
              points="557.2,76.3 623.7,280.7 735.7,495.6 722.4,569.1 66.5,711.9 67.2,621.6 193.9,513.1 319.2,299.6 412.3,139.3"
              className="viewpoly"
            />
          </Link>

          <Link to="/shop">
            <polygon
              points="680.4,0 1344.7,0 1192.8,101.5 1181.6,164.5 1061.2,276.5 705.6,137.9"
              className="viewpoly"
            />
          </Link>

          <Link to="/fuels">
            <polygon
              points="1399.3,161.7 1399.3,389.2 1204,374.5 1127,331.8 1201.9,240.8 1294.3,171.5"
              className="viewpoly"
            />
          </Link>

          <Link to="/town-hall">
            <polygon
              points="898.8,690.2 1176.7,758.1 1208.2,847 1201.9,926.1 1071,926.1 888.3,868.7"
              className="viewpoly"
            />
          </Link>

          <Link to="/station">
            <polygon
              points="249.2,774.9 509.6,722.4 744.8,637 824.6,692.3 824.6,926.1 199.5,926.1 169.4,845.6"
              className="viewpoly"
            />
          </Link>
        </svg>
      </div>

      <div className="facts">
        <h2>temp text ayyayaya</h2>
      </div>

      <Footer />
    </>
  );
}