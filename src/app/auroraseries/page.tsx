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

    const PH =
        "https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/b98f7989-e113-423f-a37a-39b8cb355134/Aurora-Socials_DC+announcement+-+Linkedin.png"

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

                /* Stat row */
                .pd-stat-row {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
                    border-top: 1px solid var(--rule-lt); border-bottom: 1px solid var(--rule-lt);
                    padding: 40px 0;
                }
                .pd-stat { text-align: center; }
                .pd-stat .stat-num {
                    font-family: 'Oswald', sans-serif; font-size: clamp(36px, 4vw, 56px);
                    font-weight: 700; line-height: 1; margin-bottom: 8px;
                }
                .pd-stat .stat-label {
                    font-family: 'Space Mono', monospace; font-size: 10px;
                    color: var(--gray-text); text-transform: uppercase; letter-spacing: 1px;
                }

                /* Sponsor logos row */
                .pd-sponsors {
                    border-top: 1px solid var(--rule-lt);
                    padding-top: 24px;
                }
                .pd-sponsors-label {
                    font-family: 'Space Mono', monospace; font-size: 11px;
                    text-transform: uppercase; color: var(--gray-text); letter-spacing: 2px;
                    margin-bottom: 24px;
                }
                .pd-sponsors-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
                    background: var(--rule-lt); border: 1px solid var(--rule-lt);
                }
                .pd-sponsor-item {
                    background: var(--bg); padding: 32px 24px;
                    display: flex; flex-direction: column; align-items: center;
                    justify-content: center; gap: 12px;
                    transition: background 0.3s;
                }
                .pd-sponsor-item:hover { background: rgba(255,255,255,0.02); }
                .pd-sponsor-logo {
                    height: 32px; opacity: 0.5; filter: brightness(0) invert(1);
                    transition: opacity 0.3s;
                }
                .pd-sponsor-item:hover .pd-sponsor-logo { opacity: 0.8; }
                .pd-sponsor-name {
                    font-family: 'Oswald', sans-serif; font-size: 18px;
                    font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
                    color: rgba(255,255,255,0.4);
                    transition: color 0.3s;
                }
                .pd-sponsor-item:hover .pd-sponsor-name { color: rgba(255,255,255,0.7); }
                .pd-sponsor-type {
                    font-family: 'Space Mono', monospace; font-size: 9px;
                    text-transform: uppercase; letter-spacing: 1.5px;
                    color: rgba(255,255,255,0.25);
                }

                /* Timeline milestones */
                .pd-timeline {
                    border-top: 1px solid var(--rule-lt); padding-top: 24px;
                }
                .pd-timeline-row {
                    display: grid; grid-template-columns: 120px 1fr;
                    gap: 24px; padding: 20px 0;
                    border-bottom: 1px solid var(--rule-lt);
                    transition: all 0.3s;
                }
                .pd-timeline-row:hover { padding-left: 8px; }
                .pd-timeline-year {
                    font-family: 'Oswald', sans-serif; font-size: 24px;
                    font-weight: 700; color: var(--white);
                }
                .pd-timeline-label {
                    font-family: 'Space Mono', monospace; font-size: 10px;
                    text-transform: uppercase; color: var(--gray-text); letter-spacing: 1px;
                    margin-bottom: 4px;
                }
                .pd-timeline-desc {
                    font-size: 15px; color: var(--gray-light); line-height: 1.5;
                }

                /* Gallery */
                .pd-gallery-label {
                    border-top: 1px solid var(--rule-lt); padding-top: 16px;
                    font-family: 'Space Mono', monospace; font-size: 11px;
                    text-transform: uppercase; color: var(--gray-text); letter-spacing: 2px;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .pd-gallery-count { color: rgba(255,255,255,0.3); }

                .pd-img-group img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; transition: filter 0.4s ease; filter: brightness(0.9); }
                .pd-img-group:hover img { filter: brightness(1); }
                .pd-img-full { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .pd-img-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .pd-img-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
                .pd-img-2to1 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
                .pd-img-1to2 { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
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
                    .pd-stat-row { grid-template-columns: 1fr; gap: 32px; }
                    .pd-sponsors-grid { grid-template-columns: 1fr; }
                    .pd-timeline-row { grid-template-columns: 80px 1fr; }
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
                    .pd-img-2col, .pd-img-3col, .pd-img-2to1, .pd-img-1to2 { grid-template-columns: 1fr; }
                    .pd-content { gap: 80px; }
                }
            `}</style>

            {/* ══════════ HERO ══════════ */}
            <section className="pd-hero scroll-reveal">
                <div className="pd-hero-img">
                    <img src={PH} alt="Aurora Series" />
                </div>
                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>AURORA<br />SERIES</h1>
                        <p className="pd-title-summary">
                            Built the visual identity from scratch for a collegiate
                            Valorant tournament series — from zero brand presence to
                            securing three major sponsors and expanding across two
                            competitive titles within two seasons.
                        </p>
                    </div>
                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Organization</span>
                            <span className="mv">Aurora Series</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">Visual Brand Identity Lead</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Duration</span>
                            <span className="mv">2023 — 2024</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Scope</span>
                            <span className="mv">Brand Identity, Brand Book, Social Graphics</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Output</span>
                            <span className="mv">32+ Graphics · 2 Seasons · 2 Titles</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ BODY ══════════ */}
            <section className="pd-body">
                <div className="pd-sidebar-col">
                    <div className="pd-sidebar-sticky">
                        <div className="pd-sticky-num">{activeSection.num}</div>
                        <div className="pd-sticky-label">{activeSection.label}</div>
                    </div>
                </div>
                <div className="pd-mobile-sticky-bar">
                    <span className="mob-s-num">{activeSection.num}</span>
                    <span className="mob-s-label">{activeSection.label}</span>
                </div>

                <div className="pd-content">
                    {/* ── 01: Overview ── */}
                    <div className="pd-section" data-num="01" data-label="Overview">
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Mission</div>
                            <div className="pd-text-content">
                                <h3>Amplifying Underrepresented Voices</h3>
                                <p>
                                    Aurora Series is a collegiate-level Valorant tournament
                                    dedicated to discovering and nurturing talented individuals
                                    who identify with a marginalized gender — female, non-binary,
                                    and/or transgender — and aspire to break into the esports
                                    industry. By providing a safe competitive space, Aurora serves
                                    as a gateway for passionate college students into the greater
                                    esports scene.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Role</div>
                            <div className="pd-text-content">
                                <h3>Brand Identity Lead — From Zero</h3>
                                <p>
                                    Joined as founding visual lead to build Aurora's entire brand
                                    identity from scratch. Developed a comprehensive brand book
                                    covering color palettes, logo placement rules, typeface
                                    standards, and visual identity guidelines. Executed all
                                    tournament graphics across platforms and seasons — the
                                    visual foundation that would go on to attract major sponsors.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 02: Impact ── */}
                    <div className="pd-section" data-num="02" data-label="Impact">
                        {/* Stats */}
                        <div className="pd-stat-row scroll-reveal">
                            <div className="pd-stat">
                                <div className="stat-num">3</div>
                                <div className="stat-label">Major Sponsors Secured</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">2</div>
                                <div className="stat-label">Competitive Titles</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">32+</div>
                                <div className="stat-label">Graphics Delivered</div>
                            </div>
                        </div>

                        {/* Sponsor logos */}
                        <div className="pd-sponsors scroll-reveal">
                            <div className="pd-sponsors-label">Year 1 Sponsors</div>
                            <div className="pd-sponsors-grid">
                                <div className="pd-sponsor-item">
                                    {/* TODO: 替换成 Omnic logo — 放 public/images/aurora/sponsors/ */}
                                    {/* <img src="/images/aurora/sponsors/omnic.svg" alt="Omnic" className="pd-sponsor-logo" /> */}
                                    <div className="pd-sponsor-name">Omnic</div>
                                    <div className="pd-sponsor-type">Esports Analytics</div>
                                </div>
                                <div className="pd-sponsor-item">
                                    {/* TODO: 替换成 Xfinity logo */}
                                    {/* <img src="/images/aurora/sponsors/xfinity.svg" alt="Xfinity" className="pd-sponsor-logo" /> */}
                                    <div className="pd-sponsor-name">Xfinity</div>
                                    <div className="pd-sponsor-type">Telecommunications</div>
                                </div>
                                <div className="pd-sponsor-item">
                                    {/* TODO: 替换成 Logitech logo */}
                                    {/* <img src="/images/aurora/sponsors/logitech.svg" alt="Logitech" className="pd-sponsor-logo" /> */}
                                    <div className="pd-sponsor-name">Logitech</div>
                                    <div className="pd-sponsor-type">Gaming Peripherals</div>
                                </div>
                            </div>
                        </div>

                        {/* Growth timeline */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Growth</div>
                            <div className="pd-text-content">
                                <h3>Brand-Driven Business Impact</h3>
                                <p>
                                    A strong visual identity doesn't just look good — it
                                    signals legitimacy. Aurora's brand system was instrumental
                                    in sponsor acquisition: professional, consistent visual
                                    output across platforms gave the org credibility that
                                    matched teams years ahead in operating history.
                                </p>
                            </div>
                        </div>

                        <div className="pd-timeline scroll-reveal">
                            <div className="pd-timeline-row">
                                <div className="pd-timeline-year">2023</div>
                                <div>
                                    <div className="pd-timeline-label">Year 1 — Launch</div>
                                    <div className="pd-timeline-desc">
                                        Founded with zero brand presence. Built complete visual
                                        identity system from scratch. Launched Valorant tournament.
                                        Secured Omnic, Xfinity, and Logitech as founding sponsors.
                                    </div>
                                </div>
                            </div>
                            <div className="pd-timeline-row">
                                <div className="pd-timeline-year">2024</div>
                                <div>
                                    <div className="pd-timeline-label">Year 2 — Expansion</div>
                                    <div className="pd-timeline-desc">
                                        Expanded from Valorant to Valorant + Overwatch.
                                        Scaled graphics output across two competitive titles
                                        while maintaining brand consistency across all touchpoints.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── 03: Work ── */}
                    <div className="pd-section" data-num="03" data-label="Work">
                        {/* Brand Book */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Brand Book</div>
                            <div className="pd-text-content">
                                <h3>Visual Identity System</h3>
                                <p>
                                    A detailed brand book standardizing Aurora's visual
                                    identity across all touchpoints — the document that
                                    sponsors and partners received to understand the org's
                                    visual standards and professionalism.
                                </p>
                            </div>
                        </div>

                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-brandbook.webp" alt="Brand Book Cover" />
                        </div>

                        {/* Graphics Gallery */}
                        <div className="pd-gallery-label scroll-reveal">
                            <span>Tournament & Social Graphics</span>
                            <span className="pd-gallery-count">Selected Pieces</span>
                        </div>

                        {/* Batch 1 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-aurora-2324-06.png" alt="Graphic 01" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-aurora-2324-04.png" alt="Graphic 02" />
                            <img src="/images/auroraseries/aurora-aurora-2324-05.png" alt="Graphic 03" />
                            <img src="/images/auroraseries/Aurora-Socials_Doc Header.png" alt="Graphic 04" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-2324-01.png" alt="Graphic 05" />
                            <img src="/images/auroraseries/aurora-2324-02.png" alt="Graphic 06" />
                            <img src="/images/auroraseries/aurora-2324-03.png" alt="Graphic 06" />
                        </div>

                        {/* Batch 2 */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-sponsors01.webp" alt="Graphic 02" />
                            <img src="/images/auroraseries/aurora-sponsors02.png" alt="Graphic 03" />
                            <img src="/images/auroraseries/aurora-sponsors03.png" alt="Graphic 04" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-aurora-2324-07.png" alt="Graphic 02" />
                            <img src="/images/auroraseries/aurora-aurora-2324-08.png" alt="Graphic 03" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-aurora-2324-09.png" alt="Graphic 11" />
                            <img src="/images/auroraseries/aurora-aurora-2324-10.png" alt="Graphic 12" />
                        </div>

                        {/* Batch 3 */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-2425-09.png" alt="Graphic 11" />
                            <img src="/images/auroraseries/aurora-2425-01.png" alt="Graphic 12" />
                        </div>
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-2425-02.png" alt="Graphic 16" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-2425-07.png" alt="Graphic 17" />
                            <img src="/images/auroraseries/aurora-2425-08.png" alt="Graphic 18" />
                        </div>

                        {/* Batch 4 */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-2425-03.png" alt="Graphic 19" />
                            <img src="/images/auroraseries/aurora-2425-04.png" alt="Graphic 20" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src="/images/auroraseries/aurora-2425-05.png" alt="Graphic 22" />
                            <img src="/images/auroraseries/aurora-2425-06.png" alt="Graphic 23" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ NEXT ══════════ */}
            <Link href="/ultra" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">ULTRA RECORDS</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </Link>
        </div>
    )
}