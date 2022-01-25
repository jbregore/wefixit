<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not found!";

    return;
}

include "../../config/database.php";
include "../../models/users.php";


$database = new Database();
$db = $database->getConnection();

$user = new Users($db);

$data = json_decode(file_get_contents("php://input"));

$user->user_id = $data->user_id;
$user->role = $data->role;
$user->name = $data->name;
$user->fname = $data->fname;
$user->gender = $data->gender;
$user->address = $data->address_desc;
$user->address_lat = $data->address_lat;
$user->address_longt = $data->address_longt;
$user->birthday = $data->birthday;
$user->age = $data->age;
$user->email = $data->email;
$user->password = $data->password;
$user->front_id = $data->front_pic;
$user->back_id = $data->back_pic;
$user->whole_id = $data->whole_pic;

$isCreated = $user->addUser();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 record added"));
    return;
}

http_response_code(500);
