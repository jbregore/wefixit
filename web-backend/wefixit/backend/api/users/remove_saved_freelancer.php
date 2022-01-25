<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "DELETE"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/users.php";


$database = new Database();
$db = $database->getConnection();

$users = new Users($db);

$data = json_decode(file_get_contents("php://input"));
session_start();
$users->user_id = $_SESSION['user_id'];
$users->freelancer_id = $data->freelancer_id;

// delete saved freelancer
if($users->deleteSavedFreelancer()) {
	echo json_encode(
		array('message' => 'Saved freelancer Deleted')
	);
} else {
	echo json_encode(
		array('message' => 'Saved freelancer Not Deleted')
	);
}