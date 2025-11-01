import { useEffect, useRef, useState } from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'curve' | 'zigzag' | 'portal';
  color?: string;
}

export function SectionDivider({ variant = 'wave', color = 'neon-cyan' }: SectionDividerProps) {
  const [progress, setProgress] = useState(0);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(1);
        }
      },
      { threshold: 0.1 }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderDivider = () => {
    switch (variant) {
      case 'wave':
        return (
          <svg
            className="w-full h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              transform: `scaleX(${progress})`,
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <path
              d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
              className={`fill-${color}/20`}
            />
            <path
              d="M0,20 C300,80 900,80 1200,20 L1200,120 L0,120 Z"
              className={`fill-${color}/10`}
            />
          </svg>
        );
      case 'diagonal':
        return (
          <div
            className={`w-full h-24 bg-gradient-to-br from-${color}/20 to-transparent`}
            style={{
              clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)',
              transform: `scaleX(${progress})`,
              transition: 'transform 1.2s ease-out',
            }}
          />
        );
      case 'curve':
        return (
          <svg
            className="w-full h-32"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              transform: `scaleX(${progress})`,
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <path
              d="M0,60 Q300,0 600,60 T1200,60 L1200,120 L0,120 Z"
              className={`fill-${color}/15`}
            />
          </svg>
        );
      case 'zigzag':
        return (
          <svg
            className="w-full h-20"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            style={{
              transform: `scaleX(${progress})`,
              transition: 'transform 1s ease-out',
            }}
          >
            <path
              d="M0,30 L100,0 L200,30 L300,0 L400,30 L500,0 L600,30 L700,0 L800,30 L900,0 L1000,30 L1100,0 L1200,30 L1200,60 L0,60 Z"
              className={`fill-${color}/20`}
            />
          </svg>
        );
      case 'portal':
        return (
          <div className="relative w-full h-32 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-radial from-${color}/30 via-${color}/10 to-transparent`}
              style={{
                transform: `scale(${progress})`,
                transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '50%',
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={dividerRef} className="relative w-full overflow-hidden">
      {renderDivider()}
    </div>
  );
}