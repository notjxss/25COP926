import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Carousel from "../../components/gallery";

import forestImg from "../../Images/parkForest.jpg";
import pondImg from "../../Images/parkPonds.jpg";
import meadowImg from "../../Images/parkMeadows.jpg";
import hedgeImg from "../../Images/parkHedges.jpg";
import heroImg from "../../Images/parkHero.jpg";

const images = [
  { src: forestImg, label: "Forest" },
  { src: pondImg, label: "Pond" },
  { src: meadowImg, label: "Meadow" },
  { src: hedgeImg, label: "Hedge" }
];


export default function Park() {
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
        badge_id: 1
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Park Badge claimed!");
        } else {
          alert(data.error || "Could not claim badge.");
        }
      });
  };


  return (
    <main className="explore-pages">
      <div className = "hero">
        <img src={heroImg} alt="Park Hero" className="hero-img" />
        <div className="hero-title">
          <h1>Welcome to the Park</h1>

          <p>
            The park is a calm, green space perfect for relaxation and outdoor activities,
            as well as a habitat for various plant and animal species.
          </p>

        </div>
      </div>

      <div className="card">
        <h2>Different Ecosystems</h2>

        <h3>Forest</h3>
        <p>
          Forests come in many types, but the ones we see in places like the UK are usually temperate forests. 
          These forests have four seasons and trees such as oak, birch, pine, and maple. 
          Some trees lose their leaves in autumn (deciduous), while others keep their needles all year (coniferous). 
          The temperature varies widely from season to season with cold winters and hot, wet summers. 
          Because it gets so cold, the trees have adapted to the winter by going into a period of dormancy or sleep. 
          They also have thick bark to protect them from the cold weather.
          Forests provide shelter, food, and shade for countless animals, and they help clean the air we breathe.
        </p>

        <h3>Ponds</h3>
        <p>
          Ponds are small, still bodies of freshwater that support a surprisingly large variety of life. 
          They can be found in parks, woodlands, and fields, and they change throughout the year as temperatures rise and fall. 
          Many animals rely on ponds for breeding, including frogs, newts, insects, and some birds. 
          Plants around the edges help keep the water clean by absorbing nutrients and providing shade. 
          Because ponds are shallow, they warm up quickly in summer and freeze easily in winter, so the species that live there have adapted to survive these changes. 
          Ponds play an essential role in the ecosystem by filtering water, supporting biodiversity, and offering a safe habitat for wildlife.
        </p>

        <h3>Meadows</h3>
        <p>
          Meadows are open, sunny areas filled with grasses, wildflowers, and a huge range of insects. 
          They are most common in places with plenty of light and well‑drained soil, allowing plants to grow thick and tall. 
          Bees, butterflies, and other pollinators depend on meadows for nectar, while birds and small mammals use them for food and nesting. 
          Because meadows change with the seasons, many plants have adapted to bloom at different times of year, ensuring a constant supply of pollen. 
          These habitats are incredibly important for biodiversity, supporting species that cannot survive in forests or urban areas. 
          Meadows help maintain healthy ecosystems and keep pollinator populations strong.
        </p>

        <h3>Hedges</h3>
        <p>
          Hedges act as natural boundaries and wildlife corridors. 
          Birds, insects, and small mammals use them for shelter, food, and protection. 
          Hedges are long rows of shrubs or small trees planted closely together, often used as natural boundaries in parks and countryside areas. 
          They provide shelter, food, and nesting spaces for birds, insects, and small mammals throughout the year. 
          Many hedge plants, such as hawthorn and blackthorn, produce berries and flowers that support wildlife in different seasons. 
          Because hedges are dense and layered, they act as safe corridors that animals can travel through without being exposed to predators. 
          Their thick branches also help reduce wind, trap dust, and improve air quality. 
          Hedges are vital micro‑habitats that connect larger ecosystems and keep wildlife moving safely across the landscape.
        </p>
      </div>

      <br />
      
      <Carousel images={images} />

      <br />

      <div className = "card">
        <h2>Why Parks Matter</h2>
        <p>
          Parks help keep the air clean by trapping dust, pollen, and pollution in their leaves and branches. 
          Trees and shrubs act like natural filters, catching tiny particles that would otherwise stay in the air we breathe. 
          As the wind moves through a park, plants slow it down and pull pollutants out of the atmosphere, making the surrounding area healthier for people and wildlife. 
          This process works all year round, even when trees are not in full leaf, because bark, twigs, and evergreen needles continue to capture particles. 
          By reducing pollution, parks improve air quality, protect our lungs, and make towns feel fresher and more comfortable.
        </p>

        <br />

        <h2>What Happens If We Don't Protect Them</h2>
        <p>
          If parks are not protected, the natural balance of the environment begins to break down. 
          Wildlife loses safe places to live, feed, and raise young, causing many species to decline or disappear from the area. 
          Without trees and plants to cool the air, towns become hotter in summer, making heatwaves more uncomfortable and more dangerous for people. 
          Pollution also builds up more easily because there are fewer leaves and branches to trap dust and clean the air. 
          When heavy rain falls, the ground cannot absorb as much water, increasing the risk of flooding in nearby streets and homes. 
          Over time, the loss of parks makes towns feel less healthy, less welcoming, and far less connected to nature.
        </p>

        <br />

        <h2>Time To Think</h2>
        <p>
          Now that you've learned about the park, here’s a small challenge: can you spot three different animals or plants in the park?
        </p>

        <br />

        <h2>Claim Your Badge</h2>
        <p>Congratulations on completing the park exploration! Claim a badge for your profile below!</p>
        <button onClick={claimBadge} className="claim-btn btn">
          Claim Park Badge
        </button>
      </div>
    </main>
  );
}
