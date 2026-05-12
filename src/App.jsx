import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView,
  useSpring
} from 'framer-motion';
import { 
  Scale, 
  Shield, 
  Briefcase, 
  Users, 
  BookOpen, 
  MessageSquare, 
  ChevronRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  ArrowRight,
  Award,
  TrendingUp,
  CheckCircle,
  FileText,
  Search,
  Star
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- ICONOS INLINE (Reemplazo de redes sociales) ---
const Linkedin = ({ size = 24, className = "" }) => <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>;
const Twitter = ({ size = 24, className = "" }) => <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>;
const Instagram = ({ size = 24, className = "" }) => <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>;

// --- DATOS ---
const NAV_LINKS = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Sobre Nosotros' },
  { id: 'practice', label: 'Áreas de Práctica' },
  { id: 'team', label: 'Abogados' },
  { id: 'cases', label: 'Casos de Éxito' },
  { id: 'blog', label: 'Blog Legal' },
  { id: 'contact', label: 'Contacto' }
];

const SERVICES = [
  { icon: Shield, title: 'Derecho Penal', desc: 'Defensa estratégica y agresiva en casos penales complejos, protegiendo su libertad y reputación.' },
  { icon: FileText, title: 'Derecho Civil', desc: 'Resolución de disputas contractuales, daños y perjuicios, y litigios civiles con enfoque a resultados.' },
  { icon: Briefcase, title: 'Derecho Empresarial', desc: 'Asesoría corporativa integral, fusiones, adquisiciones y protección de activos comerciales.' },
  { icon: Users, title: 'Derecho Familiar', desc: 'Manejo sensible y profesional de divorcios, custodia, pensiones y acuerdos prenupciales.' },
  { icon: Award, title: 'Derecho Laboral', desc: 'Representación en despidos injustificados, acoso laboral y negociaciones de contratos.' },
  { icon: Scale, title: 'Inmigración', desc: 'Navegamos el complejo sistema migratorio para asegurar visas, residencias y ciudadanías.' }
];

const STATS = [
  { value: 500, label: 'Casos Ganados', suffix: '+' },
  { value: 98, label: 'Satisfacción', suffix: '%' },
  { value: 15, label: 'Años Experiencia', suffix: '+' },
  { value: 50, label: 'Abogados Expertos', suffix: '+' }
];

const TEAM = [
  { name: 'Alexander Sterling', role: 'Socio Fundador - Penal', exp: '20+ años', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Victoria Vance', role: 'Socia - Empresarial', exp: '15+ años', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Marcus Chen', role: 'Especialista Civil', exp: '12+ años', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Elena Rodríguez', role: 'Familiar e Inmigración', exp: '10+ años', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const CHART_DATA = [
  { year: '2019', casos: 120 },
  { year: '2020', casos: 150 },
  { year: '2021', casos: 180 },
  { year: '2022', casos: 220 },
  { year: '2023', casos: 310 },
  { year: '2024', casos: 450 },
];

// --- COMPONENTES UI COMPARTIDOS ---

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.div 
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: "60px" }}
      transition={{ duration: 0.8 }}
      className={`h-1 bg-amber-500 mb-4 ${centered ? 'mx-auto' : ''}`}
    />
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto px-2 md:px-0">{subtitle}</p>}
  </div>
);

