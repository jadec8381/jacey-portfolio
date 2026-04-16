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

    const PH =
        "https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/10db6907-fd8f-4168-86de-925b5db3fc99/Package-3.png"

    return (
        <div ref={containerRef} className="project-detail-container">
            <style>{`
                :root {
                    --bg: #0A0D14;
                    --white: #F4F3F0;
                    --gray-text: #999;
                    --gray-light: #ccc;
                    --rule: rgba(255,255,255,0.15);
                    --rule-lt: rgba(255,255,255,0.08);
                }
                .project-detail-container * { box-sizing: border-box; margin: 0; padding: 0; }
                .project-detail-container {
                    background: var(--bg); color: var(--white);
                    font-family: 'Barlow', sans-serif;
                    padding-top: 140px; padding-bottom: 120px; width: 100%;
                }

                .pd-hero { padding: 0 48px; margin-bottom: 100px; }
                .pd-hero-img { width: 100%; height: 75vh; min-height: 500px; background: #111; overflow: hidden; margin-bottom: 48px; }
                .pd-hero-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9); }
                .pd-hero-info { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: end; border-bottom: 2px solid var(--rule); padding-bottom: 48px; }
                .pd-title-wrap h1 { font-family: 'Oswald', sans-serif; font-size: clamp(64px,8vw,140px); line-height: 0.9; font-weight: 700; text-transform: uppercase; letter-spacing: -0.02em; }
                .pd-title-summary { font-size: 16px; color: var(--gray-light); line-height: 1.6; margin-top: 24px; max-width: 480px; }
                .pd-meta-table { width: 100%; }
                .pd-meta-row { display: flex; justify-content: space-between; padding: 16px 0; border-top: 1px solid var(--rule-lt); font-size: 14px; }
                .pd-meta-row .mk { color: var(--gray-text); font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
                .pd-meta-row .mv { color: var(--white); font-weight: 500; text-align: right; }

                .pd-body { padding: 0 48px 48px; display: grid; grid-template-columns: 300px 1fr; gap: 80px; position: relative; }
                .pd-sidebar-col { position: relative; height: 100%; }
                .pd-sidebar-sticky { position: sticky; top: 160px; display: flex; flex-direction: column; gap: 8px; }
                .pd-sticky-num { font-family: 'Oswald', sans-serif; font-size: clamp(80px,8vw,140px); line-height: 0.8; font-weight: 700; color: var(--white); transition: all 0.3s ease; }
                .pd-sticky-label { font-family: 'Barlow', sans-serif; font-size: 20px; font-weight: 500; color: var(--gray-text); text-transform: uppercase; border-top: 2px solid var(--rule); padding-top: 16px; margin-top: 16px; }
                .pd-mobile-sticky-bar { display: none; }
                .pd-content { display: flex; flex-direction: column; gap: 120px; }
                .pd-section { display: flex; flex-direction: column; gap: 40px; }

                .pd-text-block { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; border-top: 1px solid var(--rule-lt); padding-top: 24px; }
                .pd-text-title { font-family: 'Space Mono', monospace; font-size: 12px; text-transform: uppercase; color: var(--gray-text); }
                .pd-text-content h3 { font-family: 'Oswald', sans-serif; font-size: 28px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
                .pd-text-content p { font-size: 16px; line-height: 1.6; color: var(--gray-light); margin-bottom: 24px; }

                /* Service pillars */
                .pd-services { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--rule-lt); border: 1px solid var(--rule-lt); }
                .pd-service { background: var(--bg); padding: 24px 16px; text-align: center; transition: background 0.3s; }
                .pd-service:hover { background: rgba(255,255,255,0.02); }
                .pd-service-icon { font-size: 24px; margin-bottom: 12px; }
                .pd-service-label { font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-light); line-height: 1.4; }

                /* Video */
                .pd-video-wrap { width: 100%; aspect-ratio: 16/9; background: #111; border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; cursor: pointer; transition: all 0.3s; }
                .pd-video-wrap:hover { background: #1a1a1a; }
                .pd-video-label { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--gray-text); text-transform: uppercase; letter-spacing: 2px; }
                .pd-video-play { width: 64px; height: 64px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: rgba(255,255,255,0.6); position: absolute; transition: all 0.3s; }
                .pd-video-wrap:hover .pd-video-play { border-color: var(--white); color: var(--white); transform: scale(1.1); }

                .pd-img-group img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; transition: filter 0.4s ease; filter: brightness(0.9); }
                .pd-img-group:hover img { filter: brightness(1); }
                .pd-img-full { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .pd-img-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .pd-img-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
                .pd-img-2to1 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
                .pd-img-mixed { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .pd-img-mixed .img-span-full { grid-column: 1 / -1; }
                .pd-img-caption { font-family: 'Barlow', sans-serif; font-size: 12px; color: var(--gray-text); margin-top: 8px; font-style: italic; }

                .pd-next { padding: 80px 48px 0; border-top: 2px solid var(--rule); display: flex; justify-content: space-between; align-items: center; color: var(--white); text-decoration: none; cursor: pointer; transition: opacity 0.3s; }
                .pd-next:hover { opacity: 0.7; }
                .pd-next-label { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--gray-text); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
                .pd-next-title { font-family: 'Oswald', sans-serif; font-size: clamp(32px,4vw,56px); font-weight: 700; text-transform: uppercase; }
                .pd-next-arrow { font-size: 36px; color: var(--gray-text); transition: transform 0.3s; }
                .pd-next:hover .pd-next-arrow { transform: translateX(8px); }

                .scroll-reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
                .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 1024px) {
                    .pd-hero, .pd-body, .pd-next { padding-left: 32px; padding-right: 32px; }
                    .pd-hero-info { grid-template-columns: 1fr; gap: 40px; border-bottom: none; }
                    .pd-meta-table { border-top: 2px solid var(--rule); }
                    .pd-body { grid-template-columns: 200px 1fr; gap: 40px; }
                    .pd-text-block { grid-template-columns: 1fr; gap: 16px; }
                    .pd-img-3col { grid-template-columns: 1fr 1fr; }
                    .pd-services { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 768px) {
                    .project-detail-container { padding-top: 100px; }
                    .pd-hero, .pd-body, .pd-next { padding-left: 24px; padding-right: 24px; }
                    .pd-hero-img { height: 60vh; min-height: 360px; margin-bottom: 32px; }
                    .pd-title-wrap h1 { font-size: clamp(48px,16vw,80px); }
                    .pd-sidebar-col { display: none; }
                    .pd-body { display: flex; flex-direction: column; padding-bottom: 48px; }
                    .pd-mobile-sticky-bar {
                        display: flex; align-items: center; justify-content: space-between;
                        position: sticky; top: 64px; background: rgba(10,13,20,0.95); backdrop-filter: blur(8px);
                        padding: 16px 24px; margin: 0 -24px 40px -24px;
                        border-bottom: 1px solid var(--rule); border-top: 1px solid var(--rule); z-index: 90;
                    }
                    .mob-s-num { font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: 700; }
                    .mob-s-label { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; color: var(--gray-light); letter-spacing: 1px; }
                    .pd-img-2col, .pd-img-3col, .pd-img-2to1 { grid-template-columns: 1fr; }
                    .pd-services { grid-template-columns: 1fr 1fr; }
                    .pd-content { gap: 80px; }
                }
            `}</style>

            {/* ══════════ HERO ══════════ */}
            <section className="pd-hero scroll-reveal">
                <div className="pd-hero-img">
                    <img src={PH} alt="4D6 Esports Wellness" />
                </div>
                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>
                            4D6
                            <br />
                            ESPORTS
                            <br />
                            WELLNESS
                        </h1>
                        <p className="pd-title-summary">
                            A co-habituating esports training service hub —
                            comprehensive brand identity system including
                            packaging, spatial design, and digital touchpoints.
                            MFA thesis work at SVA Products of Design.
                        </p>
                    </div>
                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Program</span>
                            <span className="mv">
                                SVA MFA Products of Design
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Thesis</span>
                            <span className="mv">
                                SuperCarry: Fostering Wellness in Esports
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">Brand Identity Designer</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Year</span>
                            <span className="mv">2024</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Scope</span>
                            <span className="mv">
                                Brand Identity, Packaging, Spatial, Logo
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ BODY ══════════ */}
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
                    {/* ── 01: Concept ── */}
                    <div
                        className="pd-section"
                        data-num="01"
                        data-label="Concept"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">About</div>
                            <div className="pd-text-content">
                                <h3>Elite Training, Accessible to All</h3>
                                <p>
                                    4D6 is a co-habituating esports training
                                    service hub designed for the dynamic needs
                                    of esports organizations and pro players.
                                    Inspired by the "high value, low cost"
                                    model, it combines top-tier training
                                    facilities with accessibility that even
                                    casual players can appreciate — a community
                                    hub where athletes at all levels can hone
                                    skills, share strategies, and build
                                    camaraderie.
                                </p>
                            </div>
                        </div>

                        {/* Service pillars */}
                        <div className="pd-services scroll-reveal">
                            <div className="pd-service">
                                <div className="pd-service-icon">🎮</div>
                                <div className="pd-service-label">
                                    Training & Content Rooms
                                </div>
                            </div>
                            <div className="pd-service">
                                <div className="pd-service-icon">💪</div>
                                <div className="pd-service-label">
                                    Physical Health Facilities
                                </div>
                            </div>
                            <div className="pd-service">
                                <div className="pd-service-icon">🧠</div>
                                <div className="pd-service-label">
                                    Mental Health Services
                                </div>
                            </div>
                            <div className="pd-service">
                                <div className="pd-service-icon">🍽</div>
                                <div className="pd-service-label">
                                    Food Services
                                </div>
                            </div>
                            <div className="pd-service">
                                <div className="pd-service-icon">🤝</div>
                                <div className="pd-service-label">
                                    Community Spaces
                                </div>
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Name Origin</div>
                            <div className="pd-text-content">
                                <h3>Rolling the Dice</h3>
                                <p>
                                    "4D6" comes from Dungeons & Dragons, where
                                    rolling four six-sided dice determines
                                    character attributes. The reference
                                    underscores strategic planning, resilience,
                                    and adaptability — qualities crucial for
                                    success in both tabletop RPGs and
                                    competitive esports. Just as each roll
                                    shapes a character's destiny, 4D6 aims to
                                    shape the holistic development of esports
                                    players.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 02: Identity ── */}
                    <div
                        className="pd-section"
                        data-num="02"
                        data-label="Identity"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Logo Development
                            </div>
                            <div className="pd-text-content">
                                <h3>From Dice to Mark</h3>
                                <p>
                                    The logo is designed to resemble rolling
                                    dice — symbolizing the dynamic, multifaceted
                                    nature of the esports environment. The
                                    visual connection emphasizes the element of
                                    chance and preparation, reflecting the
                                    unpredictable yet exciting journey of an
                                    esports career.
                                </p>
                            </div>
                        </div>

                        {/* Logo drafts — 2x2 grid */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: 替换成 4 张 logo draft */}
                            <img src={PH} alt="Logo Draft 1" />
                            <img src={PH} alt="Logo Draft 2" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Logo Draft 3" />
                            <img src={PH} alt="Logo Draft 4" />
                        </div>
                        <p className="pd-img-caption scroll-reveal">
                            Logo exploration drafts — iterating from concept to
                            final mark
                        </p>

                        {/* Finalized logo — full width hero moment */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            {/* TODO: 替换成 finalized logo */}
                            <img src={PH} alt="4D6 Final Logo" />
                            <p className="pd-img-caption">Finalized logomark</p>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Brand Mockups</div>
                            <div className="pd-text-content">
                                <h3>Identity in Context</h3>
                                <p>
                                    The brand system applied across packaging,
                                    signage, merchandise, and spatial design —
                                    demonstrating how the identity scales from
                                    screen to physical environment.
                                </p>
                            </div>
                        </div>

                        {/* Mockups — mixed layouts for 6 images */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            {/* TODO: 替换成 mockup hero shot */}
                            <img src={PH} alt="Mockup 1" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Mockup 2" />
                            <img src={PH} alt="Mockup 3" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Mockup 4" />
                            <img src={PH} alt="Mockup 5" />
                            <img src={PH} alt="Mockup 6" />
                        </div>
                    </div>

                    {/* ── 03: Thesis ── */}
                    <div
                        className="pd-section"
                        data-num="03"
                        data-label="Thesis"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">MFA Thesis</div>
                            <div className="pd-text-content">
                                <h3>SuperCarry</h3>
                                <p>
                                    4D6 is part of the broader thesis work
                                    "SuperCarry: Fostering a Wellness Approach
                                    to Enhance Career Longevity in Esports
                                    Players" — exploring how holistic wellness
                                    infrastructure can extend the competitive
                                    lifespan of professional esports athletes.
                                    Presented at SVA MFA Products of Design,
                                    2024.
                                </p>
                            </div>
                        </div>

                        {/* Thesis presentation video */}
                        <a
                            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                        >
                            <div className="pd-video-wrap scroll-reveal">
                                {/* TODO: 替换 href 里的 YOUR_VIDEO_ID 成实际 YouTube ID */}
                                <div className="pd-video-play">▶</div>
                                <span className="pd-video-label">
                                    Thesis Presentation — Watch on YouTube
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════ NEXT ══════════ */}
            <a href="#" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">AURORA SERIES</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </a>
        </div>
    )
}
