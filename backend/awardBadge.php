<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$badge_id = $data['badge_id'] ?? null;

// looks for empty values and returns an error if any are found
if (!$user_id || !$badge_id) {
    echo json_encode(["success" => false, "error" => "Missing user_id or badge_id"]);
    exit;
}

// prevent duplicate badges
$checkSql = "SELECT id FROM user_badges WHERE user_id = ? AND badge_id = ?";
$checkStmt = mysqli_prepare($conn, $checkSql);
mysqli_stmt_bind_param($checkStmt, "ii", $user_id, $badge_id);
mysqli_stmt_execute($checkStmt);
$checkResult = mysqli_stmt_get_result($checkStmt);

if (mysqli_num_rows($checkResult) > 0) {
    echo json_encode(["success" => false, "error" => "Badge already claimed"]);
    exit;
}

// insert badge into user_badges table
$sql = "INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ii", $user_id, $badge_id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
?>
