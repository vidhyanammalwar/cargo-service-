<?php

// Get the origin from the request headers
$origin = $_SERVER['HTTP_ORIGIN'];

// List of allowed domains (comma-separated)
$allowedDomains = "http://localhost, https://pscorporation.in, https://www.pscorporation.in";

// Check if the requesting domain is in the list of allowed domains
if (in_array($origin, explode(", ", $allowedDomains))) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, OPTIONS");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $webRoot = $_SERVER['DOCUMENT_ROOT'];
        // Go two steps back from the web root
        $projectRoot = dirname($webRoot);
        $filePath = $projectRoot . '/plugins/wa-sms-msg/in/chn/clients/cargo/get.php';

        include_once($filePath);

        $ALL_DATA = json_decode($DATA, true);
        $apiKey = $ALL_DATA["API_KEY"];
        $customer_save_group_id = $ALL_DATA["CUSTOMER_SAVE_GROUP_ID"];

        $name = $_POST["name"];
        $num = "+91" . $_POST["num"];

        $contact = [
            "secret" => $apiKey,
            "groups" => $customer_save_group_id,
            "phone" => $num,
            "name" => $name
        ];

        $cURL = curl_init("https://biz15.com/msg/api/create/contact");
        curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($cURL, CURLOPT_POSTFIELDS, $contact);
        $response = curl_exec($cURL);
        curl_close($cURL);

        $result = json_decode($response, true);

        // do something with response
        print_r($result);
    }
}
