import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch leaderboard
    fetch("/backend/getLeaderboard.php")
      .then(res => res.json())
      .then(data => setScores(data));

    // Fetch total users
    fetch("/backend/getUserCount.php")
      .then(res => res.json())
      .then(data => setUserCount(data.total));
  }, []);

  return (
    <div className="leaderboard">
      <p><strong>Total Users:</strong> {userCount}</p>

      <h2>Today's Quiz Top Scores</h2>

      {!scores.length ? (
        <p>No scores yet today.</p>
      ) : (
        scores.map((row, i) => (
          <p key={i}>
            {i + 1}. {row.firstname} {row.lastname} ({row.username}) — {row.score}
          </p>
        ))
      )}

      <h5>Not taken it yet? <Link to="/quiz">Take the quiz!</Link></h5>
    </div>
  );
}
