<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([]);
    exit;
}

$sql = "SELECT 
          b.id AS id,
          b.name AS badge_name,
          b.description AS description,
          b.icon AS badge_icon,
          ub.earned_at AS earned_at
        FROM user_badges ub
        JOIN badges b ON ub.badge_id = b.id
        WHERE ub.user_id = ?";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$userBadges = [];

while ($row = mysqli_fetch_assoc($result)) {
    // Prepend public badge path
    $row['badge_icon'] = "/backend/badge_icons/" . $row['badge_icon'];
    $userBadges[] = $row;
}

echo json_encode($userBadges);
?>
