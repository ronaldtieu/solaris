/**
 * Contact Page - Form Handling
 * No Shade. No Mercy.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                inquiryType: document.getElementById('inquiryType').value,
                instagram: document.getElementById('instagram').value,
                followers: document.getElementById('followers').value,
                tiktok: document.getElementById('tiktok').value,
                youtube: document.getElementById('youtube').value,
                location: document.getElementById('location').value,
                achievements: document.getElementById('achievements').value,
                message: document.getElementById('message').value,
                submittedAt: new Date().toISOString()
            };

            // Show success message
            alert(`Thanks ${formData.name}! We've received your ${formData.inquiryType.replace('-', ' ')} inquiry and will get back to you soon. No Shade. No Mercy.`);

            // Reset form
            contactForm.reset();
        });
    }
});
