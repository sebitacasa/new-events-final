import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from './Styles';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible); // Cleanup para evitar leaks
    };
  }, []);

  return (
    <Button>
      <FaArrowUp
        onClick={scrollToTop}
        style={{
          display: visible ? 'inline' : 'none',
          color: '#f0ad4e',
          cursor: 'pointer',
        }}
      />
    </Button>
  );
};

export default ScrollButton;