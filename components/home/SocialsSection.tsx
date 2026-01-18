'use client';

import { useEffect } from 'react';
import { InstagramPost } from '@/lib/types';

interface SocialsSectionProps {
  posts: InstagramPost[];
}

export default function SocialsSection({ posts }: SocialsSectionProps) {
  useEffect(() => {
    // Set up scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe instagram posts
    const instagramPosts = document.querySelectorAll('.instagram-post');
    instagramPosts.forEach(post => {
      const postEl = post as HTMLElement;
      postEl.style.opacity = '0';
      postEl.style.transform = 'translateY(30px)';
      postEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(postEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [posts]);

  return (
    <section className="socials" id="socials">
      <div className="container">
        <h2 className="section-title">Follow Us</h2>

        <div className="instagram-header">
          <a
            href="https://www.instagram.com/lightning_jiu_jitsu/"
            target="_blank"
            rel="noopener"
            className="instagram-profile-link"
          >
            <i className="fab fa-instagram"></i>
            <span className="instagram-handle">@lightning_jiu_jitsu</span>
          </a>
          <p className="instagram-subtitle">Join our community on Instagram</p>
        </div>

        <div className="instagram-grid">
          {posts.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/lightning_jiu_jitsu/"
              target="_blank"
              rel="noopener"
              className="instagram-post"
            >
              <div className="post-image">
                <img src={post.image} alt={`Instagram post ${index + 1}`} />
                <div className="post-overlay">
                  <div className="post-stats">
                    <span>
                      <i className="fas fa-heart"></i> {post.likes}
                    </span>
                    <span>
                      <i className="fas fa-comment"></i> {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="instagram-cta">
          <a
            href="https://www.instagram.com/lightning_jiu_jitsu/"
            target="_blank"
            rel="noopener"
            className="btn-instagram"
          >
            <i className="fab fa-instagram"></i>
            Follow @lightning_jiu_jitsu
          </a>
        </div>
      </div>
    </section>
  );
}
