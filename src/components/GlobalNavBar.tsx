"use client";
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function GlobalNavBar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        document.body.style.overflow = !isMenuOpen ? "hidden" : "auto"
    }

    return (
        <>
            <style>{`
                :root {
                    --nav-bg: #0A0D14;
                    --nav-white: #F4F3F0;
                    --nav-rule: rgba(255, 255, 255, 0.15);
                    --nav-gray: #999;
                }

                .global-nav-wrapper *, .mobile-menu-overlay * { 
                    box-sizing: border-box; 
                    margin: 0; 
                    padding: 0; 
                }

                /* 🌟 核心改动：fixed on top */
                .global-nav-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    font-family: 'Barlow', sans-serif;
                    color: var(--nav-white);
                    background: ${isScrolled ? "rgba(10, 13, 20, 0.92)" : "var(--nav-bg)"};
                    backdrop-filter: ${isScrolled ? "blur(16px)" : "none"};
                    -webkit-backdrop-filter: ${isScrolled ? "blur(16px)" : "none"};
                    border-bottom: 1px solid var(--nav-rule);
                    transition: all 0.3s ease;
                    z-index: 999;
                }

                /* 🌟 spacer 撑开 nav 高度，防止内容被遮挡 */
                .nav-spacer {
                    width: 100%;
                    height: 73px; /* 跟 nav 实际高度一致 */
                }

                .nav-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1.5fr 1fr 1fr;
                    width: 100%;
                }

                .nav-col {
                    padding: 24px 48px;
                    border-right: 1px solid var(--nav-rule);
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }
                
                .nav-col:last-child { 
                    border-right: none; 
                    justify-content: flex-end; 
                }

                .nav-logo { 
                    font-family: 'Oswald', sans-serif; font-size: 14px; 
                    font-weight: 700; letter-spacing: 2px; 
                    text-decoration: none; color: var(--nav-white);
                }
                .nav-logo .square { display: inline-block; width: 6px; height: 6px; background: var(--nav-white); margin-right: 8px; vertical-align: middle; margin-top: -2px; }
                
                .nav-links { display: flex; gap: 32px; list-style: none; }
                .nav-links a { color: var(--nav-gray); text-decoration: none; transition: color 0.3s; }
                .nav-links a:hover, .nav-links a.active { color: var(--nav-white); }
                
                .status-badge { background: var(--nav-white); color: #111; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 700; margin-left: 12px; }

                .mobile-toggle {
                    display: none;
                    background: none; border: none;
                    color: var(--nav-white);
                    font-family: 'Barlow', sans-serif;
                    font-size: 12px; font-weight: 600;
                    letter-spacing: 1px; text-transform: uppercase;
                    cursor: pointer;
                }

                .mobile-menu-overlay {
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background: var(--nav-bg); z-index: 998;
                    display: flex; flex-direction: column; justify-content: center; align-items: center;
                    transform: translateY(-100%); transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .mobile-menu-overlay.open { transform: translateY(0); }
                
                .mobile-nav-links { 
                    list-style: none; 
                    text-align: center; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 40px; 
                    width: 100%;
                    padding: 0;
                    margin: 0;
                }
                
                .mobile-nav-links a {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(48px, 12vw, 80px);
                    color: rgba(255,255,255,0.4);
                    text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: -1px;
                    transition: color 0.3s;
                    display: inline-block;
                }
                .mobile-nav-links a:hover { color: var(--nav-white); }
                .mobile-nav-footer { position: absolute; bottom: 40px; font-family: 'Space Mono', monospace; font-size: 10px; color: var(--nav-gray); letter-spacing: 2px; text-align: center; width: 100%; }

                @media (max-width: 1024px) {
                    .nav-grid { grid-template-columns: 1.5fr 2fr 1.5fr; }
                    .nav-col { padding: 20px 32px; } 
                    .nav-col:nth-child(4) { display: none; }
                    .nav-col:nth-child(3) { justify-content: flex-end; border-right: none; } 
                    .nav-spacer { height: 65px; }
                }

                @media (max-width: 768px) {
                    .global-nav-wrapper { 
                        border-bottom: none; 
                        background: ${isScrolled ? "rgba(10, 13, 20, 0.92)" : "var(--nav-bg)"};
                        backdrop-filter: ${isScrolled ? "blur(16px)" : "none"};
                    }
                    .nav-grid { 
                        display: flex; justify-content: space-between; align-items: center; 
                        padding: 20px 24px; 
                        border-bottom: 1px solid var(--nav-rule);
                        position: relative; z-index: 999;
                    }
                    .nav-col { padding: 0; border-right: none; }
                    .nav-col:nth-child(2), .nav-col:nth-child(3) { display: none; }
                    .mobile-toggle { display: block; }
                    .nav-spacer { height: 61px; }
                }
            `}</style>

            {/* Fixed nav bar */}
            <div className="global-nav-wrapper">
                <div className="nav-grid">
                    <div className="nav-col">
                        <Link href="/" className="nav-logo">
                            <span className="square"></span>JACEY CHEN
                        </Link>
                    </div>
                    <div className="nav-col">
                        <ul className="nav-links">
                            <li>
                                <Link href="/products" className={pathname === "/products" ? "active" : ""}>
                                    Product
                                </Link>
                            </li>
                            <li>
                                <Link href="/visuals" className={pathname === "/visuals" ? "active" : ""}>
                                    Visual
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className={pathname === "/about" ? "active" : ""}>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-col">
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>
                            Grid System:{" "}
                            <span className="status-badge">ON</span>
                        </span>
                    </div>
                    <div className="nav-col">
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>
                            Portfolio ©2026
                        </span>
                    </div>
                    <button className="mobile-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? "CLOSE" : "MENU"}
                    </button>
                </div>
            </div>

            {/* 🌟 Spacer：撑开固定导航栏的高度 */}
            <div className="nav-spacer" />

            {/* Mobile menu overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}>
                <ul className="mobile-nav-links">
                    <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link href="/products" onClick={toggleMenu}>Product</Link></li>
                    <li><Link href="/visuals" onClick={toggleMenu}>Visual</Link></li>
                    <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
                </ul>
                <div className="mobile-nav-footer">
                    GRID SYSTEM: ON / NYC ©2026
                </div>
            </div>
        </>
    )
}