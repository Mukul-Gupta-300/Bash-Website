import { useEffect, useState, useRef } from 'react';
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

                        // ✅ Ease-in-out cubic: slow start, fast middle, slow end
                        const easeInOut = progress < 0.5
                            ? 4 * progress ** 3
                            : 1 - (-2 * progress + 2) ** 3 / 2;

                        // ✅ Math.round instead of Math.floor avoids stalling on the same value
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
    { bg: '/images/hero-bg.jpg' },
    { bg: '/images/hero-bg-2.jpg' },
];

const services = [
    { icon: '/images/icon-service-1.svg', title: 'Smart Device Connectivity' },
    { icon: '/images/icon-service-2.svg', title: 'Real-Time Data Analytics' },
    { icon: '/images/icon-service-3.svg', title: 'Edge Computing Solutions' },
    { icon: '/images/icon-service-4.svg', title: 'IoT Platform Integration' },
    { icon: '/images/icon-service-5.svg', title: 'Predictive Maintenance' },
    { icon: '/images/icon-service-6.svg', title: 'Remote Device Management' },
];

const featuresList = [
    {
        icon: '/images/icon-ferature-1.svg',
        title: 'real-time device monitoring',
        desc: 'Real-Time Device Monitoring provides instant visibility into your connected assets, enabling proactive alerts and seamless control from a single dashboard.',
        delay: '0.4s',
    },
    {
        icon: '/images/icon-ferature-2.svg',
        title: 'intelligent automation',
        desc: 'Intelligent Automation uses AI-driven rules and triggers to streamline workflows, reduce manual effort, and keep your IoT ecosystem running efficiently.',
        delay: '0.6s',
    },
    {
        icon: '/images/icon-ferature-3.svg',
        title: '24/7 connectivity & support',
        desc: '24/7 Connectivity & Support ensures your devices stay online around the clock, with dedicated engineers ready to resolve issues the moment they arise.',
        delay: '0.8s',
    },
];

const projects = [
    {
        img: '/images/project-1.jpg',
        cat: 'Smart Manufacturing',
        title: 'Factory floor of the future',
        desc: 'We deployed a network of 2,000+ connected sensors across a manufacturing plant, delivering live production metrics, automated quality checks, and a 34% reduction in unplanned downtime within the first quarter.'
    },
    {
        img: '/images/project-2.jpg',
        cat: 'Smart Cities',
        title: 'Intelligent urban infrastructure',
        desc: 'Our city-wide IoT platform connected street lighting, waste management, and traffic systems into a unified dashboard, cutting municipal energy costs by 28% and improving response times for city services.'
    },
    {
        img: '/images/project-3.jpg',
        cat: 'Precision Agriculture',
        title: 'Connected farming at scale',
        desc: 'By embedding soil, weather, and irrigation sensors across 5,000 acres, we helped farmers make data-driven decisions that increased crop yields by 22% while reducing water usage significantly.'
    },
];

const whyItems = [
    { icon: '/images/icon-why-choose-1.svg', title: 'deep IoT expertise', desc: 'A team of seasoned engineers and data scientists with hands-on experience across industrial, consumer, and enterprise IoT ecosystems.', delay: '0.4s' },
    { icon: '/images/icon-why-choose-2.svg', title: 'end-to-end ownership', desc: 'From hardware prototyping and firmware to cloud dashboards and analytics, we own the full stack so nothing falls through the cracks.', delay: '0.6s' },
    { icon: '/images/icon-why-choose-3.svg', title: 'scalable by design', desc: 'Our platform is built to grow with you — from 10 devices in a pilot to 10 million devices in global production without re-architecting.', delay: '0.8s' },
];

const counters = [
    { icon: '/images/icon-why-choose-counter-1.svg', num: 12, suffix: '+', label: 'Years Experience' },
    { icon: '/images/icon-why-choose-counter-2.svg', num: 8, suffix: 'K', label: 'Devices Deployed' },
    { icon: '/images/icon-why-choose-counter-3.svg', num: 500, suffix: '+', label: 'Happy Clients' },
    { icon: '/images/icon-why-choose-counter-4.svg', num: 40, suffix: '', label: 'Industry Awards' },
];

