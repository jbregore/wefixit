<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "POST"){
	http_response_code(404);
	echo "Not Found";
	return;
}

$data = json_decode(file_get_contents("php://input"));
session_start();
// echo $data->user_id;
$_SESSION['user_id'] = $data->user_id;
$_SESSION['role'] = $data->role;
$_SESSION['name'] = $data->name;
$_SESSION['fname'] = $data->fname;
$_SESSION['gender'] = $data->gender;
$_SESSION['address'] = $data->address;
$_SESSION['birthday'] = $data->birthday;
$_SESSION['age'] = $data->age;
$_SESSION['email'] = $data->email;
$_SESSION['password'] = $data->password;

http_response_code(200);
$user_arr = array(
    'message' => 'Session started',
);
echo json_encode($user_arr);
