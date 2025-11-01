import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ScrollTransition } from './ScrollTransition';
import { SectionDivider } from './SectionDivider';
import { ParallaxSection } from './ParallaxSection';

const projects = [
  {
    title: 'ProjectX Classifier',
    description: 'Advanced ML-powered frontend/backend code classifier with real-time feedback and continuous learning capabilities. Built with TensorFlow and FastAPI.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDB8MHx8Ymx1ZXwxNzYyMDAwMTUzfDA&ixlib=rb-4.1.0&q=85',
    attribution: 'Mohammad Rahmani on Unsplash',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Docker', 'ML'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    title: 'SecureAPI Gateway',
    description: 'Enterprise-grade API gateway with advanced security features including rate limiting, JWT authentication, and DDoS protection.',
    image: 'https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHNlY3VyaXR5JTIwZGlnaXRhbHxlbnwwfDB8fHRlYWx8MTc2MjAwMDE1Mnww&ixlib=rb-4.1.0&q=85',
    attribution: 'GuerrillaBuzz on Unsplash',
    tags: ['Python', 'Redis', 'PostgreSQL', 'Security', 'API'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    title: 'DevTools Suite',
    description: 'Collection of CLI tools for developers including code formatters, linters, and productivity enhancers with plugin architecture.',
    image: 'https://images.unsplash.com/photo-1610989001873-03968eed0f08?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxjb2RlJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDB8MHx8Ymx1ZXwxNzYyMDAwMTUzfDA&ixlib=rb-4.1.0&q=85',
    attribution: 'Ferenc Almasi on Unsplash',
    tags: ['Python', 'CLI', 'Automation', 'DevOps'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    title: 'NLP Sentiment Analyzer',
    description: 'Real-time sentiment analysis system using transformer models for social media monitoring and brand reputation management.',
    image: 'https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxjb2RlJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDB8MHx8Ymx1ZXwxNzYyMDAwMTUzfDA&ixlib=rb-4.1.0&q=85',
    attribution: 'and machines on Unsplash',
    tags: ['Python', 'NLP', 'PyTorch', 'AI/ML'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      <SectionDivider variant="curve" color="neon-cyan" />
      
      <ParallaxSection speed={0.3}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent" />
      </ParallaxSection>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollTransition variant="zoom" delay={100}>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">Featured Projects</h2>
            <p className="text-body text-gray-400 max-w-2xl mx-auto">
              A showcase of my work in backend development, AI/ML, cybersecurity, and developer tools
            </p>
          </div>
        </ScrollTransition>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollTransition 
              key={project.title} 
              variant={project.featured ? 'portal' : 'rotate'}
              delay={index * 200}
            >
              <ProjectCard project={project} index={index} />
            </ScrollTransition>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${project.featured ? 'lg:col-span-2' : ''} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card
        className="glass-card overflow-hidden group cursor-pointer border-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} - ${project.attribution}`}
            className={`w-full ${project.featured ? 'h-96' : 'h-64'} object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`} />
          
          {project.featured && (
            <Badge className="absolute top-4 right-4 bg-neon-purple/80 text-white border-0">
              Featured
            </Badge>
          )}
        </div>

        <div className="p-6 relative">
          <h3 className="heading-sm text-white mb-3 group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-body text-gray-400 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20"
            >
              <Github size={16} className="mr-2" />
              Code
            </Button>
            <Button
              size="sm"
              className="bg-neon-purple/10 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/20"
            >
              <ExternalLink size={16} className="mr-2" />
              Demo
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}