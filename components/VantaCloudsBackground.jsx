
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

const VantaCloudsBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      // Get current hour
      const hour = new Date().getHours();
      console.log('VantaCloudsBackground - current hour:', hour);

      // Define sky colors for different times of day
      let skyColor;
      let cloudColor;
      if (hour >= 6 && hour < 12)
         {
        
        skyColor = 0xa3dfe3; 
        cloudColor = 0xfcf8ff; 
        
       } else if (hour >= 12 && hour < 18) {
       
        skyColor = 0x87ceeb; 
        cloudColor = 0xf0f8ff; 
      } else if (hour >= 18 && hour < 20) {
        skyColor = 0x3f595e; 
        cloudColor = 0x95a7c2; 
      } else {
        
        skyColor = 0x1; 
        cloudColor = 0x95a9c2; 
      }
      console.log('VantaCloudsBackground - skyColor:', skyColor);
      console.log('VantaCloudsBackground - cloudColor:', cloudColor);

      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        skyColor: skyColor,
        cloudColor: cloudColor,
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default VantaCloudsBackground;
