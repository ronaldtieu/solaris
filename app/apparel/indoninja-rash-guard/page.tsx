'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProductImageUrl } from '@/lib/supabase/client-storage';

type SizeVariant = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
type ColorVariant = 'black' | 'white';

interface VariantSelection {
  color: ColorVariant;
  size: SizeVariant;
}

interface ProductInterestFormData {
  fullName: string;
  email: string;
  selectedColor: ColorVariant;
  selectedSize: SizeVariant;
}

interface ColorOption {
  value: ColorVariant;
  label: string;
  hexColor: string;
  thumbnail: string;
}

const product = {
  name: 'Indoninja Rash Guard',
  price: 59.99,
  description: 'Engineered for the warrior, Bial. The Indoninja Rash Guard combines cutting-edge performance technology with bold aesthetic design. Built to withstand the rigors of intense training while keeping you cool and comfortable.',
  features: [
    'Compression-fit fabric for muscle support and recovery',
    'Moisture-wicking technology keeps you dry',
    '4-way stretch for unrestricted movement',
    'Reinforced stitching for enhanced durability',
    'UPF 50+ protection for outdoor training',
    'Sublimated graphics that won\'t crack or peel',
  ],

  // Color options with thumbnails
  colors: [
    {
      value: 'black' as ColorVariant,
      label: 'Black Edition',
      hexColor: '#1a1a2e',
      thumbnail: 'indoninja-gear-1-p.jpeg',
    },
    {
      value: 'white' as ColorVariant,
      label: 'White Edition',
      hexColor: '#f8fafc',
      thumbnail: 'indoninja-gear-2-p.jpeg',
    },
  ],

  // Available sizes
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as SizeVariant[],

  // Image galleries by color (main image is first, followed by additional views)
  images: {
    black: ['indoninja-gear-1.jpeg', 'indoninja-gear-1-p.jpeg'],
    white: ['indoninja-gear-2.jpeg', 'indoninja-gear-2-p.jpeg'],
  },
};

