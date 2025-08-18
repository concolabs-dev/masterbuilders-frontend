import React, { ReactNode } from "react";
import Image from "next/image";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    bgImage?: string; // Optional background image
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", style, bgImage }) => (
    <div
    className={`relative overflow-hidden backdrop-blur-xl bg-white/30 border border-white/40 rounded-xl shadow-lg px-6 py-8 ${className}`}
    style={style}
  >
    {/* White gradient overlay */}
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-white/0 pointer-events-none" />

    {/* Background image on the left with gradient fade */}
    {bgImage && (
      <div className="absolute -left-1/3 top-0 w-full h-full">
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover object-left pointer-events-none"
          style={{
            mask: 'linear-gradient(to right, black 0%, black 40%, transparent 70%)',
            WebkitMask: 'linear-gradient(to right, black 0%, black 40%, transparent 70%)',
            opacity: 0.9, // Adjust opacity as needed
          }}
          priority={false}
        />
      </div>
    )}
    <div className="relative z-10 left-1/4 w-3/4 md:left-1/3 md:w-2/3">
      {children}
    </div>
  </div>
);

export default GlassCard;