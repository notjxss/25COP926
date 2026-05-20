<?php
require "db.php"; 

// read json input from react
$data = json_decode(file_get_contents("php://input"), true);

// extract fields from input, null if not provided
$username  = $data["username"] ?? null;
$firstname = $data["firstname"] ?? null;
$lastname  = $data["lastname"] ?? null;
$email     = $data["email"] ?? null;
$password  = $data["password"] ?? null;

// basic validation requring these three fields
if (!$username || !$email || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

// hash password using bcrypt
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

// bind parameters and execute
mysqli_stmt_bind_param($stmt, "sssss", $username, $firstname, $lastname, $email, $hash);

// execute insert statement, if it fails, produce error response
if (!mysqli_stmt_execute($stmt)) {
    http_response_code(400);
    echo json_encode(["error" => "Could not insert user"]);
    exit;
}

// retrieve newly generated ID for the inserted user
$id = mysqli_insert_id($conn);

// return user info as json response, except password hash
echo json_encode([
    "id" => $id,
    "username" => $username,
    "firstname" => $firstname,
    "lastname" => $lastname,
    "email" => $email
]);
?>
