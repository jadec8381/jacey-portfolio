"use client";
import React, { useEffect, useRef, useState } from "react"

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

    /* 占位图 — 全部替换成实际图 */
    const PH =
        "https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/0bc2cd9d-72b5-4544-9583-ad2c8229c952/SANVO2.70275+copy+2.jpg"
    const PH2 =
        "https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4ecbe398-9db3-4b40-90fd-721a63e0e9ed/SANVO+-+%E7%9B%91%E4%BF%AE%E4%B8%AD.png"

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
                .pd-text-content ul { font-size: 15px; line-height: 1.8; color: var(--gray-light); padding-left: 20px; margin-bottom: 24px; }

                /* Series divider */
                .pd-series-label {
                    border-top: 1px solid var(--rule-lt); padding-top: 16px;
                    font-family: 'Space Mono', monospace; font-size: 11px;
                    text-transform: uppercase; color: var(--gray-text); letter-spacing: 2px;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .pd-series-count { color: rgba(255,255,255,0.3); }

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
                    <img src={PH} alt="SANVO Art Direction Hero" />
                </div>
                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>
                            SANVO
                            <br />
                            ART DIRECTION
                        </h1>
                        <p className="pd-title-summary">
                            An editorial art direction and campaign photography
                            series for an HKEX-listed chemical manufacturer —
                            four distinct visual worlds across 20 product shots,
                            reframing industrial chemicals as objects worth
                            wanting.
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
                            <span className="mv">Creative & Art Director</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Timeline</span>
                            <span className="mv">2026</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Services</span>
                            <span className="mv">
                                Art Direction, Photography Production, Brand
                                Visual System
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Team</span>
                            <span className="mv">
                                Photographer: Peng Lv, AcidStudio
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
                    {/* ── 01: Overview ── */}
                    <div
                        className="pd-section"
                        data-num="01"
                        data-label="Overview"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Background</div>
                            <div className="pd-text-content">
                                <h3>
                                    Industrial Identity vs. Premium Precision
                                </h3>
                                <p>
                                    SANVO Fine Chemicals is a Chinese
                                    manufacturing brand preparing for North
                                    American market entry in 2026. The
                                    challenge: an industry defaulting to
                                    aggressive, catalog-style product marketing
                                    — and a brand that needed to signal
                                    precision, premium quality, and global
                                    credibility without losing its industrial
                                    identity.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">The Brief</div>
                            <div className="pd-text-content">
                                <h3>Objects Worth Wanting</h3>
                                <p>
                                    How do you make industrial chemicals look
                                    like objects worth wanting? The answer
                                    wasn't to hide what the products are — it
                                    was to reframe them, treating each product
                                    as a modern sculpture and each series as its
                                    own visual world with distinct material
                                    language, lighting logic, and emotional
                                    register.
                                </p>
                                <p>
                                    I led the complete creative and production
                                    process across four product series —
                                    developing the visual concept, writing the
                                    creative brief, selecting and directing the
                                    photographer, overseeing on-set composition
                                    and lighting, and reviewing final selects in
                                    post.
                                </p>
                            </div>
                        </div>
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="SANVO Overview" />
                            <p className="pd-img-caption">
                                Reframing industrial products as modern
                                sculptures.
                            </p>
                        </div>
                    </div>

                    {/* ── 02: Visual Worlds ── */}
                    <div
                        className="pd-section"
                        data-num="02"
                        data-label="Visual Worlds"
                    >
                        {/* ─── SERIES 01: Construction (7 shots) ─── */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Series 01</div>
                            <div className="pd-text-content">
                                <h3>Construction: Industrial Sculpture</h3>
                                <p>
                                    Concrete · Hard light · Geometric tension.
                                    Products treated as architectural forms —
                                    stacked, leaning, suspended — to communicate
                                    structural precision. Hard side-lighting
                                    carves shadow lines across metal surfaces,
                                    referencing brutalist architecture.
                                </p>
                            </div>
                        </div>
                        <div className="pd-series-label scroll-reveal">
                            <span>Construction Series</span>
                            <span className="pd-series-count">7 shots</span>
                        </div>
                        {/* 1 full */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Construction 01" />
                        </div>
                        {/* 3col */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Construction 02" />
                            <img src={PH} alt="Construction 03" />
                            <img src={PH} alt="Construction 04" />
                        </div>
                        {/* 3col */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Construction 05" />
                            <img src={PH} alt="Construction 06" />
                            <img src={PH} alt="Construction 07" />
                        </div>

                        {/* ─── SERIES 02: Household (5 shots) ─── */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Series 02</div>
                            <div className="pd-text-content">
                                <h3>Household: Suspended Purity</h3>
                                <p>
                                    Powder blue · Soft diffusion · Laboratory
                                    clarity. A monochromatic blue world built on
                                    clean geometry and unexpected prop tension —
                                    tilted spray bottles balanced on stacked
                                    blocks, coiled tubing as a visual thread.
                                    The goal: make everyday cleaning products
                                    feel like precision instruments.
                                </p>
                            </div>
                        </div>
                        <div className="pd-series-label scroll-reveal">
                            <span>Household Series</span>
                            <span className="pd-series-count">5 shots</span>
                        </div>
                        {/* 1 full */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Household 01" />
                        </div>
                        {/* 2col */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Household 02" />
                            <img src={PH} alt="Household 03" />
                        </div>
                        {/* 2col */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Household 04" />
                            <img src={PH} alt="Household 05" />
                        </div>

                        {/* ─── SERIES 03: E-commerce (4 shots) ─── */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Series 03</div>
                            <div className="pd-text-content">
                                <h3>E-commerce: Trendy DIY</h3>
                                <p>
                                    Cardboard · Colored tape · Warm natural
                                    light. Targeted at Gen Z buyers on Chinese
                                    e-commerce platforms. Props sourced from the
                                    DIY world — wooden ladders, cardboard
                                    furniture, washi tape — to build a visual
                                    language of creative repair culture rather
                                    than utility.
                                </p>
                            </div>
                        </div>
                        <div className="pd-series-label scroll-reveal">
                            <span>E-commerce Series</span>
                            <span className="pd-series-count">4 shots</span>
                        </div>
                        {/* 2col + 2col */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="E-commerce 01" />
                            <img src={PH} alt="E-commerce 02" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="E-commerce 03" />
                            <img src={PH} alt="E-commerce 04" />
                        </div>

                        {/* ─── SERIES 04: Automotive (4 shots) ─── */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Series 04</div>
                            <div className="pd-text-content">
                                <h3>Automotive: Garage Noir</h3>
                                <p>
                                    Black · Spotlight · Curated chaos. The
                                    darkest series. Deep black backgrounds, hard
                                    spotlight, products arranged with deliberate
                                    disorder — the aesthetic of a garage after
                                    real work has been done. Red is the only
                                    punctuation.
                                </p>
                            </div>
                        </div>
                        <div className="pd-series-label scroll-reveal">
                            <span>Automotive Series</span>
                            <span className="pd-series-count">4 shots</span>
                        </div>
                        {/* 1 full + 3col */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Automotive 01" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Automotive 02" />
                            <img src={PH} alt="Automotive 03" />
                            <img src={PH} alt="Automotive 04" />
                        </div>
                    </div>

                    {/* ── 03: Direction ── */}
                    <div
                        className="pd-section"
                        data-num="03"
                        data-label="Direction"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Execution</div>
                            <div className="pd-text-content">
                                <h3>Creative Direction Decisions</h3>
                                <ul>
                                    <li>
                                        Established the "Swiss-Red" color system
                                        on set — pairing SANVO's brand red with
                                        cool industrial grays and blacks across
                                        all four series for brand cohesion while
                                        allowing each its own visual register.
                                    </li>
                                    <li>
                                        Directed all prop selection and on-set
                                        composition to ensure each product's
                                        physical form was treated as a
                                        sculptural element rather than a catalog
                                        object.
                                    </li>
                                    <li>
                                        Briefed and directed photographer
                                        [AcidStudio] on lighting approach per
                                        series: hard spotlight for Automotive
                                        and Construction; soft diffusion for
                                        Household; natural warm light for
                                        E-commerce.
                                    </li>
                                    <li>
                                        Final assets deployed across the WeChat
                                        campaign and new official company
                                        website (currently in deployment).
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Art direction reference screenshots (4 long images) */}
                        <div className="pd-series-label scroll-reveal">
                            <span>Art Direction References</span>
                            <span className="pd-series-count">4 pieces</span>
                        </div>
                        {/* 2col + 2col for 4 long screenshots */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: 替换成美术稿长图截图 */}
                            <img src={PH2} alt="Art Direction Ref 01" />
                            <img src={PH2} alt="Art Direction Ref 02" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH2} alt="Art Direction Ref 03" />
                            <img src={PH2} alt="Art Direction Ref 04" />
                        </div>

                        {/* Final closing image */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="SANVO Final Campaign" />
                        </div>
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
