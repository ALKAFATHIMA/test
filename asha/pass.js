document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("change-password-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        if (newPassword === confirmPassword) {
            // Make AJAX request to update password
            // Implement the logic to update password in the backend (Django)
            alert("Password updated successfully!");
            form.reset();
        } else {
            alert("Passwords do not match. Please try again.");
        }
    });
});
