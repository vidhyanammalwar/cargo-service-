<?php

// Get the origin from the request headers
$origin = $_SERVER['HTTP_ORIGIN'];

// List of allowed domains (comma-separated)
$allowedDomains = "http://localhost, https://pscorporation.in, https://www.pscorporation.in";

// Check if the requesting domain is in the list of allowed domains
if (in_array($origin, explode(", ", $allowedDomains))) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, OPTIONS");

    $webRoot = $_SERVER['DOCUMENT_ROOT'];
    // Go two steps back from the web root
    $projectRoot = dirname($webRoot);
    $filePath = $projectRoot . '/plugins/wa-sms-msg/in/chn/clients/cargo/get.php';

    include_once($filePath);
    $ALL_DATA = json_decode($DATA, true);
    print_r(json_encode($ALL_DATA["BLOCKED_USER_IP"]));
}
