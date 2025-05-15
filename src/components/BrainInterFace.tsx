import React, { useEffect, useRef } from 'react';
import styled, { keyframes,css } from 'styled-components';

const rainbow = keyframes`
  0% { border-color: hsl(0, 100%, 50%); }
  14% { border-color: hsl(30, 100%, 50%); }
  28% { border-color: hsl(60, 100%, 50%); }
  42% { border-color: hsl(120, 100%, 50%); }
  57% { border-color: hsl(180, 100%, 50%); }
  71% { border-color: hsl(240, 100%, 50%); }
  85% { border-color: hsl(270, 100%, 50%); }
  100% { border-color: hsl(360, 100%, 50%); }
`;
type RainbowOverlayProps = {
    $active: boolean;
  };
  const RainbowOverlay = styled.div<RainbowOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border: 15px solid hsl(0, 100%, 50%); /* Initial color */
  z-index: 9999;
  opacity: ${props => props.$active ? 0.7 : 0};
  transition: opacity 0.3s ease;
  
  ${props => props.$active && css`
    animation: ${rainbow} 2s linear infinite;
    -webkit-animation: ${rainbow} 2s linear infinite;
  `}

`;


type BrainInterfaceDialogProps = {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
}
const BrainInterface:React.FC<BrainInterfaceDialogProps> = ({ isActive, setIsActive }) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (isActive) {
        // Auto-disable after 5 seconds (optional)
        timeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 5000);
      }
  
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [isActive, setIsActive]);
  
    return <RainbowOverlay $active={isActive} />;
};

export default BrainInterface;