

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
        $apiKey = $ALL_DATA["API_KEY_BIZ15"];
        $accountId = $ALL_DATA["ACCOUNT_ID_BIZ15"];
        $whatsapp_number_and_group = $ALL_DATA["WHATSAPP_NUMBER_AND_GROUP_BIZ15"];

        // Get the text from the POST data
        $name = $_POST["name"];
        $ip = $_POST["ip"];
        //$ip = $_SERVER['REMOTE_ADDR'];
        $host = $_POST["host"];
        $sr = $_POST["sr"];
        $city = $_POST["city"];
        $region = $_POST["region"];

        $inputs = $_POST["inputs"];

        $num = "+91" . $_POST["num"];

        // Replacement values
        $replacements = array(
            '{name}' => $name,
            '{num}' => $num,
            '{city}' => $city,
            '{region}' => $region,
            '{ip}' => $ip,
            '{host}' => $host,
            '{sr}' => $sr,
            '{products}' => $inputs,
        );

        // Perform the replacements
        $message = str_replace(array_keys($replacements), array_values($replacements), $biz15_whatsapp);

        $chat = [
            "secret" => $apiKey,
            "account" => $accountId,
            "recipient" => $whatsapp_number_and_group,
            "type" => "text",
            "message" => $message
        ];

        $cURL = curl_init("https://biz15.com/msg/api/send/whatsapp");
        curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($cURL, CURLOPT_POSTFIELDS, $chat);
        $response = curl_exec($cURL);
        curl_close($cURL);

        $result = json_decode($response, true);

        // do something with response
        print_r($result);
    }
} else {
    echo "You are Not Allowed";
}

?>

