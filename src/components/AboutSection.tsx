import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code2, Shield, Brain, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ScrollTransition } from './ScrollTransition';
import { SectionDivider } from './SectionDivider';

const expertiseAreas = [
  {
    icon: Code2,
    title: 'Python Backend',
    description: 'Building scalable APIs, microservices, and backend systems with Django, FastAPI, and Flask.',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Django/FastAPI', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis', level: 80 },
    ],
    color: 'neon-cyan',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Implementing security best practices, penetration testing, and vulnerability assessments.',
    skills: [
      { name: 'Security Audits', level: 88 },
      { name: 'Penetration Testing', level: 85 },
      { name: 'Encryption', level: 90 },
      { name: 'OWASP', level: 87 },
    ],
    color: 'neon-purple',
  },
  {
    icon: Brain,
    title: 'AI/ML Engineering',
    description: 'Developing machine learning models, NLP systems, and intelligent automation solutions.',
    skills: [
      { name: 'TensorFlow/PyTorch', level: 85 },
      { name: 'NLP', level: 88 },
      { name: 'Model Deployment', level: 90 },
      { name: 'Data Science', level: 82 },
    ],
    color: 'neon-pink',
  },
  {
    icon: Wrench,
    title: 'Tools Building',
    description: 'Creating developer tools, automation scripts, and productivity-enhancing utilities.',
    skills: [
      { name: 'CLI Tools', level: 92 },
      { name: 'Automation', level: 90 },
      { name: 'DevOps', level: 85 },
      { name: 'Docker/K8s', level: 83 },
    ],
    color: 'neon-cyan',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <SectionDivider variant="wave" color="neon-purple" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollTransition variant="portal" delay={100}>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">Expertise & Skills</h2>
            <p className="text-body text-gray-400 max-w-2xl mx-auto">
              A comprehensive skill set spanning backend development, security, AI/ML, and developer tooling
            </p>
          </div>
        </ScrollTransition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <ScrollTransition 
              key={area.title} 
              variant={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={index * 150}
            >
              <ExpertiseCard area={area} index={index} />
            </ScrollTransition>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({
  area,
  index,
}: {
  area: typeof expertiseAreas[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
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

  const Icon = area.icon;

  return (
    <div
      ref={cardRef}
      className={`glass-card p-8 hover:scale-105 transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-${area.color}/10 border border-${area.color}/30 group-hover:neon-glow-${area.color.split('-')[1]} transition-all duration-300`}>
          <Icon className={`text-${area.color}`} size={32} />
        </div>
        <div>
          <h3 className="heading-sm text-white mb-2">{area.title}</h3>
          <p className="text-sm text-gray-400">{area.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {area.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            isVisible={isVisible}
            delay={skillIndex * 100}
          />
        ))}
      </div>
    </div>
  );
}

function SkillBar({
  skill,
  isVisible,
  delay,
}: {
  skill: { name: string; level: number };
  isVisible: boolean;
  delay: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setProgress(skill.level);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, skill.level, delay]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300">{skill.name}</span>
        <span className="text-sm text-neon-cyan">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}