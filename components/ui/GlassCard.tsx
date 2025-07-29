import React, { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", style }) => (
    <div
    className={`relative overflow-hidden backdrop-blur-xl bg-white/30 border border-white/40 rounded-xl shadow-lg p-6 ${className}`}
    style={style}
  >
    {/* White gradient overlay */}
    {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/30 to-white/0 pointer-events-none" /> */}
    
    {/* Content */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default GlassCard;