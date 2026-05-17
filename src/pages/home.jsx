import { Link } from "react-router-dom";

import FactBox from "../components/factBox";

export default function Home() {
  return (
    <>
      <main>
        <div className="home-layout">

          <div id="left-side">
            <h1>Welcome to the Home Page</h1>
            <p>
              This is the home page of our website. Here you can find various
              resources and links to other sections.
            </p>
          </div>

          <div id="right-side">
            <h2>Latest News</h2>
            <p>
              Stay updated with the latest news and announcements from our team.
            </p>
          </div>

        </div> 

        <br />

        <FactBox />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/explore">Ready to Explore?</Link>
        </div>

      </main>
    </>
  );
}
