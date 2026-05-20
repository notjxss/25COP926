<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$user = $data["user_id"];
$score = $data["score"];
$today = date("Y-m-d");

$stmt = $conn->prepare("INSERT INTO quiz_scores (user_id, score, quiz_date) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $user, $score, $today);
$stmt->execute();

echo json_encode(["success" => true]);
?>
