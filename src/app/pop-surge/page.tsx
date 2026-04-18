"use client";
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeSection, setActiveSection] = useState({
        num: "01",
        label: "Concept",
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
            let currentLabel = "Concept"

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

                .pd-hero { padding: 0 48px; margin-bottom: 100px; }
                .pd-hero-img {
                    width: 100%; height: 75vh; min-height: 500px;
                    background: #111; overflow: hidden; margin-bottom: 48px;
                }
                .pd-hero-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9); }

                .pd-hero-info {
                    display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: end;
                    border-bottom: 2px solid var(--rule); padding-bottom: 48px;
                }
                .pd-title-wrap h1 {
                    font-family: 'Oswald', sans-serif; font-size: clamp(64px, 8vw, 140px);
                    line-height: 0.9; font-weight: 700; text-transform: uppercase; letter-spacing: -0.02em;
                }
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

                .pd-body {
                    padding: 0 48px 48px;
                    display: grid;
                    grid-template-columns: 300px 1fr; 
                    gap: 80px;
                    position: relative;
                }
                .pd-sidebar-col { position: relative; height: 100%; }
                .pd-sidebar-sticky {
                    position: sticky; top: 160px;
                    display: flex; flex-direction: column; gap: 8px;
                }
                .pd-sticky-num {
                    font-family: 'Oswald', sans-serif; font-size: clamp(80px, 8vw, 140px);
                    line-height: 0.8; font-weight: 700; color: var(--white); transition: all 0.3s ease;
                }
                .pd-sticky-label {
                    font-family: 'Barlow', sans-serif; font-size: 20px; font-weight: 500; color: var(--gray-text);
                    text-transform: uppercase; border-top: 2px solid var(--rule); padding-top: 16px; margin-top: 16px;
                }
                .pd-mobile-sticky-bar { display: none; }
                .pd-content { display: flex; flex-direction: column; gap: 120px; }
                .pd-section { display: flex; flex-direction: column; gap: 40px; }

                .pd-text-block {
                    display: grid; grid-template-columns: 1fr 2fr; gap: 40px;
                    border-top: 1px solid var(--rule-lt); padding-top: 24px;
                }
                .pd-text-title { font-family: 'Space Mono', monospace; font-size: 12px; text-transform: uppercase; color: var(--gray-text); }
                .pd-text-content h3 { font-family: 'Oswald', sans-serif; font-size: 28px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
                .pd-text-content p { font-size: 16px; line-height: 1.6; color: var(--gray-light); margin-bottom: 24px; }

                /* Design pillars grid */
                .pd-pillars {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
                    background: var(--rule-lt); border: 1px solid var(--rule-lt);
                }
                .pd-pillar {
                    background: var(--bg); padding: 32px;
                    transition: background 0.3s;
                }
                .pd-pillar:hover { background: rgba(255,255,255,0.02); }
                .pd-pillar .pillar-num {
                    font-family: 'Space Mono', monospace; font-size: 11px;
                    color: var(--gray-text); margin-bottom: 12px;
                }
                .pd-pillar .pillar-title {
                    font-family: 'Oswald', sans-serif; font-size: 22px;
                    font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
                    margin-bottom: 10px;
                }
                .pd-pillar .pillar-desc {
                    font-size: 14px; color: var(--gray-text); line-height: 1.5;
                }

                /* Awards list */
                .pd-awards {
                    border-top: 2px solid var(--rule); padding-top: 32px;
                }
                .pd-award-item {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 20px 0; border-bottom: 1px solid var(--rule-lt);
                    transition: all 0.3s;
                }
                .pd-award-item:hover { padding-left: 12px; }
                .pd-award-name {
                    font-family: 'Barlow', sans-serif; font-size: 16px; font-weight: 500;
                }
                .pd-award-detail {
                    font-family: 'Space Mono', monospace; font-size: 11px;
                    color: var(--gray-text); text-transform: uppercase; letter-spacing: 1px;
                    text-align: right;
                }
                .pd-award-badge {
                    display: inline-block; padding: 3px 10px; margin-left: 12px;
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 20px;
                    font-size: 9px; font-weight: 600; letter-spacing: 1px;
                    text-transform: uppercase; color: var(--gray-light);
                }

                /* Stat row */
                .pd-stat-row {
                    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;
                    border-top: 1px solid var(--rule-lt); border-bottom: 1px solid var(--rule-lt);
                    padding: 40px 0;
                }
                .pd-stat { text-align: center; }
                .pd-stat .stat-num {
                    font-family: 'Oswald', sans-serif; font-size: clamp(36px, 4vw, 56px);
                    font-weight: 700; line-height: 1; margin-bottom: 8px;
                }
                .pd-stat .stat-label {
                    font-family: 'Space Mono', monospace; font-size: 11px;
                    color: var(--gray-text); text-transform: uppercase; letter-spacing: 1px;
                }

                .pd-img-group img {
                    width: 100%; height: 100%; object-fit: cover; border-radius: 4px;
                    transition: filter 0.4s ease; filter: brightness(0.9);
                }
                .pd-img-group:hover img { filter: brightness(1); }
                .pd-img-full { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .pd-img-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .pd-img-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
                .pd-img-2to1 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
                .pd-img-1to2 { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
                .pd-img-mixed { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .pd-img-mixed .img-span-full { grid-column: 1 / -1; }
                .pd-img-caption {
                    font-family: 'Barlow', sans-serif; font-size: 12px;
                    color: var(--gray-text); margin-top: 8px; font-style: italic;
                }

                .pd-next {
                    padding: 80px 48px 0; border-top: 2px solid var(--rule);
                    display: flex; justify-content: space-between; align-items: center;
                    color: var(--white); text-decoration: none; cursor: pointer; transition: opacity 0.3s;
                }
                .pd-next:hover { opacity: 0.7; }
                .pd-next-label { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--gray-text); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
                .pd-next-title { font-family: 'Oswald', sans-serif; font-size: clamp(32px, 4vw, 56px); font-weight: 700; text-transform: uppercase; }
                .pd-next-arrow { font-size: 36px; color: var(--gray-text); transition: transform 0.3s; }
                .pd-next:hover .pd-next-arrow { transform: translateX(8px); }

                .scroll-reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 1024px) {
                    .pd-hero, .pd-body, .pd-next { padding-left: 32px; padding-right: 32px; }
                    .pd-hero-info { grid-template-columns: 1fr; gap: 40px; border-bottom: none; }
                    .pd-meta-table { border-top: 2px solid var(--rule); }
                    .pd-body { grid-template-columns: 200px 1fr; gap: 40px; }
                    .pd-text-block { grid-template-columns: 1fr; gap: 16px; }
                    .pd-img-3col { grid-template-columns: 1fr 1fr; }
                    .pd-pillars { grid-template-columns: 1fr; }
                    .pd-stat-row { grid-template-columns: 1fr; gap: 32px; }
                }

                @media (max-width: 768px) {
                    .project-detail-container { padding-top: 100px; }
                    .pd-hero, .pd-body, .pd-next { padding-left: 24px; padding-right: 24px; }
                    .pd-hero-img { height: 60vh; min-height: 360px; margin-bottom: 32px; }
                    .pd-title-wrap h1 { font-size: clamp(48px, 16vw, 80px); }
                    .pd-sidebar-col { display: none; }
                    .pd-body { display: flex; flex-direction: column; padding-bottom: 48px; }
                    .pd-mobile-sticky-bar {
                        display: flex; align-items: center; justify-content: space-between;
                        position: sticky; top: 64px;
                        background: rgba(10, 13, 20, 0.95); backdrop-filter: blur(8px);
                        padding: 16px 24px; margin: 0 -24px 40px -24px;
                        border-bottom: 1px solid var(--rule); border-top: 1px solid var(--rule); z-index: 90;
                    }
                    .mob-s-num { font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: 700; color: var(--white); }
                    .mob-s-label { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; color: var(--gray-light); letter-spacing: 1px; }
                    .pd-img-2col, .pd-img-3col, .pd-img-2to1, .pd-img-1to2 { grid-template-columns: 1fr; }
                    .pd-pillars { grid-template-columns: 1fr; }
                    .pd-content { gap: 80px; }
                    .pd-award-item { flex-direction: column; align-items: flex-start; gap: 4px; }
                    .pd-award-detail { text-align: left; }
                }
            `}</style>

            {/* ══════════════════════════════
                HERO
                ══════════════════════════════ */}
            <section className="pd-hero scroll-reveal">
                <div className="pd-hero-img">
                    {/* TODO: 替换成 POP: Surge hero image */}
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/b21ad9dd-e0b2-4deb-a91b-9964ff0b9415/Poster7.png"
                        alt="POP: Surge"
                    />
                </div>

                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>
                            POP:
                            <br />
                            SURGE
                        </h1>
                        <p className="pd-title-summary">
                            A multi-award-winning brand identity for elite
                            skateboarding footwear — where performance
                            engineering meets street culture rebellion. Logo,
                            typography system, poster series, and full visual
                            identity.
                        </p>
                    </div>

                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Project</span>
                            <span className="mv">
                                POP: Surge — Skateboarding Footwear
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">
                                Visual Brand Identity Lead
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Year</span>
                            <span className="mv">2024</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Scope</span>
                            <span className="mv">
                                Brand Identity, Logo, Typography, Poster Design
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Recognition</span>
                            <span className="mv">5 Awards & Nominations</span>
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
                    {/* ── Section 01: Concept ── */}
                    <div
                        className="pd-section"
                        data-num="01"
                        data-label="Concept"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">About</div>
                            <div className="pd-text-content">
                                <h3>Innovation Meets Rebellion</h3>
                                <p>
                                    POP is a skateboarding brand that champions
                                    performance over stereotype. Surge, its
                                    signature footwear line, blends cutting-edge
                                    technology with street culture authenticity
                                    — designed for an era where skateboarding
                                    earns its place on the Olympic stage. The
                                    brand identity needed to embody this
                                    duality: engineered precision and raw
                                    energy.
                                </p>
                            </div>
                        </div>

                        {/* Design Pillars — 2x2 grid */}
                        <div className="pd-pillars scroll-reveal">
                            <div className="pd-pillar">
                                <div className="pillar-num">(01)</div>
                                <div className="pillar-title">
                                    Energy Return
                                </div>
                                <div className="pillar-desc">
                                    Skateboarding's core action is jumping. No
                                    shoe on the market addresses the need to
                                    jump higher and return energy from impact.
                                </div>
                            </div>
                            <div className="pd-pillar">
                                <div className="pillar-num">(02)</div>
                                <div className="pillar-title">Protection</div>
                                <div className="pillar-desc">
                                    Cushioning and structure to protect against
                                    heel bruising, rolled ankles, and board
                                    impact injuries.
                                </div>
                            </div>
                            <div className="pd-pillar">
                                <div className="pillar-num">(03)</div>
                                <div className="pillar-title">
                                    Board Feel & Grip
                                </div>
                                <div className="pillar-desc">
                                    The confidence of knowing how the board
                                    reacts — driven by upper material,
                                    thickness, and outsole grip.
                                </div>
                            </div>
                            <div className="pd-pillar">
                                <div className="pillar-num">(04)</div>
                                <div className="pillar-title">Flexibility</div>
                                <div className="pillar-desc">
                                    Natural foot movement increases stability
                                    and balance — essential for trick execution
                                    and landing.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 02: Identity ── */}
                    <div
                        className="pd-section"
                        data-num="02"
                        data-label="Identity"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Logo & Illustration
                            </div>
                            <div className="pd-text-content">
                                <h3>Visual System</h3>
                                <p>
                                    Developed a complete visual identity system
                                    including logomark, wordmark, typographic
                                    treatments, and custom illustrations. The
                                    system balances kinetic energy with
                                    typographic precision — aggressive enough
                                    for street culture, refined enough for
                                    Olympic-level branding.
                                </p>
                            </div>
                        </div>

                        {/* Logo & illustration showcase — 3x2 grid (6 images) */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            {/* TODO: 替换成 6 张 logo & illustration 图 */}
                            <img
                                src="/images/popsurge/pop-logored.png"
                                alt="Logo 1"
                            />
                            <img
                                src="/images/popsurge/pop-yellow.png"
                                alt="Logo 2"
                            />
                            <img
                                src="/images/popsurge/pop-logogrid.png"
                                alt="Logo 3"
                            />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: 替换成剩余 2 张 */}
                            <img
                                src="/images/popsurge/pop-logofamily.png"
                                alt="Illustration 1"
                            />
                            <img
                                src="/images/popsurge/pop-icons.png"
                                alt="Illustration 2"
                            />
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Poster Series</div>
                            <div className="pd-text-content">
                                <h3>Kinetic Typography Meets Street</h3>
                                <p>
                                    A series of 8 posters exploring kinetic
                                    typography, dynamic composition, and the
                                    tension between controlled design grids and
                                    the chaotic energy of skateboarding culture.
                                    Each poster pushes typographic boundaries
                                    while maintaining brand coherence.
                                </p>
                            </div>
                        </div>

                        {/* Poster showcase — mixed layouts for visual variety */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: 替换成 poster 图 */}
                            <img
                                src="/images/popsurge/pop-poster4.png"
                                alt="Poster 1"
                            />
                            <img
                                src="/images/popsurge/pop-poster8.png"
                                alt="Poster 2"
                            />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img
                                src="/images/popsurge/pop-poster2.png"
                                alt="Poster 3"
                            />
                            <img
                                src="/images/popsurge/pop-poster3.png"
                                alt="Poster 4"
                            />
                            <img
                                src="/images/popsurge/pop-poster5.png"
                                alt="Poster 5"
                            />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img
                                src="/images/popsurge/pop-poster1.png"
                                alt="Poster 6"
                            />
                            <img
                                src="/images/popsurge/pop-poster6.png"
                                alt="Poster 7"
                            />
                        </div>
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img
                                src="/images/popsurge/pop-poster7.png"
                                alt="Poster 8"
                            />
                        </div>
                    </div>

                    {/* ── Section 03: Recognition ── */}
                    <div
                        className="pd-section"
                        data-num="03"
                        data-label="Recognition"
                    >
                        {/* Stats */}
                        <div className="pd-stat-row scroll-reveal">
                            <div className="pd-stat">
                                <div className="stat-num">5</div>
                                <div className="stat-label">
                                    Awards & Nominations
                                </div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">8</div>
                                <div className="stat-label">Poster Series</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">6</div>
                                <div className="stat-label">
                                    Logo & Illustration Pieces
                                </div>
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Awards</div>
                            <div className="pd-text-content">
                                <h3>Industry Recognition</h3>
                                <p>
                                    POP: Surge received recognition across
                                    multiple international design competitions,
                                    validating the brand identity's ability to
                                    communicate at the intersection of sport
                                    performance and street culture.
                                </p>
                            </div>
                        </div>

                        {/* Awards list */}
                        <div className="pd-awards scroll-reveal">
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    INDIGO Awards 2026
                                </span>
                                <span className="pd-award-detail">
                                    April 2026
                                    <span className="pd-award-badge">
                                        Silver - Branding for Graphic Design; Bronze - Branding for Sports
                                    </span>
                                </span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    Design Intelligence Award 2025
                                </span>
                                <span className="pd-award-detail">
                                    November 2025
                                    <span className="pd-award-badge">
                                        Honorable Mention Award
                                    </span>
                                </span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    Core77 Design Awards
                                </span>
                                <span className="pd-award-detail">
                                    June 2024
                                    <span className="pd-award-badge">
                                        Student Notable
                                    </span>
                                </span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    FIT Sport Design Awards
                                </span>
                                <span className="pd-award-detail">
                                    May 2024
                                </span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    New York Product Design Awards
                                </span>
                                <span className="pd-award-detail">
                                    April 2024
                                </span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    MUSE Design Awards
                                </span>
                                <span className="pd-award-detail">
                                    March 2024
                                    <span className="pd-award-badge">
                                        Silver
                                    </span>
                                </span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    Hiiibrand Awards — Student A Branding
                                </span>
                                <span className="pd-award-detail">2023</span>
                            </div>
                            <div className="pd-award-item">
                                <span className="pd-award-name">
                                    Hiiibrand Awards — Student B Logo
                                </span>
                                <span className="pd-award-detail">
                                    2023
                                    <span className="pd-award-badge">
                                        Merit
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                NEXT PROJECT
                ══════════════════════════════ */}
            <Link href="/4d6" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">4D6 CREATIVE</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </Link>
        </div>
    )
}
