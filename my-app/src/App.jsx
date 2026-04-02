import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Explore from "./pages/explore";
import Profile from "./pages/profile";
import Parents from "./pages/parents";

import Park from "./pages/map-pages/park";
import Shop from "./pages/map-pages/shop";
import Fuels from "./pages/map-pages/fuels";
import TownHall from "./pages/map-pages/townhall";
import Station from "./pages/map-pages/station";

import Header from "./components/header";
import Footer from "./components/footer";
import AuthPanel from "./auth/authpanel";

export default function App() {
  const [authMode, setAuthMode] = useState("none");

  return (
    <BrowserRouter>
      <Header
        onSignIn={() => setAuthMode("login")}
        onRegister={() => setAuthMode("register")}
      />

      <AuthPanel mode={authMode} setMode={setAuthMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/parents" element={<Parents />} />

        <Route path="/park" element={<Park />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/fuels" element={<Fuels />} />
        <Route path="/town-hall" element={<TownHall />} />
        <Route path="/station" element={<Station />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}