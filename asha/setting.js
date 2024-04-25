document.addEventListener('DOMContentLoaded', function() {
    const profilePhotoInput = document.getElementById('profile-photo-input');
    const profilePhotoImg = document.querySelector('.profile-photo img');
    const form = document.getElementById('user-profile');
    const inputs = form.querySelectorAll('input');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');

    // Trigger photo upload when clicking on the profile photo
    profilePhotoImg.addEventListener('click', function() {
        profilePhotoInput.click(); // Simulate click on file input
    });

    // Handle file selection
    profilePhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            profilePhotoImg.src = e.target.result;
            profilePhotoImg.style.borderRadius = '50%'; // Set border radius to make it circular
            profilePhotoImg.style.width = '150px'; // Set the width of the image
            profilePhotoImg.style.height = '150px'; // Set the height of the image
            profilePhotoImg.style.objectFit = 'cover'; // Ensure the image fills the circular shape
        };

        reader.readAsDataURL(file);
        // Save form data when profile photo is changed
        saveFormData();
    });

    // Edit button click event listener
    editBtn.addEventListener('click', function() {
        enableFormEditing();
    });

    // Save Changes button click event listener
    saveBtn.addEventListener('click', function() {
        disableFormEditing();
        // Save form data
        saveFormData();
        // Optionally, display a message or perform any other action
        alert('Profile saved successfully!');
    });

    // Function to enable form editing
    function enableFormEditing() {
        inputs.forEach(input => {
            input.removeAttribute('readonly');
        });
        editBtn.disabled = true;
        saveBtn.disabled = false;
    }

    // Function to disable form editing
    function disableFormEditing() {
        inputs.forEach(input => {
            input.setAttribute('readonly', true);
        });
        editBtn.disabled = false;
        saveBtn.disabled = true;
    }

    // Function to save form data to sessionStorage
    function saveFormData() {
        const formData = {};
        inputs.forEach(input => {
            formData[input.id] = input.value;
        });
        sessionStorage.setItem('userProfileData', JSON.stringify(formData));
    }

    // Function to populate form with saved data
    function populateForm() {
        const savedProfileData = JSON.parse(sessionStorage.getItem('userProfileData'));
        if (savedProfileData) {
            for (const key in savedProfileData) {
                if (Object.hasOwnProperty.call(savedProfileData, key)) {
                    const input = form.querySelector(`#${key}`);
                    if (input) {
                        input.value = savedProfileData[key];
                    }
                }
            }
        }
        // Disable form editing initially
        disableFormEditing();
    }

    // Populate form with saved data on page load
    populateForm();
});

function goToPage(pageURL) {
    window.location.href = pageURL;
  }
  