<?php
require "db.php";

$sql = "SELECT COUNT(*) AS total FROM users";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

echo json_encode($row);
?>
