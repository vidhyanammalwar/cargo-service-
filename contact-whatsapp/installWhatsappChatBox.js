var script = document.querySelector("#installWhatsappChatBox");
var thankUrl;
class InstallWhatsappChatBox {
    constructor(data) {
        this.data = data;

        console.log(this.data)
    }
    createWhatsappChatBox() {
        thankUrl = this.data.thankyouPage;
        let iframe = document.createElement("iframe");
        let currentUrl = window.location.href;
        iframe.src = this.data.iframeUrl + "?url=" + encodeURIComponent(currentUrl);
        iframe.setAttribute("frameborder", 0);
        iframe.className = 'whatsappChatBox';
        document.querySelector(this.data.whereToInstall).append(iframe);

        let icon = document.createElement("div");
        icon.className = 'whatsappChatBoxIcon';
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>`

        icon.addEventListener("click", () => {
            iframe.classList.toggle("active");
            icon.classList.toggle("active");
        });
        document.querySelector(this.data.whereToInstall).append(icon);


        let style = document.createElement("style");
        style.innerHTML =
            `
         .whatsappChatBox {
            position: fixed;
            left: 2rem;
            bottom: 2rem;
            width: 100%;
            max-width: 350px;
            min-height: 450px;
            transform: scale(0);
            transition: .3s;
            left: ${this.data.chatBoxPosition.left};
            top: ${this.data.chatBoxPosition.top};
            right: ${this.data.chatBoxPosition.right};
            bottom: ${this.data.chatBoxPosition.bottom};
            z-index: 99999;
            transform-origin: right bottom;
        }

        .whatsappChatBox.active {
            transform: scale(1);
        }

        .whatsappChatBoxIcon {
            position: fixed;
            width: 2.5rem;
            font-size: 1.5rem;
            color: white;
            background-color: green;
            aspect-ratio: 1;
            border-radius: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            left: ${this.data.iconPosition.left};
            top: ${this.data.iconPosition.top};
            right: ${this.data.iconPosition.right};
            bottom: ${this.data.iconPosition.bottom};
            cursor: pointer;
            z-index: 999999;
        }

        .whatsappChatBoxIcon:not(.active) svg:nth-child(2) {
            display: none;
        }

        .whatsappChatBoxIcon.active svg:nth-child(1) {
            display: none;
        }
        `;
        document.querySelector("head").append(style);

        window.addEventListener('message', function (event) {
            if (event.data === 'thankyou') {
                window.location.href = thankUrl;
                // The iframe has navigated to the thank-you page
                console.log('Iframe navigated to the thank-you page');
            }
        });

    }
}