const GlassCard = ({ children, className = "", hover = true }) => (
  <div className={`
    bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8
    ${hover ? 'transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.2)]' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const Button = ({ children, primary = true, onClick, className = "", icon = false }) => (
  <button 
    onClick={onClick}
    className={`
      px-6 py-3 md:px-8 md:py-4 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto
      ${primary 
        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
        : 'bg-transparent text-white border border-slate-600 hover:border-white hover:bg-white/5'}
      ${className}
    `}
  >
    {children}
    {icon && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
  </button>
);

const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          clearInterval(timer);
          setCount(value);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, inView]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// --- PÁGINAS ---

const Home = ({ navigate }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Background elements */}
        <div className="absolute inset-0 bg-slate-950 z-0">
          <motion.div style={{ y: yParallax }} className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px]" />
          </motion.div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-amber-500 tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase font-semibold mb-4 md:mb-6 block">Firma Legal Premium</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-tight tracking-tight">
              Defendemos sus derechos con <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">excelencia y estrategia</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 md:mb-12 max-w-3xl mx-auto font-light px-2 md:px-0">
              Un equipo legal de élite dedicado a proteger sus intereses corporativos y personales con la máxima confidencialidad y rigor jurídico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 md:px-0">
              <Button onClick={() => navigate('contact')} icon>Agendar Consulta Privada</Button>
              <Button primary={false} onClick={() => navigate('practice')}>Explorar Prácticas</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-10 md:-mt-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <GlassCard className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10" hover={false}>
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center px-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 flex items-center justify-center">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-400 font-medium tracking-wide uppercase text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading title="Áreas de Práctica Especializada" subtitle="Brindamos representación legal superior en múltiples disciplinas, adaptando estrategias innovadoras a casos complejos." />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((srv, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <GlassCard className="h-full flex flex-col">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 flex items-center justify-center mb-6 text-amber-500 border border-slate-700">
                    <srv.icon size={24} className="md:w-[28px] md:h-[28px]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">{srv.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8 flex-grow">{srv.desc}</p>
                  <button onClick={() => navigate('practice')} className="text-amber-500 flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider hover:text-amber-400 transition-colors mt-auto group">
                    Conocer Más <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-900"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">El estándar de oro en <br/><span className="text-amber-500">representación legal</span></h2>
              <p className="text-slate-400 text-base md:text-lg mb-8">No somos un bufete tradicional. Combinamos décadas de experiencia en tribunales con tecnología legal de vanguardia para ofrecer resultados sin precedentes.</p>
              
              <div className="space-y-4 md:space-y-6">
                {['Estrategias Legales Innovadoras', 'Atención Ultra Personalizada 24/7', 'Historial Comprobado de Éxito', 'Transparencia Total en Procesos'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <div className="w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                      <CheckCircle size={16} className="md:w-[18px] md:h-[18px]" />
                    </div>
                    <span className="text-slate-200 font-medium text-base md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="mt-8 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 rounded-3xl blur-2xl opacity-20 transform translate-x-4 translate-y-4"></div>
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Bufete Premium" className="rounded-3xl relative z-10 border border-slate-700/50 shadow-2xl w-full" />
                
                <GlassCard className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 z-20 hidden sm:block max-w-[250px] md:max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-2 md:gap-4 mb-2">
                    <Star className="text-amber-500 fill-amber-500 w-4 h-4 md:w-5 md:h-5" />
                    <Star className="text-amber-500 fill-amber-500 w-4 h-4 md:w-5 md:h-5" />
                    <Star className="text-amber-500 fill-amber-500 w-4 h-4 md:w-5 md:h-5" />
                    <Star className="text-amber-500 fill-amber-500 w-4 h-4 md:w-5 md:h-5" />
                    <Star className="text-amber-500 fill-amber-500 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <p className="text-white text-xs md:text-sm font-medium">"El equipo de LexPremium logró lo imposible en nuestro caso corporativo."</p>
                  <p className="text-slate-400 text-[10px] md:text-xs mt-2">- CEO, TechCorp Global</p>
                </GlassCard>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading title="Nuestro Proceso Estratégico" subtitle="Un enfoque sistemático diseñado para maximizar sus posibilidades de éxito desde el primer contacto hasta el veredicto." />
          </AnimatedSection>
          
          <div className="relative max-w-4xl mx-auto mt-12 md:mt-20">
            {/* Center Line (Hidden on mobile) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500/10 via-amber-500 to-amber-500/10 hidden md:block"></div>
            
            {/* Timeline Line for Mobile */}
            <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/10 via-amber-500 to-amber-500/10 md:hidden block"></div>

            {[
              { title: 'Consulta Inicial', desc: 'Evaluación exhaustiva de su caso, riesgos y posibilidades legales sin compromiso.' },
              { title: 'Investigación Profunda', desc: 'Nuestro equipo de investigadores y peritos recaba evidencia crucial y precedentes.' },
              { title: 'Diseño de Estrategia', desc: 'Creamos un plan de acción legal táctico, anticipando movimientos de la contraparte.' },
              { title: 'Defensa Agresiva', desc: 'Representación implacable en negociaciones o litigios ante tribunales.' }
            ].map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className={`relative flex items-center justify-between md:justify-normal w-full mb-10 md:mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12"></div>
                
                {/* Desktop Dot */}
                <div className="z-20 w-10 h-10 md:w-12 md:h-12 absolute left-1/2 transform -translate-x-1/2 bg-slate-950 border-4 border-amber-500 rounded-full hidden md:flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  {idx + 1}
                </div>
                
                {/* Mobile Dot */}
                <div className="z-20 w-6 h-6 absolute left-[9px] bg-slate-950 border-4 border-amber-500 rounded-full flex md:hidden items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>

                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <GlassCard className="relative p-5 md:p-8">
                     <span className="text-amber-500/20 text-4xl md:text-6xl font-black absolute -top-2 -right-1 md:-top-4 md:-right-2">{idx + 1}</span>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 text-sm md:text-base">{step.desc}</p>
                  </GlassCard>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-24 relative overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-amber-500/10"></div>
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">El tiempo es crucial en asuntos legales.</h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 md:mb-10 mx-auto">No deje su futuro al azar. Hable con nuestros socios fundadores hoy mismo para una evaluación confidencial.</p>
            <Button onClick={() => navigate('contact')} icon className="mx-auto text-base md:text-lg px-8 py-4 md:px-10 md:py-5 w-full sm:w-auto">Solicitar Evaluación Confidencial</Button>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

// --- PÁGINAS INTERNAS ---

const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 md:pt-32 pb-20 md:pb-24 px-4 sm:px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Nuestra Historia y Legado" subtitle="Construyendo confianza y logrando victorias legales desde 2008." />
    <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mt-10 md:mt-16">
      <AnimatedSection>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Office" className="rounded-2xl border border-slate-700 shadow-2xl w-full" />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Filosofía LexPremium</h3>
        <p className="text-slate-400 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
          Fundada bajo el principio fundamental de que la justicia requiere de una representación magistral, LexPremium ha evolucionado hasta convertirse en una de las firmas más respetadas del país.
        </p>
        <p className="text-slate-400 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
          Nuestra visión es redefinir la excelencia legal combinando el rigor académico tradicional con estrategias litigantes modernas y disruptivas. No solo tomamos casos; adoptamos sus causas como propias.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <GlassCard className="p-5 md:p-6">
            <h4 className="text-amber-500 text-lg md:text-xl font-bold mb-2">Misión</h4>
            <p className="text-xs md:text-sm text-slate-300">Proveer defensa legal intransigente y asesoría corporativa visionaria.</p>
          </GlassCard>
          <GlassCard className="p-5 md:p-6">
            <h4 className="text-amber-500 text-lg md:text-xl font-bold mb-2">Visión</h4>
            <p className="text-xs md:text-sm text-slate-300">Ser el estándar global de excelencia en litigio complejo y derecho corporativo.</p>
          </GlassCard>
        </div>
      </AnimatedSection>
    </div>
  </motion.div>
);

const Practice = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 md:pt-32 pb-20 md:pb-24 px-4 sm:px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Áreas de Práctica" subtitle="Experiencia profunda en diversas ramas del derecho." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-16">
      {SERVICES.map((srv, idx) => (
        <AnimatedSection key={idx} delay={idx * 0.1}>
          <GlassCard className="flex flex-col sm:flex-row gap-5 md:gap-6 h-full p-6 md:p-8 group">
            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl bg-slate-800/50 flex items-center justify-center text-amber-500 border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors duration-500">
              <srv.icon size={28} className="md:w-[32px] md:h-[32px]" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{srv.title}</h3>
              <p className="text-slate-400 text-sm md:text-base mb-4">{srv.desc}</p>
              <ul className="space-y-2 mb-6">
                <li className="text-xs md:text-sm text-slate-300 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> Casos complejos</li>
                <li className="text-xs md:text-sm text-slate-300 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> Asesoría preventiva</li>
                <li className="text-xs md:text-sm text-slate-300 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div> Litigio estratégico</li>
              </ul>
              <button className="text-white hover:text-amber-500 flex items-center gap-2 text-xs md:text-sm font-medium transition-colors">
                Ver casos relacionados <ArrowRight size={14} className="md:w-[16px] md:h-[16px]"/>
              </button>
            </div>
          </GlassCard>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Lawyers = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 md:pt-32 pb-20 md:pb-24 px-4 sm:px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Nuestro Equipo de Élite" subtitle="Mentes brillantes dedicadas a su éxito legal." />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-16">
      {TEAM.map((lawyer, idx) => (
        <AnimatedSection key={idx} delay={idx * 0.1}>
          <div className="group relative rounded-2xl overflow-hidden border border-slate-700/50">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">{lawyer.name}</h3>
              <p className="text-amber-500 text-xs md:text-sm font-medium mb-2">{lawyer.role}</p>
              <p className="text-slate-300 text-xs mb-3 md:mb-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:delay-100">Experiencia: {lawyer.exp}</p>
              <div className="flex gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:delay-200">
                <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-colors"><Linkedin size={12} className="md:w-[14px] md:h-[14px]"/></a>
                <a href="#" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-colors"><Mail size={12} className="md:w-[14px] md:h-[14px]"/></a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Cases = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 md:pt-32 pb-20 md:pb-24 px-4 sm:px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Historial de Éxito" subtitle="Resultados contundentes que hablan por sí mismos. Estadísticas de litigio." />
    
    <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16 mb-12 md:mb-16">
      <GlassCard className="col-span-1 lg:col-span-2 h-[350px] md:h-[400px] flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2"><TrendingUp className="text-amber-500"/> Casos Ganados por Año</h3>
        <div className="flex-grow min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff'}} 
              />
              <Bar dataKey="casos" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
        <GlassCard>
          <div className="text-amber-500 text-2xl md:text-3xl font-bold mb-1 md:mb-2">$500M+</div>
          <div className="text-white text-sm md:text-base font-medium mb-1">Acuerdos Recuperados</div>
          <p className="text-xs md:text-sm text-slate-400">En compensaciones para nuestros clientes corporativos y civiles.</p>
        </GlassCard>
        <GlassCard>
          <div className="text-amber-500 text-2xl md:text-3xl font-bold mb-1 md:mb-2">95%</div>
          <div className="text-white text-sm md:text-base font-medium mb-1">Tasa de Absolución</div>
          <p className="text-xs md:text-sm text-slate-400">En casos penales de cuello blanco y delitos mayores.</p>
        </GlassCard>
      </div>
    </div>

    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center md:text-left">Casos Destacados Recientes</h3>
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      {[
        { title: 'Defensa Corporativa TechCorp', desc: 'Desestimación total de cargos antimonopolio presentados contra gigante tecnológico internacional tras una defensa estratégica de 3 años.', cat: 'Derecho Empresarial' },
        { title: 'Acuerdo Histórico Civil', desc: 'Obtuvimos un acuerdo de $45 millones por negligencia corporativa, marcando un precedente nacional en daños punitivos.', cat: 'Derecho Civil' }
      ].map((item, idx) => (
        <AnimatedSection key={idx}>
           <GlassCard className="border-l-4 border-l-amber-500">
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-amber-500 mb-2 block">{item.cat}</span>
             <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{item.title}</h4>
             <p className="text-sm md:text-base text-slate-400">{item.desc}</p>
           </GlassCard>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Blog = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 md:pt-32 pb-20 md:pb-24 px-4 sm:px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Publicaciones Legales" subtitle="Análisis, noticias y perspectivas de nuestros expertos jurídicos." />
    
    <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-12 mt-10 md:mt-16 gap-6">
      <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide snap-x">
        {['Todos', 'Corporativo', 'Penal', 'Reformas', 'Internacional'].map((cat, i) => (
          <button key={i} className={`px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-colors snap-start shrink-0 ${i === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="relative w-full md:w-64 shrink-0">
        <input type="text" placeholder="Buscar artículos..." className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-5 pr-10 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" />
        <Search className="absolute right-4 top-2.5 text-slate-400 w-4 h-4 md:w-5 md:h-5" />
      </div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[1,2,3,4,5,6].map((i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden group cursor-pointer hover:border-slate-600 transition-colors h-full flex flex-col">
            <div className="h-40 md:h-48 overflow-hidden relative shrink-0">
              <img src={`https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80&sig=${i}`} alt="Blog" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] md:text-xs text-amber-500 font-medium">Actualidad</div>
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <div className="flex items-center text-[10px] md:text-xs text-slate-500 mb-2 md:mb-3 gap-3 md:gap-4">
                <span>12 Mayo, 2026</span>
                <span>5 min lectura</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">Impacto de las nuevas regulaciones fiscales en empresas multinacionales</h3>
              <p className="text-slate-400 text-xs md:text-sm mb-4 line-clamp-3 flex-grow">Un análisis profundo de cómo la última reforma afectará la estructura corporativa y los impuestos de las empresas que operan a nivel global.</p>
              <span className="text-amber-500 text-xs md:text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">Leer Artículo <ChevronRight size={14} className="md:w-[16px] md:h-[16px]"/></span>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Contact = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 md:pt-32 pb-20 md:pb-24 px-4 sm:px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Agenda tu Consulta" subtitle="Trato estrictamente confidencial. Nuestro equipo está listo para escuchar su caso." />
    
    <div className="grid lg:grid-cols-2 gap-10 md:gap-16 mt-10 md:mt-16">
      <AnimatedSection>
        <GlassCard className="p-6 sm:p-8 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Envíenos un Mensaje Seguro</h3>
          <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-slate-400 mb-1.5 md:mb-2">Nombre Completo</label>
                <input type="text" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-slate-400 mb-1.5 md:mb-2">Teléfono</label>
                <input type="tel" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-400 mb-1.5 md:mb-2">Correo Electrónico</label>
              <input type="email" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-400 mb-1.5 md:mb-2">Área de Interés</label>
              <select className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none">
                <option>Seleccione un área...</option>
                {SERVICES.map((s,i) => <option key={i}>{s.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-400 mb-1.5 md:mb-2">Breve descripción de su caso (Opcional)</label>
              <textarea rows="4" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"></textarea>
            </div>
            <Button className="w-full text-sm md:text-base py-3.5" icon>Enviar Solicitud</Button>
          </form>
        </GlassCard>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2} className="space-y-8 md:space-y-10">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Información de Contacto</h3>
          <div className="space-y-5 md:space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center text-amber-500 shrink-0 border border-slate-800">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base md:text-lg mb-1">Oficina Central</h4>
                <p className="text-slate-400 text-sm md:text-base">Av. Financiera 1234, Piso 45.<br/>Distrito Empresarial, Ciudad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center text-amber-500 shrink-0 border border-slate-800">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base md:text-lg mb-1">Línea Directa <span className="block sm:inline md:block text-xs md:text-sm font-normal text-amber-500">(24/7 emergencias)</span></h4>
                <p className="text-slate-400 text-sm md:text-base">+1 (800) LEX-PREM</p>
                <p className="text-slate-400 text-sm md:text-base">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center text-amber-500 shrink-0 border border-slate-800">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base md:text-lg mb-1">Correo Electrónico</h4>
                <p className="text-slate-400 text-sm md:text-base break-all">consultas@lexpremium.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-48 md:h-64 rounded-2xl overflow-hidden border border-slate-700 relative">
           {/* Mapa Simulado Moderno */}
           <div className="absolute inset-0 bg-slate-900">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full relative z-10 border-2 border-white"></div>
                <div className="bg-white text-slate-950 font-bold text-[10px] md:text-xs px-2 py-1 rounded mt-2 shadow-lg whitespace-nowrap">LexPremium HQ</div>
             </div>
           </div>
        </div>
      </AnimatedSection>
    </div>
  </motion.div>
);

// --- LAYOUT PRINCIPAL ---

const Navbar = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-lg border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-5 md:py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
          <Scale className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">LEX<span className="text-slate-400 font-light">PREMIUM</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(link => (
            <button 
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors hover:text-amber-500 relative ${activeTab === link.id ? 'text-amber-500' : 'text-slate-300'}`}
            >
              {link.label}
              {activeTab === link.id && (
                <motion.div layoutId="underline" className="absolute -bottom-2 left-0 w-full h-0.5 bg-amber-500" />
              )}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button onClick={() => setActiveTab('contact')} className="py-2 px-5 xl:py-2.5 xl:px-6 text-xs xl:text-sm">Consultar</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-0 left-0 w-full h-screen bg-slate-950 pt-24 px-6 flex flex-col overflow-y-auto pb-10"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <button 
                  key={link.id}
                  onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false); }}
                  className={`text-lg sm:text-xl font-medium text-left border-b border-slate-800 pb-4 ${activeTab === link.id ? 'text-amber-500' : 'text-white'}`}
                >
                  {link.label}
                </button>
              ))}
              <Button onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }} className="mt-4 py-4 text-base">Agendar Consulta</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActiveTab }) => (
  <footer className="bg-slate-950 border-t border-slate-800 pt-16 md:pt-20 pb-8 md:pb-10">
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Scale className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">LEX<span className="text-slate-400 font-light">PREMIUM</span></span>
          </div>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 max-w-md">
            Firma legal boutique especializada en casos de alta complejidad. Defendiendo patrimonios, libertades y legados corporativos con excelencia inquebrantable.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-colors"><Linkedin size={16} className="md:w-[20px] md:h-[20px]"/></a>
            <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-colors"><Twitter size={16} className="md:w-[20px] md:h-[20px]"/></a>
            <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-colors"><Instagram size={16} className="md:w-[20px] md:h-[20px]"/></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">Enlaces Rápidos</h4>
          <ul className="space-y-2 md:space-y-3">
            {NAV_LINKS.slice(0, 5).map(link => (
              <li key={link.id}>
                <button onClick={() => { setActiveTab(link.id); window.scrollTo(0,0); }} className="text-slate-400 hover:text-amber-500 text-xs md:text-sm transition-colors">{link.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">Áreas Principales</h4>
          <ul className="space-y-2 md:space-y-3">
            <li className="text-slate-400 hover:text-amber-500 text-xs md:text-sm transition-colors cursor-pointer">Litigio Penal Cuello Blanco</li>
            <li className="text-slate-400 hover:text-amber-500 text-xs md:text-sm transition-colors cursor-pointer">Fusiones y Adquisiciones</li>
            <li className="text-slate-400 hover:text-amber-500 text-xs md:text-sm transition-colors cursor-pointer">Divorcios Patrimoniales</li>
            <li className="text-slate-400 hover:text-amber-500 text-xs md:text-sm transition-colors cursor-pointer">Arbitraje Internacional</li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="text-white font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm">Boletín Legal</h4>
          <p className="text-slate-400 text-xs md:text-sm mb-4">Suscríbase para recibir actualizaciones sobre cambios legislativos y consejos legales.</p>
          <div className="flex bg-slate-900 rounded-lg overflow-hidden border border-slate-800 focus-within:border-amber-500 transition-colors">
            <input type="email" placeholder="Su email" className="w-full bg-transparent px-3 py-2.5 md:px-4 md:py-2 text-xs md:text-sm text-white focus:outline-none" />
            <button className="bg-amber-500 text-slate-950 px-3 md:px-4 font-bold hover:bg-amber-400 transition-colors">→</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-slate-500 text-xs md:text-sm">© {new Date().getFullYear()} LexPremium Firm. Todos los derechos reservados.</p>
        <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Custom Cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading screen
    setTimeout(() => setIsLoading(false), 2000);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Only add custom cursor listener on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle internal navigation with scroll to top
  const navigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Scale className="text-amber-500 w-12 h-12 md:w-16 md:h-16" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-6 text-amber-500 tracking-[0.2em] md:tracking-[0.3em] font-bold text-sm md:text-base"
        >
          INICIALIZANDO ENTORNO LEGAL
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* Custom Cursor (Hidden on touch devices, shown on desktop) */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500 pointer-events-none z-[100] hidden lg:block mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-500 pointer-events-none z-[100] hidden lg:block"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40 }}
      />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar activeTab={activeTab} setActiveTab={navigate} />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <Home key="home" navigate={navigate} />}
          {activeTab === 'about' && <About key="about" />}
          {activeTab === 'practice' && <Practice key="practice" />}
          {activeTab === 'team' && <Lawyers key="team" />}
          {activeTab === 'cases' && <Cases key="cases" />}
          {activeTab === 'blog' && <Blog key="blog" />}
          {activeTab === 'contact' && <Contact key="contact" />}
        </AnimatePresence>
      </main>

      <Footer setActiveTab={navigate} />

      {/* Floating WhatsApp Button */}
      <a href="#" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform z-50">
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
      </a>
    </div>
  );
}