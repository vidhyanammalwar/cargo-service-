var blockedUser = false;
var stopClick = false;
function checkUserBlock(ipAddress) {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let responseData = xhr.responseText;
                console.log(responseData);
                let parsedData = JSON.parse(responseData);
                parsedData.forEach(data => {
                    if (data == ipAddress) {
                        blockedUser = true;
                        console.log("matched");
                    }
                })
                // Process the responseData as needed
            } else {
                console.error('Error:', xhr.status, xhr.statusText);
            }
        }
    };

    xhr.open('GET', 'https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/blockedUser.php', true);
    xhr.send();

}
function countMSG() {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: POST-request for the server.php
    xhr.open("POST", "https://biz15.co/count-vc", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let msg = "vivahaacetering"
    // Send the request with the text data
    let data = "msg=" + encodeURIComponent(msg);
    xhr.send(data);
}
function sendUserDataToServer() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the JSON response
            var locationInfo = JSON.parse(xhr.responseText);
            console.log(locationInfo);
            let ipAddress = locationInfo.ip;
            let city = locationInfo.city;
            let region = locationInfo.region;

            // Get user's host
            let host = document.querySelector("html").dataset.url;

            // Get user's screen resolution
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenResolution = screenWidth + "x" + screenHeight;

            saveUserDataLocally(ipAddress, host, screenResolution, city, region);

        } else if (xhr.readyState == 4 && xhr.status != 200) {

            let ipAddress = "unknown";
            let city = "unknown";
            let region = "unknown";

            // Get user's host
            let host = document.querySelector("html").dataset.url;

            // Get user's screen resolution
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenResolution = screenWidth + "x" + screenHeight;

            saveUserDataLocally(ipAddress, host, screenResolution, city, region);
        }
    };

    xhr.open('GET', 'https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/get-location.php', true);
    xhr.send();

}

// Call the sendUserDataToServer function when the page loads
window.onload = function () {
    sendUserDataToServer();
    if (localStorage.getItem("customer-name")) {
        document.getElementById('biz_msg_name').value = localStorage.getItem("customer-name");
        document.getElementById('biz_msg_phone').value = localStorage.getItem("customer-number");
    }
};
function saveUserDataLocally(ipAddress, host, screenResolution, city, region) {
    // Check if localStorage is supported by the browser
    if (typeof (Storage) !== "undefined") {
        // Store data in localStorage
        localStorage.setItem("ipAddress", ipAddress);
        localStorage.setItem("host", host);
        localStorage.setItem("screenResolution", screenResolution);
        localStorage.setItem("city", city);
        localStorage.setItem("region", region);
        checkUserBlock(ipAddress);
    } else {
        console.error("localStorage is not supported");
    }
}
function saveCustomerDataLocally(customerName, customerNumber) {
    // Check if localStorage is supported by the browser
    if (typeof (Storage) !== "undefined") {
        // Store data in localStorage
        localStorage.setItem("customer-name", customerName);
        localStorage.setItem("customer-number", customerNumber);

    } else {
        console.error("localStorage is not supported");
    }
}
function msgBox() {
    document.querySelector("#biz_msg_box").classList.toggle("active")
}

document.querySelector("#biz_msg_phone").addEventListener("input", () => {
    let regex = /^\d{10}$/;
    let num = document.getElementById("biz_msg_phone").value;
    if (regex.test(num)) {
        document.querySelector(".alert-number").classList.remove("active")
    } else {
        document.querySelector(".alert-number").classList.add("active")
    }
})
document.querySelector("#biz_msg_phone").addEventListener("focusout", () => {
    document.querySelector(".alert-number").classList.remove("active")
});

document.querySelector("#biz_msg_name").addEventListener("input", () => {
    let regex = /\w{3,}/;
    let name = document.getElementById("biz_msg_name").value;
    if (regex.test(name)) {
        document.querySelector(".alert-name").classList.remove("active")
    } else {
        document.querySelector(".alert-name").classList.add("active")
    }
})
document.querySelector("#biz_msg_name").addEventListener("focusout", () => {
    document.querySelector(".alert-name").classList.remove("active")
});

