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

// instantiate database
$database = new Database();
$db = $database->getConnection();

$user = new Users($db);

$data = json_decode(file_get_contents("php://input"));
$user->start = $data->pagee;


$result = $user->fetchAll();
$user_arr = array();

if($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		array_push($user_arr, $row);
	}
	http_response_code(200);
	echo json_encode($user_arr);
}else{
	echo json_encode($user_arr);
}

// $result = $user->fetchAll();

// $user_arr = array();

// while($row = $result->fetch_assoc()){
// 	array_push($user_arr, $row);
// }

// // set http status code to - 200 ok
// http_response_code(200);
// echo json_encode($user_arr);

