export default function TownHall() {
  const navigate = useNavigate();

   // handles badge claiming for logged‑in users
  const claimBadge = () => {
    const userId = localStorage.getItem("user_id");

    // redirects to login page if not logged in 
    if (!userId) {
      alert("Please log in to claim this badge.");
      navigate("/login");
      return;
    }

    // otherwise, awards town hall badge
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
    <>
      {/* page content */}
    </>
  );
}