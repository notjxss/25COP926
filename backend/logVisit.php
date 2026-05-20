<?php
header("Content-Type: application/json");
require "db.php";

// read json input from react
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$area_name = $data['area_name'] ?? null;

// if user is not logged in, then it fails
=======
if (!$user_id || !$area_name) {
}

$sql = "INSERT INTO visits (user_id, area_name) VALUES (?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "is", $user_id, $area_name);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "DB insert failed"]);
}
?>
