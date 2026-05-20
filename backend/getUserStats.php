<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'] ?? null;

if (!$user_id) {
    echo json_encode([
        "totalVisits" => 0,
        "mostVisited" => "—",
        "lastExplored" => "—"
    ]);
    exit;
}

$response = [
    "totalVisits" => 0,
    "mostVisited" => "—",
    "lastExplored" => "—"
];


$sql = "SELECT COUNT(*) AS total FROM visits WHERE user_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $response["totalVisits"] = intval($row["total"]);
}


$sql = "SELECT area_name, COUNT(*) AS c 
        FROM visits 
        WHERE user_id = ?
        GROUP BY area_name
        ORDER BY c DESC
        LIMIT 1";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $response["mostVisited"] = $row["area_name"];
}


$sql = "SELECT visited_at 
        FROM visits 
        WHERE user_id = ?
        ORDER BY visited_at DESC
        LIMIT 1";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $response["lastExplored"] = $row["visited_at"];
}

echo json_encode($response);
?>
