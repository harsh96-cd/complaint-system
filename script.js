function studentLogin() {
    const name = document.getElementById("name").value;
    localStorage.setItem("studentName", name);
    window.location.href = "student-dashboard.html";
}

function adminLogin() {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Wrong credentials");
    }
}

window.onload = function () {
    const name = localStorage.getItem("studentName");

    if (document.getElementById("welcomeText")) {
        document.getElementById("welcomeText").innerText = "Welcome, " + name;
    }

    displayComplaints();
    displayAdminComplaints();
};

function submitComplaint() {
    const name = document.getElementById("complaintName").value;
    const text = document.getElementById("complaintText").value;

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({ name, text });

    localStorage.setItem("complaints", JSON.stringify(complaints));

    // EMAILJS
   emailjs.send("service_u707p7u", "template_w3q4var", {
        name: name,
        message: text
    });

    displayComplaints();
}

function displayComplaints() {
    const list = document.getElementById("complaintList");
    if (!list) return;

    list.innerHTML = "";

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.forEach(c => {
        const li = document.createElement("li");
        li.innerText = c.name + ": " + c.text;
        list.appendChild(li);
    });
}

function displayAdminComplaints() {
    const list = document.getElementById("adminList");
    if (!list) return;

    list.innerHTML = "";

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.forEach((c, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <b>${c.name}</b>: ${c.text}
            <br>
            <button onclick="deleteComplaint(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function deleteComplaint(index) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.splice(index, 1);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    displayAdminComplaints();
}

function logout() {
    window.location.href = "index.html";
}