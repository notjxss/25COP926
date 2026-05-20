<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? null;
$password = $data["password"] ?? null;

if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

// prepare statement
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
    exit;
}

mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);

if (!$user) {
    http_response_code(400);
    echo json_encode(["error" => "User not found"]);
    exit;
}

if (!password_verify($password, $user["password_hash"])) {
    http_response_code(401);
    echo json_encode(["error" => "Wrong password"]);
    exit;
}

echo json_encode([
    "success" => true,
    "user_id" => $user["id"],
    "firstname" => $user["firstname"],
    "lastname" => $user["lastname"],
    "email" => $user["email"],
    "username" => $user["username"]
]);
?>
