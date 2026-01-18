'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ContactFormData } from '@/lib/types';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: '',
    instagram: '',
    followers: '',
    tiktok: '',
    youtube: '',
    location: '',
    achievements: '',
    message: '',
    submittedAt: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Log to console
    console.log('=== SPONSORSHIP INQUIRY ===');
    console.log('Name:', submissionData.name);
    console.log('Email:', submissionData.email);
    console.log('Inquiry Type:', submissionData.inquiryType);
    console.log('Instagram:', submissionData.instagram || 'Not provided');
    console.log('Followers:', submissionData.followers || 'Not provided');
    console.log('TikTok:', submissionData.tiktok || 'Not provided');
    console.log('YouTube:', submissionData.youtube || 'Not provided');
    console.log('Location:', submissionData.location || 'Not provided');
    console.log('Achievements:', submissionData.achievements || 'Not provided');
    console.log('Message:', submissionData.message);
    console.log('Submitted:', submissionData.submittedAt);
    console.log('============================');

    // Show success message
    alert(
      `Thanks ${submissionData.name}! We've received your ${submissionData.inquiryType.replace(
        '-',
        ' '
      )} inquiry and will get back to you soon. No Shade. No Mercy.`
    );

    // Reset form
    setFormData({
      name: '',
      email: '',
      inquiryType: '',
      instagram: '',
      followers: '',
      tiktok: '',
      youtube: '',
      location: '',
      achievements: '',
      message: '',
      submittedAt: '',
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="contact-page">
          <div className="container">
            <div className="contact-header">
              <h1>Get In Touch</h1>
              <p className="contact-subtitle">
                Interested in sponsorship or collaboration opportunities? We&apos;d love to hear from you.
              </p>
            </div>

            <div className="contact-content">
              <div className="contact-info">
                <h2>Contact Information</h2>
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h3>Email</h3>
                    <p>contact@solaris.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fab fa-instagram"></i>
                  <div>
                    <h3>Instagram</h3>
                    <p>@lightning_jiu_jitsu</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h3>Location</h3>
                    <p>Los Angeles, CA</p>
                  </div>
                </div>
              </div>

              <div className="contact-form-wrapper">
                <h2>Sponsorship Inquiry</h2>
                <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="athlete-sponsorship">Athlete Sponsorship</option>
                      <option value="team-sponsorship">Team Sponsorship</option>
                      <option value="event-sponsorship">Event Sponsorship</option>
                      <option value="brand-collaboration">Brand Collaboration</option>
                      <option value="media-press">Media & Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="instagram">Instagram Handle</label>
                      <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="@username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="followers">Follower Count</label>
                      <input
                        type="text"
                        id="followers"
                        name="followers"
                        value={formData.followers}
                        onChange={handleChange}
                        placeholder="e.g., 50K"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="tiktok">TikTok Handle</label>
                      <input
                        type="text"
                        id="tiktok"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleChange}
                        placeholder="@username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="youtube">YouTube Channel</label>
                      <input
                        type="text"
                        id="youtube"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        placeholder="Channel URL"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State/Country"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="achievements">Achievements / Notable Accomplishments</label>
                    <textarea
                      id="achievements"
                      name="achievements"
                      rows={3}
                      value={formData.achievements}
                      onChange={handleChange}
                      placeholder="Tell us about your achievements, titles, or notable accomplishments..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about yourself and why you'd be a great fit for Solaris..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
