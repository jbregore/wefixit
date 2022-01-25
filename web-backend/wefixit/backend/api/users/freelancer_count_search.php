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

// session_start();
// $users->user_id = $_SESSION['user_id'];
$users->search = $data->search;
$users->filter_search = $data->filter;
$users->page = $data->pagee;

$result = $users->fetch_search_freelancer_count();

//total array
$dash_arr = array();

// job count
while($row = $result->fetch_assoc()){
	$dash_arr['total_freelancer_count'] = $row;
}

// set http status code to - 200 ok
http_response_code(200);
echo json_encode($dash_arr);
