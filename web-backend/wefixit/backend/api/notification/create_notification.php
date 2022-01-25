<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not found!";

    return;
}

include "../../config/database.php";
include "../../models/notification.php";


$database = new Database();
$db = $database->getConnection();

$notif = new Notification($db);

$data = json_decode(file_get_contents("php://input"));

$notif->notif_text = $data->notif_text;
$notif->notif_id_from = $data->notif_from;
$notif->notif_id_to = $data->notif_to;

$isCreated = $notif->addNotif();

if($isCreated) {
    //201 status okay
    http_response_code(201);
    echo json_encode(array("message" => "1 record added"));
    return;
}

http_response_code(500);
