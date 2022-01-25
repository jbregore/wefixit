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

$users = new Users($db);
$data = json_decode(file_get_contents("php://input"));

$users->email = $data->user_email;

$result = $users->get_email_forgot();
$users_arr = array();

if($result->num_rows > 0){
	while($row = $result->fetch_assoc()){
		array_push($users_arr, $row);
	}
	// set http status code to - 200 ok
	http_response_code(200);
	// echo sizeof($users_arr);
	echo json_encode($users_arr);
}else{
	// echo "reachedMax";
    http_response_code(500);
	echo json_encode($users_arr);
	// exit("reachedMax");
}



