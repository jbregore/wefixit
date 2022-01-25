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

session_start();
$users->user_id = $_SESSION['user_id'];
$users->old_password = $data->old_password;
$users->new_password = $data->new_password;

$isChange = $users->change_password();

if($isChange){
	//201 - created
	http_response_code(200);
	echo json_encode(array("message" => "Password has been changed"));
}
else{
	//500 - internal server error/ may problema sa db connection
	http_response_code(500);
	echo json_encode(array("message" => "Wrong password"));
}

