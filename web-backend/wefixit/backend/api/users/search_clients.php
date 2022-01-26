<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
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
// if($data->role == "freelancer"){
	session_start();
// 	// get user_id
	$users->user_id = $_SESSION['user_id'];
// 	$users->role = $data->role;
// }
$users->page = $data->pagee;
$users->filter_search = $data->filter;
$users->search = $data->search;


$result = $users->search_clients();

$freelancer_arr = array();

while($row = $result->fetch_assoc()) {
    array_push($freelancer_arr, $row);
}

http_response_code(200);
echo json_encode($freelancer_arr);
