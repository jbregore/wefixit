<?php


header('Access-Control-Allow-Origin: *');
header('Content-type:application/json');

$data = array('status' => false);
$response = array();

$upload_dir = 'http://192.168.42.241/ehiremo/backend/uploads/feedback_photos/';

$upload_url = 'http://192.168.42.241/ehiremo/backend/uploads/feedback_photos/';

if (isset($_POST['submit'])) {
    $target_file = basename($_FILES['file']['name']);
    $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
    $is_image = getimagesize($_FILES['file']['tmp_name']);
    if ($is_image) {
        $fileNameNew = uniqid('', true) . "." . $file_type;
        $fileDest = $upload_dir . $fileNameNew;
        $fileTmpName = $_FILES['file']['tmp_name'];
        // move_uploaded_file($_FILES['file']['tmp_name'], $fileDest);
        move_uploaded_file($fileTmpName,
        // $fileDest);
        $_SERVER["DOCUMENT_ROOT"]. "/ehiremo/backend/uploads/feedback_photos/". $fileNameNew);

        // $response['doc'] =  $_SERVER["DOCUMENT_ROOT"];
        $response['urlpic'] = $upload_url .  $fileNameNew;
        $response['message'] = "Successfully uploaded";
        // $response = array("urlpic" => $upload_url .  $fileNameNew, "message" => "Successfully uploaded");
        // echo json_encode($response);

        // $data['image'] = time() . '.' . $file_type;
        // if (move_uploaded_file($_FILES['file']['tmp_name'], $data['image'])) {
        //     $data['status'] = true;
        // } else {
        //     $data['message'] = "Error on uploading image";
        // }

    } else {
        $response['message'] = "File is not an image";
    }
}


echo json_encode($response);
