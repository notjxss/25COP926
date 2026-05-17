<?php
header("Content-Type: application/json");
require "db.php";

$sql = "SELECT * FROM badges";
$result = mysqli_query($conn, $sql);

$badges = [];

while ($row = mysqli_fetch_assoc($result)) {
    $badges[] = $row;
}

echo json_encode($badges);
?>
