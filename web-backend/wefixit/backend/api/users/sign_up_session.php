<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
	http_response_code(404);
	echo "Not Found";
	return;
}

session_start();

http_response_code(200);
$response = array(
		"user_id" => $_SESSION['user_id'],
		"role" => $_SESSION['role'],
        "name" => $_SESSION['name'],
		"fname" => $_SESSION['fname'],
		"gender" => $_SESSION['gender'],
        "address" => $_SESSION['address'],
		"birthday" => $_SESSION['birthday'],
        "age" => $_SESSION['age'],
		"email" => $_SESSION['email'],
        "password" => $_SESSION['password']
);

echo json_encode($response);