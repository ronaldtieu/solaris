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

            // Log to console
            console.log('=== SPONSORSHIP INQUIRY ===');
            console.log('Name:', formData.name);
            console.log('Email:', formData.email);
            console.log('Inquiry Type:', formData.inquiryType);
            console.log('Instagram:', formData.instagram || 'Not provided');
            console.log('Followers:', formData.followers || 'Not provided');
            console.log('TikTok:', formData.tiktok || 'Not provided');
            console.log('YouTube:', formData.youtube || 'Not provided');
            console.log('Location:', formData.location || 'Not provided');
            console.log('Achievements:', formData.achievements || 'Not provided');
            console.log('Message:', formData.message);
            console.log('Submitted:', formData.submittedAt);
            console.log('============================');

            // Show success message
            alert(`Thanks ${formData.name}! We've received your ${formData.inquiryType.replace('-', ' ')} inquiry and will get back to you soon. No Shade. No Mercy.`);

            // Reset form
            contactForm.reset();
        });
    }
});
