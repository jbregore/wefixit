<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER["REQUEST_METHOD"] !== "GET"){
	http_response_code(404);
	echo "Not Found";
	return;
}

include "../../config/database.php";
include "../../models/users.php";

// instantiate database
$database = new Database();
$db = $database->getConnection();

// instantiate user
$user = new Users($db);

session_start();
// get user_id
$user->user_id = $_SESSION['user_id'];

// get user
$isLogout = $user->logout();

if($isLogout){
    session_destroy();
    http_response_code(200);
    echo json_encode('logout');
}
