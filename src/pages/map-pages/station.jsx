import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Carousel from "../../components/gallery";

import bikeImg from "../../Images/transportBikes.jpg";
import busImg from "../../Images/transportBus.jpg";
import carImg from "../../Images/transportCar.jpg";
import planeImg from "../../Images/transportPlane.avif";
import trainImg from "../../Images/transportTrain.jpg";
import heroImg from "../../Images/transportHero.jpg";

const images = [
  { src: bikeImg, label: "Bikes" },
  { src: busImg, label: "Buses" },
  { src: carImg, label: "Cars" },
  { src: trainImg, label: "Trains" },
  { src: planeImg, label: "Planes" }
];

export default function TransportStation() {
  const navigate = useNavigate();

  const claimBadge = () => {
    // handles badge claiming for logged‑in users -- same logic as townhall + rest of explore pages
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
        badge_id: 3 // Transport badge ID
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Transport Badge claimed!");
        } else {
          alert(data.error || "Could not claim badge.");
        }
      });
  };

  return (
    <main className="explore-pages">
      <div className="hero">
        <img src={heroImg} alt="Transport Hero" className="hero-img" />
        <div className="hero-title">
          <h1>Welcome to the Transport Station</h1>

          <p>
            Transport helps people and goods move from place to place.  
            Some types are clean and eco‑friendly, while others create pollution.  
            Understanding how each one works helps us make better choices.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Types of Transport</h2>

        <h3>Bikes</h3>
        <p>
          Bikes are one of the cleanest ways to travel.  
          They produce zero pollution, keep people healthy, and take up very little space on roads.  
          Many cities now build cycle lanes to make biking safer and easier.
        </p>

        <h3>Buses</h3>
        <p>
          Buses carry lots of people at once, which means fewer cars on the road.  
          This reduces traffic and pollution.  
          Modern buses are becoming greener, with electric and hybrid models helping to cut emissions even further.
        </p>

        <h3>Cars</h3>
        <p>
          Cars are convenient but create more pollution than public transport.  
          Petrol and diesel cars release carbon emissions that affect air quality.  
          Electric cars are cleaner, but they still require energy to charge.  
          Using cars less helps reduce traffic and pollution in towns.
        </p>

        <h3>Trains</h3>
        <p>
          Trains are fast, efficient, and can carry hundreds of passengers.  
          Electric trains are especially eco‑friendly because they produce far fewer emissions than cars or planes.  
          Trains are one of the best ways to travel long distances sustainably.
        </p>

        <h3>Planes</h3>
        <p>
          Planes are the quickest way to travel long distances, but they also produce the most pollution per journey.  
          Because they burn large amounts of fuel, flying has a big impact on the environment.  
          Choosing trains instead of planes when possible helps reduce carbon emissions.
        </p>
      </div>

      <br />

      <Carousel images={images} />

      <br />

      <div className="card">
        <h2>Why Transport Choices Matter</h2>
        <p>
          Every journey we take affects the environment.  
          Walking, biking, and using public transport reduce pollution, improve air quality, and make towns safer and quieter.  
          Choosing greener transport helps protect wildlife, reduces traffic, and keeps our communities healthier.
        </p>

        <br />

        <h2>What Happens If We Don’t Travel Sustainably</h2>
        <p>
          If we rely too much on cars and planes, pollution increases and air quality gets worse.  
          Traffic becomes heavier, making journeys slower and more stressful.  
          Wildlife habitats near busy roads can be damaged, and climate change speeds up due to rising emissions.  
          Sustainable travel helps protect both people and the planet.
        </p>

        <br />

        <h2>Time To Think</h2>
        <p>
          Think about your daily journeys. Could you walk, bike, or take a bus instead of using a car?  
          Small changes make a big difference.
        </p>

        <br />

        <h2>Claim Your Badge</h2>
        <p>Great job exploring the Transport Station! Claim your badge below.</p>
        <button onClick={claimBadge} className="claim-btn btn">
          Claim Transport Badge
        </button>
      </div>
    </main>
  );
}
