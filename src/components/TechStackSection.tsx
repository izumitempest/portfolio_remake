import {
  Code2,
  Database,
  Shield,
  Brain,
  Cloud,
  Container,
  GitBranch,
  Terminal,
  Lock,
  Cpu,
  Network,
  Zap,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect, useRef } from 'react';
import { ScrollTransition } from './ScrollTransition';
import { SectionDivider } from './SectionDivider';

const techStack = {
  Backend: [
    { name: 'Python', icon: Code2, color: 'text-neon-cyan' },
    { name: 'Django', icon: Code2, color: 'text-neon-purple' },
    { name: 'FastAPI', icon: Zap, color: 'text-neon-pink' },
    { name: 'PostgreSQL', icon: Database, color: 'text-neon-cyan' },
    { name: 'Redis', icon: Database, color: 'text-neon-purple' },
  ],
  Security: [
    { name: 'OWASP', icon: Shield, color: 'text-neon-cyan' },
    { name: 'Encryption', icon: Lock, color: 'text-neon-purple' },
    { name: 'Pen Testing', icon: Terminal, color: 'text-neon-pink' },
    { name: 'Security Audits', icon: Shield, color: 'text-neon-cyan' },
  ],
  'AI/ML': [
    { name: 'TensorFlow', icon: Brain, color: 'text-neon-purple' },
    { name: 'PyTorch', icon: Brain, color: 'text-neon-pink' },
    { name: 'NLP', icon: Cpu, color: 'text-neon-cyan' },
    { name: 'Scikit-learn', icon: Brain, color: 'text-neon-purple' },
  ],
  DevOps: [
    { name: 'Docker', icon: Container, color: 'text-neon-cyan' },
    { name: 'Kubernetes', icon: Network, color: 'text-neon-purple' },
    { name: 'AWS', icon: Cloud, color: 'text-neon-pink' },
    { name: 'Git', icon: GitBranch, color: 'text-neon-cyan' },
  ],
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-32 px-6 relative overflow-hidden">
      <SectionDivider variant="zigzag" color="neon-pink" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-pink/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollTransition variant="glitch" delay={100}>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">Technical Arsenal</h2>
            <p className="text-body text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to build robust, secure, and intelligent systems
            </p>
          </div>
        </ScrollTransition>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
            <ScrollTransition
              key={category}
              variant="flip"
              delay={categoryIndex * 150}
            >
              <TechCategory
                category={category}
                technologies={technologies}
                index={categoryIndex}
              />
            </ScrollTransition>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCategory({
  category,
  technologies,
  index,
}: {
  category: string;
  technologies: Array<{ name: string; icon: any; color: string }>;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={categoryRef}
      className={`glass-card p-6 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="heading-sm text-white mb-6 text-center">{category}</h3>
      <div className="space-y-4">
        {technologies.map((tech, techIndex) => (
          <TechItem
            key={tech.name}
            tech={tech}
            isVisible={isVisible}
            delay={techIndex * 50}
          />
        ))}
      </div>
    </div>
  );
}

function TechItem({
  tech,
  isVisible,
  delay,
}: {
  tech: { name: string; icon: any; color: string };
  isVisible: boolean;
  delay: number;
}) {
  const Icon = tech.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <Icon className={`${tech.color} group-hover:scale-110 transition-transform`} size={24} />
            <span className="text-gray-300 group-hover:text-white transition-colors">
              {tech.name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Proficient in {tech.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}