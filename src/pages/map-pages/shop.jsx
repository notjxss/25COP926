import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Carousel from "../../components/gallery";

import domesticImg from "../../Images/foodDomestic.jpg";
import exportImg from "../../Images/foodExport.webp";
import gardenImg from "../../Images/foodGarden.jpg";
import importImg from "../../Images/foodImport.jpg";
import heroImg from "../../Images/foodHero.avif";

const images = [
  { src: domesticImg, label: "Domestic Produce" },
  { src: importImg, label: "Imported Foods" },
  { src: gardenImg, label: "Garden‑Grown Foods" },
  { src: exportImg, label: "Exported Foods" }
];

export default function Shop() {
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
        badge_id: 2 // Shop badge ID
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Food & Shopping Badge claimed!");
        } else {
          alert(data.error || "Could not claim badge.");
        }
      });
  };

  return (
    <main className="explore-pages">
      <div className="hero">
        <img src={heroImg} alt="Shop Hero" className="hero-image" />
        <div className="hero-title">
          <h1>Welcome to the Supermarket</h1>

          <p>
            The supermarket is where our food journeys begin.  
            Some foods are grown locally, some travel across the world,  
            and others come from gardens right near home.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Where Our Food Comes From</h2>

        <h3>Domestic Produce</h3>
        <p>
          Domestic produce is food grown within our own country. 
          These foods don’t have to travel far, which means fewer emissions and fresher ingredients. 
          Apples, potatoes, carrots, and berries are common examples. 
          Buying domestic produce supports local farmers and reduces the environmental impact of long‑distance transport.
        </p>

        <h3>Imported Foods</h3>
        <p>
          Imported foods come from other countries, often travelling thousands  
          of miles by ship, plane, or truck. Foods like bananas, oranges,  
          avocados, and spices are often imported because they grow better  
          in warmer climates. While imports give us variety, they also create  
          more carbon emissions due to transportation.
        </p>

        <h3>Garden‑Grown Foods</h3>
        <p>
          Garden‑grown foods come from small home or community gardens.  
          These foods have almost no transport emissions and are incredibly fresh.  
          People grow tomatoes, herbs, beans, lettuce, and many other plants right in their back gardens. 
          Growing food teaches us about nature, reduces waste, and helps wildlife by providing habitats for insects.
        </p>

        <h3>Exported Foods</h3>
        <p>
          Exported foods are grown in our country but sold to other places around the world. 
          Countries export foods when they grow more than they need or when their produce is especially high quality.  
          Exporting helps farmers earn money and share their products globally, but it also means more transport emissions and packaging.
        </p>
      </div>

      <br />

      <Carousel images={images} />

      <br />
        
      <div className="card">
        <h2>Why Food Choices Matter</h2>
        <p>
          Every food choice we make has an impact.  
          Choosing local foods reduces pollution, supports farmers, and keeps money in the community. 
          Imported foods give us variety and let us enjoy fruits and spices from around the world.  
          Garden‑grown foods are the most sustainable of all, helping the environment and teaching us valuable skills.
        </p>

        <br />

        <h2>What Happens If We Don’t Shop Sustainably</h2>
        <p>
          If we rely too heavily on imported foods, pollution increases due to long‑distance transport. 
          Packaging waste grows, and local farmers struggle to compete. 
          Without sustainable choices, soil health declines, wildlife habitats shrink, and food becomes less affordable for many communities.  
          Making thoughtful choices helps protect the planet and ensures everyone has access to healthy food.
        </p>

        <br />

        <h2>Time To Think</h2>
        <p>
          Next time you visit a supermarket, try spotting foods from different countries. 
          Can you find one domestic item, one imported item, and one that could be grown in a garden?
        </p>

        <br />

        <h2>Claim Your Badge</h2>
        <p>Great job exploring the supermarket! Claim your badge below.</p>
        <button onClick={claimBadge} className="claim-btn btn">
          Claim Food Badge
        </button>
      </div>
    </main>
  );
}
