"use client";
import React, { useEffect, useRef } from "react"

export default function ProductList() {
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
        <div ref={containerRef} className="product-list-container">
            <style>{`
                :root {
                    --bg: #0A0D14; 
                    --white: #F4F3F0;
                    --dark-card: #11141A;
                    --gray-text: #999;
                    --rule: rgba(255, 255, 255, 0.15);
                }

                .product-list-container * { box-sizing: border-box; margin: 0; padding: 0; }
                .product-list-container {
                    background: var(--bg);
                    color: var(--white);
                    font-family: 'Barlow', sans-serif;
                    padding: 160px 48px 80px 48px;
                    width: 100%;
                }

                /* 顶部标题区 */
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

                /* ── 杂志风网格排版 ── */
                .editorial-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1px; 
                    background: var(--rule); 
                    border: 1px solid var(--rule);
                }

                .prod-card {
                    background: var(--bg);
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    transition: background 0.4s ease;
                    text-decoration: none;
                    color: var(--white);
                }
                .prod-card:hover { background: var(--dark-card); }

                /* 图片容器统一置顶 */
                .prod-img-wrap {
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 24px;
                    position: relative;
                }
                .prod-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s;
                    filter: brightness(0.85) grayscale(20%);
                }
                .prod-card:hover .prod-img-wrap img {
                    transform: scale(1.03);
                    filter: brightness(1) grayscale(0%);
                }

                /* ── 标签区 & Pills ── */
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
                .prod-card:hover .pill {
                    border-color: rgba(255, 255, 255, 0.6);
                    color: rgba(255, 255, 255, 0.9);
                    background: rgba(255, 255, 255, 0.05);
                }

                /* 标题与描述 */
                .prod-title {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(24px, 2.5vw, 36px);
                    font-weight: 700;
                    line-height: 1.1;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                }
                .prod-desc { font-size: 14px; color: var(--gray-text); line-height: 1.5; font-weight: 400; margin-bottom: 24px; }
                
                .read-more {
                    margin-top: auto;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    display: flex; align-items: center; gap: 8px;
                }
                .read-more span { transition: transform 0.3s; }
                .prod-card:hover .read-more span { transform: translateX(4px); }

                /* ── 首个霸屏项目特调 ── */
                .featured-card { 
                    grid-column: 1 / -1; 
                    display: grid; 
                    grid-template-columns: 1.2fr 1fr; 
                    gap: 40px; 
                    align-items: center; 
                }
                .featured-card .prod-img-wrap { margin-bottom: 0; height: 100%; min-height: 380px; }
                .featured-card .prod-info { padding-right: 40px; display: flex; flex-direction: column; height: 100%; justify-content: center; }
                .featured-card .prod-title { font-size: clamp(32px, 4vw, 56px); }
                .featured-card .prod-desc { font-size: 16px; max-width: 480px; }

                /* 滚动动画 */
                .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

                /* ══════════════════════════════
                   响应式断点 1：TABLET
                   ══════════════════════════════ */
                @media (max-width: 1024px) {
                    .product-list-container { padding: 140px 32px 80px 32px; }
                    .editorial-grid { grid-template-columns: 1fr; }
                    .featured-card { grid-template-columns: 1fr; gap: 24px; }
                    .featured-card .prod-img-wrap { min-height: 300px; margin-bottom: 0; }
                    .featured-card .prod-info { padding-right: 0; }
                }

                /* ══════════════════════════════
                   响应式断点 2：MOBILE
                   ══════════════════════════════ */
                @media (max-width: 768px) {
                    .product-list-container { padding: 120px 24px 60px 24px; }
                    .prod-card { padding: 20px; } 
                    .featured-card .prod-img-wrap, .prod-img-wrap { margin-bottom: 20px; }
                    .featured-card .prod-img-wrap { min-height: 220px; }
                    .tag-wrap { 
                        flex-direction: column; 
                        align-items: flex-start; 
                        gap: 12px; 
                        margin-bottom: 16px;
                    }
                    .pill-group { justify-content: flex-start; }
                    .section-title { font-size: clamp(36px, 12vw, 56px); }
                    .prod-title { font-size: clamp(22px, 6vw, 28px); }
                    .featured-card .prod-title { font-size: clamp(26px, 8vw, 36px); }
                }
            `}</style>

            <div className="section-header scroll-reveal">
                <div className="section-title">
                    PRODUCT <br /> MAG
                </div>
                <div className="section-meta">SELECTED 03</div>
            </div>

            <div className="editorial-grid">
                {/* 01. Featured — SANVO */}
                <a href="#" className="prod-card featured-card scroll-reveal">
                    <div className="prod-img-wrap">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                            alt="SANVO Fine Chemicals"
                        />
                    </div>
                    <div className="prod-info">
                        <div className="tag-wrap">
                            <span className="date-text">
                                2026 — COMING SOON
                            </span>
                            <div className="pill-group">
                                <span className="pill">WEB ECOSYSTEM</span>
                                <span className="pill">BILINGUAL</span>
                                <span className="pill">AI WORKFLOW</span>
                            </div>
                        </div>
                        <h3 className="prod-title">
                            SANVO BILINGUAL
                            <br />
                            WEB ECOSYSTEM
                        </h3>
                        <p className="prod-desc">
                            Full bilingual web ecosystem with AI-augmented
                            design workflow for HKEX-listed chemical
                            manufacturer. Led product design, strategy, and
                            creative direction.
                        </p>
                        <div className="read-more">
                            Read Project <span>→</span>
                        </div>
                    </div>
                </a>

                {/* 02. GRID Gamers */}
                <a href="#" className="prod-card scroll-reveal">
                    <div
                        className="prod-img-wrap"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/f1294254-6af0-435b-93eb-f1fae978a8ea/Wrapup1+%284%29.png"
                            alt="GRID Gamers"
                        />
                    </div>
                    <div className="tag-wrap">
                        <span className="date-text">2024 — 2025</span>
                        <div className="pill-group">
                            <span className="pill">AI / LLM</span>
                            <span className="pill">DESIGN SYSTEM</span>
                        </div>
                    </div>
                    <h3 className="prod-title">GRID GAMERS</h3>
                    <p className="prod-desc">
                        Scalable LLM assistant interface and reusable design
                        system for competitive esports scheduling platform.
                    </p>
                    <div className="read-more">
                        Read Project <span>→</span>
                    </div>
                </a>

                {/* 03. Apollo ID */}
                <a href="#" className="prod-card scroll-reveal">
                    <div
                        className="prod-img-wrap"
                        style={{ aspectRatio: "4/3" }}
                    >
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                            alt="Apollo ID"
                        />
                    </div>
                    <div className="tag-wrap">
                        <span className="date-text">2023 — 2024</span>
                        <div className="pill-group">
                            <span className="pill">UX / UI</span>
                            <span className="pill">DESIGN SYSTEM</span>
                        </div>
                    </div>
                    <h3 className="prod-title">APOLLO ID</h3>
                    <p className="prod-desc">
                        End-to-end loyalty and digital wallet platform unifying
                        20+ hospitality venues under a single unified design
                        system.
                    </p>
                    <div className="read-more">
                        Read Project <span>→</span>
                    </div>
                </a>
            </div>
        </div>
    )
}
