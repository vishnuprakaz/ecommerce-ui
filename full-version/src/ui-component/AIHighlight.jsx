import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useAIHighlight, HIGHLIGHT_STYLES, HIGHLIGHT_TYPES } from '../contexts/AIHighlightContext';

// Animation keyframes
const gradientGlowAnimation = keyframes`
  0% { 
    filter: drop-shadow(0 0 8px rgba(103, 58, 183, 0.6));
  }
  25% { 
    filter: drop-shadow(0 0 12px rgba(63, 81, 181, 0.7));
  }
  50% { 
    filter: drop-shadow(0 0 16px rgba(33, 150, 243, 0.8));
  }
  75% { 
    filter: drop-shadow(0 0 12px rgba(63, 81, 181, 0.7));
  }
  100% { 
    filter: drop-shadow(0 0 8px rgba(103, 58, 183, 0.6));
  }
`;

const rainbowBorderAnimation = keyframes`
  0% { border-image: linear-gradient(45deg, #673ab7, #3f51b5, #2196f3, #00bcd4) 1; }
  25% { border-image: linear-gradient(45deg, #3f51b5, #2196f3, #00bcd4, #673ab7) 1; }
  50% { border-image: linear-gradient(45deg, #2196f3, #00bcd4, #673ab7, #3f51b5) 1; }
  75% { border-image: linear-gradient(45deg, #00bcd4, #673ab7, #3f51b5, #2196f3) 1; }
  100% { border-image: linear-gradient(45deg, #673ab7, #3f51b5, #2196f3, #00bcd4) 1; }
`;

const pulseGradientAnimation = keyframes`
  0% { 
    transform: scale(1);
    background: linear-gradient(45deg, rgba(103, 58, 183, 0.1), rgba(63, 81, 181, 0.1), rgba(33, 150, 243, 0.1));
  }
  50% { 
    transform: scale(1.05);
    background: linear-gradient(45deg, rgba(33, 150, 243, 0.15), rgba(103, 58, 183, 0.15), rgba(63, 81, 181, 0.15));
  }
  100% { 
    transform: scale(1);
    background: linear-gradient(45deg, rgba(103, 58, 183, 0.1), rgba(63, 81, 181, 0.1), rgba(33, 150, 243, 0.1));
  }
`;

const breathingAnimation = keyframes`
  0% { 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.02);
    filter: brightness(1.05);
  }
  100% { 
    transform: scale(1);
    filter: brightness(1);
  }
`;

const bounceGradientAnimation = keyframes`
  0%, 20%, 53%, 80%, 100% { 
    transform: translateY(0);
    filter: hue-rotate(0deg);
  }
  40%, 43% { 
    transform: translateY(-8px);
    filter: hue-rotate(45deg);
  }
  70% { 
    transform: translateY(-4px);
    filter: hue-rotate(90deg);
  }
  90% { 
    transform: translateY(-2px);
    filter: hue-rotate(180deg);
  }
`;

const spotlightGradientAnimation = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(0.8);
    background: radial-gradient(circle, rgba(103, 58, 183, 0.2), rgba(63, 81, 181, 0.1), transparent 70%);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.1);
    background: radial-gradient(circle, rgba(33, 150, 243, 0.3), rgba(103, 58, 183, 0.2), transparent 70%);
  }
  100% { 
    opacity: 0.8; 
    transform: scale(1);
    background: radial-gradient(circle, rgba(63, 81, 181, 0.25), rgba(33, 150, 243, 0.15), transparent 70%);
  }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(1deg); }
  50% { transform: translateY(-6px) rotate(0deg); }
  75% { transform: translateY(-3px) rotate(-1deg); }
