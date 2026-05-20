<?php
header("Content-Type: application/json");

// connect to database for use
$conn = mysqli_connect("localhost", "ttjc2", "CtaHYR9MVnTJFqmVcpsY", "ttjc2");

if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

?>
