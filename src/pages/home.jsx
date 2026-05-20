import { Link } from "react-router-dom";

import FactBox from "../components/factBox";
import Leaderboard from "../components/leaderboard";

export default function Home() {
  return (
    <>
      <main>
        <div className="home-layout">

          <div id="left-side">
            <h1>Welcome to the Sustainability Town Explorer</h1>

            <p>
              This is your town to explore. Every place you visit teaches you something
              new about how the world works. You can discover where our energy comes
              from, how food gets to the shops, how transport affects the planet, and
              why nature is so important.
            </p>

            <p>
              Each area has simple facts, fun ideas, and things to think about. You can
              explore at your own pace and learn how small choices can help make the
              world cleaner and greener.
            </p>

            <h2>Explore, Learn, and Have Fun</h2>
            <p>
              Move around the map, click on different places, and see what you can find.
              Every part of the town has a story to tell. The more you explore, the more
              you learn about how everything fits together.
            </p>

            <h2>Earn Badges Along the Way</h2>
            <p>
              As you explore, you can earn badges for visiting places and completing
              quizzes. They’re a fun way to keep track of what you’ve learned and how
              much of the town you’ve discovered.
            </p>
          </div>

          <div id="right-side" className="card">
            <Leaderboard />
          </div>

        </div> 

        <br />

        <FactBox />

        <br />

        <div className="centered" style={{ marginTop: "20px" }}>
          <Link to="/explore">Ready to Explore?</Link>
        </div>

      </main>
    </>
  );
}