function closeAlert() {
    document.querySelector("#biz_msg_box_notify").querySelector(".alert-msg").classList.remove("active")
    msgBox();
    setTimeout(() => {
        document.querySelector("#biz_msg_box_notify").classList.remove("active");
        let inputs = document.querySelectorAll(".biz_msg_inputs .biz_msg_input");
        inputs.forEach(input => {
            if (input.checked) {
                input.checked = false;
            }
        });
        document.getElementById("biz_msg_phone").value = "";
    }, 600);
}
function singleWhatsapp() {
    if (!blockedUser) {
        let num = document.getElementById("biz_msg_phone").value;
        // Regular expression to match a 10-digit number
        let regex = /^\d{10}$/;
        let name = document.getElementById("biz_msg_name").value;

        // Regular expression to match a 10-digit number
        let regexname = /\w{3,}/;

        if (regexname.test(name)) {
            if (regex.test(num)) {
                if (!stopClick) {
                    // The value has 10 digits
                    console.log("Valid phone number:", num);
                    // Create a new XMLHttpRequest object
                    let xhr = new XMLHttpRequest();

                    // Configure it: POST-request for the server.php
                    xhr.open("POST", "https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/customer-whatsapp.php", true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                    // Set up a callback function to handle the response
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            console.log(xhr.responseText);
                        }
                    };

                    // Join the encoded elements into a string (comma-separated in this example)
                    let messages = document.querySelector("#message-box").value;

                    // Send the request with the text data
                    let data = "inputs=" + encodeURIComponent(messages) + "&num=" + encodeURIComponent(num) + "&name=" + encodeURIComponent(name);
                    xhr.send(data);

                    saveCustomerDataLocally(name, num);
                    // OTHER ACTIONS
                    bizWhatsapp(messages, num, name);
                    // bizMailTo(inputs , num)
                    // addToContacts(name , num);
                    // sentSMS(name , num , messages);
                    document.querySelector("#submit_msg").classList.add("loading");
                    stopClick = true;
                    // setTimeout(() => {
                    //     window.location = document.querySelector("#biz_msg_box").dataset.thankyouPage;
                    // }, 1000);
                }
            } else {
                document.querySelector(".alert-number").classList.add("active")
                // The value does not have 10 digits
                // console.log("Invalid phone number. Please enter 10 digits.");
            }
        } else {
            document.querySelector(".alert-name").classList.add("active")
            // The value does not have 10 digits
            // console.log("Invalid phone number. Please enter al least three word.");
        }
    }
}
function bizWhatsapp(inputs, num, name) {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: POST-request for the server.php
    xhr.open("POST", "https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/biz15-whatsapp.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the response div with the server's response
            console.log(xhr.responseText);
        }
    };
    let ip = localStorage.getItem("ipAddress");
    let host = localStorage.getItem("host");
    let sr = localStorage.getItem("screenResolution");
    let city = localStorage.getItem("city");
    let region = localStorage.getItem("region");
    let data =
        "inputs=" + encodeURIComponent(inputs) +
        "&num=" + encodeURIComponent(num) +
        "&name=" + encodeURIComponent(name) +
        "&ip=" + encodeURIComponent(ip) +
        "&host=" + encodeURIComponent(host) +
        "&city=" + encodeURIComponent(city) +
        "&region=" + encodeURIComponent(region) +
        "&sr=" + encodeURIComponent(sr);
    xhr.send(data);
}
function bizMailTo(message, num) {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: POST-request for the server.php
    xhr.open("POST", "https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/mailto.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the response div with the server's response
            console.log(xhr.responseText);
        }
    };
    let email = "example@gmail.com";
    let data =
        "email=" + encodeURIComponent(email) +
        "&num=" + encodeURIComponent(num) +
        "&message=" + encodeURIComponent(message) +
        xhr.send(data);
}
function addToContacts(name, num) {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: POST-request for the server.php
    xhr.open("POST", "https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/add-to-customer-group.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the response div with the server's response
            console.log(xhr.responseText);
        }
    };

    // Send the request with the text data
    let data = "name=" + encodeURIComponent(name) + "&num=" + encodeURIComponent(num);
    xhr.send(data);
}
function sentSMS(name, num, inputs) {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: POST-request for the server.php
    xhr.open("POST", "https://biz15.com/plugin/wa-sms-msg-noti-v1/trvcashews-plugins/company-sms.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the response div with the server's response
            console.log(xhr.responseText);
        }
    };
    let ip = localStorage.getItem("ipAddress");
    let host = localStorage.getItem("host");
    let sr = localStorage.getItem("screenResolution");
    let city = localStorage.getItem("city");
    let region = localStorage.getItem("region");
    // Send the request with the text data
    let data =
        "inputs=" + encodeURIComponent(inputs) +
        "&num=" + encodeURIComponent(num) +
        "&name=" + encodeURIComponent(name) +
        "&ip=" + encodeURIComponent(ip) +
        "&host=" + encodeURIComponent(host) +
        "&city=" + encodeURIComponent(city) +
        "&region=" + encodeURIComponent(region) +
        "&sr=" + encodeURIComponent(sr);
    xhr.send(data);
}