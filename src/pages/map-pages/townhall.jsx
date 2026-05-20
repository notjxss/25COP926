import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import heroImg from "../../Images/townHall.jpg";

export default function TownHall() {
  const navigate = useNavigate();

  const claimBadge = () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Please log in to claim this badge.");
      navigate("/login");
      return;
    }

    fetch("/backend/awardBadge.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        badge_id: 4 
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Town Hall Badge claimed!");
        } else {
          alert(data.error || "Could not claim badge.");
        }
      });
  };

  return (
    <main className="explore-pages">
      <div className="hero">
        <img src={heroImg} alt="Town Hall Hero" className="hero-image" />
        <div className="hero-title">
          <h1>Welcome to the Town Hall</h1>

          <p>
            The Town Hall is the centre of local decision‑making.  
            It’s where leaders plan services, support communities,  
            and make choices that affect everyday life.
          </p>
        </div>
      </div>
      

      <div className="card">
        <h2>What Happens in a Town Hall?</h2>

        <h3>Local Government</h3>
        <p>
          Local government is responsible for running the community.  
          Councillors and staff work together to manage schools, parks,  
          roads, libraries, and public safety.  
          They listen to residents and make decisions that help the town  
          stay safe, clean, and welcoming.
        </p>

        <h3>Public Services</h3>
        <p>
          Many important services are organised through the Town Hall.  
          These include waste collection, recycling, road repairs,  
          planning new buildings, and supporting families in need.  
          Without these services, towns would struggle to function smoothly.
        </p>

        <h3>Community Decisions</h3>
        <p>
          Town Halls are places where people can share their ideas  
          and help shape the future of their community.  
          Residents can attend meetings, vote on local issues,  
          or give feedback on new plans.  
          This helps ensure that everyone has a voice.
        </p>

        <h3>Events and Support</h3>
        <p>
          Town Halls often host events, workshops, and community activities.  
          They provide support for local groups, charities, and volunteers.  
          These events help bring people together and strengthen  
          the sense of community.
        </p>

        <br />

        <h2>Why Town Halls Matter</h2>
        <p>
          Town Halls keep communities organised and running smoothly.  
          They help protect public spaces, support local businesses,  
          and make sure everyone has access to essential services.  
          Without them, towns would struggle to stay safe, fair,  
          and well‑maintained.
        </p>

        <br />

        <h2>What Happens If We Don’t Support Them</h2>
        <p>
          Without strong local government, services can break down.  
          Roads become damaged, parks become neglected,  
          and important decisions may not reflect the needs of residents.  
          Communities become less connected, and people may feel unheard.  
          Supporting local government helps keep towns healthy and fair.
        </p>

        <br />

        <h2>Time To Think</h2>
        <p>
          Think about your own town.  
          What services do you use every day that are managed  
          by your local council?  
          How would life change if those services disappeared?
        </p>

        <br />

        <h2>Claim Your Badge</h2>
        <p>Great job exploring the Town Hall! Claim your badge below.</p>
        <button onClick={claimBadge} className="claim-btn btn">
          Claim Town Hall Badge
        </button>
      </div>
    </main>
  );
}
