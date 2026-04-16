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

    /* ── 图片占位 URL — 全部替换成你的实际图 ── */
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

                /* Gallery divider label */
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
                        <h1>
                            AURORA
                            <br />
                            SERIES
                        </h1>
                        <p className="pd-title-summary">
                            Visual brand identity for a collegiate Valorant
                            tournament series dedicated to amplifying
                            marginalized gender representation in esports —
                            spanning multi-season graphics, brand guidelines,
                            and cross-platform social assets.
                        </p>
                    </div>
                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Organization</span>
                            <span className="mv">Aurora Series</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">
                                Visual Brand Identity Lead
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Duration</span>
                            <span className="mv">2023 — 2024</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Scope</span>
                            <span className="mv">
                                Brand Identity, Brand Book, Social Graphics
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Output</span>
                            <span className="mv">
                                32+ Graphics Across Multiple Seasons
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
                            <div className="pd-text-title">Mission</div>
                            <div className="pd-text-content">
                                <h3>Amplifying Underrepresented Voices</h3>
                                <p>
                                    Aurora Series is a collegiate-level Valorant
                                    tournament dedicated to discovering and
                                    nurturing talented individuals who identify
                                    with a marginalized gender — female,
                                    non-binary, and/or transgender — and aspire
                                    to break into the esports industry. By
                                    providing a safe competitive space, Aurora
                                    serves as a gateway for passionate college
                                    students into the greater esports scene.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Role</div>
                            <div className="pd-text-content">
                                <h3>Brand Identity Lead</h3>
                                <p>
                                    Led the development of a comprehensive brand
                                    book covering color palettes, logo placement
                                    rules, typeface standards, and visual
                                    identity guidelines for both internal and
                                    external stakeholders. Executed all
                                    tournament graphics to ensure unified,
                                    high-quality visual output across platforms
                                    and seasons.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 02: Work ── */}
                    <div className="pd-section" data-num="02" data-label="Work">
                        {/* Brand Book */}
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Brand Book</div>
                            <div className="pd-text-content">
                                <h3>Visual Identity System</h3>
                                <p>
                                    A detailed brand book standardizing Aurora's
                                    visual identity across all touchpoints —
                                    ensuring consistency and professionalism as
                                    the tournament scales across multiple
                                    seasons and platforms.
                                </p>
                            </div>
                        </div>

                        {/* Brand book pages — full + 2col */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            {/* TODO: brand book cover / spread */}
                            <img src={PH} alt="Brand Book Cover" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: brand book spreads */}
                            <img src={PH} alt="Brand Book Spread 1" />
                            <img src={PH} alt="Brand Book Spread 2" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Brand Book Spread 3" />
                            <img src={PH} alt="Brand Book Spread 4" />
                        </div>

                        {/* ── Graphics Gallery ── */}
                        <div className="pd-gallery-label scroll-reveal">
                            <span>Tournament & Social Graphics</span>
                            <span className="pd-gallery-count">32 pieces</span>
                        </div>

                        {/* 
                            Gallery layout pattern for ~32 images:
                            full → 3col → 2col → full → 3col → 2col → 3col → full → 2col → 3col
                            = 1 + 3 + 2 + 1 + 3 + 2 + 3 + 1 + 2 + 3 = 21
                            + 3col → 2col → 3col → full = 3 + 2 + 3 + 1 = 9
                            Total placeholder slots: 30 (adjust as needed)
                        */}

                        {/* Batch 1 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 01" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 02" />
                            <img src={PH} alt="Graphic 03" />
                            <img src={PH} alt="Graphic 04" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 05" />
                            <img src={PH} alt="Graphic 06" />
                        </div>

                        {/* Batch 2 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 07" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 08" />
                            <img src={PH} alt="Graphic 09" />
                            <img src={PH} alt="Graphic 10" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 11" />
                            <img src={PH} alt="Graphic 12" />
                        </div>

                        {/* Batch 3 */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 13" />
                            <img src={PH} alt="Graphic 14" />
                            <img src={PH} alt="Graphic 15" />
                        </div>
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 16" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 17" />
                            <img src={PH} alt="Graphic 18" />
                        </div>

                        {/* Batch 4 */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 19" />
                            <img src={PH} alt="Graphic 20" />
                            <img src={PH} alt="Graphic 21" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 22" />
                            <img src={PH} alt="Graphic 23" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 24" />
                            <img src={PH} alt="Graphic 25" />
                            <img src={PH} alt="Graphic 26" />
                        </div>

                        {/* Batch 5 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 27" />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 28" />
                            <img src={PH} alt="Graphic 29" />
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <img src={PH} alt="Graphic 30" />
                            <img src={PH} alt="Graphic 31" />
                            <img src={PH} alt="Graphic 32" />
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
