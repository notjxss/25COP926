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

// pulls 10 random questions from the quiz_questions table and inserts them into the quiz_of_the_day table with today's date
$result = $conn->query("SELECT id FROM quiz_questions ORDER BY RAND() LIMIT 10");

while ($row = $result->fetch_assoc()) {
  $stmt = $conn->prepare("INSERT INTO quiz_of_the_day (question_id, quiz_date) VALUES (?, ?)");
  $stmt->bind_param("is", $row['id'], $today);
  $stmt->execute();
}

echo "Quiz generated";
?>
