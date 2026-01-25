'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0a0e27 0%, #151932 100%)',
            padding: '8rem 0 6rem',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div className="container">
            <div
              style={{
                maxWidth: '900px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '2rem',
                  lineHeight: 1.2,
                }}
              >
                About Solaris
              </h1>
              <blockquote
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  lineHeight: 1.6,
                  color: '#ffffff',
                  fontStyle: 'italic',
                  position: 'relative',
                  padding: '0 2rem',
                }}
              >
                <span
                  style={{
                    fontSize: '4rem',
                    color: '#f59e0b',
                    opacity: 0.5,
                    fontFamily: 'serif',
                  }}
                >
                  "
                </span>
                Solaris serves as an ideal where community members can be given a platform and unite, showcase their passions, and have their spot in the light.
                <span
                  style={{
                    fontSize: '4rem',
                    color: '#f59e0b',
                    opacity: 0.5,
                    fontFamily: 'serif',
                  }}
                >
                  "
                </span>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section
          style={{
            padding: '6rem 0',
            position: 'relative',
          }}
        >
          <div className="container">
            <div
              style={{
                background: 'rgba(26, 31, 58, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '3rem',
                maxWidth: '1000px',
                margin: '0 auto',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                Our Mission
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
                  lineHeight: 1.8,
                  fontWeight: 700,
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}
              >
                At Solaris, we believe everyone deserves a platform to shine. We're building a community where passion meets purpose, where individuals can come together to showcase what makes them unique. Our goal is to create an inclusive space that celebrates diversity, creativity, and the power of unity.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section
          style={{
            padding: '6rem 0',
            position: 'relative',
          }}
        >
          <div className="container">
            <h2
              className="section-title"
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 900,
                textAlign: 'center',
                marginBottom: '4rem',
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Core Values
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
              {/* Value 1: Community First */}
              <div
                style={{
                  background: 'rgba(26, 31, 58, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    borderRadius: '16px',
                    marginBottom: '1.5rem',
                    fontSize: '1.75rem',
                  }}
                >
                  🤝
                </div>
                <h3
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(1.75rem, 4vw, 2rem)',
                    fontWeight: 900,
                    color: '#f59e0b',
                    marginBottom: '1rem',
                  }}
                >
                  Community First
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                    lineHeight: 1.7,
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  Our community is the heart of everything we do. We prioritize connection, support, and mutual growth among all members.
                </p>
              </div>

              {/* Value 2: Passion & Purpose */}
              <div
                style={{
                  background: 'rgba(26, 31, 58, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    borderRadius: '16px',
                    marginBottom: '1.5rem',
                    fontSize: '1.75rem',
                  }}
                >
                  🔥
                </div>
                <h3
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(1.75rem, 4vw, 2rem)',
                    fontWeight: 900,
                    color: '#f59e0b',
                    marginBottom: '1rem',
                  }}
                >
                  Passion & Purpose
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                    lineHeight: 1.7,
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  We celebrate what drives each individual. Your passion is your power, and we're here to help you channel it into something meaningful.
                </p>
              </div>

              {/* Value 3: Shine Together */}
              <div
                style={{
                  background: 'rgba(26, 31, 58, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    borderRadius: '16px',
                    marginBottom: '1.5rem',
                    fontSize: '1.75rem',
                  }}
                >
                  ✨
                </div>
                <h3
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(1.75rem, 4vw, 2rem)',
                    fontWeight: 900,
                    color: '#f59e0b',
                    marginBottom: '1rem',
                  }}
                >
                  Shine Together
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                    lineHeight: 1.7,
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  Individual success is celebrated, but collective achievement is magnified. We lift each other up and shine brighter together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Community Section */}
        <section
          style={{
            padding: '6rem 0',
            position: 'relative',
          }}
        >
          <div className="container">
            <div
              style={{
                background: 'rgba(26, 31, 58, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '3rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                  }}
                >
                  The Community
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#ffffff',
                    marginBottom: '1.5rem',
                  }}
                >
                  Solaris is more than a platform, it's a movement. We provide a space where community members can unite, share their stories, and showcase their talents to the world.
                </p>
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: '#ffffff',
                  }}
                >
                  From fighters to artists, innovators to dreamers, everyone has a place here. Together, we're creating something bigger than ourselves.
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '8rem',
                  filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.3))',
                }}
              >
                ☀️
              </div>
            </div>
          </div>
        </section>

        {/* Join the Movement Section */}
        <section
          style={{
            padding: '6rem 0',
            position: 'relative',
          }}
        >
          <div className="container">
            <div
              style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                }}
              >
                Join the Movement
              </h2>
              <p
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 1.8,
                  color: '#94a3b8',
                }}
              >
                Be part of something extraordinary. Your journey with Solaris starts here.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
