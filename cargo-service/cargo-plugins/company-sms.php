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
        $accountId = $ALL_DATA["ACCOUNT_ID"];
        $deviceId = $ALL_DATA["DEVICE_ID"];
        $smsNumber = $ALL_DATA["SMS_NUMBER"];
        $company_sms = $ALL_DATA["COMPANY_SMS"];
        // Get the text from the POST data
        $name = $_POST["name"];
        $ip = $_POST["ip"];
        // $ip = $_SERVER['REMOTE_ADDR'];
        $host = $_POST["host"];
        $sr = $_POST["sr"];
        $city = $_POST["city"];
        $region = $_POST["region"];

        $inputs = $_POST["inputs"];
        $inputsArray = explode(',', urldecode($inputs));
        // Enclose array elements in single quotes, concatenate with '\n', and add '*' to each line
        $resultInputs = "> " . implode("\n> ", $inputsArray);

        // Replacement values
        $replacements = array(
            '{name}' => $name,
            '{num}' => $smsNumber,
            '{city}' => $city,
            '{region}' => $region,
            '{ip}' => $ip,
            '{host}' => $host,
            '{sr}' => $sr,
            '{products}' => $resultInputs,
        );

        // Perform the replacements
        $message = str_replace(array_keys($replacements), array_values($replacements), $company_sms);

        $chat = [
            "secret" => $apiKey,
            "mode" => "devices",
            "device" => $deviceId,
            "sim" => 1,
            "priority" => 1,
            "phone" => $smsNumber,
            "message" => $message
        ];

        $cURL = curl_init("https://biz15.com/msg/api/send/sms");
        curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($cURL, CURLOPT_POSTFIELDS, $chat);
        $response = curl_exec($cURL);
        curl_close($cURL);

        $result = json_decode($response, true);

        // do something with response
        print_r($result);
    }
}
