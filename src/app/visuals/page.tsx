import React, { useEffect, useRef } from "react"

export default function VisualList() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible")
                        obs.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        )
        const elements = containerRef.current.querySelectorAll(".scroll-reveal")
        elements.forEach((el) => obs.observe(el))
        return () => obs.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="visual-list-container">
            <style>{`
                :root {
                    --bg: #0A0D14; 
                    --white: #F4F3F0;
                    --dark-card: #11141A;
                    --gray-text: #999;
                    --rule: rgba(255, 255, 255, 0.15);
                }

                .visual-list-container * { box-sizing: border-box; margin: 0; padding: 0; }
                .visual-list-container {
                    background: var(--bg);
                    color: var(--white);
                    font-family: 'Barlow', sans-serif;
                    padding: 160px 48px 80px 48px;
                    width: 100%;
                }

                .section-header {
                    border-bottom: 2px solid var(--rule);
                    padding-bottom: 20px;
                    margin-bottom: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .section-title {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(40px, 8vw, 80px);
                    line-height: 0.9;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .section-meta { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--gray-text); }

                .editorial-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1px; 
                    background: var(--rule); 
                    border: 1px solid var(--rule);
                }

                .vis-card {
                    background: var(--bg);
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    transition: background 0.4s ease;
                    text-decoration: none;
                    color: var(--white);
                }
                .vis-card:hover { background: var(--dark-card); }

                .vis-img-wrap {
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 24px;
                    position: relative;
                }
                .vis-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s;
                    filter: brightness(0.85) grayscale(20%);
                }
                .vis-card:hover .vis-img-wrap img {
                    transform: scale(1.03);
                    filter: brightness(1) grayscale(0%);
                }

                .tag-wrap { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 16px; 
                    gap: 12px;
                }
                .date-text { 
                    font-family: 'Space Mono', monospace; 
                    font-size: 11px; 
                    color: var(--gray-text); 
                    text-transform: uppercase; 
                }
                
                .pill-group {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                }
                .pill {
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    border-radius: 20px; 
                    padding: 4px 12px;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: rgba(255, 255, 255, 0.7);
                    text-transform: uppercase;
                    white-space: nowrap; 
                    transition: all 0.3s ease;
                }
                .vis-card:hover .pill {
                    border-color: rgba(255, 255, 255, 0.6);
                    color: rgba(255, 255, 255, 0.9);
                    background: rgba(255, 255, 255, 0.05);
                }

                .vis-title {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(24px, 2.5vw, 36px);
                    font-weight: 700;
                    line-height: 1.1;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                }
                .vis-desc { font-size: 14px; color: var(--gray-text); line-height: 1.5; font-weight: 400; margin-bottom: 24px; }
                
                .read-more {
                    margin-top: auto;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    display: flex; align-items: center; gap: 8px;
                }
                .read-more span { transition: transform 0.3s; }
                .vis-card:hover .read-more span { transform: translateX(4px); }

                .featured-card { 
                    grid-column: 1 / -1; 
                    display: grid; 
                    grid-template-columns: 1.2fr 1fr; 
                    gap: 40px; 
                    align-items: center; 
                }
                .featured-card .vis-img-wrap { margin-bottom: 0; height: 100%; min-height: 380px; }
                .featured-card .vis-info { padding-right: 40px; display: flex; flex-direction: column; height: 100%; justify-content: center; }
                .featured-card .vis-title { font-size: clamp(32px, 4vw, 56px); }
                .featured-card .vis-desc { font-size: 16px; max-width: 480px; }

                .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 1024px) {
                    .visual-list-container { padding: 140px 32px 80px 32px; }
                    .editorial-grid { grid-template-columns: 1fr; }
                    .featured-card { grid-template-columns: 1fr; gap: 24px; }
                    .featured-card .vis-img-wrap { min-height: 300px; margin-bottom: 0; }
                    .featured-card .vis-info { padding: 0 !important; }
                }

                @media (max-width: 768px) {
                    .visual-list-container { padding: 120px 24px 60px 24px; }
                    .vis-card { padding: 20px; } 
                    .featured-card .vis-img-wrap, .vis-img-wrap { margin-bottom: 20px !important; }
                    .featured-card .vis-img-wrap { min-height: 220px; }
                    .tag-wrap { 
                        flex-direction: column; 
                        align-items: flex-start; 
                        gap: 12px; 
                        margin-bottom: 16px;
                    }
                    .pill-group { justify-content: flex-start; }
                    .section-title { font-size: clamp(36px, 12vw, 56px); }
                    .vis-title { font-size: clamp(22px, 6vw, 28px); }
                    .featured-card .vis-title { font-size: clamp(26px, 8vw, 36px); }
                }
            `}</style>

            <div className="section-header scroll-reveal">
                <div className="section-title">
                    VISUAL <br /> ARCHIVE
                </div>
                <div className="section-meta">SELECTED 05</div>
            </div>

            <div className="editorial-grid">
                {/* 01. Featured — SANVO Campaign Photography */}
                <a href="#" className="vis-card featured-card scroll-reveal">
                    <div className="vis-img-wrap">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/0bc2cd9d-72b5-4544-9583-ad2c8229c952/SANVO2.70275+copy+2.jpg"
                            alt="SANVO Art Direction"
                        />
                    </div>
                    <div className="vis-info">
                        <div className="tag-wrap">
                            <span className="date-text">
                                2026 — BRAND REFRESH
                            </span>
                            <div className="pill-group">
                                <span className="pill">ART DIRECTION</span>
                                <span className="pill">PHOTOGRAPHY</span>
                            </div>
                        </div>
                        <h3 className="vis-title">
                            SANVO CAMPAIGN
                            <br />
                            PHOTOGRAPHY
                        </h3>
                        <p className="vis-desc">
                            Editorial still life campaign photography across
                            four product series. Art direction and creative
                            direction for the 2026 brand visual refresh.
                        </p>
                        <div className="read-more">
                            View Project <span>→</span>
                        </div>
                    </div>
                </a>

                {/* 02. Aurora Series */}
                <a href="#" className="vis-card scroll-reveal">
                    <div
                        className="vis-img-wrap"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/b98f7989-e113-423f-a37a-39b8cb355134/Aurora-Socials_DC+announcement+-+Linkedin.png"
                            alt="Aurora Series"
                        />
                    </div>
                    <div className="tag-wrap">
                        <span className="date-text">2023 — 2024</span>
                        <div className="pill-group">
                            <span className="pill">BRAND IDENTITY</span>
                            <span className="pill">VISUAL LEAD</span>
                        </div>
                    </div>
                    <h3 className="vis-title">AURORA SERIES</h3>
                    <p className="vis-desc">
                        Visual brand identity system as lead designer.
                        Multi-format identity spanning digital and print across
                        multiple event seasons.
                    </p>
                    <div className="read-more">
                        View Project <span>→</span>
                    </div>
                </a>

                {/* 03. Ultra Records */}
                <a href="#" className="vis-card scroll-reveal">
                    <div
                        className="vis-img-wrap"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4e2617c2-7ff1-4ef6-8f5e-41d39b088868/315981623_10160496899774711_7627973115075317433_n.jpg"
                            alt="Ultra Records"
                        />
                    </div>
                    <div className="tag-wrap">
                        <span className="date-text">2023</span>
                        <div className="pill-group">
                            <span className="pill">MUSIC</span>
                            <span className="pill">ALBUM ART</span>
                            <span className="pill">MOTION</span>
                        </div>
                    </div>
                    <h3 className="vis-title">ULTRA RECORDS</h3>
                    <p className="vis-desc">
                        Album artwork, visualizers, and social media reels for
                        Ultra Records / Sony Music global releases.
                    </p>
                    <div className="read-more">
                        View Project <span>→</span>
                    </div>
                </a>

                {/* 04. POP: Surge */}
                <a href="#" className="vis-card scroll-reveal">
                    <div
                        className="vis-img-wrap"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/b21ad9dd-e0b2-4deb-a91b-9964ff0b9415/Poster7.png"
                            alt="POP Surge"
                        />
                    </div>
                    <div className="tag-wrap">
                        <span className="date-text">2024</span>
                        <div className="pill-group">
                            <span className="pill">BRAND IDENTITY</span>
                            <span className="pill">AWARD WINNER</span>
                        </div>
                    </div>
                    <h3 className="vis-title">POP: SURGE</h3>
                    <p className="vis-desc">
                        Award-winning visual brand identity and kinetic
                        typography system for cultural event series.
                    </p>
                    <div className="read-more">
                        View Project <span>→</span>
                    </div>
                </a>

                {/* 05. 4D6 Esports Wellness — 普通 grid card */}
                <a href="#" className="vis-card scroll-reveal">
                    <div
                        className="vis-img-wrap"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/10db6907-fd8f-4168-86de-925b5db3fc99/Package-3.png"
                            alt="4D6 Esports Wellness"
                        />
                    </div>
                    <div className="tag-wrap">
                        <span className="date-text">2024 — MFA THESIS</span>
                        <div className="pill-group">
                            <span className="pill">BRAND IDENTITY</span>
                            <span className="pill">PACKAGING</span>
                        </div>
                    </div>
                    <h3 className="vis-title">4D6 ESPORTS WELLNESS</h3>
                    <p className="vis-desc">
                        Comprehensive brand identity system including packaging,
                        digital touchpoints, and spatial design. MFA thesis at
                        SVA Products of Design.
                    </p>
                    <div className="read-more">
                        View Project <span>→</span>
                    </div>
                </a>
            </div>
        </div>
    )
}
