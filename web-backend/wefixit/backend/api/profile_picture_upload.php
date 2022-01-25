<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(404);
    echo "Not Found";
    return;
}


$response = array();
$response2 = array();

$upload_dir = '../uploads/user_profile_picture/';

$upload_url = 'http://192.168.42.241/ehiremo/backend/uploads/user_profile_picture/';


if (isset($_FILES['upload'])) {
    $file = $_FILES['upload'];
    $filename = $_FILES['upload']['name'];
    $fileTmpName = $_FILES['upload']['tmp_name'];
    $fileSize = $_FILES['upload']['size'];
    $fileError = $_FILES['upload']['error'];
    $fileType = $_FILES['upload']['type'];
    
    $fileExt = explode('.', $filename);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpg', 'jpeg', 'png');

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 10000000) {
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDest = $upload_dir . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDest);

                http_response_code(200);
                $response = array("urlpic" => $upload_url .  $fileNameNew, "message" => "Successfully uploaded");
                echo json_encode($response);
                // array_push($response);
            } else {
                http_response_code(400);
                $response = array("url" => $upload_url .  $fileNameNew, "message" => "Image size must be less than 10mb");
                // echo json_encode($response);
                return;
            }
        } else {
            http_response_code(400);
            $response = array("url" => $upload_url .  $fileNameNew, "message" => "There was an error in your image file");
            // echo json_encode($response);
            return;
        }
    } else {
        http_response_code(400);
        $response = array("url" => $upload_url .  $fileNameNew, "message" => "Please upload a valid image");
        // echo json_encode($response);
        return;
    }
}
