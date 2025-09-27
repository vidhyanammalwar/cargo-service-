<!DOCTYPE html>
<html lang="en" data-url="<?php echo $_REQUEST['url']; ?>">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatBox</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="biz-msg-box/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <div id="biz_msg_box" class="active" data-thankyou-page="thankyou.html">
        <div class="biz_msg_header">
            <div class="brandLogo">
                <img src="../img/logo-light.png" alt="LOGO">
            </div>
        </div>
        <div class="biz_msg_send">
            <h4>How can we help you?</h4>
            <p class="message">Please enter your name and phone number to start the conversation.</p>
            <label class="biz_msg_name" for="biz_msg_name">
                <p class="alert-name">Enter Your Name</p>
                <input type="name" placeholder="Your name" title="Please enter your name" required id="biz_msg_name">
            </label>
            <label class="biz_msg_phone" for="biz_msg_phone">
                <p class="alert-number">Enter Your 10 digit Number</p>
                <span>+91</span><input type="tel" pattern="\d{10}" placeholder="Your number" title="Please enter a 10-digit phone number" required id="biz_msg_phone">
            </label>
        </div>
        <div class="biz_msg_inputs">
            <textarea placeholder="Your Message (Optional)" name="messages" id="message-box" cols="30" rows="3"></textarea>
        </div>
        <button id="submit_msg" onclick="singleWhatsapp()" role="button">
            <h5 class="me-1">Sent to WhatsApp</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.6 14c-.2-.1-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1c-.2.2-.6.8-.8 1c-.1.2-.3.2-.5.1c-.7-.3-1.4-.7-2-1.2c-.5-.5-1-1.1-1.4-1.7c-.1-.2 0-.4.1-.5c.1-.1.2-.3.4-.4c.1-.1.2-.3.2-.4c.1-.1.1-.3 0-.4c-.1-.1-.6-1.3-.8-1.8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3c-.6.6-.9 1.3-.9 2.1c.1.9.4 1.8 1 2.6c1.1 1.6 2.5 2.9 4.2 3.7c.5.2.9.4 1.4.5c.5.2 1 .2 1.6.1c.7-.1 1.3-.6 1.7-1.2c.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2c5.5 0 9.9-4.4 9.9-9.9c.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3c-1.5 0-2.9-.4-4.2-1.1l-.3-.2l-3.1.8l.8-3l-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" />
            </svg>
        </button>
        <h6 class="send-message">Once you provide your details, Click on the WhatsApp icon to start a
            conversation with our team.</h6>
    </div>
    <script src="biz-msg-box/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>