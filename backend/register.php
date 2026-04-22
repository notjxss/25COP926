<?php
require "db.php"; 
$data = json_decode(file_get_contents("php://input"), true);

$username  = $data["username"] ?? null;
$firstname = $data["firstname"] ?? null;
$lastname  = $data["lastname"] ?? null;
$email     = $data["email"] ?? null;
$password  = $data["password"] ?? null;

if (!$username || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);

// prepare insert query
$sql = "INSERT INTO users (username, firstname, lastname, email, password_hash)
        VALUES (?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
    exit;
}

mysqli_stmt_bind_param($stmt, "sssss", $username, $firstname, $lastname, $email, $hash);

if (!mysqli_stmt_execute($stmt)) {
    http_response_code(400);
    echo json_encode(["error" => "Could not insert user"]);
    exit;
}

$id = mysqli_insert_id($conn);

echo json_encode([
    "id" => $id,
    "username" => $username,
    "firstname" => $firstname,
    "lastname" => $lastname,
    "email" => $email
]);
?>
