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

// --- ICONOS INLINE (Formatos SVG para máxima compatibilidad) ---
const Linkedin = ({ size = 24, className = "" }) => <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>;
const Twitter = ({ size = 24, className = "" }) => <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>;
const Instagram = ({ size = 24, className = "" }) => <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>;

// --- DATOS GLOBALES ---
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

// --- COMPONENTES UI REUTILIZABLES ---

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 md:mb-20 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.div 
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: "80px" }}
      transition={{ duration: 0.8 }}
      className={`h-1 bg-amber-500 mb-6 ${centered ? 'mx-auto' : ''}`}
    />
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto px-4 md:px-0 font-light">{subtitle}</p>}
  </div>
);

const GlassCard = ({ children, className = "", hover = true }) => (
  <div className={`
    bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-10
    ${hover ? 'transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const Button = ({ children, primary = true, onClick, className = "", icon = false }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold tracking-wide transition-all duration-300 w-full sm:w-auto z-40 relative group
      ${primary 
        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]' 
        : 'bg-transparent text-white border-2 border-slate-700 hover:border-amber-500 hover:bg-slate-900/80'}
      ${className}
    `}
  >
    <span>{children}</span>
    {icon && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
  </button>
);

const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2500;
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

// --- PÁGINAS PRINCIPALES ---

const Home = ({ navigate }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      
      {/* HERO SECTION PREMIUM (Corregido y sin blurs que oculten botones) */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 bg-slate-950">
        
        {/* Fondo sutil y limpio */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
          
          <motion.div style={{ y: yParallax }} className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Círculos de luz difusa en el fondo que NO afectan la capa superior */}
            <div className="w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-amber-600/10 rounded-full blur-[120px] md:blur-[160px]"></div>
          </motion.div>
          
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center mt-10 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto flex flex-col items-center w-full"
          >
            {/* Etiqueta Superior Premium */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-amber-500 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Firma Legal de Élite
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6rem] font-black text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
              Defendemos su legado con <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
                excelencia y estrategia
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-14 max-w-4xl mx-auto font-light leading-relaxed drop-shadow-md">
              Representación legal corporativa y penal de máximo nivel. Protegemos sus intereses y patrimonio con rigor jurídico, táctica innovadora y absoluta confidencialidad.
            </p>
            
            {/* Botones limpios, 100% visibles y funcionales */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center w-full sm:w-auto relative z-50">
              <Button onClick={() => navigate('contact')} className="text-lg px-12" icon>
                Agendar Consulta Privada
              </Button>
              <Button primary={false} onClick={() => navigate('practice')} className="text-lg px-12 bg-slate-950/50 backdrop-blur-sm">
                Descubrir Especialidades
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Tarjeta de Estadísticas Integrada en el Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="container mx-auto px-6 mt-20 md:mt-32 relative z-30 w-full"
        >
          <div className="max-w-6xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x-0 md:divide-x divide-slate-800 relative z-10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center px-2 md:px-6 flex flex-col items-center justify-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-500 mb-3 flex items-center justify-center gap-1 drop-shadow-lg">
                    <Counter value={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ÁREAS DE PRÁCTICA SECTION */}
      <section className="py-32 bg-slate-950 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatedSection>
            <SectionHeading 
              title="Áreas de Práctica Especializada" 
              subtitle="Brindamos representación legal superior en múltiples disciplinas, adaptando estrategias innovadoras a casos de alta complejidad." 
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <GlassCard className="h-full flex flex-col group relative overflow-hidden bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 text-amber-500 border border-slate-800 group-hover:border-amber-500/50 transition-all relative z-10">
                    <srv.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors relative z-10">{srv.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-10 flex-grow relative z-10">{srv.desc}</p>
                  <button 
                    onClick={() => navigate('practice')} 
                    className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-white hover:text-amber-500 transition-all group/btn relative z-10"
                  >
                    Ver Detalles <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS - SECCIÓN MODERNIZADA */}
      <section className="py-32 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection>
              <SectionHeading 
                title="El Estándar de Oro en Estrategia Legal" 
                subtitle="Nuestra metodología combina décadas de experiencia en tribunales con un análisis de datos moderno para predecir los movimientos de la contraparte."
                centered={false}
              />
              <div className="grid sm:grid-cols-2 gap-10 mt-12">
                {[
                  { t: 'Inteligencia de Datos', d: 'Analizamos miles de tendencias judiciales para optimizar su defensa.' },
                  { t: 'Privacidad Absoluta', d: 'Protocolos de seguridad de grado militar para proteger su información confidencial.' },
                  { t: 'Respuesta 24/7', d: 'Atención inmediata de nuestros socios para casos de emergencia penal o corporativa.' },
                  { t: 'Éxito Comprobado', d: 'Más de 500 victorias confirmadas en litigios de alto impacto y repercusión mediática.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800 text-amber-500">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">{item.t}</h4>
                      <p className="text-slate-400 text-base leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Boardroom" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                <div className="absolute bottom-12 left-10 right-10">
                   <div className="flex items-center gap-2 mb-4">
                     {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
                   </div>
                   <p className="text-white text-2xl font-medium italic leading-relaxed">"Su capacidad para diseccionar y resolver casos complejos corporativos es simplemente inigualable a nivel nacional."</p>
                   <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mt-6">- CEO, TechCorp Global</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NUESTRO PROCESO (TIMELINE INTERACTIVO) */}
      <section className="py-32 bg-slate-950 px-6">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading 
              title="Nuestro Proceso Estratégico" 
              subtitle="Un enfoque sistemático y agresivo diseñado para maximizar sus posibilidades de éxito desde el primer contacto hasta el veredicto final." 
            />
          </AnimatedSection>
          
          <div className="relative max-w-4xl mx-auto mt-24">
            {/* Línea Central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500/20 via-amber-500 to-amber-500/20 hidden md:block"></div>
            
            {/* Línea Móvil */}
            <div className="absolute left-[28px] top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/20 via-amber-500 to-amber-500/20 md:hidden block"></div>

            {[
              { title: 'Consulta Inicial Confidencial', desc: 'Evaluación exhaustiva de su caso, análisis de riesgos y proyección de posibilidades legales sin ningún compromiso.' },
              { title: 'Investigación Profunda', desc: 'Nuestro equipo de investigadores privados y peritos recaba evidencia crucial, testimonios y precedentes legales a su favor.' },
              { title: 'Diseño de Estrategia Táctica', desc: 'Creamos un plan de acción legal detallado y ofensivo, anticipando cada movimiento posible de la contraparte y fiscalía.' },
              { title: 'Defensa y Resolución Agresiva', desc: 'Representación implacable y elocuente en salas de negociaciones o litigios directos ante los tribunales supremos.' }
            ].map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.15} className={`relative flex items-center justify-between md:justify-normal w-full mb-16 md:mb-24 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12"></div>
                
                {/* Punto Desktop */}
                <div className="z-20 w-16 h-16 absolute left-1/2 transform -translate-x-1/2 bg-slate-950 border-4 border-amber-500 rounded-full hidden md:flex items-center justify-center text-amber-500 text-2xl font-black shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  0{idx + 1}
                </div>
                
                {/* Punto Móvil */}
                <div className="z-20 w-10 h-10 absolute left-[13px] bg-slate-950 border-4 border-amber-500 rounded-full flex md:hidden items-center justify-center text-amber-500 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  {idx + 1}
                </div>

                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                  <GlassCard className="relative p-8 md:p-10 border-slate-800 bg-slate-900">
                    <span className="text-amber-500/10 text-6xl md:text-8xl font-black absolute -top-6 -right-4 select-none pointer-events-none">0{idx + 1}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4 relative z-10">{step.title}</h4>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed relative z-10">{step.desc}</p>
                  </GlassCard>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 relative px-6 bg-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">¿Listo para asegurar <br/>su éxito legal?</h2>
              <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
                El tiempo es el factor más crítico en asuntos legales complejos. Solicite hoy mismo una evaluación privada de su caso con uno de nuestros socios fundadores.
              </p>
              <Button onClick={() => navigate('contact')} icon className="mx-auto text-xl px-14 py-6 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                Hablar con un Especialista Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- PÁGINAS INTERNAS (ABOUT, PRACTICE, TEAM, CASES, BLOG, CONTACT) ---

const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Nuestra Historia y Legado" subtitle="Construyendo confianza inquebrantable y logrando victorias legales desde el año 2008." />
    <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
      <AnimatedSection>
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group">
          <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Oficina LexPremium" className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <h3 className="text-4xl font-bold text-white mb-8">La Filosofía LexPremium</h3>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Fundada bajo el principio fundamental de que la justicia requiere representación magistral y agresiva, LexPremium ha evolucionado orgánicamente hasta convertirse en una de las firmas boutique más respetadas y temidas del país en tribunales.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          Nuestra visión siempre ha sido redefinir la excelencia legal. Combinamos el rigor académico tradicional con estrategias litigantes modernas, tecnológicas y disruptivas. Nosotros no solo tomamos casos; adoptamos sus causas corporativas o personales como propias.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800">
            <h4 className="text-amber-500 text-xl font-bold mb-3 flex items-center gap-2"><Award className="w-5 h-5"/> Misión</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Proveer defensa legal intransigente, ética y asesoría corporativa altamente visionaria para proteger el legado de nuestros clientes.</p>
          </div>
          <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800">
            <h4 className="text-amber-500 text-xl font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Visión</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Ser reconocidos unánimemente como el estándar global de excelencia definitiva en litigio complejo y derecho internacional.</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </motion.div>
);

const Practice = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Nuestras Especialidades" subtitle="Conocimiento legal profundo y experiencia táctica en las ramas más exigentes del derecho moderno." />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
      {SERVICES.map((srv, idx) => (
        <AnimatedSection key={idx} delay={idx * 0.1}>
          <GlassCard className="h-full bg-slate-900 border-slate-800 flex flex-col p-10">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-amber-500 mb-8 border border-slate-800 shadow-inner">
              <srv.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{srv.title}</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow">{srv.desc}</p>
            <ul className="space-y-4 mb-10">
              {['Resolución de Casos Complejos', 'Asesoría Preventiva Activa', 'Litigio Estratégico en Corte'].map((l, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> {l}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-slate-950 text-amber-500 font-bold text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-colors border border-slate-800 hover:border-amber-500">
              Consultar Especialista
            </button>
          </GlassCard>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Lawyers = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Nuestro Equipo de Élite" subtitle="Conozca a las mentes brillantes y estrategas legales dedicados exclusivamente a asegurar su éxito." />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
      {TEAM.map((lawyer, idx) => (
        <AnimatedSection key={idx} delay={idx * 0.1}>
          <div className="group relative rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            <div className="absolute bottom-0 p-8 w-full translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-1">{lawyer.name}</h3>
              <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-6">{lawyer.role}</p>
              
              <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-colors border border-slate-700 hover:border-amber-500"><Linkedin size={18}/></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-colors border border-slate-700 hover:border-amber-500"><Mail size={18}/></a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Cases = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Historial de Resultados" subtitle="Evidencia sólida, numérica y comprobable de nuestro crecimiento, efectividad y dominio en los tribunales." />
    
    <div className="grid lg:grid-cols-3 gap-10 mt-20 mb-20">
      <GlassCard className="lg:col-span-2 h-[450px] bg-slate-900 border-slate-800 p-8">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <TrendingUp className="text-amber-500 w-8 h-8"/> 
          Evolución de Casos Ganados (2019-2024)
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="year" stroke="#64748b" tickMargin={10} />
            <YAxis stroke="#64748b" tickMargin={10} />
            <Tooltip 
              contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px'}} 
              cursor={{fill: 'rgba(245, 158, 11, 0.05)'}} 
            />
            <Bar dataKey="casos" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
      
      <div className="flex flex-col gap-10">
        <GlassCard className="bg-slate-900 border-slate-800 p-10 flex-1 flex flex-col justify-center items-center text-center">
          <div className="text-5xl lg:text-6xl font-black text-amber-500 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">$500M+</div>
          <div className="text-white font-bold uppercase tracking-widest text-sm">Capital Recuperado</div>
          <p className="text-slate-400 text-sm mt-4">En acuerdos civiles y compensaciones para nuestros clientes corporativos.</p>
        </GlassCard>
        <GlassCard className="bg-slate-900 border-slate-800 p-10 flex-1 flex flex-col justify-center items-center text-center">
          <div className="text-5xl lg:text-6xl font-black text-amber-500 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">98%</div>
          <div className="text-white font-bold uppercase tracking-widest text-sm">Tasa de Absolución</div>
          <p className="text-slate-400 text-sm mt-4">En defensas penales por delitos de cuello blanco y fraude fiscal.</p>
        </GlassCard>
      </div>
    </div>

    <h3 className="text-3xl font-bold text-white mb-10 text-center md:text-left">Casos Destacados Recientes</h3>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { title: 'Defensa Corporativa TechCorp Global', desc: 'Desestimación total de cargos federales antimonopolio presentados contra el gigante tecnológico tras una defensa técnica y estratégica ininterrumpida de 3 años.', cat: 'Derecho Empresarial', year: '2023' },
        { title: 'Acuerdo Histórico en Litigio Civil', desc: 'Obtuvimos un acuerdo récord de $45 millones por negligencia corporativa grave, marcando un nuevo precedente nacional en la jurisprudencia de daños punitivos.', cat: 'Litigio Civil', year: '2024' }
      ].map((item, idx) => (
        <AnimatedSection key={idx}>
           <GlassCard className="border-l-4 border-l-amber-500 bg-slate-900">
             <div className="flex justify-between items-center mb-4">
               <span className="text-xs font-bold uppercase tracking-widest text-amber-500 px-3 py-1 bg-amber-500/10 rounded-full">{item.cat}</span>
               <span className="text-slate-500 font-bold text-sm">{item.year}</span>
             </div>
             <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
             <p className="text-base text-slate-400 leading-relaxed">{item.desc}</p>
           </GlassCard>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Blog = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Blog y Perspectivas Legales" subtitle="Análisis profundo de nuestros expertos sobre las últimas reformas, jurisprudencia y tendencias jurídicas globales." />
    
    <div className="flex flex-col lg:flex-row justify-between items-center mb-16 mt-20 gap-8">
      <div className="flex gap-3 overflow-x-auto pb-4 w-full lg:w-auto scrollbar-hide snap-x">
        {['Todos los Artículos', 'Derecho Corporativo', 'Defensa Penal', 'Reformas Fiscales', 'Arbitraje Internacional'].map((cat, i) => (
          <button key={i} className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-all border snap-start shrink-0 ${i === 0 ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="relative w-full lg:w-80 shrink-0">
        <input type="text" placeholder="Buscar publicaciones..." className="w-full bg-slate-900 border border-slate-700 rounded-full py-4 pl-6 pr-12 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner" />
        <Search className="absolute right-5 top-4 text-slate-400 w-5 h-5" />
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1,2,3,4,5,6].map((i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all cursor-pointer group flex flex-col h-full">
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src={`https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80&sig=${i}`} alt="Blog thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-5 left-5 bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-amber-500 font-bold uppercase tracking-wider z-20 border border-slate-700">
                Análisis Jurídico
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center text-xs text-slate-500 font-medium mb-4 gap-4">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 12 Mayo, 2026</span>
                <span>•</span>
                <span>5 min de lectura</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                Impacto de las nuevas regulaciones fiscales en estructuras corporativas multinacionales
              </h3>
              <p className="text-slate-400 text-base mb-8 line-clamp-3 leading-relaxed flex-grow">
                Un desglose técnico y profundo de cómo la última reforma tributaria internacional afectará directamente la planeación fiscal y las operaciones de las empresas que operan a nivel global.
              </p>
              <span className="text-amber-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                Leer Artículo Completo <ArrowRight size={16}/>
              </span>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </motion.div>
);

const Contact = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-32 px-6 container mx-auto max-w-7xl">
    <SectionHeading title="Evaluación Privada de Caso" subtitle="La confidencialidad es nuestro pilar. Nuestro equipo de socios está listo para escuchar su situación y proponer una ruta de acción inmediata." />
    
    <div className="grid lg:grid-cols-5 gap-16 mt-20">
      <AnimatedSection className="lg:col-span-3">
        <GlassCard className="p-8 md:p-12 bg-slate-900 border-slate-800">
          <h3 className="text-3xl font-bold text-white mb-8">Envíenos un Mensaje Encriptado</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Teléfono Directo</label>
                <input type="tel" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Correo Electrónico Corporativo/Personal</label>
              <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner" placeholder="correo@empresa.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Clasificación del Caso</label>
              <div className="relative">
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none shadow-inner cursor-pointer">
                  <option value="" disabled selected>Seleccione la especialidad requerida...</option>
                  {SERVICES.map((s,i) => <option key={i}>{s.title}</option>)}
                </select>
                <ChevronRight className="absolute right-5 top-4 text-slate-500 pointer-events-none transform rotate-90" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Resumen Confidencial (Opcional)</label>
              <textarea rows="5" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none shadow-inner" placeholder="Describa brevemente la naturaleza de su situación legal..."></textarea>
            </div>
            <div className="pt-4">
              <Button className="w-full py-5 text-lg" icon>Transmitir Solicitud de Forma Segura</Button>
            </div>
          </form>
        </GlassCard>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2} className="lg:col-span-2 space-y-12">
        <div>
          <h3 className="text-3xl font-bold text-white mb-8">Nuestras Coordenadas</h3>
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2">Sede Principal - Distrito Financiero</h4>
                <p className="text-slate-400 text-base leading-relaxed">Torre LexPremium, Piso 45.<br/>Avenida de las Finanzas 1234.<br/>Ciudad Metropolitana, CP 10000.</p>
              </div>
            </div>
            
            <div className="w-full h-px bg-slate-800"></div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                  Líneas Directas 
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">24/7 Penal</span>
                </h4>
                <p className="text-slate-400 text-lg mb-1">+1 (800) LEX-PREM (Línea Gratuita)</p>
                <p className="text-slate-400 text-lg">+1 (555) 123-4567 (Línea Local)</p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-800"></div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-2">Comunicaciones Electrónicas</h4>
                <p className="text-slate-400 text-base mb-1">Evaluación: consultas@lexpremium.com</p>
                <p className="text-slate-400 text-base">Prensa: pr@lexpremium.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa Simulado de Alta Gama */}
        <div className="h-64 rounded-3xl overflow-hidden border border-slate-800 relative shadow-2xl group">
           <div className="absolute inset-0 bg-slate-900 transition-transform duration-1000 group-hover:scale-105">
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
             {/* Radar Sweep Effect */}
             <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] border-t border-amber-500/30 rounded-full origin-bottom-right animate-[spin_4s_linear_infinite] -translate-x-1/2 -translate-y-1/2 opacity-20 hidden md:block"></div>
             
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-amber-500 rounded-full relative z-10 border-2 border-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.8)]"></div>
                <div className="bg-white text-slate-950 font-black text-xs px-3 py-1.5 rounded mt-3 shadow-2xl uppercase tracking-widest">LexPremium HQ</div>
             </div>
           </div>
        </div>
      </AnimatedSection>
    </div>
  </motion.div>
);

// --- COMPONENTES DE ESTRUCTURA Y NAVEGACIÓN ---

const Navbar = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-500 transition-colors duration-300">
            <Scale className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">LEX<span className="text-slate-500 font-light">PREMIUM</span></span>
        </div>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map(link => (
            <button 
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-xs xl:text-sm font-bold uppercase tracking-widest transition-colors hover:text-amber-500 relative py-2 ${activeTab === link.id ? 'text-amber-500' : 'text-slate-400'}`}
            >
              {link.label}
              {activeTab === link.id && (
                <motion.div layoutId="navline" className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              )}
            </button>
          ))}
          <Button onClick={() => setActiveTab('contact')} className="px-8 py-3 text-xs xl:text-sm ml-2">Consultar Caso</Button>
        </div>

        {/* BOTÓN HAMBURGUESA MOBILE */}
        <button className="lg:hidden text-white p-2 rounded-lg bg-slate-900 border border-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENÚ MOBILE PANTALLA COMPLETA */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }} 
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }} 
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 h-screen w-screen bg-slate-950 z-40 flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 mb-10">
              {NAV_LINKS.map(link => (
                <button 
                  key={link.id}
                  onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false); }}
                  className={`text-2xl font-bold uppercase tracking-widest text-left py-4 border-b border-slate-900 w-full ${activeTab === link.id ? 'text-amber-500' : 'text-white'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <Button className="w-full py-5 text-lg" onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}>
              Agendar Consulta Privada
            </Button>
            
            {/* Redes en menú móvil */}
            <div className="flex justify-center gap-6 mt-12 mb-10">
              <a href="#" className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400"><Linkedin size={20}/></a>
              <a href="#" className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400"><Twitter size={20}/></a>
              <a href="#" className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400"><Instagram size={20}/></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActiveTab }) => (
  <footer className="bg-[#030303] pt-24 pb-12 border-t border-slate-800 relative overflow-hidden">
    {/* Decoración sutil de fondo */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
    
    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        
        {/* Info Columna 1 */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }}>
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">LEX<span className="text-slate-500 font-light">PREMIUM</span></span>
          </div>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg">
            Firma legal boutique de alto calibre, especializada en proteger el patrimonio, la libertad y el legado corporativo de clientes exigentes mediante estrategias litigantes altamente disruptivas y efectivas.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:bg-amber-500 border border-slate-800 transition-colors duration-300"><Linkedin size={20}/></a>
            <a href="#" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:bg-amber-500 border border-slate-800 transition-colors duration-300"><Twitter size={20}/></a>
            <a href="#" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-slate-950 hover:bg-amber-500 border border-slate-800 transition-colors duration-300"><Instagram size={20}/></a>
          </div>
        </div>
        
        {/* Enlaces Columna 2 */}
        <div>
          <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Nuestra Firma
          </h4>
          <ul className="space-y-4">
            {['Inicio', 'Sobre Nosotros', 'Áreas de Práctica', 'Casos de Éxito', 'Blog Legal'].map(l => (
              <li key={l}>
                <button 
                  onClick={() => { 
                    const id = NAV_LINKS.find(link => link.label === l)?.id || 'home';
                    setActiveTab(id); 
                    window.scrollTo(0,0); 
                  }}
                  className="text-slate-400 hover:text-amber-500 text-base transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-amber-500 transition-all"></span> {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Contacto Columna 3 */}
        <div>
          <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Contacto Directo
          </h4>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Sede Principal</p>
              <p className="text-slate-400 text-sm leading-relaxed">Torre LexPremium, Piso 45.<br/>Avenida de las Finanzas 1234.<br/>Distrito Empresarial.</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Comunicaciones</p>
              <p className="text-slate-400 text-sm mb-1">consultas@lexpremium.com</p>
              <p className="text-amber-500 text-lg font-black tracking-wider">+1 (800) LEX-PREM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-medium">
          © {new Date().getFullYear()} LexPremium Firm. Excelencia Legal Inquebrantable.
        </p>
        <div className="flex gap-6 text-xs text-slate-600 font-medium uppercase tracking-wider">
          <a href="#" className="hover:text-amber-500 transition-colors">Aviso de Privacidad</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- APP Y ENVOLTORIO PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Custom Cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulador de carga premium
    setTimeout(() => setIsLoading(false), 2000);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // El cursor personalizado sólo se activa en pantallas con ratón (no táctiles)
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // PANTALLA DE CARGA
  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#030303] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Glow de fondo de carga */}
        <div className="absolute w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
        
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center"
        >
          <Scale className="text-amber-500 w-10 h-10" />
        </motion.div>
        
        <div className="mt-8 relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="text-white text-2xl font-black tracking-tighter mb-2"
          >
            LEX<span className="text-slate-500 font-light">PREMIUM</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase"
          >
            Estableciendo Conexión Segura
          </motion.div>
          {/* Barra de progreso de carga simulada */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-0.5 bg-amber-500 mt-6 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
          />
        </div>
      </div>
    );
  }

  // APLICACIÓN PRINCIPAL
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      
      {/* Custom Cursor */}
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

      {/* Barra de Progreso de Scroll Premium */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 origin-left z-[100] shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar activeTab={activeTab} setActiveTab={navigate} />
      
      <main>
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

      {/* Botón Flotante Whatsapp Premium */}
      <a 
        href="#" 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:bg-green-400 hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-50 border-2 border-green-400 group"
      >
        <MessageSquare className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-pulse" />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700 shadow-xl">
          Atención Inmediata
        </span>
      </a>
    </div>
  );
}