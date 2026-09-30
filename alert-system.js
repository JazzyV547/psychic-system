function createAlertSystem() {

    if (
        document.getElementById("customAlert")
    ) {
        return;
    }

    const html = `
        <div id="customAlert" class="alert-overlay">
            <div class="alert-box">
                <h3 id="alertTitle">Notice</h3>
                <p id="alertMessage"></p>
                <button id="alertOkBtn">
                    OK
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

    document
        .getElementById("alertOkBtn")
        .addEventListener(
            "click",
            closeAlert
        );
}

function closeAlert() {

    const modal =
        document.getElementById(
            "customAlert"
        );

    if(modal){
        modal.style.display = "none";
    }
}

function customAlert(
    message,
    title = "Notice"
) {

    const modal =
        document.getElementById(
            "customAlert"
        );

    document.getElementById(
        "alertTitle"
    ).textContent = title;

    document.getElementById(
        "alertMessage"
    ).textContent = message;

    modal.style.display = "flex";
}

/* Replace browser alert() */

window.alert = function(message){

    customAlert(message);
};

document.addEventListener(
    "DOMContentLoaded",
    createAlertSystem
);