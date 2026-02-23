import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <g fill="currentColor">
      {/* Cell/Square */}
      <rect x="20" y="40" width="60" height="50" rx="5" ry="5" fillOpacity="0.9" />
      
      {/* Academic Cap Top */}
      <path d="M5,25 L50,10 L95,25 L50,40 Z" />
      
      {/* Cap Tassel */}
      <line x1="75" y1="22" x2="75" y2="45" stroke="currentColor" strokeWidth="2" />
      <rect x="73" y="45" width="4" height="4" />
      
      {/* Cell Grid Lines */}
      <line x1="40" y1="40" x2="40" y2="90" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="90" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
      <line x1="20" y1="65" x2="80" y2="65" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
    </g>
  </svg>
);
