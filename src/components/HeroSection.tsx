import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 50%)`,
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-cyan/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="text-neon-cyan text-sm font-medium tracking-wider uppercase animate-pulse">
              Welcome to the Future
            </span>
          </div>

          <h1 className="heading-xl text-white max-w-4xl mx-auto">
            <span className="inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Hi, I'm{' '}
            </span>
            <span
              className="inline-block bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              Izumi
            </span>
          </h1>

          <div className="heading-md text-gray-300 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <TypewriterText
              texts={[
                'Python Backend Developer',
                'Cybersecurity Specialist',
                'AI/ML Engineer',
                'Tools Builder',
              ]}
            />
          </div>

          <p className="text-body text-gray-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Crafting secure, intelligent systems and building tools that empower developers.
            Specializing in backend architecture, machine learning, and cybersecurity solutions.
          </p>

          <div className="flex gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 group"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300"
            >
              Get in Touch
            </Button>
          </div>

          <div className="flex gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 hover:scale-110 transform"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 hover:scale-110 transform"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:izumi@example.com"
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 hover:scale-110 transform"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neon-cyan/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}