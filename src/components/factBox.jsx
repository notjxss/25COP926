import { useState, useEffect } from "react";

export default function FactBox() {
<<<<<<< HEAD
  // stores the random fact returned from backend
  const [fact, setFact] = useState("");

  useEffect(() => {
    // fetch a single random fact when component renders
=======
  const [fact, setFact] = useState("");

  useEffect(() => {
>>>>>>> 47483494d92f92a77bb4ce98f599eff96fa131e5
    fetch("/backend/getRandomFact.php")
      .then(res => res.json())
      .then(data => setFact(data.fact));
  }, []);

  return (
    <div className="facts">
      <h5>{fact || "Failed to retrieve fact. :("}</h5>
    </div>
  );
}
