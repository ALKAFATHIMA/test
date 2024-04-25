let houses = []; // Array to store house data

// Function to open the "Add House" form
function openAddHouseForm() {
    document.getElementById('addHouseForm').style.display = 'block';
    clearAddHouseForm(); // Clear the form inputs
}

// Function to close the "Add House" form
function closeAddHouseForm() {
    document.getElementById('addHouseForm').style.display = 'none';
}

// Function to add a new member input in the "Add House" form
function addMemberInput() {
    const membersContainer = document.getElementById('membersContainer');

    const memberDiv = document.createElement('div');
    memberDiv.className = 'member-input'; // CSS class for styling
    
    memberDiv.innerHTML = `
        <div>
            <input type="text" class="name col4" placeholder="Name" required /> <!-- Name -->
            <span class="col4" style="padding-left: 10px; padding-right: 10px;">
                <label>Date of Birth: </label>
                <input type="date" class="dob" placeholder="Date of Birth" /> <!-- DOB -->
            </span>
            <span style="padding-left: 20px">
            <input type="text" class="qualification col4" placeholder="Qualification" /> <!-- Qualification -->
            </span>
        </div>
        <div style="margin-top: 10px;">
            <input type="text" class="occupation col4" placeholder="Occupation"> <!-- Occupation -->
            <span class="col4" style="padding-left: 10px; padding-right: 10px;">
                <label>Gender: </label>
                <select class="gender" onchange="toggleFemaleFields(this.parentNode)"> <!-- Gender -->
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </span>
            <div class="female-fields col4" style="display: none;"> <!-- Female-only fields -->
                <label><input type="checkbox" class="pregnancy"> Pregnant?</label>
            </div>
        </div>
    `;
    
    membersContainer.appendChild(memberDiv); // Add new member input
}

// Function to toggle fields for females (like pregnancy checkbox)
function toggleFemaleFields(memberDiv) {
    if ($('.gender').val() == 'female') {
        $('.female-fields').css('display', 'inline-flex'); // Show female-only fields
    } else {
        $('.female-fields').hide(); // Hide female-only fields
    }
}

// Function to save a house and its members
function saveHouse() {
    const houseNumber = document.getElementById('houseNumber').value;
    const houseAddress = document.getElementById('houseAddress').value;
    
    if (!houseNumber || !houseAddress) {
        alert("House Number and House Address are required.");
        return;
    }

    const members = [];
    
    document.querySelectorAll('.member-input').forEach(memberDiv => {
        const name = memberDiv.querySelector('.name').value;
        if (!name) {
            alert("Each member must have a name.");
            return;
        }

        const dob = memberDiv.querySelector('.dob').value;
        const qualification = memberDiv.querySelector('.qualification').value;
        const occupation = memberDiv.querySelector('.occupation').value;
        const gender = memberDiv.querySelector('.gender').value;
        const pregnant = memberDiv.querySelector('.pregnancy')?.checked || false;

        members.push({ name, dob, qualification, occupation, gender, pregnant });
    });

    const house = { houseNumber, houseAddress, members };
    houses.push(house); // Add house to the list

    displayHouses(); // Refresh the list of houses
    closeAddHouseForm(); // Close the "Add House" form
    clearAddHouseForm(); // Clear the form inputs
}

// Function to clear the "Add House" form
function clearAddHouseForm() {
    document.getElementById('houseNumber').value = '';
    document.getElementById('houseAddress').value = '';
    document.getElementById('membersContainer').innerHTML = ''; // Clear member inputs
}

// Function to display the list of houses
function displayHouses() {
    const housesList = document.getElementById('housesList');
    housesList.innerHTML = '';

    houses.forEach((house, index) => {
        const houseDiv = document.createElement('div');
        houseDiv.className = 'house-box'; // CSS class for styling
        
        houseDiv.innerHTML = `
            <div class="house-summary" onclick="showHouseDetails(${index})">
                <h3>House Number: ${house.houseNumber}</h3>
                <p>Address: ${house.houseAddress}</p>
            </div>
        `;

        housesList.appendChild(houseDiv); // Add house to the list
    });
}

// Function to show detailed information about a house in a modal
function showHouseDetails(index) {
    const selectedHouse = houses[index];
    const houseDetailsContent = document.getElementById('houseDetailsContent');

    // Create detailed content in the specified format
    houseDetailsContent.innerHTML = `
        <h2>House Number: ${selectedHouse.houseNumber}</h2>
        <p>Address: ${selectedHouse.houseAddress}</p>
        <h3>Members:</h3>
        <ul>
            ${selectedHouse.members.map(member => `
                <li>
                    Name: ${member.name}, 
                    Date of Birth: ${member.dob}, 
                    Qualification: ${member.qualification}, 
                    Occupation: ${member.occupation}, 
                    Gender: ${member.gender}
                    ${member.pregnant? ', Is Pregnant: YES': (member.gender == "female"? ', Is Pregnant: NO': '')}
                </li>
            `).join('')}
        </ul>
    `;

    document.getElementById('houseDetailsModal').style.display = 'block'; // Show the modal
}

// Function to close the house details modal
function closeHouseDetailsModal() {
    document.getElementById('houseDetailsModal').style.display = 'none';
}

// Function to filter houses based on the search input
function filterHouses() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();

    document.querySelectorAll('.house-box').forEach(houseDiv => {
        const houseSummary = houseDiv.querySelector('.house-summary');
        const houseText = houseSummary.textContent.toLowerCase();

        if (houseText.includes(searchValue)) {
            houseDiv.style.display = 'block'; // Show the house box
        } else {
            houseDiv.style.display = 'none'; // Hide the house box
        }
    });
}

displayHouses(); // Display the initial list of houses