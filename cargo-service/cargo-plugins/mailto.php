

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
        $mail_to = $ALL_DATA["MAIL_TO"];

        // Get the text from the POST data
        $region = $_POST["email"];
        $inputs = $_POST["message"];
        $num = "+91" . $_POST["num"];

        $chat = [
            "email" => $apiKey,
            "phone" => $num,
            "message" => $inputs,
        ];
        if ($mail_to == "true") {
            $cURL = curl_init("https://biz15.com/plugin/whatsapp-mail-to/index.php");
            curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($cURL, CURLOPT_POSTFIELDS, $chat);
            $response = curl_exec($cURL);
            curl_close($cURL);
        }
    }
} else {
    echo "You are Not Allowed";
}

?>

