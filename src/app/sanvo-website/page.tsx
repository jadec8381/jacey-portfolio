"use client";
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState({
        num: "01",
        label: "Overview",
    })

    useEffect(() => {
        if (!containerRef.current) return

        const revealObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible")
                        revealObs.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        )
        containerRef.current
            .querySelectorAll(".scroll-reveal")
            .forEach((el) => revealObs.observe(el))

        const handleScroll = () => {
            if (!containerRef.current) return
            const sections =
                containerRef.current.querySelectorAll(".pd-section")

            let currentNum = "01"
            let currentLabel = "Overview"

            sections.forEach((sec) => {
                const rect = sec.getBoundingClientRect()
                if (rect.top <= 350) {
                    currentNum = sec.getAttribute("data-num") || currentNum
                    currentLabel =
                        sec.getAttribute("data-label") || currentLabel
                }
            })

            setActiveSection((prev) => {
                if (prev.num !== currentNum)
                    return { num: currentNum, label: currentLabel }
                return prev
            })
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => {
            revealObs.disconnect()
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div ref={containerRef} className="project-detail-container">
            <style>{`
                :root {
                    --bg: #0A0D14; 
                    --white: #F4F3F0;
                    --gray-text: #999;
                    --gray-light: #ccc;
                    --rule: rgba(255, 255, 255, 0.15);
                    --rule-lt: rgba(255, 255, 255, 0.08);
                }

                .project-detail-container * { box-sizing: border-box; margin: 0; padding: 0; }
                .project-detail-container {
                    background: var(--bg);
                    color: var(--white);
                    font-family: 'Barlow', sans-serif;
                    padding-top: 140px;
                    padding-bottom: 120px;
                    width: 100%;
                }

                /* ══════════════════════════════
                   1. HERO SECTION
                   ══════════════════════════════ */
                .pd-hero { padding: 0 48px; margin-bottom: 100px; }

                .pd-hero-img {
                    width: 100%; height: 75vh; min-height: 500px;
                    background: #111; overflow: hidden; margin-bottom: 48px;
                }
                .pd-hero-img img {
                    width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9);
                }

                .pd-hero-info {
                    display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: end;
                    border-bottom: 2px solid var(--rule); padding-bottom: 48px;
                }

                .pd-title-wrap h1 {
                    font-family: 'Oswald', sans-serif; font-size: clamp(64px, 8vw, 140px);
                    line-height: 0.9; font-weight: 700; text-transform: uppercase; letter-spacing: -0.02em;
                }
                /* 项目简介（Hero 底部） */
                .pd-title-summary {
                    font-size: 16px; color: var(--gray-light); line-height: 1.6;
                    margin-top: 24px; max-width: 480px;
                }

                .pd-meta-table { width: 100%; }
                .pd-meta-row {
                    display: flex; justify-content: space-between; padding: 16px 0;
                    border-top: 1px solid var(--rule-lt); font-size: 14px;
                }
                .pd-meta-row .mk { color: var(--gray-text); font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
                .pd-meta-row .mv { color: var(--white); font-weight: 500; text-align: right; }

                /* ══════════════════════════════
                   2. CONTENT BODY
                   ══════════════════════════════ */
                .pd-body {
                    padding: 0 48px 48px;
                    display: grid;
                    grid-template-columns: 300px 1fr; 
                    gap: 80px;
                    position: relative;
                }

                .pd-sidebar-col {
                    position: relative;
                    height: 100%;
                }

                .pd-sidebar-sticky {
                    position: sticky;
                    top: 160px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .pd-sticky-num {
                    font-family: 'Oswald', sans-serif; font-size: clamp(80px, 8vw, 140px);
                    line-height: 0.8; font-weight: 700; color: var(--white);
                    transition: all 0.3s ease;
                }
                .pd-sticky-label {
                    font-family: 'Barlow', sans-serif; font-size: 20px; font-weight: 500; color: var(--gray-text);
                    text-transform: uppercase; border-top: 2px solid var(--rule); padding-top: 16px; margin-top: 16px;
                }

                .pd-mobile-sticky-bar { display: none; }

                .pd-content {
                    display: flex; flex-direction: column; gap: 120px; 
                }

                .pd-section {
                    display: flex; flex-direction: column; gap: 40px;
                }

                /* 文本排版 */
                .pd-text-block {
                    display: grid; grid-template-columns: 1fr 2fr; gap: 40px;
                    border-top: 1px solid var(--rule-lt); padding-top: 24px;
                }
                .pd-text-title { font-family: 'Space Mono', monospace; font-size: 12px; text-transform: uppercase; color: var(--gray-text); }
                .pd-text-content h3 { font-family: 'Oswald', sans-serif; font-size: 28px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
                .pd-text-content p { font-size: 16px; line-height: 1.6; color: var(--gray-light); margin-bottom: 24px; }
                .pd-text-content ul { font-size: 15px; line-height: 1.8; color: var(--gray-light); padding-left: 20px; margin-bottom: 24px; }

                /* ══════════════════════════════
                   3. IMAGE GRID VARIANTS
                   ══════════════════════════════ */
                
                /* 通用图片样式 */
                .pd-img-group img {
                    width: 100%; height: 100%; object-fit: cover; 
                    border-radius: 4px;
                    transition: filter 0.4s ease;
                    filter: brightness(0.9);
                }
                .pd-img-group:hover img { filter: brightness(1); }
                
                /* Full width — 单张大图 */
                .pd-img-full { 
                    display: grid; grid-template-columns: 1fr; gap: 16px; 
                }

                /* 2-col equal — 两张等宽 */
                .pd-img-2col { 
                    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; 
                }

                /* 3-col equal — 三张等宽 */
                .pd-img-3col { 
                    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; 
                }

                /* 2:1 asymmetric — 左大右小 */
                .pd-img-2to1 { 
                    display: grid; grid-template-columns: 2fr 1fr; gap: 16px; 
                }

                /* 1:2 asymmetric — 左小右大 */
                .pd-img-1to2 { 
                    display: grid; grid-template-columns: 1fr 2fr; gap: 16px; 
                }

                /* Mixed: 1 full + 2 half — 上面一张大图，下面两张并排 */
                .pd-img-mixed {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
                }
                .pd-img-mixed .img-span-full { grid-column: 1 / -1; }

                /* 图片说明文字 */
                .pd-img-caption {
                    font-family: 'Barlow', sans-serif;
                    font-size: 12px;
                    color: var(--gray-text);
                    margin-top: 8px;
                    font-style: italic;
                }

                /* ══════════════════════════════
                   4. NEXT PROJECT FOOTER
                   ══════════════════════════════ */
                .pd-next {
                    padding: 80px 48px 0;
                    border-top: 2px solid var(--rule);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--white);
                    text-decoration: none;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }
                .pd-next:hover { opacity: 0.7; }
                .pd-next-label {
                    font-family: 'Space Mono', monospace;
                    font-size: 12px;
                    color: var(--gray-text);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 8px;
                }
                .pd-next-title {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(32px, 4vw, 56px);
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .pd-next-arrow {
                    font-size: 36px;
                    color: var(--gray-text);
                    transition: transform 0.3s;
                }
                .pd-next:hover .pd-next-arrow { transform: translateX(8px); }

                .scroll-reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

                /* ══════════════════════════════
                   TABLET
                   ══════════════════════════════ */
                @media (max-width: 1024px) {
                    .pd-hero, .pd-body, .pd-next { padding-left: 32px; padding-right: 32px; }
                    .pd-hero-info { grid-template-columns: 1fr; gap: 40px; border-bottom: none; }
                    .pd-meta-table { border-top: 2px solid var(--rule); }
                    .pd-body { grid-template-columns: 200px 1fr; gap: 40px; }
                    .pd-text-block { grid-template-columns: 1fr; gap: 16px; }
                    .pd-img-3col { grid-template-columns: 1fr 1fr; }
                }

                /* ══════════════════════════════
                   MOBILE
                   ══════════════════════════════ */
                @media (max-width: 768px) {
                    .project-detail-container { padding-top: 100px; }
                    .pd-hero, .pd-body, .pd-next { padding-left: 24px; padding-right: 24px; }
                    .pd-hero-img { height: 60vh; min-height: 360px; margin-bottom: 32px; }
                    .pd-title-wrap h1 { font-size: clamp(48px, 16vw, 80px); }
                    
                    .pd-sidebar-col { display: none; }
                    .pd-body { display: flex; flex-direction: column; padding-bottom: 48px;}
                    
                    .pd-mobile-sticky-bar {
                        display: flex; align-items: center; justify-content: space-between;
                        position: sticky;
                        top: 64px;
                        background: rgba(10, 13, 20, 0.95);
                        backdrop-filter: blur(8px);
                        padding: 16px 24px;
                        margin: 0 -24px 40px -24px;
                        border-bottom: 1px solid var(--rule); border-top: 1px solid var(--rule);
                        z-index: 90;
                    }
                    .mob-s-num { font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: 700; color: var(--white); }
                    .mob-s-label { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; color: var(--gray-light); letter-spacing: 1px; }
                    
                    .pd-img-2col, .pd-img-3col, .pd-img-2to1, .pd-img-1to2 { grid-template-columns: 1fr; }
                    .pd-content { gap: 80px; }
                }
            `}</style>

            {/* ══════════════════════════════
                HERO
                ══════════════════════════════ */}
            <section className="pd-hero scroll-reveal">
                <div className="pd-hero-img">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                        alt="SANVO Project Cover"
                    />
                </div>

                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>
                            SANVO
                            <br />
                            ECOSYSTEM
                        </h1>
                        <p className="pd-title-summary">
                            A bilingual web ecosystem for HKEX-listed chemical
                            manufacturer, built with AI-augmented design
                            workflows to serve both Chinese and North American
                            markets.
                        </p>
                    </div>

                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Client</span>
                            <span className="mv">
                                SANVO Fine Chemicals (HKEX: 0301.HK)
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">
                                Product & Strategy Lead, Creative Director
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Timeline</span>
                            <span className="mv">2025 — 2026</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Services</span>
                            <span className="mv">
                                UX/UI, IA, AI Integration, Frontend Dev
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Stack</span>
                            <span className="mv">React, Tailwind CSS, CMS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                BODY
                ══════════════════════════════ */}
            <section className="pd-body">
                <div className="pd-sidebar-col">
                    <div className="pd-sidebar-sticky">
                        <div className="pd-sticky-num">{activeSection.num}</div>
                        <div className="pd-sticky-label">
                            {activeSection.label}
                        </div>
                    </div>
                </div>

                <div className="pd-mobile-sticky-bar">
                    <span className="mob-s-num">{activeSection.num}</span>
                    <span className="mob-s-label">{activeSection.label}</span>
                </div>

                <div className="pd-content">
                    {/* ── Section 01: Overview ── */}
                    <div
                        className="pd-section"
                        data-num="01"
                        data-label="Overview"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Challenge</div>
                            <div className="pd-text-content">
                                <h3>Bridging Two Markets</h3>
                                <p>
                                    SANVO needed a bilingual web ecosystem that
                                    could serve their domestic Chinese market
                                    and expanding North American presence. The
                                    existing site lacked scalable IA, had no CMS
                                    workflow, and couldn't handle their 500+
                                    product catalog efficiently.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Approach</div>
                            <div className="pd-text-content">
                                <h3>AI-Augmented Design Workflow</h3>
                                <p>
                                    Led the full product strategy from data
                                    classification to CMS architecture to API
                                    parameter design. Used AI-augmented
                                    workflows (vibe-coding with Gemini) to
                                    rapidly prototype and iterate on the React +
                                    Tailwind frontend.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 02: Design ── */}
                    <div
                        className="pd-section"
                        data-num="02"
                        data-label="Design"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Information Architecture
                            </div>
                            <div className="pd-text-content">
                                <h3>Scalable Data Classification</h3>
                                <p>
                                    Designed a comprehensive data classification
                                    system for 500+ chemical products, creating
                                    a bilingual IA that works seamlessly across
                                    both language versions. Established CMS
                                    workflow and API parameter strategy for
                                    vendor handoff.
                                </p>
                            </div>
                        </div>

                        {/* 示范：Full-width 大图 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                                alt="SANVO IA Overview"
                            />
                            <p className="pd-img-caption">
                                Bilingual site architecture — desktop overview
                            </p>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Visual System</div>
                            <div className="pd-text-content">
                                <h3>Brand-Level Design Language</h3>
                                <p>
                                    Established a scalable visual design
                                    language that translates SANVO's industrial
                                    credibility into a modern digital presence.
                                    Typography, color, and layout systems
                                    designed for both Chinese and English
                                    reading patterns.
                                </p>
                            </div>
                        </div>

                        {/* 示范：2-col 等宽双图 */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/0bc2cd9d-72b5-4544-9583-ad2c8229c952/SANVO2.70275+copy+2.jpg"
                                alt="SANVO Visual System 1"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                                alt="SANVO Visual System 2"
                            />
                        </div>
                    </div>

                    {/* ── Section 03: Execution ── */}
                    <div
                        className="pd-section"
                        data-num="03"
                        data-label="Execution"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Frontend Development
                            </div>
                            <div className="pd-text-content">
                                <h3>React + Tailwind Implementation</h3>
                                <p>
                                    Built the production frontend in React with
                                    Tailwind CSS, implementing responsive
                                    layouts, bilingual routing, and
                                    component-level design system. Prepared
                                    comprehensive vendor handoff documentation
                                    covering data classification, CMS
                                    integration, and API specs.
                                </p>
                            </div>
                        </div>

                        {/* 示范：2:1 asymmetric */}
                        <div className="pd-img-2to1 pd-img-group scroll-reveal">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/0bc2cd9d-72b5-4544-9583-ad2c8229c952/SANVO2.70275+copy+2.jpg"
                                alt="SANVO Desktop View"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                                alt="SANVO Mobile View"
                            />
                        </div>

                        {/* 示范：Mixed — 1 full + 2 half */}
                        <div className="pd-img-mixed pd-img-group scroll-reveal">
                            <img
                                className="img-span-full"
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                                alt="SANVO Full Spread"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/0bc2cd9d-72b5-4544-9583-ad2c8229c952/SANVO2.70275+copy+2.jpg"
                                alt="SANVO Detail 1"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                                alt="SANVO Detail 2"
                            />
                        </div>
                    </div>

                    {/* ── Section 04: Result ── */}
                    <div
                        className="pd-section"
                        data-num="04"
                        data-label="Result"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Outcome</div>
                            <div className="pd-text-content">
                                <h3>Redefining Digital Presence</h3>
                                <p>
                                    Delivered a production-ready bilingual web
                                    ecosystem with comprehensive vendor handoff
                                    documentation. The new platform positions
                                    SANVO as a modern, digitally-forward
                                    enterprise ready for global scale — a
                                    significant upgrade from their previous
                                    static web presence.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Key Deliverables
                            </div>
                            <div className="pd-text-content">
                                <h3>What Was Shipped</h3>
                                <ul>
                                    <li>
                                        Bilingual React + Tailwind frontend
                                        (production-ready)
                                    </li>
                                    <li>
                                        Scalable IA for 500+ product catalog
                                    </li>
                                    <li>
                                        CMS workflow & API parameter strategy
                                    </li>
                                    <li>
                                        Editorial still life campaign (4 product
                                        series)
                                    </li>
                                    <li>
                                        Comprehensive v4 vendor handoff brief
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Final showcase — full width */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"
                                alt="SANVO Final Showcase"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                NEXT PROJECT
                ══════════════════════════════ */}
            <Link href="#" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">GRID GAMERS</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </Link>
        </div>
    )
}
