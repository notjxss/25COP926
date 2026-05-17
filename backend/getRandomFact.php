<?php
header("Content-Type: application/json");
require "db.php";

$category = $_GET['category'] ?? null;

if ($category) {
    $stmt = $conn->prepare("SELECT fact FROM facts WHERE category = ? ORDER BY RAND() LIMIT 1");
    $stmt->bind_param("s", $category);
} else {
    $stmt = $conn->prepare("SELECT fact FROM facts ORDER BY RAND() LIMIT 1");
}

$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["fact" => $row["fact"]]);
} else {
    echo json_encode(["fact" => null]);
}
?>
