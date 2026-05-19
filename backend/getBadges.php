<?php
header("Content-Type: application/json");
require "db.php";

$sql = "SELECT id, name, description, icon FROM badges";
$result = mysqli_query($conn, $sql);

$badges = [];

while ($row = mysqli_fetch_assoc($result)) {
    // Prepend public badge path
    $row['icon'] = "/backend/badge_icons/" . $row['icon'];
    $badges[] = $row;
}

echo json_encode($badges);
?>
