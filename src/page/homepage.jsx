import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';


/** --------------------------------------------------------------------------
 *  HELPERS & HOOKS
 *  -------------------------------------------------------------------------- */

function useCountUp(target, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        let animationFrameId;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();

                    const updateCount = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        const easeInOut = progress < 0.5
                            ? 4 * progress ** 3
                            : 1 - (-2 * progress + 2) ** 3 / 2;

                        setCount(Math.round(easeInOut * target));

                        if (progress < 1) {
                            animationFrameId = requestAnimationFrame(updateCount);
                        } else {
                            setCount(target);
                        }
                    };

                    animationFrameId = requestAnimationFrame(updateCount);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            observer.disconnect();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [target, duration]);

    return [count, ref];
}

function Counter({ target, suffix = '' }) {
    const [count, ref] = useCountUp(target);
    return <span ref={ref}>{count}{suffix}</span>;
}

/** --------------------------------------------------------------------------
 *  DATA
 *  -------------------------------------------------------------------------- */

const slides = [
    {
        bg: '/images/New_Header.jpg',
        subtitle: 'welcome to Bash Technologies',
        title: 'Managed IT Services',
        desc: 'Reliable monitoring, support, and maintenance for your complete IT ecosystem',
    },
    {
        bg: '/images/IoT_Header.jpg',
        subtitle: 'smart connectivity',
        title: 'IoT Smart Solutions',
        desc: 'End-to-end smart sensor connectivity, automation, and remote monitoring solutions for modern enterprises.',
    },
    {
        bg: '/images/CyberSecurity_Header.jpg',
        subtitle: 'stay protected',
        title: 'Cybersecurity',
        desc: 'Proactive security solutions to safeguard your business from cyber threats and vulnerabilities.',
    },
    {
        bg: '/images/Network_Header.png',
        subtitle: 'built for scale',
        title: 'Networking Solutions',
        desc: 'End-to-end design, deployment, and management of secure enterprise networks',
    },
    {
        bg: '/images/OffIce_Network.jpg',
        subtitle: 'seamless migration',
        title: 'End-to-End IT Infrastructure Solution',
        desc: 'From planning to implementation and support, we manage your entire IT ecosystem.',
    },
];

// ── 6 Core IT Infrastructure + IoT Services ──────────────────────────────────
const services = [
    {
        icon: '/images/icon-service-1.svg',
        title: 'Managed IT Services',
        desc: 'We provide round-the-clock monitoring, remote support, patch management, and proactive maintenance for your entire IT environment — servers, networks, and endpoints — so your team can focus on business, not breakdowns.',
    },
    {
        icon: '/images/icon-service-2.svg',
        title: 'IoT & Smart Systems',
        desc: 'From sensor-equipped smart waste bins to connected industrial devices, we design and deploy end-to-end IoT ecosystems — integrating real-time data collection, central dashboards, and automation to drive operational efficiency.',
    },
    {
        icon: '/images/icon-service-3.svg',
        title: 'VoIP Services',
        desc: 'Modernise your business communications with enterprise-grade VoIP solutions — covering IP phone systems, SIP trunk configuration, call routing, voicemail, and unified communications. We handle the full setup and ongoing management so your team stays connected reliably, whether in the office or working remotely.',
    },
    {
        icon: '/images/icon-service-4.svg',
        title: 'Cybersecurity',
        desc: 'Protect your business with enterprise-grade firewalls, VPN & secure remote access, endpoint security, and intrusion detection systems. We also conduct full security audits and compliance assessments to keep your data and operations safe.',
    },
    {
        icon: '/images/icon-service-5.svg',
        title: 'Networking Solutions',
        desc: 'We design and deploy high-performance LAN/WAN networks with VLAN segmentation, enterprise Wi-Fi, and router & switch configuration — built for reliability, security, and the scale your business demands today and tomorrow.',
    },
    {
        icon: '/images/icon-service-6.svg',
        title: 'End-to-End IT Infrastructure',
        desc: 'From structured cabling and server room builds to virtualisation, rack installation, and hardware procurement — we deliver your complete physical and digital IT foundation under one roof, with a single point of accountability from day one.',
    },
];
// ── 3 Key Differentiators (Features section) ─────────────────────────────────
const featuresList = [
    {
        icon: '/images/icon-ferature-1.svg',
        title: 'Our Competitive Edge',
        desc: 'Our strength lies in delivering reliable, innovative, and end-to-end technology solutions tailored to business needs. More Powerful Alternatives Our strength is in combining expertise, innovation, and execution to deliver smart technology solutions.',
        delay: '0.4s',
    },
    {
        icon: '/images/icon-ferature-2.svg',
        title: 'Highly Qualified & Professional Team',
        desc: 'Our engineers are certified across the industry\'s most respected frameworks — CCNA, AWS, VMware, CEH, and more. But certifications alone don\'t define us. Every member of our team brings real-world, hands-on project experience, meaning you get professionals who have solved complex problems before — not engineers learning on your infrastructure.',
        delay: '0.6s',
    },
    {
        icon: '/images/icon-ferature-3.svg',
        title: 'full documentation & handover on every project',
        desc: 'When we finish a deployment, you don\'t just get a working system — you get complete network diagrams, configuration files, asset registers, and step-by-step documentation. Your team will always know exactly what\'s running and why, long after we\'re gone.',
        delay: '0.8s',
    },
];

