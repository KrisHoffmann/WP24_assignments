
document.getElementById("name").addEventListener("input", function() {
    var name = document.getElementById("name").value;
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(name)) {
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("name").classList.add("is-valid");
        document.querySelector("#name + .invalid-feedback").style.display = "none";
    } else {
        document.getElementById("name").classList.remove("is-valid");
        document.getElementById("name").classList.add("is-invalid");
        document.querySelector("#name + .invalid-feedback").style.display = "block";
    }
});

document.getElementById("age").addEventListener("input", function() {
    var age = document.getElementById("age").value;
    var regex = /^\d+$/;
    if (regex.test(age)) {
        document.getElementById("age").classList.remove("is-invalid");
        document.getElementById("age").classList.add("is-valid");
        document.querySelector("#age + .invalid-feedback").style.display = "none";
    } else {
        document.getElementById("age").classList.remove("is-valid");
        document.getElementById("age").classList.add("is-invalid");
        document.querySelector("#age + .invalid-feedback").style.display = "block";
    }
});

document.getElementById("mail").addEventListener("input", function() {
    var mail = document.getElementById("mail").value;
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(mail)) {
        document.getElementById("mail").classList.remove("is-invalid");
        document.getElementById("mail").classList.add("is-valid");
        document.querySelector("#mail + .invalid-feedback").style.display = "none";
    } else {
        document.getElementById("mail").classList.remove("is-valid");
        document.getElementById("mail").classList.add("is-invalid");
        document.querySelector("#mail + .invalid-feedback").style.display = "block";
    }
});

document.getElementById("place").addEventListener("input", function() {
    var place = document.getElementById("place").value;
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(place)) {
        document.getElementById("place").classList.remove("is-invalid");
        document.getElementById("place").classList.add("is-valid");
        document.querySelector("#place + .invalid-feedback").style.display = "none";
    } else {
        document.getElementById("place").classList.remove("is-valid");
        document.getElementById("place").classList.add("is-invalid");
        document.querySelector("#place + .invalid-feedback").style.display = "block";
    }
});

document.getElementById("submit").addEventListener("click", function() {
    // Check if all input fields are valid
    if (document.getElementById("name").classList.contains("is-valid") &&
        document.getElementById("age").classList.contains("is-valid") &&
        document.getElementById("mail").classList.contains("is-valid") &&
        document.getElementById("place").classList.contains("is-valid")) {
        // Submit the form
        document.getElementById("leapyear-form").submit();
    }
});