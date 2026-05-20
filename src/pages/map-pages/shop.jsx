export default function Shop() {
  const navigate = useNavigate();

  // handles badge claiming for logged‑in users -- same logic as townhall + rest of explore pages
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
    <>
      {/* page content */}
    </>
  );
}