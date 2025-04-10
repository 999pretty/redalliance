import React, { useEffect, useState } from 'react';
import { poppins } from '@/app/fonts';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          className={`scroll_up my_totop ${poppins.className}`}
          data-aos="fade-left"
          data-aos-duration="1200"
          aria-label="Scroll to top of page"
          style={{
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
            padding: 0,
            background: 'transparent',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px #8B0000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span className="beny_tm_totop" aria-hidden="true"></span>
        </button>
      )}
    </>
  );
}
