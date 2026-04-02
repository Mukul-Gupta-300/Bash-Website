import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to handle internal page scrolling
    const handleScrollLink = (e, id) => {
        setMenuOpen(false);
        if (location.pathname === '/') {
            e.preventDefault();
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                // Update URL without reloading
                window.history.pushState(null, '', `/#${id}`);
            }
        } else {
            // Already handled by Link to="/#id"
        }
    };

    const handleBrandClick = (e) => {
        setMenuOpen(false);
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', '/');
        }
    };

    return (
        <header className={`main-header${scrolled ? ' sticky' : ''}`}>
            <div className="header-sticky">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link className="navbar-brand" to="/" onClick={handleBrandClick}>
                            <img src="/images/logo-bash-new.jpg" alt="Bash Technologies Logo" />
                        </Link>

                        <div className={`collapse navbar-collapse main-menu${menuOpen ? ' show' : ''}`}>
                            <div className="nav-menu-wrapper">
                                <ul className="navbar-nav mr-auto" id="menu">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/" onClick={handleBrandClick}>Home</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/#about" onClick={(e) => handleScrollLink(e, 'about')}>About Us</Link>
                                    </li>

                                    <li
                                        className="nav-item submenu"
                                        onMouseEnter={() => setPagesOpen(true)}
                                        onMouseLeave={() => { setPagesOpen(false); setHoveredService(null); }}
                                    >
                                        <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>
                                            Services
                                        </Link>

                                        {pagesOpen && (
                                            <ul style={{ display: 'block' }}>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/managed-it-services" onClick={() => setMenuOpen(false)}>Managed IT Services</Link>
                                                </li>

                                                {/* Managed IT Services → sub-services */}
                                                <li
                                                    className="nav-item submenu"
                                                    onMouseEnter={() => setHoveredService('managed')}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        Managed IT Services <span style={{ marginLeft: 8 }}>›</span>
                                                    </Link>
                                                    {hoveredService === 'managed' && (
                                                        <ul style={{ display: 'block', position: 'absolute', left: '100%', top: 0 }}>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Cloud Migration</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Email Services</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Remote Monitoring</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Patch Management</Link></li>
                                                        </ul>
                                                    )}
                                                </li>

                                                {/* IoT & Smart Systems → sub-services */}
                                                <li
                                                    className="nav-item submenu"
                                                    onMouseEnter={() => setHoveredService('iot')}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        IoT & Smart Systems <span style={{ marginLeft: 8 }}>›</span>
                                                    </Link>
                                                    {hoveredService === 'iot' && (
                                                        <ul style={{ display: 'block', position: 'absolute', left: '100%', top: 0 }}>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Smart Waste Management</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Industrial IoT</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Remote Sensor Networks</Link></li>
                                                        </ul>
                                                    )}
                                                </li>

                                                {/* VoIP Services → sub-services */}
                                                <li
                                                    className="nav-item submenu"
                                                    onMouseEnter={() => setHoveredService('voip')}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        VoIP Services <span style={{ marginLeft: 8 }}>›</span>
                                                    </Link>
                                                    {hoveredService === 'voip' && (
                                                        <ul style={{ display: 'block', position: 'absolute', left: '100%', top: 0 }}>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>IP Phone Systems</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>SIP Trunk Configuration</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Unified Communications</Link></li>
                                                        </ul>
                                                    )}
                                                </li>

                                                {/* Cybersecurity → sub-services */}
                                                <li
                                                    className="nav-item submenu"
                                                    onMouseEnter={() => setHoveredService('cyber')}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        Cybersecurity <span style={{ marginLeft: 8 }}>›</span>
                                                    </Link>
                                                    {hoveredService === 'cyber' && (
                                                        <ul style={{ display: 'block', position: 'absolute', left: '100%', top: 0 }}>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Firewall & VPN Setup</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Endpoint Protection</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Security Audits</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Intrusion Detection</Link></li>
                                                        </ul>
                                                    )}
                                                </li>

                                                {/* Networking Solutions → sub-services */}
                                                <li
                                                    className="nav-item submenu"
                                                    onMouseEnter={() => setHoveredService('network')}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        Networking Solutions <span style={{ marginLeft: 8 }}>›</span>
                                                    </Link>
                                                    {hoveredService === 'network' && (
                                                        <ul style={{ display: 'block', position: 'absolute', left: '100%', top: 0 }}>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>LAN / WAN Design</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Enterprise Wi-Fi</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>VLAN Segmentation</Link></li>
                                                        </ul>
                                                    )}
                                                </li>

                                                {/* End-to-End IT Infrastructure → sub-services */}
                                                <li
                                                    className="nav-item submenu"
                                                    onMouseEnter={() => setHoveredService('infra')}
                                                    onMouseLeave={() => setHoveredService(null)}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        End-to-End IT Infrastructure <span style={{ marginLeft: 8 }}>›</span>
                                                    </Link>
                                                    {hoveredService === 'infra' && (
                                                        <ul style={{ display: 'block', position: 'absolute', left: '100%', top: 0 }}>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Structured Cabling</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Server Room Builds</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Virtualisation</Link></li>
                                                            <li className="nav-item"><Link className="nav-link" to="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Hardware Procurement</Link></li>
                                                        </ul>
                                                    )}
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/#blog" onClick={(e) => handleScrollLink(e, 'blog')}>Courses</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/#contact" onClick={(e) => handleScrollLink(e, 'contact')}>Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="header-btn">
                                <Link to="/#contact" className="btn-default" onClick={(e) => handleScrollLink(e, 'contact')}>get a free audit</Link>
                            </div>
                        </div>

                        <div className={`navbar-toggle${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}></div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
