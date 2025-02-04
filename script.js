let rowIdCounter = 1; 
const tablebody = document.querySelector(".dataentry");
let dataArray = [];
let pendingcount = 0;

const addtable = document.querySelector(".addrow");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.id = "fileInput";
document.body.appendChild(fileInput);

addtable.addEventListener("click", function () {
    fileInput.click(); 
});

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const documentname = file.name; 
        const lastModified = new Date(file.lastModified);
        const lastmodifieddate = lastModified.toLocaleDateString();
        const lastmodifiedtime = lastModified.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }); 
        const statusInput = prompt("Enter one of these options: 1. 'Needs Signing' 2. 'Pending' 3. 'Completed'");

        if (statusInput === 'Pending' || statusInput === 'Needs Signing' || statusInput === 'Completed') {
            addrow(documentname, statusInput, lastmodifieddate, lastmodifiedtime);
        } else {
            alert("Invalid status! Please enter one of the valid options.");
        }
    }
    fileInput.value = "";
});

function addrow(documentname, status, lastmodifieddate, lastmodifiedtime) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input class="checkboxclass" type="checkbox"></td>
        <td>${documentname}</td>
    `;

    if (status === "Needs Signing") {
        row.innerHTML += `<td><button class="button2 darkgrey">Needs Signing</button></td>`;
    } else if (status === "Pending") {
        pendingcount++;
        row.innerHTML += `
            <td>
                <div class="statusline">
                    <button class="button2 grey">Pending</button>
                    <p style="color: #b5bdcd; width:fit-content" >
                        Waiting for <em style="color: #436d7c">${pendingcount} person</em>
                    </p>
                </div>
            </td>
        `;
    } else {
        row.innerHTML += `
            <td>
                <div class="column-line">
                    <button class="button2 green">Completed</button>
                </div>
            </td>
        `;
    }

    row.innerHTML += `
        <td>
            <div class="lastmodified">
                <div>${lastmodifieddate}</div>
                <div>${lastmodifiedtime}</div>
            </div>
        </td>
    `;

    row.innerHTML += `
        <td>
            <div class="button-menu-section">
                ${status === "Needs Signing"
                    ? '<button class="button3">Sign Now</button>'
                    : status === "Pending"
                    ? '<button class="button3">Preview</button>'
                    : '<button class="button3">Download PDF</button>'}
                <figure>
                    <img src="assets/menu.svg" alt="Not Found" style="align-self: center" />
                </figure>
            </div>
        </td>
    `;

    const deleteBtn = document.createElement("td");
    deleteBtn.innerHTML = `<button class="deleterow">Delete</button>`;
    row.appendChild(deleteBtn);

    tablebody.appendChild(row);
    const rowId = rowIdCounter;
    rowIdCounter++;

    dataArray.push({ id: rowId, documentname, status, lastmodifieddate });

    deleteBtn.querySelector(".deleterow").addEventListener("click", function () {
        row.remove();
        dataArray = dataArray.filter((item) => item.id !== rowId);
        pendingcount = dataArray.filter(item => item.status === "Pending").length;
    });
}

const sidebar = document.querySelector(".section-one");
const maincontent = document.querySelector(".section-two");
const togglebutton = document.getElementById("toggle-sidebar");

togglebutton.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed"); 
});

const profileButton = document.querySelector('.profilebutton');
const profileForm = document.querySelector('.profileform');
const closeFormButton = document.querySelector('#close-form');

profileButton.addEventListener('click', () => {
  profileForm.style.display = 'block'; 
  profileButton.style.display='none';
});

closeFormButton.addEventListener('click', () => {
  profileButton.style.display='block';
  profileForm.style.display = 'none';  
});
