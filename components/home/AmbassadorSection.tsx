'use client';

import { useEffect } from 'react';
import { Fighter } from '@/lib/types';

interface AmbassadorSectionProps {
  fighters: Fighter[];
}

export default function AmbassadorSection({ fighters }: AmbassadorSectionProps) {
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

    // Observe fighter cards
    const fighterCards = document.querySelectorAll('.fighter-card');
    fighterCards.forEach(card => {
      const cardEl = card as HTMLElement;
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateY(30px)';
      cardEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(cardEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [fighters]);

  return (
    <section className="ambassadors" id="ambassadors">
      <div className="container">
        <h2 className="section-title">Our Ambassadors</h2>

        <div className="fighters-grid">
          {fighters.map((fighter, index) => (
            <div key={index} className="fighter-card">
              <div className="fighter-image">
                <img src={fighter.image} alt={fighter.name} />
                {fighter.badge && (
                  <div className={`fighter-badge ${fighter.badge === 'Rising Star' ? 'hot' : ''}`}>
                    {fighter.badge}
                  </div>
                )}
                <div className="fighter-overlay">
                  <div className="fighter-stats">
                    <span className="stat">Record: {fighter.record}</span>
                    <span className="stat">Weight: {fighter.weight}</span>
                  </div>
                </div>
              </div>
              <div className="fighter-info">
                <h3 className="fighter-name">{fighter.name}</h3>
                <p className="fighter-discipline">{fighter.discipline}</p>
                <p className="fighter-bio">{fighter.bio}</p>
                <div className="fighter-social">
                  {fighter.social?.instagram && (
                    <a href={fighter.social.instagram}>
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {fighter.social?.twitter && (
                    <a href={fighter.social.twitter}>
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