`;

// Styled highlight container
const HighlightContainer = styled(Box)(({ theme, highlight }) => {
  const intensity = highlight.intensity || 'medium';
  
  const intensityMap = {
    low: '0.5',
    medium: '0.8', 
    high: '1.0'
  };

  const styles = {
    position: 'relative',
    borderRadius: 'inherit',
    animation: `${breathingAnimation} 3s ease-in-out infinite`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -6,
      left: -6,
      right: -6,
      bottom: -6,
      borderRadius: 'inherit',
      opacity: intensityMap[intensity],
      pointerEvents: 'none',
      zIndex: 1
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -12,
      left: -12,
      right: -12,
      bottom: -12,
      borderRadius: 'inherit',
      opacity: intensityMap[intensity] * 0.6,
      pointerEvents: 'none',
      zIndex: 0
    }
  };

  // Apply different gradient animations based on style
  switch (highlight.style) {
    case HIGHLIGHT_STYLES.GLOW:
      styles['&::before'].background = `
        linear-gradient(white, white) padding-box,
        linear-gradient(45deg, #673ab7, #3f51b5, #2196f3, #673ab7) border-box
      `;
      styles['&::before'].border = '6px solid transparent';
      styles['&::before'].animation = `${rainbowBorderAnimation} 3s linear infinite, ${pulseGradientAnimation} 2s ease-in-out infinite`;
      styles['&::after'].boxShadow = '0 0 40px rgba(103, 58, 183, 0.5), 0 0 80px rgba(63, 81, 181, 0.3), 0 0 120px rgba(33, 150, 243, 0.2)';
      styles['&::after'].animation = `${gradientGlowAnimation} 3s ease-in-out infinite`;
      break;
      
    case HIGHLIGHT_STYLES.PULSE:
      styles.animation = `${pulseGradientAnimation} 2s ease-in-out infinite`;
      styles['&::before'].border = '3px solid transparent';
      styles['&::before'].background = `
        linear-gradient(white, white) padding-box,
        linear-gradient(45deg, #673ab7, #3f51b5, #2196f3, #00bcd4) border-box
      `;
      styles['&::before'].animation = `${rainbowBorderAnimation} 2s linear infinite`;
      break;
      
    case HIGHLIGHT_STYLES.BOUNCE:
      styles.animation = `${bounceGradientAnimation} 2s infinite`;
      styles['&::before'].border = '2px dashed transparent';
      styles['&::before'].background = `
        linear-gradient(white, white) padding-box,
        linear-gradient(45deg, #673ab7, #3f51b5, #2196f3, #673ab7) border-box
      `;
      styles['&::before'].animation = `${rainbowBorderAnimation} 1.5s linear infinite`;
      break;
      
    case HIGHLIGHT_STYLES.SPOTLIGHT:
      styles['&::before'].animation = `${spotlightGradientAnimation} 4s ease-in-out infinite`;
      styles['&::after'].background = 'radial-gradient(circle, rgba(103, 58, 183, 0.3), rgba(63, 81, 181, 0.2), transparent 70%)';
      styles['&::after'].animation = `${spotlightGradientAnimation} 4s ease-in-out infinite reverse`;
      break;
      
    default:
      styles['&::before'].background = `
        linear-gradient(white, white) padding-box,
        linear-gradient(45deg, #673ab7, #3f51b5, #2196f3, #673ab7) border-box
      `;
      styles['&::before'].border = '6px solid transparent';
      styles['&::before'].animation = `${rainbowBorderAnimation} 3s linear infinite, ${pulseGradientAnimation} 2s ease-in-out infinite`;
      styles['&::after'].boxShadow = '0 0 40px rgba(103, 58, 183, 0.5), 0 0 80px rgba(63, 81, 181, 0.3), 0 0 120px rgba(33, 150, 243, 0.2)';
      styles['&::after'].animation = `${gradientGlowAnimation} 3s ease-in-out infinite`;
  }

  return styles;
});

// Message overlay component
const HighlightMessage = styled(Box)(({ theme, highlight }) => ({
  position: 'absolute',
  top: -50,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  whiteSpace: 'nowrap',
  pointerEvents: 'none'
}));

// Main highlight wrapper component
const AIHighlightWrapper = ({ children, elementId, className, ...props }) => {
  const { getElementHighlights } = useAIHighlight();
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const elementHighlights = getElementHighlights(elementId);
    setHighlights(elementHighlights);
  }, [elementId, getElementHighlights]);

  if (highlights.length === 0) {
    return (
      <Box className={className} data-highlight-id={elementId} {...props}>
        {children}
      </Box>
    );
  }

  // Use the most recent highlight for styling
  const activeHighlight = highlights[highlights.length - 1];

  return (
    <HighlightContainer 
      className={className} 
      highlight={activeHighlight}
      data-highlight-id={elementId}
      {...props}
    >
      {activeHighlight.message && (
        <Fade in={true} timeout={500}>
          <HighlightMessage highlight={activeHighlight}>
            <Chip
              label={activeHighlight.message}
              size="medium"
              sx={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'white',
                background: 'linear-gradient(45deg, #673ab7, #3f51b5, #2196f3)',
                backgroundSize: '200% 200%',
                animation: `${rainbowBorderAnimation} 3s linear infinite, ${pulseGradientAnimation} 2s ease-in-out infinite, ${floatingAnimation} 3s ease-in-out infinite`,
                boxShadow: '0 6px 20px rgba(103, 58, 183, 0.6), 0 4px 12px rgba(33, 150, 243, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                px: 2,
                py: 0.5,
                '& .MuiChip-label': {
                  color: 'white',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  px: 1
                }
              }}
            />
          </HighlightMessage>
        </Fade>
      )}
      {children}
    </HighlightContainer>
  );
};

// Hook to easily wrap any component with highlighting
export const useHighlightWrapper = (elementId) => {
  const { getElementHighlights } = useAIHighlight();
  
  return {
    isHighlighted: getElementHighlights(elementId).length > 0,
    HighlightWrapper: ({ children, ...props }) => (
      <AIHighlightWrapper elementId={elementId} {...props}>
        {children}
      </AIHighlightWrapper>
    )
  };
};

export default AIHighlightWrapper; 