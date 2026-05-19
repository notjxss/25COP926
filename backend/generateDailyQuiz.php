<?php
require "db.php";

$today = date("Y-m-d");

$check = $conn->prepare("SELECT COUNT(*) FROM quiz_of_the_day WHERE quiz_date = ?");
$check->bind_param("s", $today);
$check->execute();
$check->bind_result($count);
$check->fetch();
$check->close();

if ($count > 0) {
  exit("Quiz already generated");
}

$result = $conn->query("SELECT id FROM quiz_questions ORDER BY RAND() LIMIT 10");

while ($row = $result->fetch_assoc()) {
  $stmt = $conn->prepare("INSERT INTO quiz_of_the_day (question_id, quiz_date) VALUES (?, ?)");
  $stmt->bind_param("is", $row['id'], $today);
  $stmt->execute();
}

echo "Quiz generated";
?>
