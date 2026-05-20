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
    <div>
      <h1>Station</h1>
    </div>
  );
}