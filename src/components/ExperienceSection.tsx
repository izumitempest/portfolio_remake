import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollTransition } from './ScrollTransition';
import { SectionDivider } from './SectionDivider';
import { ParallaxSection } from './ParallaxSection';

const timeline = [
  {
    year: '2025',
    title: 'Lead Backend Engineer & Security Specialist',
    company: 'Odyss',
    description: 'Leading backend architecture and security initiatives for enterprise applications. Implemented zero-trust security model and ML-powered threat detection.',
    achievements: [
      'Reduced security incidents by 85%',
      'Improved API performance by 200%',
      'Led team of 3 engineers',
    ],
    tags: ['Python', 'Security', 'Leadership'],
  },
  {
    year: '2024',
    title: 'AI/ML Engineer',
    company: 'DataTech Solutions',
    description: 'Developed and deployed machine learning models for natural language processing and predictive analytics.',
    achievements: [
      'Built NLP system processing 1M+ documents',
      'Achieved 94% model accuracy',
      'Reduced inference time by 60%',
    ],
    tags: ['TensorFlow', 'NLP', 'Python'],
  },
  {
    year: '2023',
    title: 'Backend Developer',
    company: 'StartupX',
    description: 'Built scalable backend systems and RESTful APIs serving millions of users.',
    achievements: [
      'Designed microservices architecture',
      'Implemented CI/CD pipelines',
      'Optimized database queries',
    ],
    tags: ['Django', 'PostgreSQL', 'Docker'],
  },
  {
    year: '2022',
    title: 'Junior Developer & Security Researcher',
    company: 'CyberSafe Labs',
    description: 'Conducted security audits and developed automation tools for vulnerability scanning.',
    achievements: [
      'Discovered 15+ critical vulnerabilities',
      'Created automated testing suite',
      'Published security research',
    ],
    tags: ['Security', 'Python', 'Automation'],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      <SectionDivider variant="diagonal" color="neon-purple" />
      
      <ParallaxSection speed={0.2}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
      </ParallaxSection>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollTransition variant="portal" delay={100}>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">Experience Timeline</h2>
            <p className="text-body text-gray-400 max-w-2xl mx-auto">
              My journey through backend development, cybersecurity, and AI/ML engineering
            </p>
          </div>
        </ScrollTransition>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink" />

          {timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: typeof timeline[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative mb-16 ${
        isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`
      } transition-all duration-700`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-1/2 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="mb-3">
              <h3 className="heading-sm text-white mb-1">{item.title}</h3>
              <p className="text-neon-cyan font-medium">{item.company}</p>
            </div>
            
            <p className="text-body text-gray-400 mb-4">{item.description}</p>

            <ul className={`space-y-2 mb-4 ${isLeft ? 'text-right' : 'text-left'}`}>
              {item.achievements.map((achievement) => (
                <li key={achievement} className="text-sm text-gray-300 flex items-center gap-2 ${isLeft ? 'justify-end' : 'justify-start'}">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                  {achievement}
                </li>
              ))}
            </ul>

            <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-neon-cyan/30 text-neon-cyan text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center border-4 border-cyber-bg z-10">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
        </div>

        <div className={`w-1/2 ${isLeft ? 'pl-8' : 'pr-8'}`}>
          <div className="text-6xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            {item.year}
          </div>
        </div>
      </div>
    </div>
  );
}