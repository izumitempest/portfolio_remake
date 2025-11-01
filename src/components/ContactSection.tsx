import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Twitter, Send } from 'lucide-react';
import { useState } from 'react';
import { ScrollTransition } from './ScrollTransition';
import { SectionDivider } from './SectionDivider';

const socialLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com', color: 'hover:text-neon-cyan' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-neon-purple' },
  { icon: Twitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-neon-pink' },
  { icon: Mail, label: 'Email', url: 'mailto:izumi@example.com', color: 'hover:text-neon-cyan' },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <SectionDivider variant="portal" color="neon-cyan" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/10 to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollTransition variant="zoom" delay={100}>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">Get In Touch</h2>
            <p className="text-body text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Let's build something amazing together.
            </p>
          </div>
        </ScrollTransition>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollTransition variant="slide-right" delay={200}>
            <div className="space-y-8">
              <div className="glass-card p-8">
              <h3 className="heading-sm text-white mb-6">Let's Connect</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-cyan"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-cyan"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-neon-cyan resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 group"
                >
                  Send Message
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </form>
              </div>
            </div>
          </ScrollTransition>

          <ScrollTransition variant="slide-left" delay={300}>
            <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="heading-sm text-white mb-6">Connect on Social</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group ${social.color}`}
                    >
                      <Icon className="group-hover:scale-110 transition-transform" size={24} />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="heading-sm text-white mb-4">Quick Info</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white">Remote / Global</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Availability</p>
                  <p className="text-white">Open to opportunities</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Response Time</p>
                  <p className="text-white">Within 24 hours</p>
                </div>
              </div>
            </div>
            </div>
          </ScrollTransition>
        </div>
      </div>
    </section>
  );
}