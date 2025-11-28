import React from 'react';

export const IconCoin = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2"/>
    <path d="M12 8V16M10 10H14M10 14H14" stroke="#B45309" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconStar = ({ className = "w-6 h-6", filled = true, style }: { className?: string; filled?: boolean; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill={filled ? "url(#starGradient)" : "#334155"} 
      stroke={filled ? "#B45309" : "#475569"} 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
  </svg>
);

export const IconSettings = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="#E2E8F0" stroke="#475569" strokeWidth="2" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15A1.65 1.65 0 0 0 20 12a1.65 1.65 0 0 0-.6-3M17.6 18a1.65 1.65 0 0 0 2.6 1.5M14 19.4a1.65 1.65 0 0 0 3 .6M12 20a1.65 1.65 0 0 0 3-.6M9 20a1.65 1.65 0 0 0 3 .6M6.4 19.4a1.65 1.65 0 0 0 3-.6M4.6 18a1.65 1.65 0 0 0 2.6 1.5M4 15a1.65 1.65 0 0 0 .6-3M4.6 6a1.65 1.65 0 0 0 2.6-1.5M6.4 4.6a1.65 1.65 0 0 0 3-.6M9 4a1.65 1.65 0 0 0 3 .6M12 4a1.65 1.65 0 0 0 3-.6M15 4a1.65 1.65 0 0 0 3 .6M17.6 6a1.65 1.65 0 0 0 2.6-1.5M19.4 9a1.65 1.65 0 0 0 .6 3" strokeLinecap="round"/>
  </svg>
);

export const IconPlay = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="#FFFFFF" stroke="currentColor" strokeWidth="3" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3L19 12L5 21V3Z" strokeLinejoin="round"/>
  </svg>
);

export const IconLock = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="#94A3B8" stroke="#475569" strokeWidth="2" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="11" width="14" height="10" rx="2"/>
    <path d="M8 11V7a4 4 0 1 1 8 0v4"/>
  </svg>
);

export const IconBack = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconMenu = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconReplay = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

export const IconNext = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4l10 8l-10 8V4Z" fill="currentColor"/>
    <path d="M19 5v14" strokeLinecap="round"/>
  </svg>
);

export const IconShop = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C15.895 17 15 17.895 15 19C15 20.105 15.895 21 17 21C18.105 21 19 20.105 19 19C19 17.895 18.105 17 17 17ZM9 19C9 20.105 8.105 21 7 21C5.895 21 5 20.105 5 19C5 17.895 5.895 17 7 17C8.105 17 9 17.895 9 19Z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconGift = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V12Z" fill="#F43F5E" stroke="#881337" strokeWidth="2"/>
    <path d="M22 7H2C1.4 7 1 7.4 1 8V10C1 10.6 1.4 11 2 11H22C22.6 11 23 10.6 23 10V8C23 7.4 22.6 7 22 7Z" fill="#F43F5E" stroke="#881337" strokeWidth="2"/>
    <path d="M12 21V7" stroke="#881337" strokeWidth="2" strokeDasharray="2 2"/>
    <path d="M12 7H7.5C6 7 5 6 5 4.5C5 3 6 2 7.5 2C9 2 10 3 10.5 4L12 7Z" fill="#FACC15" stroke="#B45309" strokeWidth="2"/>
    <path d="M12 7H16.5C18 7 19 6 19 4.5C19 3 18 2 16.5 2C15 2 14 3 13.5 4L12 7Z" fill="#FACC15" stroke="#B45309" strokeWidth="2"/>
  </svg>
);

export const IconCheck = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);