<?php
require "db.php";

$user = $_GET["user_id"];
$today = date("Y-m-d");

$stmt = $conn->prepare("SELECT COUNT(*) FROM quiz_scores WHERE user_id = ? AND quiz_date = ?");
// checks if user exists in the quiz_scores table for today's date
$stmt->bind_param("is", $user, $today);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();

echo json_encode(["played" => $count > 0]);
?>
