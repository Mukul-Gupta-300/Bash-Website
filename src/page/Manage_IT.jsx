import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Manage_IT.css';

/** --------------------------------------------------------------------------
 *  SERVICE DETAILS PAGE
 *  -------------------------------------------------------------------------- */

export default function ManageITPage() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [isScrollLocked, setIsScrollLocked] = useState(true);
    const [faqOpen, setFaqOpen] = useState(0);
    const [offeringsOpen, setOfferingsOpen] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadeOut(true), 800);
        const scrollTimer = setTimeout(() => setIsScrollLocked(false), 1400);
        const removeTimer = setTimeout(() => setVisible(false), 2000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(scrollTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    useEffect(() => {
        if (isScrollLocked) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isScrollLocked]);


    return (
        <>
            {/* Preloader - Consistent with Homepage */}
            {visible && (
                <div className={`preloader${fadeOut ? ' fade-out' : ''}`} style={{
                    opacity: fadeOut ? 0 : 1,
                    transition: 'opacity 1s ease-in-out',
                    pointerEvents: fadeOut ? 'none' : 'all'
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
                    {/* Breadcrumb Section */}
                    <div
                        className="breadcrumb-area text-center text-light"
                        style={{
                            backgroundImage: 'url(/images/New_Header.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '450px'
                        }}
                    >
                        <div className="container" style={{ paddingTop: '100px' }}>
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                                    <h1>Managed IT Services</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Details Main Content */}
                    <div className="services-details-area overflow-hidden default-padding">
                        <div className="container">
                            <div className="services-details-items">
                                <div className="row">
                                    <div className="col-xl-9 col-lg-8 order-lg-last pl-15 pl-md-15 pl-xs-15">
                                        <div className="thumb">
                                            <img
                                                src="/images/4820271.jpg"
                                                alt="Thumb"
                                                style={{
                                                    width: '100%',
                                                    height: '550px',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                    borderRadius: '10px',
                                                    // filter: 'brightness(0.8) sepia(1) hue-rotate(180deg) saturate(2)'
                                                }}
                                            />                                      </div>
                                        <div className="section-title mb-40">
                                            <h2 className="wow fadeInUp" style={{ fontSize: '42px', fontWeight: '800', color: 'var(--primary-color)' }}>Managed IT Services</h2>
                                            <div className="bar" style={{ height: '5px', width: '80px', margin: '15px 0 25px', background: 'linear-gradient(90deg, var(--accent-color), #2575fc)', borderRadius: '10px' }}></div>
                                        </div>
                                        <p className="wow fadeInUp" data-wow-delay="0.1s" style={{ fontSize: '18px', color: '#555', marginBottom: '25px' }}>
                                            At Bash Technologies, we provide comprehensive Managed IT Services designed to ensure your business operations run smoothly, securely, and efficiently. Our team offers proactive monitoring, regular maintenance, troubleshooting, and technical support for your complete IT environment.
                                        </p>
                                        <p className="wow fadeInUp" data-wow-delay="0.2s" style={{ fontSize: '18px', color: '#555' }}>
                                            Our services include server management, network monitoring, system health checks, cloud support, data backup, user support, software updates, security patching, and issue resolution. We help businesses reduce downtime, improve system performance, and maintain secure IT operations through continuous monitoring and expert assistance.
                                        </p>
                                        <div className="features mt-40 mt-xs-30 mb-50 mb-xs-30">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="content mb-40">
                                                        <h3 className="mb-30" style={{ borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '10px', fontSize: '32px', fontWeight: '700' }}>Key Offerings</h3>
                                                        <div className="faq-style-one accordion" id="offeringsAccordion">
                                                            {[
                                                                { title: '24/7 IT Monitoring & Support', content: 'Our round-the-clock monitoring ensures your systems are always up and running, with proactive issue detection and resolution.' },
                                                                { title: 'Network & Server Management', content: 'Comprehensive oversight and optimization of your servers and network infrastructure to maintain high performance and connectivity.' },
                                                                { title: 'Cloud Infrastructure Support', content: 'Expert management of your cloud resources across AWS, Azure, or hybrid environments for maximum efficiency and cost-effectiveness.' },
                                                                { title: 'Backup & Disaster Recovery', content: 'Robust data protection strategies and recovery plans to ensure your business continuity even in the face of unexpected events.' },
                                                                { title: 'Security Patch Management', content: 'Systematic application of security updates and patches to protect your environment from known vulnerabilities and cyber threats.' },
                                                                { title: 'Remote & On-Site Technical Assistance', content: 'Flexible support options ranging from remote troubleshooting to hands-on, on-site engineering tasks for complex infrastructure needs.' },
                                                                { title: 'Performance Optimization', content: 'Regular system audits and tune-ups to keep your IT foundation running at peak performance as your business grows.' },
                                                                { title: 'Helpdesk Support', content: 'Instant access to certified IT professionals for day-to-day technical issues, ensuring your team stays productive and focused.' },
                                                            ].map((item, idx) => (
                                                                <div className="accordion-item" key={idx}>
                                                                    <h2 className="accordion-header">
                                                                        <button 
                                                                            className={`accordion-button${offeringsOpen !== idx ? ' collapsed' : ''}`} 
                                                                            type="button"
                                                                            onClick={() => setOfferingsOpen(offeringsOpen === idx ? -1 : idx)}
                                                                        >
                                                                            {item.title}
                                                                        </button>
                                                                    </h2>
                                                                    <div className={`accordion-collapse collapse${offeringsOpen === idx ? ' show' : ''}`}>
                                                                        <div className="accordion-body">
                                                                            <p>{item.content}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 mt-40">
                                                    <div className="content p-5" style={{ background: '#f9fbff', borderRadius: '15px', border: '1px solid #eef2f6' }}>
                                                        <h3 className="mb-30" style={{ borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '10px', fontSize: '32px', fontWeight: '700' }}>Our Approach</h3>
                                                        <div className="row align-items-center">
                                                            <div className="col-lg-8">
                                                                <p style={{ lineHeight: '1.8', fontSize: '18px', color: '#555' }}>
                                                                    With our managed services, clients can focus on their core business while we take care of their IT infrastructure, performance, and security. We deliver a proactive, people-first model — combining the right technology with the right expertise to keep your systems running at peak efficiency, around the clock.
                                                                </p>
                                                                <p className="mt-20" style={{ lineHeight: '1.8', fontSize: '18px', color: '#555' }}>
                                                                    We don't just fix what's broken; we prevent problems before they occur, ensuring your business stays competitive and secure in an ever-evolving digital landscape.
                                                                </p>
                                                            </div>
                                                            <div className="col-lg-4 text-center d-none d-lg-block">
                                                                <i className="fa-solid fa-users-gear" style={{ fontSize: '120px', color: 'var(--accent-color)', opacity: '0.1' }}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="what-we-do-section mb-60" style={{ paddingTop: '40px', borderTop: '1px solid #eee' }}>
                                            <h3 className="mb-30" style={{ fontSize: '32px', fontWeight: '700' }}>What We Do</h3>
                                            <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
                                                We take full ownership of your IT environment so your team never has to worry about system failures, security threats, or performance bottlenecks. From continuous network monitoring and server management to cloud support and disaster recovery, our experts work behind the scenes to maintain a resilient, secure, and high-performing IT infrastructure for your business — every day, every hour.
                                            </p>
                                        </div>

                                        {/* FAQ for this service */}
                                        <div className="faq-style-one dark mt-40 wow fadeInUp" data-wow-delay="0.3s">
                                            <h3 className="mb-30" style={{ fontWeight: '700' }}>Common Questions About Managed IT Services</h3>
                                            <div className="accordion" id="faqAccordion">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button
                                                            className={`accordion-button${faqOpen !== 0 ? ' collapsed' : ''}`}
                                                            type="button"
                                                            onClick={() => setFaqOpen(faqOpen === 0 ? -1 : 0)}
                                                        >
                                                            What is included in Managed IT Services?
                                                        </button>
                                                    </h2>
                                                    <div className={`accordion-collapse collapse${faqOpen === 0 ? ' show' : ''}`}>
                                                        <div className="accordion-body">
                                                            <p>Our Managed IT Services cover 24/7 monitoring, server and network management, cloud infrastructure support, security patching, helpdesk support, backup & disaster recovery, and on-site or remote technical assistance — all tailored to your business needs.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button
                                                            className={`accordion-button${faqOpen !== 1 ? ' collapsed' : ''}`}
                                                            type="button"
                                                            onClick={() => setFaqOpen(faqOpen === 1 ? -1 : 1)}
                                                        >
                                                            How does Bash Technologies ensure uptime and reliability?
                                                        </button>
                                                    </h2>
                                                    <div className={`accordion-collapse collapse${faqOpen === 1 ? ' show' : ''}`}>
                                                        <div className="accordion-body">
                                                            <p>We use proactive monitoring tools and automated alerts to detect and resolve issues before they impact your operations. Our team is available round the clock to respond swiftly to any incident, minimizing downtime and keeping your business running.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-xl-3 col-lg-4 mt-md-120 mt-xs-50 services-sidebar px-0">
                                        <div className="single-widget services-list-widget">
                                            <h4 className="widget-title">Technical Services</h4>
                                            <div className="content">
                                                <ul>
                                                    <li><Link to="#">IT Management</Link></li>
                                                    <li className="current-item"><Link to="#">Cyber Security</Link></li>
                                                    <li><Link to="#">Cloud Computing</Link></li>
                                                    <li><Link to="#">IT Consulting</Link></li>
                                                    <li><Link to="#">Backup & Recovery</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="single-widget bg-dark quick-contact-widget text-light" style={{ backgroundImage: 'url(/images/15.png)', backgroundSize: 'cover' }}>
                                            <div className="content">
                                                <h3>Need Help?</h3>
                                                <p>Speak with a human to filling out a form? call corporate office and we will connect you with a team member help.</p>
                                                <h2>+(012) 6679545</h2>
                                                <h4><a href="mailto:info@bashtechnologies.com" style={{ color: '#fff' }}>hello@bashtechnologies.com</a></h4>
                                                <Link className="btn-default mt-30" to="/#contact">Contact Us</Link>
                                            </div>
                                        </div>
                                        <div className="single-widget widget-brochure">
                                            <h4 className="widget-title">Brochure</h4>
                                            <ul>
                                                <li><a href="#"><i className="fas fa-file-pdf"></i> Download Brochure </a></li>
                                                <li><a href="#"><i className="fas fa-file-pdf"></i> Company Details </a></li>
                                            </ul>
                                        </div>

                                        <div className="single-widget services-more wow fadeInUp" data-wow-delay="0.4s">
                                            <h4 className="widget-title">Sub-Services</h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="item" style={{ padding: '25px', marginBottom: '20px' }}>
                                                        <i className="fas fa-shield-alt" style={{ fontSize: '24px', height: '50px', width: '50px', lineHeight: '50px' }}></i>
                                                        <h4 style={{ fontSize: '20px' }}>IT Security & Compliance</h4>
                                                        <p style={{ fontSize: '16px' }}>We protect your business with advanced security patching, threat monitoring, and compliance management to keep your data and systems safe.</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="item" style={{ padding: '25px' }}>
                                                        <i className="fas fa-cloud" style={{ fontSize: '24px', height: '50px', width: '50px', lineHeight: '50px' }}></i>
                                                        <h4 style={{ fontSize: '20px' }}>Cloud Infrastructure Support</h4>
                                                        <p style={{ fontSize: '16px' }}>From cloud migration to ongoing cloud management, we ensure your cloud environment is optimized, secure, and always available.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer - Consistent with Homepage */}
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
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links footer-quick-links">
                                    <h3>Quick links</h3>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/#about">About Us</Link></li>
                                        <li><Link to="/#services">Services</Link></li>
                                        <li><Link to="/#blog">Blog</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-6">
                                <div className="footer-links">
                                    <h3>Services</h3>
                                    <ul>
                                        <li><Link to="/#services">Network Design</Link></li>
                                        <li><Link to="/#services">Cloud Migration</Link></li>
                                        <li><Link to="/#services">IT Security</Link></li>
                                        <li><Link to="/#services">IoT Solutions</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
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
                                <div className="col-md-12 text-center">
                                    <p>Copyright © 2025 Bash Technologies. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}