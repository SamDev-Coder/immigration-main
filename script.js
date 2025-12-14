// ===== STATES ARRAY =====
const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
  "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT - Abuja"
];

// Populate states dropdown
const stateSelect = document.getElementById("state");
states.forEach(state => {
    let option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
});

// ===== FORM SUBMISSION =====
const regForm = document.getElementById("regForm");
regForm.addEventListener("submit", function(e){
    e.preventDefault();

    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

    let data = {
        fullname: document.getElementById("fullname").value,
        passportNo: document.getElementById("passportNo").value,
        nin: document.getElementById("nin").value,
        state: document.getElementById("state").value,
        lga: document.getElementById("lga").value,
        nextOfKin: document.getElementById("nok").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        qualification: document.getElementById("qualification").value,
        maritalStatus: document.getElementById("marital").value,
        status: "Pending"
    };

    volunteers.push(data);
    localStorage.setItem("volunteers", JSON.stringify(volunteers));

    // Show popup
    const popup = document.getElementById("successPopup");
    popup.style.display = "block";
    setTimeout(()=> popup.style.display = "none", 3000);

    this.reset();

    // Update dashboards
    if(typeof loadAdminTable === "function") loadAdminTable();
});

// ===== ADMIN DASHBOARD =====
function loadAdminTable(){
    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
    let tbody = document.getElementById("adminData");
    if(!tbody) return;

    tbody.innerHTML = "";
    volunteers.forEach((v, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${v.fullname}</td>
            <td>${v.passportNo}</td>
            <td>${v.nin}</td>
            <td>${v.state}</td>
            <td>${v.lga}</td>
            <td>${v.nextOfKin}</td>
            <td>${v.email}</td>
            <td>${v.address}</td>
            <td>${v.qualification}</td>
            <td>${v.maritalStatus}</td>
            <td class="${v.status.toLowerCase()}">${v.status}</td>
            <td>
                <button class="approve" onclick="updateStatus(${i}, 'Approved')">Approve</button>
                <button class="reject" onclick="updateStatus(${i}, 'Rejected')">Reject</button>
                <button class="delete" onclick="deleteVolunteer(${i})">Delete</button>
            </td>
        </tr>`;
    });
}

function updateStatus(index, status){
    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
    volunteers[index].status = status;
    localStorage.setItem("volunteers", JSON.stringify(volunteers));
    loadAdminTable();
}

function deleteVolunteer(index){
    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
    volunteers.splice(index, 1);
    localStorage.setItem("volunteers", JSON.stringify(volunteers));
    loadAdminTable();
}

// Load admin table on page load if present
document.addEventListener("DOMContentLoaded", loadAdminTable);