export default function IndoninjaRashGuardPage() {
  const [selectedVariant, setSelectedVariant] = useState<VariantSelection>({
    color: 'black',
    size: 'M', // Default to medium
  });

  // Track current image index for each color
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<ColorVariant, number>>({
    black: 0,
    white: 0,
  });

  const [formData, setFormData] = useState<ProductInterestFormData>({
    fullName: '',
    email: '',
    selectedColor: 'black',
    selectedSize: 'M',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleVariantChange = (newVariant: VariantSelection) => {
    setSelectedVariant(newVariant);

    // Update form data
    setFormData(prev => ({
      ...prev,
      selectedColor: newVariant.color,
      selectedSize: newVariant.size,
    }));
  };

  const handleNextImage = () => {
    const images = product.images[selectedVariant.color];
    const currentIndex = currentImageIndex[selectedVariant.color];
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImageIndex(prev => ({
      ...prev,
      [selectedVariant.color]: nextIndex,
    }));
  };

  const handlePrevImage = () => {
    const images = product.images[selectedVariant.color];
    const currentIndex = currentImageIndex[selectedVariant.color];
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentImageIndex(prev => ({
      ...prev,
      [selectedVariant.color]: prevIndex,
    }));
  };

  const getCurrentImage = () => {
    return product.images[selectedVariant.color][currentImageIndex[selectedVariant.color]];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/stock-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productSlug: 'indoninja-rash-guard',
          color: selectedVariant.color,
          size: selectedVariant.size,
          email: formData.email,
          name: formData.fullName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit notification request');
      }

      // Show success message
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          selectedColor: selectedVariant.color,
          selectedSize: selectedVariant.size,
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBlack = selectedVariant.color === 'black';

  // Inline styles for variant selector
  const variantSelectorStyle = {
    background: 'var(--bg-card)',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '2rem',
    marginBottom: '2rem',
  };

  const variantSectionStyle = {
    marginBottom: '2rem',
  };

  const variantHeaderStyle = {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const variantTitleStyle = {
    fontFamily: 'Orbitron, monospace',
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-white)',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  };

  const selectedValueStyle = {
    color: 'var(--accent)',
    fontWeight: '600',
  };

  // Color swatch styles
  const colorSwatchStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '3px solid',
    cursor: 'pointer' as const,
    transition: 'all 0.3s ease',
    position: 'relative' as const,
  };

  const colorSwatchSelected = {
    ...colorSwatchStyle,
    boxShadow: '0 0 0 3px var(--accent), 0 4px 12px rgba(245, 158, 11, 0.4)',
    transform: 'scale(1.1)',
  };

  const checkmarkStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'var(--text-white)',
    fontSize: '1.2rem',
    fontWeight: '700',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  };

  // Size grid styles
  const sizeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '0.10rem',
    maxWidth: '320px',
  };

  const sizeButtonStyle = {
    aspectRatio: '1',
    maxWidth: '47px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid var(--border-color)',
    borderRadius: '10px',
    background: 'var(--input-bg)',
    color: 'var(--text-gray)',
    fontWeight: '700',
    fontSize: '0.8rem',
    cursor: 'pointer' as const,
    transition: 'all 0.3s ease',
  };

  const sizeButtonSelected = {
    ...sizeButtonStyle,
    background: 'linear-gradient(135deg, var(--accent) 0%, #ef4444 100%)',
    border: 'none',
    color: 'var(--text-white)',
    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
  };

  // Thumbnail gallery styles
  const thumbnailGalleryStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    justifyContent: 'center',
  };

  const thumbnailStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    overflow: 'hidden' as const,
    border: '2px solid transparent',
    cursor: 'pointer' as const,
    transition: 'all 0.3s ease',
    background: 'var(--bg-card)',
  };

  const thumbnailSelected = {
    ...thumbnailStyle,
    borderColor: 'var(--accent)',
    boxShadow: '0 0 0 3px rgba(245, 158, 11, 0.3)',
  };

  const thumbnailImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  };

  // Responsive design - detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Responsive variant selector styles
  const responsiveSizeGridStyle = isMobile ? {
    ...sizeGridStyle,
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.4rem',
  } : sizeGridStyle;

  return (
    <>
      <Navbar />
      <main>
        <section style={{
          padding: '8rem 0 6rem',
          minHeight: '100vh',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'start',
            }}>
              {/* Product Image Section */}
              <div>
                <div style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: isBlack
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  aspectRatio: '1',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all 0.5s ease',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, var(--accent) 0%, #ef4444 100%)',
                    color: 'var(--text-white)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderRadius: '20px',
                    zIndex: '5',
                  }}>
                    New Release
                  </div>

                  {/* Image Navigation Buttons */}
                  <button
                    onClick={handlePrevImage}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-white)',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      zIndex: '10',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 158, 11, 0.8)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ‹
                  </button>

                  <button
                    onClick={handleNextImage}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-white)',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      zIndex: '10',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(245, 158, 11, 0.8)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    ›
                  </button>

                  {/* Image indicator dots */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem',
                    zIndex: '10',
                  }}>
                    {product.images[selectedVariant.color].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(prev => ({ ...prev, [selectedVariant.color]: index }))}
                        style={{
                          width: currentImageIndex[selectedVariant.color] === index ? '24px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          background: currentImageIndex[selectedVariant.color] === index
                            ? 'var(--accent)'
                            : 'rgba(255, 255, 255, 0.5)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  <img
                    src={getProductImageUrl(getCurrentImage())}
                    alt={`${product.name} - ${selectedVariant.color} edition`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isBlack ? 'brightness(0.8) contrast(1.2)' : 'none',
                      transition: 'filter 0.5s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '2rem 1.5rem 1.5rem',
                    background: isBlack
                      ? 'linear-gradient(to top, rgba(10, 14, 39, 0.95) 0%, rgba(10, 14, 39, 0.6) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.5) 50%, transparent 100%)',
                  }}>
                    <p style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'var(--text-white)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                    }}>
                      {isBlack ? 'Black Edition' : 'White Edition'}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div style={thumbnailGalleryStyle}>
                  {product.colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => handleVariantChange({ ...selectedVariant, color: color.value })}
                      style={selectedVariant.color === color.value ? thumbnailSelected : thumbnailStyle}
                      onMouseEnter={(e) => {
                        if (selectedVariant.color !== color.value) {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedVariant.color !== color.value) {
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <img
                        src={getProductImageUrl(color.thumbnail)}
                        alt={color.label}
                        style={thumbnailImageStyle}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info & Interest Form Section */}
              <div>
                {/* Product Title & Price */}
                <div style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  marginBottom: '2rem',
                }}>
                  <h1 style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, var(--accent) 0%, #ef4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                  }}>
                    {product.name}
                  </h1>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--accent) 0%, #ef4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                  }}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Variant Selector */}
                <div style={variantSelectorStyle}>
                  {/* Color Selector */}
                  <div style={variantSectionStyle}>
                    <div style={variantHeaderStyle}>
                      <h3 style={variantTitleStyle}>
                        Color:{' '}
                        <span style={selectedValueStyle}>
                          {product.colors.find(c => c.value === selectedVariant.color)?.label}
                        </span>
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      {product.colors.map(color => (
                        <button
                          key={color.value}
                          onClick={() => handleVariantChange({ ...selectedVariant, color: color.value })}
                          style={
                            selectedVariant.color === color.value
                              ? { ...colorSwatchSelected, backgroundColor: color.hexColor, borderColor: color.hexColor }
                              : { ...colorSwatchStyle, backgroundColor: color.hexColor, borderColor: color.hexColor }
                          }
                          aria-label={color.label}
                          onMouseEnter={(e) => {
                            if (selectedVariant.color !== color.value) {
                              e.currentTarget.style.transform = 'scale(1.15)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedVariant.color !== color.value) {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }
                          }}
                        >
                          {selectedVariant.color === color.value && <span style={checkmarkStyle}>✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div style={variantSectionStyle}>
                    <div style={variantHeaderStyle}>
                      <h3 style={variantTitleStyle}>
                        Size:{' '}
                        <span style={selectedValueStyle}>{selectedVariant.size}</span>
                      </h3>
                    </div>
                    <div style={responsiveSizeGridStyle}>
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => handleVariantChange({ ...selectedVariant, size })}
                          style={selectedVariant.size === size ? sizeButtonSelected : sizeButtonStyle}
                          onMouseEnter={(e) => {
                            if (selectedVariant.size !== size) {
                              e.currentTarget.style.borderColor = 'var(--accent)';
                              e.currentTarget.style.color = 'var(--accent)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedVariant.size !== size) {
                              e.currentTarget.style.borderColor = 'var(--border-color)';
                              e.currentTarget.style.color = 'var(--text-gray)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Description - Collapsible */}
                <div style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  marginBottom: '2rem',
                  overflow: 'hidden',
                }}>
                  <button
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    style={{
                      width: '100%',
                      padding: '2rem 2.5rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--text-white)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      margin: 0,
                    }}>
                      Product Description
                    </h3>
                    <i
                      className="fas fa-chevron-down"
                      style={{
                        color: 'var(--accent)',
                        fontSize: '1rem',
                        transition: 'transform 0.3s ease',
                        transform: isDescriptionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>

                  {isDescriptionOpen && (
                    <div style={{
                      padding: '0 2.5rem 2.5rem',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '2rem',
                    }}>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        color: 'var(--text-gray)',
                        marginBottom: '2rem',
                      }}>
                        {product.description}
                      </p>

                      <h3 style={{
                        fontFamily: 'Orbitron, monospace',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--text-white)',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}>
                        Features
                      </h3>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                      }}>
                        {product.features.map((feature, index) => (
                          <li
                            key={index}
                            style={{
                              padding: '0.75rem 0',
                              borderBottom: index !== product.features.length - 1 ? '1px solid var(--border-color)' : 'none',
                              color: 'var(--text-gray)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                            }}
                          >
                            <i
                              className="fas fa-check"
                              style={{
                                color: 'var(--accent)',
                                fontSize: '0.85rem',
                              }}
                            ></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Interest Form */}
                <div style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                }}>
                  <h2 style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-white)',
                    marginBottom: '0.5rem',
                  }}>
                    Get Notified
                  </h2>
                  <p style={{
                    color: 'var(--text-gray)',
                    fontSize: '0.95rem',
                    marginBottom: '2rem',
                  }}>
                    Be the first to know when {product.name} is available
                  </p>

                  {isSubmitted ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '2rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '12px',
                    }}>
                      <i
                        className="fas fa-check-circle"
                        style={{
                          fontSize: '3rem',
                          color: '#10b981',
                          marginBottom: '1rem',
                        }}
                      ></i>
                      <p style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--text-white)',
                        marginBottom: '0.5rem',
                      }}>
                        You're on the list!
                      </p>
                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-gray)',
                      }}>
                        We'll notify you when {product.name} ({selectedVariant.color} / {selectedVariant.size}) is available.
                      </p>
                    </div>
                  ) : (
                    <>
                      {submitError && (
                        <div style={{
                          padding: '1rem',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '12px',
                          marginBottom: '1.5rem',
                        }}>
                          <p style={{
                            fontSize: '0.9rem',
                            color: '#ef4444',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}>
                            <i className="fas fa-exclamation-circle"></i>
                            {submitError}
                          </p>
                        </div>
                      )}
                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="fullName" style={{
                          fontWeight: '600',
                          color: 'var(--text-white)',
                          fontSize: '0.9rem',
                        }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          style={{
                            padding: '1rem 1.25rem',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            color: 'var(--text-white)',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            transition: 'var(--transition)',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{
                          fontWeight: '600',
                          color: 'var(--text-white)',
                          fontSize: '0.9rem',
                        }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          style={{
                            padding: '1rem 1.25rem',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            color: 'var(--text-white)',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            transition: 'var(--transition)',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <div style={{
                        padding: '1rem',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}>
                        <i
                          className="fas fa-tshirt"
                          style={{
                            color: 'var(--accent)',
                            fontSize: '1rem',
                          }}
                        ></i>
                        <span style={{
                          color: 'var(--text-gray)',
                          fontSize: '0.95rem',
                        }}>
                          Selected:{' '}
                          <span style={{
                            color: 'var(--text-white)',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}>
                            {product.name} - {selectedVariant.color} / {selectedVariant.size}
                          </span>
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          padding: '1.25rem 2.5rem',
                          background: 'linear-gradient(135deg, var(--accent) 0%, #ef4444 100%)',
                          color: 'var(--text-white)',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '700',
                          fontSize: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'var(--transition)',
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.5)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Notify Me When Available'}
                      </button>
                    </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
