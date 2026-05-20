import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Carousel from "../../components/gallery";

import heroImg from "../../Images/powerHero.png";
import solarImg from "../../Images/powerSolar.jpg";
import windImg from "../../Images/powerWind.webp";
import hydroImg from "../../Images/powerHydro.jpg";
import coalImg from "../../Images/powerCoal.jpg";
import oilImg from "../../Images/powerOil.jpg";
import gasImg from "../../Images/powerGas.jpg";

const renewableImages = [
  { src: solarImg, label: "Solar Power" },
  { src: windImg, label: "Wind Power" },
  { src: hydroImg, label: "Hydropower" }
];

const fossilImages = [
  { src: coalImg, label: "Coal" },
  { src: oilImg, label: "Oil" },
  { src: gasImg, label: "Gas" }
];


export default function Fuels() {
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
        badge_id: 3
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Power Badge claimed!");
        } else {
          alert(data.error || "Could not claim badge.");
        }
      });
  };

  return (
    <main className="explore-pages">
      <div className="hero">
        <img src={heroImg} alt="Power Hero" className="hero-img" />

        <div className="hero-title">
          <h1>Powering Our World</h1>
          <p>
            Discover how renewable and non‑renewable energy sources keep our homes,
            schools, and cities running and why our choices matter.
          </p>
        </div>
      </div>

      <div className="card">
        <h2>What Is Energy?</h2>
        <p>
          Energy is what makes everything work: lights, heating, transport, phones, factories, and even the food we cook. 
          But not all energy comes from the same place. Some sources can be replaced naturally, while others will eventually run out; 
          and the type we choose affects the planet in different ways.
        </p>

        <h2>Renewable Energy</h2>
        <p>
          Renewable energy comes from sources that will not run out. They are cleaner, better for the environment, and help reduce pollution and climate change.
          These sources are becoming more popular as countries around the world work to create a more sustainable future and reduce harmful emissions.
        </p>

        <h3>Solar Power</h3>
        <p>
          Solar panels capture sunlight and turn it into electricity. Even on cloudy days, they can still produce energy. 
          Solar power is one of the fastest‑growing renewable sources in the world, as it is clean, quiet, and can be installed on rooftops or in large solar farms.
        </p>

        <h3>Wind Power</h3>
        <p>
          Wind turbines use the movement of the wind to spin blades and generate electricity.
          The UK is one of the world’s leaders in wind energy, especially offshore turbines, where the winds are stronger and more consistent.
        </p>

        <h3>Hydropower</h3>
        <p>
          Hydropower uses flowing water, like rivers or dams, to turn turbines and create electricity. 
          It is reliable and can produce large amounts of energy without releasing pollution into the air.
        </p>

        <br />

        <Carousel images={renewableImages} />

        <br />

        <h2>Non‑Renewable Energy</h2>
        <p>
          Non‑renewable energy comes from sources that take millions of years to form.
          Once we use them up, they cannot be replaced. 
          They also release pollution and greenhouse gases when burned, which contributes to climate change.
        </p>

        <h3>Coal</h3>
        <p>
          Coal is a black rock, formed through the remains of ancient plants, that are burned to create heat and electricity. 
          It is one of the oldest energy sources but also one of the most polluting, as it releases large amounts of carbon dioxide and other harmful substances into the air.
        </p>

        <h3>Oil</h3>
        <p>
          Oil is used for transport, heating, and making plastics. 
          It is powerful but limited, and spills can cause serious environmental damage.
          Extracting oils from deep underground or from the ocean floor can also harm ecosystems and wildlife.
        </p>

        <h3>Natural Gas</h3>
        <p>
          Natural gas is cleaner than coal and oil but still releases carbon dioxide.
          It is commonly used for heating homes and cooking.
          Although it burns more cleanly, it still contributes to climate change and can leak methane, a potent greenhouse gas, during extraction and transport.
        </p>
      </div>

      <br />

      <Carousel images={fossilImages} />

      <br />

      <div className="card">
        <h2>Why Energy Choices Matter</h2>
        <p>
          The more we rely on renewable energy, the cleaner our air becomes. 
          Renewable sources reduce pollution, protect wildlife, and help slow climate change.
          Choosing cleaner energy today creates a healthier future for everyone and reduces our dependence on fuels that damage the environment.
        </p>

        <br />

        <h2>What Happens If We Don’t Change?</h2>
        <p>
          If we continue relying heavily on non‑renewable energy, pollution will increase, temperatures will rise, and extreme weather will become more common. 
          Wildlife habitats will be damaged, and future generations will face greater challenges. 
          Switching to renewable energy is essential to protect our planet and ensure a sustainable future for all living things.
        </p>
        
        <br />

        <h2>Time To Think</h2>
        <p>
          Can you name one renewable and one non‑renewable energy source you use every day?
        </p>
        
        <br />

        <h2>Claim Your Badge</h2>
        <p>Congratulations on completing the fuels exploration! Claim a badge for your profile below!</p>
        <button onClick={claimBadge} className="claim-btn btn">
          Claim Power Badge
        </button>
      </div>
    </main>
  );
}