const pricingPlans = [
    { name: 'Starter plan', price: 29, icon: '/images/icon-pricing-1.svg', highlighted: false, delay: '' },
    { name: 'Growth plan', price: 79, icon: '/images/icon-pricing-2.svg', highlighted: true, delay: '0.2s' },
    { name: 'Enterprise plan', price: 149, icon: '/images/icon-pricing-3.svg', highlighted: false, delay: '0.4s' },
];

const pricingFeatures = [
    'Up to 50 connected devices',
    'Real-time monitoring dashboard',
    'Automated alerts & notifications',
    'Standard API integrations',
];

const pricingBenefits = [
    { icon: '/images/icon-pricing-benefit-1.svg', text: 'Get 30 day free trial' },
    { icon: '/images/icon-pricing-benefit-2.svg', text: 'No any hidden fees pay' },
    { icon: '/images/icon-pricing-benefit-3.svg', text: 'You can cancel anytime' },
];

const testimonialsList = [
    {
        author: 'David Kaur',
        role: 'Head of Operations',
        avatar: '/images/author-1.jpg',
        text: 'Switching to this IoT platform transformed how we manage our production lines. Device uptime improved dramatically and the real-time analytics helped us spot inefficiencies we had been missing for years. An absolute game-changer for our team.',
    },
    {
        author: 'Priya Sharma',
        role: 'CTO, AgriTech Ventures',
        avatar: '/images/author-2.jpg',
        text: 'The ease of onboarding our sensor network was impressive. Within two weeks we had live dashboards and automated irrigation triggers running. The support team was there every step of the way — truly exceptional service.',
    },
];

const teamList = [
    { img: '/images/team-1.jpg', name: 'james whitfield', role: 'IoT Architect', delay: '' },
    { img: '/images/team-2.jpg', name: 'ananya singh', role: 'Embedded Systems Engineer', delay: '0.2s' },
    { img: '/images/team-3.jpg', name: 'ryan o\'brien', role: 'Cloud Infrastructure Lead', delay: '0.4s' },
    { img: '/images/team-4.jpg', name: 'mei-lin zhou', role: 'Data & Analytics Engineer', delay: '0.6s' },
];

const faqsList = [
    { q: 'What is the Internet of Things (IoT)?', a: 'IoT refers to the network of physical devices — sensors, machines, vehicles, and appliances — embedded with software and connectivity that enables them to collect and exchange data over the internet.' },
    { q: 'How quickly can I get my devices connected?', a: 'Most customers complete their first device integration within 48 hours using our guided onboarding wizard and pre-built SDKs for all major hardware platforms.' },
    { q: 'What industries do you support?', a: 'We serve a wide range of verticals including smart manufacturing, agriculture, logistics, smart cities, healthcare, and retail. Our platform is industry-agnostic and highly configurable.' },
    { q: 'Is my device data secure on your platform?', a: 'Absolutely. All data is encrypted in transit and at rest, and our platform complies with ISO 27001, GDPR, and SOC 2 Type II standards to keep your information safe.' },
];