// ── Case Studies ──────────────────────────────────────────────────────────────
const projects = [
    {
        img: '/images/project-1.jpg',
        cat: 'IT Infrastructure',
        title: 'Enterprise network overhaul for a 500-seat corporate campus',
        desc: 'We redesigned and deployed a fully segmented LAN/WAN architecture across a multi-floor corporate campus — including enterprise Wi-Fi, VLAN isolation, and a centralised firewall stack — reducing network downtime by 78% and cutting IT support tickets by over half.',
    },
    {
        img: '/images/project-2.jpg',
        cat: 'Cloud Migration',
        title: 'On-premise to AWS hybrid cloud migration',
        desc: 'We migrated a mid-sized logistics company\'s legacy on-premise servers to a hybrid AWS environment, implementing automated cloud backups and DR failover. The result: 40% reduction in infrastructure costs and near-zero RTO for critical systems.',
    },
    {
        img: '/images/project-3.jpg',
        cat: 'IoT — Smart Waste Management',
        title: 'Smart waste management system for urban municipalities',
        desc: 'We deployed an IoT-powered smart waste management system across a city network — sensor-equipped bins transmitting real-time fill-level data to a central dashboard, enabling dynamic collection routing that cut fuel costs by 32% and reduced missed collections to zero.',
    },
];

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const whyItems = [
    {
        icon: '/images/icon-why-choose-1.svg',
        title: 'certified IT infrastructure experts',
        desc: 'Our engineers hold industry-leading certifications (CCNA, MCSA, AWS, VMware) and bring hands-on experience across networking, virtualisation, cloud, and cybersecurity.',
        delay: '0.4s',
    },
    {
        icon: '/images/icon-why-choose-2.svg',
        title: 'single point of accountability',
        desc: 'We manage your entire IT environment — from structured cabling and server rooms to cloud platforms and IoT deployments — so you always have one trusted partner, not a fragmented vendor chain.',
        delay: '0.6s',
    },
    {
        icon: '/images/icon-why-choose-3.svg',
        title: 'business-first approach',
        desc: 'Every solution we design is aligned to your operational goals and budget. We don\'t over-engineer; we deliver the right infrastructure at the right scale, with a clear path to grow.',
        delay: '0.8s',
    },
];

// ── Counters ──────────────────────────────────────────────────────────────────
const counters = [
    { icon: '/images/icon-why-choose-counter-1.svg', num: 12, suffix: '+', label: 'Years Experience' },
    { icon: '/images/icon-why-choose-counter-2.svg', num: 300, suffix: '+', label: 'Projects Delivered' },
    { icon: '/images/icon-why-choose-counter-3.svg', num: 150, suffix: '+', label: 'Happy Clients' },
    { icon: '/images/icon-why-choose-counter-4.svg', num: 99, suffix: '%', label: 'Uptime Guaranteed' },
];

// ── Pricing ───────────────────────────────────────────────────────────────────
const pricingPlans = [
    { name: 'Essential plan', price: 49, icon: '/images/icon-pricing-1.svg', highlighted: false, delay: '' },
    { name: 'Business plan', price: 129, icon: '/images/icon-pricing-2.svg', highlighted: true, delay: '0.2s' },
    { name: 'Enterprise plan', price: 299, icon: '/images/icon-pricing-3.svg', highlighted: false, delay: '0.4s' },
];

const pricingFeatures = [
    '24×7 network & server monitoring',
    'Remote IT support (business hours)',
    'Monthly performance & health report',
    'Patch & update management',
];

