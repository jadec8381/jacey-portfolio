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
                .pd-stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; border-top: 1px solid var(--rule-lt); border-bottom: 1px solid var(--rule-lt); padding: 40px 0; }
                .pd-stat { text-align: center; }
                .pd-stat .stat-num { font-family: 'Oswald', sans-serif; font-size: clamp(32px,3.5vw,48px); font-weight: 700; line-height: 1; margin-bottom: 8px; }
                .pd-stat .stat-label { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--gray-text); text-transform: uppercase; letter-spacing: 1px; }

                /* Artist roster grid */
                .pd-roster { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--rule-lt); border: 1px solid var(--rule-lt); }
                .pd-roster-item { background: var(--bg); padding: 24px; transition: background 0.3s; }
                .pd-roster-item:hover { background: rgba(255,255,255,0.02); }
                .pd-roster-name { font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
                .pd-roster-role { font-size: 12px; color: var(--gray-text); }

                /* Video embed placeholder */
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
                    .pd-stat-row { grid-template-columns: 1fr 1fr; gap: 32px; }
                    .pd-roster { grid-template-columns: 1fr 1fr; }
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
                    .pd-stat-row { grid-template-columns: 1fr 1fr; }
                    .pd-roster { grid-template-columns: 1fr; }
                    .pd-content { gap: 80px; }
                }
            `}</style>

            {/* ══════════ HERO ══════════ */}
            <section className="pd-hero scroll-reveal">
                <div className="pd-hero-img">
                    {/* TODO: 替换成 Ultra Records hero */}
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/4e2617c2-7ff1-4ef6-8f5e-41d39b088868/315981623_10160496899774711_7627973115075317433_n.jpg"
                        alt="Ultra Records"
                    />
                </div>
                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>
                            ULTRA
                            <br />
                            RECORDS
                        </h1>
                        <p className="pd-title-summary">
                            End-to-end visual creative for 10+ active releases
                            on the Ultra Records / Sony Music roster — album
                            artwork, YouTube visualizers, Spotify Canvas, and
                            platform-native social assets.
                        </p>
                    </div>
                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Client</span>
                            <span className="mv">
                                Ultra Records / Sony Music
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">Visual Creative Designer</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Year</span>
                            <span className="mv">2023</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Scope</span>
                            <span className="mv">
                                Album Art, Motion, Social Content
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Platforms</span>
                            <span className="mv">
                                Spotify, Apple Music, YouTube, Instagram
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
                        <div className="pd-stat-row scroll-reveal">
                            <div className="pd-stat">
                                <div className="stat-num">10+</div>
                                <div className="stat-label">
                                    Active Releases
                                </div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">5</div>
                                <div className="stat-label">Album Covers</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">4</div>
                                <div className="stat-label">Social Reels</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">4</div>
                                <div className="stat-label">Platforms</div>
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Role</div>
                            <div className="pd-text-content">
                                <h3>End-to-End Visual Creative</h3>
                                <p>
                                    Executed the full visual pipeline for
                                    releases across the Ultra Records roster —
                                    from initial concept to final delivery.
                                    Collaborated directly with A&R and Artist
                                    Management to ensure each visual identity
                                    aligned with artist direction and campaign
                                    rollout timing.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Deliverables</div>
                            <div className="pd-text-content">
                                <h3>Multi-Platform Output</h3>
                                <p>
                                    Each release required a suite of
                                    platform-specific assets: album cover
                                    artwork (square + responsive banner variants
                                    for Spotify and Apple Music), Spotify Canvas
                                    loops, YouTube visualizer videos, and
                                    platform-native social content (Instagram
                                    Reels, Stories, feed posts). All assets
                                    optimized for each platform's specs and
                                    responsive display requirements.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 02: Work ── */}
                    <div className="pd-section" data-num="02" data-label="Work">
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Release Artwork</div>
                            <div className="pd-text-content">
                                <h3>Album & Single Covers</h3>
                                <p>
                                    Designed cover artwork for 5 releases, each
                                    with a distinct visual identity reflecting
                                    the artist's sonic direction. Covers needed
                                    to read at thumbnail scale on streaming
                                    platforms while maintaining detail at full
                                    resolution for press and promotional use.
                                </p>
                            </div>
                        </div>

                        {/* Album covers — 3+2 layout */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            {/* TODO: 替换成 3 张 album cover */}
                            <img
                                src="/images/ultra/ultra-album01.jpg"
                                alt="Cover 1"
                            />
                            <img
                                src="/images/ultra/ultra-album02.jpg"
                                alt="Cover 2"
                            />
                            <img
                                src="/images/ultra/ultra-album03.jpg"
                                alt="Cover 3"
                            />
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: 替换成剩余 2 张 album cover */}
                            <img
                                src="/images/ultra/ultra-album04.jpg"
                                alt="Cover 4"
                            />
                            <img
                                src="/images/ultra/ultra-album05.webp"
                                alt="Cover 5"
                            />
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Visualizer</div>
                            <div className="pd-text-content">
                                <h3>YouTube Motion Content</h3>
                                <p>
                                    Produced a YouTube visualizer combining
                                    motion graphics with the release's visual
                                    identity. Designed to loop seamlessly and
                                    maintain visual interest across the full
                                    track duration.
                                </p>
                            </div>
                        </div>

                        {/* Video placeholder */}
                        <a
                            href="https://youtu.be/K66aEGjRQq8?si=t-Fm7fAFbYPlSQ0D"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                        >
                            <div className="pd-video-embed scroll-reveal">
                                <iframe
                                    src="https://www.youtube.com/embed/K66aEGjRQq8"
                                    title="Luca Schreiner - Weight feat. sonofsteve"
                                    width="100%"
                                    style={{ aspectRatio: '16/9', border: 'none', borderRadius: '4px' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </a>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Social Content</div>
                            <div className="pd-text-content">
                                <h3>Platform-Native Reels</h3>
                                <p>
                                    Created 4 social media reels tailored for
                                    Instagram's vertical format — each timed to
                                    campaign milestones (pre-release teasers,
                                    drop day, post-release push). Motion and
                                    pacing designed for thumb-stopping impact in
                                    feed scroll.
                                </p>
                            </div>
                        </div>

                        {/* Social reels — 2x2 grid (vertical video) */}
                        <div className="pd-img-2col scroll-reveal" style={{ gap: '16px' }}>
                            <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '4px' }}>
                                <source src="/videos/ultra/ultra-tk01.mp4" type="video/mp4" />
                            </video>
                            <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '4px' }}>
                                <source src="/videos/ultra/ultra-tk02.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="pd-img-2col scroll-reveal" style={{ gap: '16px' }}>
                            <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '4px' }}>
                                <source src="/videos/ultra/ultra-tk03.mp4" type="video/mp4" />
                            </video>
                            <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '4px' }}>
                                <source src="/videos/ultra/ultra-tk04.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>

                    {/* ── 03: Roster ── */}
                    <div
                        className="pd-section"
                        data-num="03"
                        data-label="Roster"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Artist Roster</div>
                            <div className="pd-text-content">
                                <h3>Collaborations</h3>
                                <p>
                                    Worked across a diverse roster of
                                    electronic, pop, and dance artists — each
                                    requiring a unique visual approach while
                                    maintaining Ultra Records' overarching brand
                                    standards.
                                </p>
                            </div>
                        </div>

                        <div className="pd-roster scroll-reveal">
                            <div className="pd-roster-item">
                                <div className="pd-roster-name">
                                    Luca Schreiner
                                </div>
                                <div className="pd-roster-role">
                                    Release artwork & social
                                </div>
                            </div>
                            <div className="pd-roster-item">
                                <div className="pd-roster-name">Icona Pop</div>
                                <div className="pd-roster-role">
                                    Release music platform socials
                                </div>
                            </div>
                            <div className="pd-roster-item">
                                <div className="pd-roster-name">
                                    Mahmut Orhan
                                </div>
                                <div className="pd-roster-role">
                                    Release social
                                </div>
                            </div>
                            <div className="pd-roster-item">
                                <div className="pd-roster-name">
                                    Luca Schreiner
                                </div>
                                <div className="pd-roster-role">
                                    Release artwork & visualizer
                                </div>
                            </div>
                            <div className="pd-roster-item">
                                <div className="pd-roster-name">Faul & Wad</div>
                                <div className="pd-roster-role">
                                    Release artwork & social
                                </div>
                            </div>
                            <div className="pd-roster-item">
                                <div className="pd-roster-name">
                                    Steve Aoki ft. BTS Catalog
                                </div>
                                <div className="pd-roster-role">
                                    Catalog content & assets
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ NEXT ══════════ */}
            <Link href="/pop-surge" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">POP: SURGE</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </Link>
        </div>
    )
}
