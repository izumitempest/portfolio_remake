import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: 'slide-up' | 'slide-left' | 'slide-right' | 'zoom' | 'rotate' | 'flip' | 'portal' | 'glitch';
  delay?: number;
}

export function ScrollTransition({ 
  children, 
  className = '', 
  variant = 'slide-up',
  delay = 0 
}: ScrollTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getVariantClasses = () => {
    const base = 'transition-all duration-1000 ease-out';
    
    switch (variant) {
      case 'slide-up':
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;
      case 'slide-left':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`;
      case 'slide-right':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`;
      case 'zoom':
        return `${base} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`;
      case 'rotate':
        return `${base} ${isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-12'}`;
      case 'flip':
        return `${base} perspective-1000 ${isVisible ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-90'}`;
      case 'portal':
        return `${base} ${isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-150 blur-md'}`;
      case 'glitch':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0 skew-x-0' : 'opacity-0 translate-x-4 skew-x-12'}`;
      default:
        return base;
    }
  };

  return (
    <div ref={elementRef} className={`${getVariantClasses()} ${className}`}>
      {children}
    </div>
  );
}