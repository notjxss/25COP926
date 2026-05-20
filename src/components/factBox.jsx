import { useState, useEffect } from "react";

export default function FactBox() {
  const [fact, setFact] = useState("");

  useEffect(() => {
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
