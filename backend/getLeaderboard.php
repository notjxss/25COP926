<?php
require "db.php";

$today = date("Y-m-d");

$sql = "
  SELECT u.firstname, u.lastname, u.username, s.score
  FROM quiz_scores s
  JOIN users u ON u.id = s.user_id
  WHERE s.quiz_date = ?
  ORDER BY s.score DESC
  LIMIT 10
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $today);
$stmt->execute();
$result = $stmt->get_result();

$rows = [];
while ($row = $result->fetch_assoc()) {
  $rows[] = $row;
}

echo json_encode($rows);
?>