const pricingBenefits = [
    { icon: '/images/icon-pricing-benefit-1.svg', text: 'Get 30 day free trial' },
    { icon: '/images/icon-pricing-benefit-2.svg', text: 'No hidden fees, ever' },
    { icon: '/images/icon-pricing-benefit-3.svg', text: 'Cancel anytime, no lock-in' },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonialsList = [
    {
        author: 'Rajiv Mehta',
        role: 'IT Director, NexGen Logistics',
        avatar: '/images/author-1.jpg',
        text: 'Bash Technologies completely transformed our IT infrastructure. The network redesign eliminated our persistent downtime issues overnight, and their team\'s responsiveness during the rollout was outstanding. They feel less like a vendor and more like an extension of our own IT team.',
    },
    {
        author: 'Sunita Patel',
        role: 'COO, Greenfield Realty Group',
        avatar: '/images/author-2.jpg',
        text: 'We needed a full structured cabling and server room setup across three new office locations simultaneously. Bash Technologies delivered on time, within budget, and with zero disruption to our operations. Their managed monitoring service has been rock-solid since day one.',
    },
];

// ── Team ──────────────────────────────────────────────────────────────────────
const teamList = [
    { img: '/images/team-1.jpg', name: 'arjun sharma', role: 'Network & Infrastructure Architect', delay: '' },
    { img: '/images/team-2.jpg', name: 'priya nair', role: 'Cloud Solutions Engineer', delay: '0.2s' },
    { img: '/images/team-3.jpg', name: 'daniel fernandez', role: 'Cybersecurity Lead', delay: '0.4s' },
    { img: '/images/team-4.jpg', name: 'mei-lin zhou', role: 'IoT Systems Engineer', delay: '0.6s' },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const faqsList = [
    {
        q: 'What types of businesses do you work with?',
        a: 'We work with SMEs, large enterprises, and public-sector organisations across a wide range of industries including logistics, real estate, manufacturing, retail, and healthcare. Our solutions are scaled to fit your business size and budget.',
    },
    {
        q: 'How long does a typical network deployment take?',
        a: 'Timelines depend on the scope of the project. A small office network deployment can be completed in 2–5 days, while a multi-site enterprise rollout may take 4–8 weeks. We provide a detailed project plan with milestones before work begins.',
    },
    {
        q: 'Do you offer ongoing support after installation?',
        a: 'Yes. All our installations are backed by our Managed Services offering — 24×7 monitoring, remote IT support, patch management, and proactive maintenance — ensuring your infrastructure runs at peak performance long after deployment.',
    },
    {
        q: 'Can you migrate our existing infrastructure to the cloud?',
        a: 'Absolutely. We specialise in on-premise to cloud migrations (AWS and Azure), hybrid cloud setups, and cloud resource optimisation. We assess your existing environment first and design a migration plan that minimises downtime and risk.',
    },
    {
        q: 'What is your IoT Smart Waste Management system?',
        a: 'Our IoT Smart Waste Management system uses sensor-equipped bins that transmit real-time fill-level and location data to a central operations dashboard. This enables dynamic, data-driven collection routing — reducing fuel costs, carbon emissions, and missed collections for municipalities and facilities managers.',
    },
];

// ── Blog ──────────────────────────────────────────────────────────────────────
const blogPosts = [
    { img: '/images/post-1.jpg', title: 'Why Every Business Needs a Structured Cabling Strategy in 2025', delay: '' },
    { img: '/images/post-2.jpg', title: 'On-Premise vs. Hybrid Cloud: What\'s Right for Your Business?', delay: '0.2s' },
    { img: '/images/post-3.jpg', title: 'How IoT Smart Waste Systems Are Transforming Urban Sanitation', delay: '0.4s' },
];

const inputStyle = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    fontFamily: 'var(--default-font)',
    outline: 'none',
    background: '#fff',
    color: 'var(--primary-color)',
    marginBottom: '0',
};

/** --------------------------------------------------------------------------
 *  MAIN APP COMPONENT
 *  -------------------------------------------------------------------------- */

export default function HomePage() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [heroReady, setHeroReady] = useState(false);
    const [isScrollLocked, setIsScrollLocked] = useState(true);
    const [faqOpen, setFaqOpen] = useState(0);
    const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
    const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
    const [heroActiveIndex, setHeroActiveIndex] = useState(0);

    const [exp, expRef] = useCountUp(12);
    const [clients, clientsRef] = useCountUp(150);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadeOut(true), 800);
        const heroTimer = setTimeout(() => setHeroReady(true), 1200);
        const scrollTimer = setTimeout(() => setIsScrollLocked(false), 1400);
        const removeTimer = setTimeout(() => setVisible(false), 2000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(heroTimer);
            clearTimeout(scrollTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    useEffect(() => {
        if (visible) return;

        const elements = document.querySelectorAll('.wow, .reveal, .reveal-wipe, .fadeupin');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        el.style.animationDelay = el.dataset.wowDelay || '0s';
                        el.classList.add('animated');
                        if (!el.classList.contains('reveal-wipe') && !el.classList.contains('fadeupin')) {
                            el.classList.add('fadeInUp');
                        }
                        el.style.visibility = 'visible';
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.12 }
        );
        elements.forEach((el) => {
            if (!el.classList.contains('fadeupin')) {
                el.style.visibility = 'hidden';
            }
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [visible]);

    useEffect(() => {
        if (isScrollLocked) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.height = '';
        }

        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [isScrollLocked]);


    const goToProjectSlide = (index) => {
        const total = projects.length;
        setCurrentProjectSlide((index + total) % total);
    };

    const handleContactChange = (e) => setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactSubmitted(true);
        setTimeout(() => setContactSubmitted(false), 4000);
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail) {
            setNewsletterSubscribed(true);
            setNewsletterEmail('');
            setTimeout(() => setNewsletterSubscribed(false), 3000);
        }
    };

    return (
        <>
            {/* Preloader */}
            {visible && (
                <div className={`preloader${fadeOut ? ' fade-out' : ''}`} style={{
                    opacity: fadeOut ? 0 : 1,
                    transition: 'opacity 1s ease-in-out',
                    pointerEvents: fadeOut ? 'none' : 'all',
                    visibility: visible ? 'visible' : 'hidden'
                }}>
                    <div className="loading-container">
                        <div className="loading"></div>
                        <div id="loading-icon">
                            <img src="/images/loader.svg" alt="Loading" />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Website Wrapper */}
            <div className="main-site-wrapper" style={{
                opacity: fadeOut ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                visibility: fadeOut ? 'visible' : 'hidden'
            }}>

                {/* Header */}
                <Navbar />

                <main>
                    {/* ── Hero Section ─────────────────────────────────────────────────────── */}
                    <div className="hero hero-slider-layout" id="hero">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            pagination={{ el: '.hero-pagination', clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            onSlideChange={(swiper) => setHeroActiveIndex(swiper.realIndex)}
                            loop={true}
                            speed={800}
                        >
                            {slides.map((slide, i) => (
                                <SwiperSlide key={i}>
                                    <div className="hero-slide">
                                        <div className="hero-slider-image">
                                            <img src={slide.bg} alt="" />
                                        </div>
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col-lg-7">
                                                    <div className={`hero-content ${heroReady && heroActiveIndex === i ? 'hero-revealed' : ''}`}>
                                                        <div className="section-title dark-section">
                                                            <h3 className="hero-stagger">{slide.subtitle}</h3>
                                                            <h1 className="hero-stagger" style={{ animationDelay: '0.2s' }}>
                                                                {slide.title}
                                                            </h1>
                                                            <p className="hero-stagger" style={{ animationDelay: '0.4s' }}>
                                                                {slide.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}                            <div className="hero-pagination"></div>
                        </Swiper>
                    </div>

                    {/* ── About Us Section ─────────────────────────────────────────────────── */}
                    <div className="about-us" id="about">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="about-us-image">
                                        <div className="about-image-box about-img-1">
                                            <figure className="image-anime reveal-wipe">
                                                <img src="/images/about-image-1.jpg" alt="Bash Technologies network engineers at work" />
                                            </figure>
                                        </div>
                                        <div className="about-image-box">
                                            <div className="about-img-2">
                                                <figure className="image-anime reveal-wipe">
                                                    <img src="/images/about-image-2.jpg" alt="Server room infrastructure" />
                                                </figure>
                                            </div>
                                            <div className="about-img-3">
                                                <figure className="image-anime reveal-wipe">
                                                    <img src="/images/about-image-3.jpg" alt="Cloud and IoT integration" />
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="get-free-security-circle">
                                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                                                <img src="/images/get-free-security-circle.svg" alt="Free IT audit" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="about-us-content">
                                        <div className="section-title">
                                            <h3 className="fadeupin">about us</h3>
                                            <h2 className="fadeupin" data-wow-delay="0.2s">
                                                Your end-to-end partner for <span>IT infrastructure & smart technology</span>
                                            </h2>
                                            <p className="fadeupin" data-wow-delay="0.4s">
                                                Bash Technologies is a specialist IT infrastructure and IoT solutions provider helping businesses build resilient, secure, and scalable technology environments. With over 12 years of field experience, we deliver everything from enterprise network architecture and cloud migration to next-generation IoT deployments — under one roof, with a single point of accountability.
                                            </p>
                                        </div>

                                        <div className="about-us-body fadeupin" data-wow-delay="0.6s">
                                            <div className="about-us-body-img">
                                                <figure className="image-anime">
                                                    <img src="/images/about-body-img.png" alt="IT support and monitoring" />
                                                </figure>
                                            </div>
                                            <div className="about-us-body-content">
                                                <h3>24×7 managed IT support</h3>
                                                <p>Round-the-clock monitoring and remote support for your entire IT environment — so issues are resolved before they affect your business.</p>
                                            </div>
                                        </div>

                                        <div className="about-us-footer fadeupin" data-wow-delay="0.8s">
                                            <div className="about-footer-list">
                                                <ul>
                                                    <li>Network Design & Cloud Migration</li>
                                                    <li>Cybersecurity & Compliance</li>
                                                    <li>IoT & Smart Systems Integration</li>
                                                </ul>
                                            </div>
                                            <div className="about-footer-content">
                                                <div className="about-contact-btn">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Services Section ──────────────────────────────────────────────────── */}
                    <div className="our-services" id="services">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h3 className="fadeupin">our services</h3>
                                        <h2 className="fadeupin" data-wow-delay="0.2s">
                                            Bash Technologies Provides<br></br> <span>end-to-end IT, networking, cybersecurity, and IoT solutions for smarter business growth.</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {services.map((s, i) => (
                                    <div className="col-lg-4 col-md-6" key={i}>
                                        <div className={`service-item fadeupin${s.active ? ' active' : ''}`} data-wow-delay="0.4s">
                                            <div className="icon-box">
                                                <img src={s.icon} alt={s.title} />
                                            </div>
                                            <div className="service-title-box">
                                                <div className="service-title">
                                                    <h3><Link to="/managed-it-services">{s.title}</Link></h3>
                                                </div>
                                                <div className="service-btn">
                                                    <Link to="/managed-it-services">
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="service-content">
                                                <p>{s.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Features Section ──────────────────────────────────────────────────── */}
                    <div className="our-feature" id="features">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <div className="our-feature-images">
                                        <div className="feature-image">
                                            <figure className="image-anime reveal">
                                                <img src="/images/feature-image-1.jpg" alt="IT infrastructure monitoring" />
                                            </figure>
                                        </div>
                                        <div className="company-experience-info">
                                            <div className="feature-image">
                                                <figure className="image-anime reveal">
                                                    <img src="/images/feature-image-2.jpg" alt="Server room management" />
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="our-feature-content">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">why we're different</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                Built for reliability, <span>designed for your business</span>
                                            </h2>
                                        </div>
                                        <div className="ferature-list">
                                            {featuresList.map((f, i) => (
                                                <div className="ferature-list-item wow fadeInUp" data-wow-delay={f.delay} key={i}>
                                                    <div className="icon-box">
                                                        <img src={f.icon} alt="" />
                                                    </div>
                                                    <div className="ferature-list-content">
                                                        <h3>{f.title}</h3>
                                                        <p>{f.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Projects / Case Studies Section ───────────────────────────────────── */}
                    <section className="project-style-one-area" id="projects">
                        <div className="gradient-band">
                            <div className="container">
                                <div className="heading-left-new">
                                    <h5 className="sub-title-new">Case Studies</h5>
                                    <h2 className="title-new">Real results for<br />real businesses</h2>
                                </div>
                            </div>

                            <div className="project-swiper-nav-new">
                                <button className="nav-btn-new" onClick={() => goToProjectSlide(currentProjectSlide - 1)} aria-label="Previous">&#8249;</button>
                                <span className="slide-counter-new">{currentProjectSlide + 1} / {projects.length}</span>
                                <button className="nav-btn-new" onClick={() => goToProjectSlide(currentProjectSlide + 1)} aria-label="Next">&#8250;</button>
                            </div>
                        </div>

                        <div className="carousel-wrapper-new">
                            <div className="container">
                                <div className="slides-track-new">
                                    <div className="slides-inner-new" style={{ transform: `translateX(-${currentProjectSlide * 100}%)` }}>
                                        {projects.map((p, i) => (
                                            <div className="project-card-new" key={i}>
                                                <div className="project-thumb-new">
                                                    <figure className="image-anime">
                                                        <img src={p.img} alt={p.title} />
                                                    </figure>
                                                </div>
                                                <div className="project-info-new">
                                                    <span className="category-new">{p.cat}</span>
                                                    <h2>{p.title}</h2>
                                                    <p>{p.desc}</p>
                                                    <a href="#projects" className="btn-view-new">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>View Case Study</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Why Choose Us Section ─────────────────────────────────────────────── */}
                    <div className="why-choose-us" id="why-choose">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="why-choose-image">
                                        <figure className="image-anime reveal">
                                            <img src="/images/why-choose-image.jpg" alt="Bash Technologies IT team" />
                                        </figure>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="why-choose-content">
                                        <div className="section-title dark-section">
                                            <h3 className="wow fadeInUp">why choose us</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                The trusted IT partner businesses rely on
                                            </h2>
                                        </div>
                                        <div className="why-choose-list">
                                            {whyItems.map((item, i) => (
                                                <div className="why-choose-item wow fadeInUp" data-wow-delay={item.delay} key={i}>
                                                    <div className="icon-box">
                                                        <img src={item.icon} alt="" />
                                                    </div>
                                                    <div className="why-choose-item-content">
                                                        <h3>{item.title}</h3>
                                                        <p>{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="why-choose-counter-list">
                                        {counters.map((c, i) => (
                                            <div className="why-choose-counter-item" key={i}>
                                                <div className="icon-box">
                                                    <img src={c.icon} alt="" />
                                                </div>
                                                <div className="why-choose-counter-content">
                                                    <h3><Counter target={c.num} suffix={c.suffix} /></h3>
                                                    <p>{c.label}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Our Capabilities Section ──────────────────────────────────────────── */}
                    <div className="our-security" id="security">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="our-security-content">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">our capabilities</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                The full technology stack, <span>managed for you</span>
                                            </h2>
                                        </div>
                                        <div className="security-content-box">
                                            <div className="security-content-item wow fadeInUp" data-wow-delay="0.4s">
                                                <h3>enterprise network architecture:</h3>
                                                <p>We design and implement high-performance LAN/WAN networks with VLAN segmentation, enterprise-grade Wi-Fi, and integrated security — built for reliability and future scalability.</p>
                                            </div>
                                            <div className="security-content-item wow fadeInUp" data-wow-delay="0.6s">
                                                <h3>cloud & virtualisation solutions:</h3>
                                                <p>From VMware and Hyper-V virtualisation to hybrid AWS/Azure deployments, we modernise your infrastructure for maximum efficiency, resilience, and cost savings.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="our-security-image-content">
                                        <div className="security-image order-lg-1 order-2">
                                            <figure className="image-anime reveal">
                                                <img src="/images/our-security-image.jpg" alt="IT infrastructure capabilities" />
                                            </figure>
                                        </div>
                                        <div className="security-content-item order-lg-2 order-1 wow fadeInUp">
                                            <h3>IoT smart systems integration:</h3>
                                            <p>We extend your IT capabilities into the physical world — deploying sensor networks, smart waste management systems, and connected device platforms that generate actionable real-world data.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="security-list">
                                        {[
                                            { title: 'End-to-end cybersecurity', desc: 'Firewall deployment, VPN setup, endpoint protection, intrusion detection, and full security compliance audits to keep your business protected.' },
                                            { title: 'Structured cabling & hardware', desc: 'Professional Cat6/Fiber cabling, rack installation, patch panel management, and CCTV & access control integration for a solid physical foundation.' },
                                            { title: '24×7 monitoring & managed services', desc: 'Continuous network and server monitoring, patch management, remote support, and incident response — keeping your infrastructure running without interruption.' },
                                        ].map((item, i) => (
                                            <div className="security-list-item wow fadeInUp" data-wow-delay={`${i * 0.2}s`} key={i}>
                                                <h3>{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Pricing Section ───────────────────────────────────────────────────── */}
                    <div className="our-pricing" id="pricing">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">managed services pricing</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            Transparent, predictable plans <span>for every business size</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {pricingPlans.map((plan, i) => (
                                    <div className="col-lg-4 col-md-6" key={i}>
                                        <div className={`pricing-item wow fadeInUp${plan.highlighted ? ' highlighted-box' : ''}`} data-wow-delay={plan.delay}>
                                            <div className="pricing-header">
                                                <h3>{plan.name}</h3>
                                                <h2><sup>$</sup>{plan.price}<sub>/per month</sub></h2>
                                                <p>Predictable IT management costs, zero surprises.</p>
                                                <div className="icon-box">
                                                    <img src={plan.icon} alt="" />
                                                </div>
                                            </div>
                                            <div className="pricing-body">
                                                <div className="pricing-list">
                                                    <ul>
                                                        {pricingFeatures.map((f, j) => <li key={j}>{f}</li>)}
                                                    </ul>
                                                </div>
                                                <div className="pricing-btn">
                                                    <a href="#contact" className={`btn-default${plan.highlighted ? ' btn-highlighted' : ''}`}
                                                        onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                                                        get started
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="col-lg-12">
                                    <div className="pricing-benefit-list wow fadeInUp" data-wow-delay="0.6s">
                                        <ul>
                                            {pricingBenefits.map((b, i) => (
                                                <li key={i}><img src={b.icon} alt="" />{b.text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Testimonials Section ──────────────────────────────────────────────── */}
                    <div className="our-testimonials" id="testimonials">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">client testimonials</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            What our clients <span>say about us</span>
                                        </h2>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="testimonial-box">
                                        <div className="testimonial-video-button">
                                            <a href="https://www.youtube.com/watch?v=Y-x0efG1seA" target="_blank" rel="noreferrer">
                                                <i className="fa-solid fa-play"></i>
                                            </a>
                                            <h3>Watch our story</h3>
                                        </div>

                                        <div className="testimonial-slider-box">
                                            <div className="testimonial-slider">
                                                <Swiper
                                                    modules={[Navigation]}
                                                    navigation={{
                                                        prevEl: '.testimonial-button-prev',
                                                        nextEl: '.testimonial-button-next',
                                                    }}
                                                    loop={true}
                                                    slidesPerView={1}
                                                >
                                                    {testimonialsList.map((t, i) => (
                                                        <SwiperSlide key={i}>
                                                            <div className="testimonial-item">
                                                                <div className="testimonial-header">
                                                                    <div className="testimonial-company-logo">
                                                                        <img src="/images/company-logo.svg" alt="" />
                                                                    </div>
                                                                    <div className="testimonial-quote">
                                                                        <img src="/images/testimonial-quote.svg" alt="" />
                                                                    </div>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <p>"{t.text}"</p>
                                                                </div>
                                                                <div className="testimonial-body">
                                                                    <div className="author-image">
                                                                        <figure className="image-anime">
                                                                            <img src={t.avatar} alt={t.author} />
                                                                        </figure>
                                                                    </div>
                                                                    <div className="author-content">
                                                                        <h3>{t.author}</h3>
                                                                        <p>{t.role}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                    <div className="testimonial-btn">
                                                        <div className="testimonial-button-prev"></div>
                                                        <div className="testimonial-button-next"></div>
                                                    </div>
                                                </Swiper>
                                            </div>

                                            <div className="testimonial-contact-info">
                                                <div className="testimonial-contact-box">
                                                    <div className="icon-box">
                                                        <img src="/images/icon-phone.svg" alt="" />
                                                    </div>
                                                    <div className="testimonial-contact-content">
                                                        <p>Have a question about our IT services? Our specialists are ready to help. <span><a href="tel:+91123456789">+91-123 456 789</a></span></p>
                                                    </div>
                                                </div>
                                                <div className="testimonial-contact-btn">
                                                    <a href="#contact" className="btn-default"
                                                        onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                                                        contact us
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Team Section ──────────────────────────────────────────────────────── */}
                    <div className="our-team" id="team">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title dark-section">
                                        <h3 className="wow fadeInUp">expert team</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">Meet the engineers behind Bash Technologies</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {teamList.map((member, i) => (
                                    <div className="col-lg-3 col-md-6" key={i}>
                                        <div className="team-item wow fadeInUp" data-wow-delay={member.delay}>
                                            <div className="team-image">
                                                <a href="#team">
                                                    <figure className="image-anime">
                                                        <img src={member.img} alt={member.name} />
                                                    </figure>
                                                </a>
                                                <div className="team-social-icon">
                                                    <ul>
                                                        <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                        <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="team-content">
                                                <h3><a href="#team">{member.name}</a></h3>
                                                <p>{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── CTA Section ───────────────────────────────────────────────────────── */}
                    <div className="cta-box-section" id="cta">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cta-box">
                                        <div className="cta-box-content">
                                            <div className="section-title dark-section">
                                                <h2 className="wow fadeInUp">Ready to build infrastructure that never lets you down?</h2>
                                            </div>
                                            <div className="cta-contact-info">
                                                <div className="cta-contact-item">
                                                    <div className="icon-box">
                                                        <img src="/images/icon-phone.svg" alt="" />
                                                    </div>
                                                    <div className="cta-contact-content">
                                                        <h3>Speak to an IT specialist</h3>
                                                        <p><a href="tel:+91123456789">+91 123 456 789</a></p>
                                                    </div>
                                                </div>
                                                <div className="cta-contact-item">
                                                    <div className="icon-box">
                                                        <img src="/images/icon-mail.svg" alt="" />
                                                    </div>
                                                    <div className="cta-contact-content">
                                                        <h3>Send us an email</h3>
                                                        <p><a href="mailto:sales@bashtechnologies.com">hello@bashtechnologies.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cta-box-image">
                                            <figure className="image-anime reveal">
                                                <img src="/images/cta-box-image.jpg" alt="Bash Technologies IT infrastructure" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── FAQs Section ──────────────────────────────────────────────────────── */}
                    <div className="our-faqs home-our-faqs" id="faqs">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="faq-content">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">faq</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                Your IT questions <span>answered clearly</span>
                                            </h2>
                                        </div>
                                        <div className="faq-image">
                                            <figure className="image-anime reveal">
                                                <img src="/images/faq-image.jpg" alt="IT infrastructure FAQ" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="faq-accordion" id="accordion">
                                        {faqsList.map((faq, i) => (
                                            <div className="accordion-item wow fadeInUp" data-wow-delay={`${i * 0.2}s`} key={i}>
                                                <h2 className="accordion-header">
                                                    <button
                                                        className={`accordion-button${faqOpen === i ? '' : ' collapsed'}`}
                                                        type="button"
                                                        onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                                                    >
                                                        {faq.q}
                                                    </button>
                                                </h2>
                                                <div className={`accordion-collapse collapse${faqOpen === i ? ' show' : ''}`}>
                                                    <div className="accordion-body">
                                                        <p>{faq.a}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Blog Section ──────────────────────────────────────────────────────── */}
                    <div className="our-blog" id="blog">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">latest insights</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            IT & IoT knowledge <span>from our experts</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {blogPosts.map((post, i) => (
                                    <div className="col-lg-4 col-md-6" key={i}>
                                        <div className="post-item wow fadeInUp" data-wow-delay={post.delay}>
                                            <div className="post-featured-image">
                                                <a href="#blog">
                                                    <figure className="image-anime">
                                                        <img src={post.img} alt={post.title} />
                                                    </figure>
                                                </a>
                                            </div>
                                            <div className="post-item-content">
                                                <div className="post-item-body">
                                                    <h2><a href="#blog">{post.title}</a></h2>
                                                </div>
                                                <div className="post-item-btn">
                                                    <a href="#blog" className="post-btn">
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Contact Us Section ────────────────────────────────────────────────── */}
                    <div className="contact-us-section" id="contact" style={{ padding: '100px 0', background: 'var(--secondary-color)' }}>
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center">
                                        <h3 className="wow fadeInUp">contact us</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            Talk to our <span>IT infrastructure specialists</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {contactSubmitted && (
                                        <div className="alert" style={{
                                            background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary-color))',
                                            color: '#fff', padding: '16px 24px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center', fontWeight: 600
                                        }}>
                                            ✓ Message sent! One of our specialists will be in touch within 1 business day.
                                        </div>
                                    )}
                                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="text" name="name" value={contactForm.name} onChange={handleContactChange}
                                                    placeholder="Your Name" required
                                                    style={inputStyle}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="email" name="email" value={contactForm.email} onChange={handleContactChange}
                                                    placeholder="Your Email Address" required
                                                    style={inputStyle}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input
                                                    type="text" name="phone" value={contactForm.phone} onChange={handleContactChange}
                                                    placeholder="Phone Number"
                                                    style={inputStyle}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text" name="subject" value={contactForm.subject} onChange={handleContactChange}
                                                    placeholder="Service You're Interested In"
                                                    style={inputStyle}
                                                />
                                            </div>
                                        </div>
                                        <textarea
                                            name="message" value={contactForm.message} onChange={handleContactChange}
                                            placeholder="Tell us about your current IT setup and what you'd like to achieve" rows={6} required
                                            style={{ ...inputStyle, resize: 'vertical' }}
                                        />
                                        <div style={{ textAlign: 'center' }}>
                                            <button type="submit" className="btn-default">send message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── Footer ────────────────────────────────────────────────────────────── */}
                <footer className="main-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-header">
                                    <div className="footer-logo">
                                        <img src="/images/footer-logo.svg" alt="Bash Technologies" />
                                    </div>
                                    <div className="footer-social-links">
                                        <ul>
                                            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="footer-links footer-newsletter-form">
                                    <h3>Subscribe to our newsletter:</h3>
                                    <p>Get the latest IT infrastructure insights, best practices, and technology updates delivered to your inbox.</p>
                                    {newsletterSubscribed ? (
                                        <p style={{ color: 'var(--accent-secondary-color)', fontWeight: 600 }}>✓ Subscribed successfully!</p>
                                    ) : (
                                        <form onSubmit={handleNewsletterSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                                                    className="form-control" placeholder="Enter Your Email" required
                                                />
                                                <button type="submit" className="newsletter-btn">
                                                    <i className="fa-regular fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links footer-quick-links">
                                    <h3>Quick links</h3>
                                    <ul>
                                        {[['hero', 'home'], ['about', 'about us'], ['services', 'services'], ['blog', 'blog']].map(([id, label]) => (
                                            <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links">
                                    <h3>Services</h3>
                                    <ul>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Network Design</a></li>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Cloud Migration</a></li>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>IT Security</a></li>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>IoT Solutions</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links">
                                    <h3>Support</h3>
                                    <ul>
                                        <li><a href="#">Help Center</a></li>
                                        <li><a href="#">Terms &amp; Conditions</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact us</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links">
                                    <h3>Contact</h3>
                                    <ul>
                                        <li><a href="tel:+91123456789">+91 123 456 789</a></li>
                                        <li><a href="mailto:hello@bashtechnologies.com">hello@bashtechnologies.com</a></li>
                                        <li>123, Tech Park, Sector 5, Mumbai, India</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-copyright">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="footer-copyright-text">
                                        <p>Copyright © 2025 Bash Technologies. All Rights Reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}