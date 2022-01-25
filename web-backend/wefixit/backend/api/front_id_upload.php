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

$upload_dir = '../uploads/user_ids/';

$upload_url = 'http://192.168.42.241/ehiremo/backend/uploads/user_ids/';


if (isset($_FILES['front-id-img'])) {
    $file = $_FILES['front-id-img'];
    $filename = $_FILES['front-id-img']['name'];
    $fileTmpName = $_FILES['front-id-img']['tmp_name'];
    $fileSize = $_FILES['front-id-img']['size'];
    $fileError = $_FILES['front-id-img']['error'];
    $fileType = $_FILES['front-id-img']['type'];

    $fileExt = explode('.', $filename);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpg', 'jpeg', 'png');

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 10000000) {
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDest = $upload_dir . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDest);

                // http_response_code(200);
                $response = array("url" => $upload_url .  $fileNameNew, "message" => "Successfully uploaded");
                // echo json_encode($response);
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

if (isset($_FILES['back-id-img'])) {
    $file = $_FILES['back-id-img'];
    $filename = $_FILES['back-id-img']['name'];
    $fileTmpName = $_FILES['back-id-img']['tmp_name'];
    $fileSize = $_FILES['back-id-img']['size'];
    $fileError = $_FILES['back-id-img']['error'];
    $fileType = $_FILES['back-id-img']['type'];

    $fileExt = explode('.', $filename);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpg', 'jpeg', 'png');

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 10000000) {
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDest = $upload_dir . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDest);

                // http_response_code(200);
                $response["url2"] = $upload_url .  $fileNameNew;
                // echo json_encode($response);
            } else {
                http_response_code(400);
                $response = array("url" => $upload_url .  $fileNameNew, "message" => "Image size must be less than 10mb");
                echo json_encode($response);
                return;
            }
        } else {
            http_response_code(400);
            $response = array("url" => $upload_url .  $fileNameNew, "message" => "There was an error in your image file");
            echo json_encode($response);
            return;
        }
    } else {
        http_response_code(400);
        $response = array("url" => $upload_url .  $fileNameNew, "message" => "Please upload a valid image");
        echo json_encode($response);
        return;
    }
}

if (isset($_FILES['whole-id-img'])) {
    $file = $_FILES['whole-id-img'];
    $filename = $_FILES['whole-id-img']['name'];
    $fileTmpName = $_FILES['whole-id-img']['tmp_name'];
    $fileSize = $_FILES['whole-id-img']['size'];
    $fileError = $_FILES['whole-id-img']['error'];
    $fileType = $_FILES['whole-id-img']['type'];

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
                $response["url3"] = $upload_url .  $fileNameNew;
                echo json_encode($response);
            } else {
                http_response_code(400);
                $response = array("url" => $upload_url .  $fileNameNew, "message" => "Image size must be less than 10mb");
                echo json_encode($response);
                return;
            }
        } else {
            http_response_code(400);
            $response = array("url" => $upload_url .  $fileNameNew, "message" => "There was an error in your image file");
            echo json_encode($response);
            return;
        }
    } else {
        http_response_code(400);
        $response = array("url" => $upload_url .  $fileNameNew, "message" => "Please upload a valid image");
        echo json_encode($response);
        return;
    }
}