const blogPosts = [
    { img: '/images/post-1.jpg', title: 'Edge AI: Processing Data Where It Lives', delay: '' },
    { img: '/images/post-2.jpg', title: 'Why MQTT Still Dominates IoT Messaging', delay: '0.2s' },
    { img: '/images/post-3.jpg', title: 'Digital Twins: A Practical Guide for Manufacturers', delay: '0.4s' },
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
    const [menuOpen, setMenuOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);
    const [homeOpen, setHomeOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [faqOpen, setFaqOpen] = useState(0);
    const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
    const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
    const [heroActiveIndex, setHeroActiveIndex] = useState(0);

    const [exp, expRef] = useCountUp(25);
    const [clients, clientsRef] = useCountUp(500);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadeOut(true), 800);
        const heroTimer = setTimeout(() => setHeroReady(true), 1200);
        const scrollTimer = setTimeout(() => setIsScrollLocked(false), 1400);
        const removeTimer = setTimeout(() => setVisible(false), 2000);

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(heroTimer);
            clearTimeout(scrollTimer);
            clearTimeout(removeTimer);
            window.removeEventListener('scroll', handleScroll);
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

                        // Add animated class to trigger animation from custom.css
                        el.classList.add('animated');

                        // If it's a generic wow element without specific custom animation classes, 
                        // add fadeInUp as default. If it has fadeupin or reveal-wipe, those 
                        // classes will handle their own animation logic via .animated class in CSS.
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

    const scrollTo = (id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

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

                {/* Topbar */}
                <div className="topbar">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <div className="topbar-info-text">
                                    <p>Connecting the physical and digital world — <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Talk to us today</a></p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="topbar-links">
                                    <div className="topbar-contact-info">
                                        <ul>
                                            <li><a href="#">Help</a></li>
                                            <li><a href="#">Support</a></li>
                                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
                                        </ul>
                                    </div>
                                    <div className="topbar-social-links">
                                        <ul>
                                            <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <header className={`main-header${scrolled ? ' sticky' : ''}`}>
                    <div className="header-sticky">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container">
                                <a className="navbar-brand" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                                    <img src="/images/logo.svg" alt="Bash Technolgoies IoT Logo" />
                                </a>

                                <div className={`collapse navbar-collapse main-menu${menuOpen ? ' show' : ''}`}>
                                    <div className="nav-menu-wrapper">
                                        <ul className="navbar-nav mr-auto" id="menu">
                                            <li className="nav-item submenu" onMouseEnter={() => setHomeOpen(true)} onMouseLeave={() => setHomeOpen(false)}>
                                                <a className="nav-link" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a>
                                                {homeOpen && (
                                                    <ul style={{ display: 'block' }}>
                                                        <li className="nav-item"><a className="nav-link" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home - Main</a></li>
                                                    </ul>
                                                )}
                                            </li>
                                            <li className="nav-item"><a className="nav-link" href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About Us</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Solutions</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#blog" onClick={(e) => { e.preventDefault(); scrollTo('blog'); }}>Blog</a></li>
                                            <li className="nav-item submenu" onMouseEnter={() => setPagesOpen(true)} onMouseLeave={() => setPagesOpen(false)}>
                                                <a className="nav-link" href="#">Pages</a>
                                                {pagesOpen && (
                                                    <ul style={{ display: 'block' }}>
                                                        <li className="nav-item"><a className="nav-link" href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Solution Details</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="#blog" onClick={(e) => { e.preventDefault(); scrollTo('blog'); }}>Blog Details</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Case Studies</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="#team" onClick={(e) => { e.preventDefault(); scrollTo('team'); }}>Our Team</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="#pricing" onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}>Pricing</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Testimonials</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="#faqs" onClick={(e) => { e.preventDefault(); scrollTo('faqs'); }}>FAQs</a></li>
                                                    </ul>
                                                )}
                                            </li>
                                            <li className="nav-item"><a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact Us</a></li>
                                        </ul>
                                    </div>
                                    <div className="header-btn">
                                        <a href="#contact" className="btn-default" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>get started</a>
                                    </div>
                                </div>

                                <div className={`navbar-toggle${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}></div>
                            </div>
                        </nav>
                        <div className="responsive-menu"></div>
                    </div>
                </header>

                <main>
                    {/* Hero Section */}
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
                                                            <h3 className="hero-stagger">welcome to Bash Technolgoies iot</h3>
                                                            <h1 className="hero-stagger" style={{ animationDelay: '0.2s' }}>
                                                                Connect everything, unlock every insight!
                                                            </h1>
                                                            <p className="hero-stagger" style={{ animationDelay: '0.4s' }}>
                                                                Transform your physical assets into intelligent, data-driven systems
                                                                with our end-to-end IoT platform built for the businesses of tomorrow.
                                                            </p>
                                                        </div>
                                                        <div className="hero-content-body hero-stagger" style={{ animationDelay: '0.6s' }}>
                                                            <div className="hero-btn">
                                                                <a href="#contact" className="btn-default btn-highlighted"
                                                                    onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                                                                    learn more
                                                                </a>
                                                            </div>
                                                            <div className="video-play-button">
                                                                <a href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                                                                    target="_blank" rel="noreferrer">
                                                                    <i className="fa-solid fa-play"></i>
                                                                </a>
                                                                <h3>Play video</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className="hero-pagination"></div>
                        </Swiper>
                    </div>

                    {/* About Us Section */}
                    <div className="about-us" id="about">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="about-us-image">
                                        <div className="about-image-box about-img-1">
                                            <figure className="image-anime reveal-wipe">
                                                <img src="/images/about-image-1.jpg" alt="" />
                                            </figure>
                                        </div>
                                        <div className="about-image-box">
                                            <div className="about-img-2">
                                                <figure className="image-anime reveal-wipe">
                                                    <img src="/images/about-image-2.jpg" alt="" />
                                                </figure>
                                            </div>
                                            <div className="about-img-3">
                                                <figure className="image-anime reveal-wipe">
                                                    <img src="/images/about-image-3.jpg" alt="" />
                                                </figure>
                                            </div>
                                        </div>
                                        <div className="get-free-security-circle">
                                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                                                <img src="/images/get-free-security-circle.svg" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="about-us-content">
                                        <div className="section-title">
                                            <h3 className="fadeupin">about us</h3>
                                            <h2 className="fadeupin" data-wow-delay="0.2s">
                                                Your trusted partner in building <span>connected IoT solutions</span>
                                            </h2>
                                            <p className="fadeupin" data-wow-delay="0.4s">
                                                We design, build, and scale IoT ecosystems that help businesses harness
                                                the power of real-time data and automation across every industry.
                                            </p>
                                        </div>

                                        <div className="about-us-body fadeupin" data-wow-delay="0.6s">
                                            <div className="about-us-body-img">
                                                <figure className="image-anime">
                                                    <img src="/images/about-body-img.png" alt="" />
                                                </figure>
                                            </div>
                                            <div className="about-us-body-content">
                                                <h3>24/7 device monitoring</h3>
                                                <p>Always-on visibility across your entire connected fleet, with instant alerts and remote diagnostics built in.</p>
                                            </div>
                                        </div>

                                        <div className="about-us-footer fadeupin" data-wow-delay="0.8s">
                                            <div className="about-footer-list">
                                                <ul>
                                                    <li>Hardware & Firmware Development</li>
                                                    <li>Cloud Platform & Dashboard</li>
                                                    <li>AI-Powered Data Analytics</li>
                                                </ul>
                                            </div>
                                            <div className="about-footer-content">
                                                <div className="about-contact-btn">
                                                    <div className="icon-box">
                                                        <img src="/images/icon-phone.svg" alt="" />
                                                    </div>
                                                    <div className="about-footer-btn-content">
                                                        <h3><a href="tel:+91123456789">+91 123 456 789</a></h3>
                                                    </div>
                                                </div>
                                                <div className="about-footer-btn">
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

                    {/* Services Section */}
                    <div className="our-services" id="services">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h3 className="fadeupin">our solutions</h3>
                                        <h2 className="fadeupin" data-wow-delay="0.2s">
                                            End-to-end IoT solutions <span>built for scale</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {services.map((s, i) => (
                                    <div className="col-lg-4 col-md-6" key={i}>
                                        <div className={`service-item fadeupin${s.active ? ' active' : ''}`} data-wow-delay="0.4s">
                                            <div className="icon-box">
                                                <img src={s.icon} alt="" />
                                            </div>
                                            <div className="service-title-box">
                                                <div className="service-title">
                                                    <h3><a href="#services">{s.title}</a></h3>
                                                </div>
                                                <div className="service-btn">
                                                    <a href="#services">
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="service-content">
                                                <p>Reliable, scalable solutions designed to keep your IoT deployment running at peak performance.</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="our-feature" id="features">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <div className="our-feature-images">
                                        <div className="feature-image">
                                            <figure className="image-anime reveal">
                                                <img src="/images/feature-image-1.jpg" alt="" />
                                            </figure>
                                        </div>
                                        <div className="company-experience-info">
                                            <div className="feature-image">
                                                <figure className="image-anime reveal">
                                                    <img src="/images/feature-image-2.jpg" alt="" />
                                                </figure>
                                            </div>
                                            <div className="company-experience-box">
                                                <div className="company-experience-content" ref={expRef}>
                                                    <h2><span className="counter">{exp}</span>+</h2>
                                                    <p>Years of experience in IoT innovation</p>
                                                </div>
                                                <div className="our-client-images company-client-images">
                                                    <div className="client-image"><figure className="image-anime"><img src="/images/client-image-1.jpg" alt="" /></figure></div>
                                                    <div className="client-image"><figure className="image-anime"><img src="/images/client-image-2.jpg" alt="" /></figure></div>
                                                    <div className="client-image"><figure className="image-anime"><img src="/images/client-image-3.jpg" alt="" /></figure></div>
                                                    <div className="client-image client-counter" ref={clientsRef}>
                                                        <h3><span className="counter">{clients}</span>+</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7">
                                    <div className="our-feature-content">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">our features</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                Powerful capabilities, <span>seamlessly connected</span>
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

                    {/* Projects / Case Studies Section */}
                    <section className="project-style-one-area" id="projects">
                        <div className="gradient-band">
                            <div className="container">
                                <div className="heading-left-new">
                                    <h5 className="sub-title-new">Case Studies</h5>
                                    <h2 className="title-new">Our most impactful<br />Completed Projects</h2>
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

                    {/* Why Choose Us Section */}
                    <div className="why-choose-us" id="why-choose">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="why-choose-image">
                                        <figure className="image-anime reveal">
                                            <img src="/images/why-choose-image.jpg" alt="" />
                                        </figure>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="why-choose-content">
                                        <div className="section-title dark-section">
                                            <h3 className="wow fadeInUp">why choose us</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                Reliable solutions for IoT excellence
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

                    {/* Our Platform Section (was Our Security) */}
                    <div className="our-security" id="security">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="our-security-content">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">Our platform</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                One platform for your <span>entire IoT world</span>
                                            </h2>
                                        </div>
                                        <div className="security-content-box">
                                            <div className="security-content-item wow fadeInUp" data-wow-delay="0.4s">
                                                <h3>real-time telemetry streaming:</h3>
                                                <p>Our telemetry engine ingests millions of data points per second from your device fleet, surfacing actionable insights on a live dashboard with sub-second latency.</p>
                                            </div>
                                            <div className="security-content-item wow fadeInUp" data-wow-delay="0.6s">
                                                <h3>over-the-air (OTA) updates:</h3>
                                                <p>Push firmware updates, configuration changes, and new features to any device or group of devices remotely — with rollback support built in for zero-risk deployments.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="our-security-image-content">
                                        <div className="security-image order-lg-1 order-2">
                                            <figure className="image-anime reveal">
                                                <img src="/images/our-security-image.jpg" alt="" />
                                            </figure>
                                        </div>
                                        <div className="security-content-item order-lg-2 order-1 wow fadeInUp">
                                            <h3>device lifecycle management:</h3>
                                            <p>Provision, configure, monitor, and decommission devices at scale with a single unified control plane — eliminating the complexity of managing thousands of endpoints manually.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="security-list">
                                        {[
                                            { title: 'Multi-protocol support', desc: 'Native support for MQTT, CoAP, HTTP, and Modbus ensures your existing hardware integrates without friction.' },
                                            { title: 'Digital twin engine', desc: 'Create virtual replicas of physical assets to simulate behaviour, test changes, and predict failures before they occur.' },
                                            { title: 'Open API & webhooks', desc: 'Connect our platform to your ERP, CRM, or BI tools via a RESTful API and real-time webhook event streams.' },
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

                    {/* Pricing Section */}
                    <div className="our-pricing" id="pricing">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">pricing plan</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            Simple, transparent plans <span>for every scale</span>
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
                                                <p>The smarter way to manage your connected devices.</p>
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

                    {/* Testimonials Section */}
                    <div className="our-testimonials" id="testimonials">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">testimonials</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            Our clients <span>are saying</span>
                                        </h2>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="testimonial-box">
                                        <div className="testimonial-video-button">
                                            <a href="https://www.youtube.com/watch?v=Y-x0efG1seA" target="_blank" rel="noreferrer">
                                                <i className="fa-solid fa-play"></i>
                                            </a>
                                            <h3>Watch video</h3>
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
                                                                            <img src={t.avatar} alt="" />
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
                                                        <p>Have questions about our IoT platform? Our team is ready to help. <span><a href="tel:+91123456789">+91-123 456 789</a></span></p>
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

                    {/* Team Section */}
                    <div className="our-team" id="team">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title dark-section">
                                        <h3 className="wow fadeInUp">Expert team</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">Meet the minds behind Bash Technolgoies</h2>
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
                                                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
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

                    {/* CTA Section */}
                    <div className="cta-box-section" id="cta">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cta-box">
                                        <div className="cta-box-content">
                                            <div className="section-title dark-section">
                                                <h2 className="wow fadeInUp">Start your IoT journey — connect smarter today!</h2>
                                            </div>
                                            <div className="cta-contact-info">
                                                <div className="cta-contact-item">
                                                    <div className="icon-box">
                                                        <img src="/images/icon-phone.svg" alt="" />
                                                    </div>
                                                    <div className="cta-contact-content">
                                                        <h3>Speak to an expert</h3>
                                                        <p><a href="tel:+123456789">+123 456 789</a></p>
                                                    </div>
                                                </div>
                                                <div className="cta-contact-item">
                                                    <div className="icon-box">
                                                        <img src="/images/icon-mail.svg" alt="" />
                                                    </div>
                                                    <div className="cta-contact-content">
                                                        <h3>Send us an email</h3>
                                                        <p><a href="mailto:hello@Bash Technolgoiesiot.com">hello@Bash Technolgoiesiot.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cta-box-image">
                                            <figure className="image-anime reveal">
                                                <img src="/images/cta-box-image.jpg" alt="" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQs Section */}
                    <div className="our-faqs home-our-faqs" id="faqs">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="faq-content">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">faq</h3>
                                            <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                                Your IoT questions <span>answered clearly</span>
                                            </h2>
                                        </div>
                                        <div className="faq-image">
                                            <figure className="image-anime reveal">
                                                <img src="/images/faq-image.jpg" alt="" />
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

                    {/* Blog Section */}
                    <div className="our-blog" id="blog">
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">latest post</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            Our latest <span>IoT insights</span>
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

                    {/* Contact Us Section */}
                    <div className="contact-us-section" id="contact" style={{ padding: '100px 0', background: 'var(--secondary-color)' }}>
                        <div className="container">
                            <div className="row section-row">
                                <div className="col-lg-12">
                                    <div className="section-title text-center">
                                        <h3 className="wow fadeInUp">contact us</h3>
                                        <h2 className="wow fadeInUp" data-wow-delay="0.2s">
                                            Get in touch with our <span>IoT specialists</span>
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
                                            ✓ Message sent! We'll get back to you shortly.
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
                                                    placeholder="Your Email" required
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
                                                    placeholder="Subject"
                                                    style={inputStyle}
                                                />
                                            </div>
                                        </div>
                                        <textarea
                                            name="message" value={contactForm.message} onChange={handleContactChange}
                                            placeholder="Tell us about your IoT project or challenge" rows={6} required
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

                {/* Footer */}
                <footer className="main-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-header">
                                    <div className="footer-logo">
                                        <img src="/images/footer-logo.svg" alt="Bash Technolgoies IoT" />
                                    </div>
                                    <div className="footer-social-links">
                                        <ul>
                                            <li><a href="#"><i className="fa-brands fa-pinterest-p"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="footer-links footer-newsletter-form">
                                    <h3>Subscribe our newsletter:</h3>
                                    <p>Stay ahead with the latest IoT trends, product updates, and industry insights.</p>
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
                                    <h3>Quick link</h3>
                                    <ul>
                                        {[['hero', 'home'], ['about', 'about us'], ['services', 'solutions'], ['blog', 'blog']].map(([id, label]) => (
                                            <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links">
                                    <h3>Solutions</h3>
                                    <ul>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Device connectivity</a></li>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Data analytics</a></li>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Edge computing</a></li>
                                        <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Platform integration</a></li>
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
                                        <li><a href="tel:+123456789">+123 456 789</a></li>
                                        <li><a href="mailto:hello@Bash Technolgoiesiot.com">hello@Bash Technolgoiesiot.com</a></li>
                                        <li>123 High Street LN1 1AB United Kingdom</li>
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
                                        <p>Copyright © 2025 Bash Technolgoies IoT. All Rights Reserved.</p>
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