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
                .pd-text-content ul { font-size: 15px; line-height: 1.8; color: var(--gray-light); padding-left: 20px; margin-bottom: 24px; }

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

                .pd-img-group { position: relative; display: flex; flex-direction: column; gap: 16px; }
                .pd-img-group > img {
                    width: 100%; height: auto; object-fit: cover; border-radius: 8px;
                    transition: filter 0.4s ease; filter: brightness(0.9);
                }
                .pd-img-group > img:hover { filter: brightness(1); }
                
                .pd-img-full { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .pd-img-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .pd-img-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
                .pd-img-4col { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
                
                .pd-img-caption {
                    font-family: 'Barlow', sans-serif; font-size: 12px;
                    color: var(--gray-text); margin-top: 12px; font-style: italic;
                    grid-column: 1 / -1; text-align: center;
                }

                /* 🌟 核心修复：单屏卡片防溢出机制 */
                .screen-compare { 
                    position: relative; overflow: hidden; border-radius: 12px; 
                    background: #1a1c23; padding: 24px; 
                    display: flex; flex-wrap: wrap; gap: 16px; 
                    justify-content: center; align-items: center; 
                }
                .screen-compare img { 
                    width: auto; max-width: 100%; height: auto; max-height: 70vh; 
                    object-fit: contain; box-shadow: 0 20px 40px rgba(0,0,0,0.4); 
                    border-radius: 16px; 
                }
                .img-caption-tag {
                    position: absolute; top: 16px; left: 16px;
                    background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
                    padding: 4px 12px; border-radius: 20px; z-index: 10;
                    font-family: 'Space Mono', monospace; font-size: 10px; color: var(--white); text-transform: uppercase; letter-spacing: 1px;
                }
                .tag-old { color: var(--gray-text); border: 1px solid rgba(255,255,255,0.2); }
                .tag-new { color: #10B981; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1); }

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
                    .pd-img-3col, .pd-img-4col { grid-template-columns: 1fr 1fr; }
                    .pd-stat-row { grid-template-columns: 1fr; gap: 32px; }
                }

                @media (max-width: 768px) {
                    .project-detail-container { padding-top: 100px; }
                    .pd-hero, .pd-body, .pd-next { padding-left: 24px; padding-right: 24px; }
                    .pd-hero-img { height: 60vh; min-height: 360px; margin-bottom: 32px; }
                    .pd-title-wrap h1 { font-size: clamp(48px, 16vw, 80px); }
                    
                    .pd-sidebar-col { display: none; }
                    .pd-body { display: flex; flex-direction: column; padding-bottom: 48px;}

                    .pd-mobile-sticky-bar {
                        display: flex; align-items: center; justify-content: space-between;
                        position: sticky; top: 64px;
                        background: rgba(10, 13, 20, 0.95); backdrop-filter: blur(8px);
                        padding: 16px 24px; margin: 0 -24px 40px -24px;
                        border-bottom: 1px solid var(--rule); border-top: 1px solid var(--rule); z-index: 90;
                    }
                    .mob-s-num { font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: 700; color: var(--white); }
                    .mob-s-label { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; color: var(--gray-light); letter-spacing: 1px; }
                    .pd-img-2col { grid-template-columns: 1fr; }
                    .pd-content { gap: 80px; }
                    .screen-compare { padding: 16px; }
                }
            `}</style>

            <section className="pd-hero scroll-reveal">
                <div className="pd-hero-img">
                    <img src="/images/apollo/apollo-hero01.png" alt="Apollo ID Project Cover" />
                </div>

                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>APOLLO ID</h1>
                        <p className="pd-title-summary">
                            Designing an end-to-end table reservation system and visual ecosystem for NYC's premier venue membership platform.
                        </p>
                    </div>

                    <div className="pd-meta-table">
                        <div className="pd-meta-row"><span className="mk">Client</span><span className="mv">Apollo Technology</span></div>
                        <div className="pd-meta-row"><span className="mk">Role</span><span className="mv">UI Designer & User Researcher</span></div>
                        <div className="pd-meta-row"><span className="mk">Duration</span><span className="mv">July 2021 — August 2022</span></div>
                        <div className="pd-meta-row"><span className="mk">Scope</span><span className="mv">End-to-end UX/UI, Design System</span></div>
                        <div className="pd-meta-row"><span className="mk">Team</span><span className="mv">Jacey Chen + Rainey Chak</span></div>
                    </div>
                </div>
            </section>

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
                    {/* ── Section 01: Overview ── */}
                    <div className="pd-section" data-num="01" data-label="Overview">
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">About</div>
                            <div className="pd-text-content">
                                <h3>The Venue Membership Platform</h3>
                                <p>
                                    Apollo ID connects users to exclusive perks—expedited entry, complimentary drinks, BOGO deals—across 100+ partner restaurants, bars, and nightclubs in NYC. Users discover and book; venues manage members through the companion Apollo HQ app.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Challenge</div>
                            <div className="pd-text-content">
                                <h3>Reservation Chaos</h3>
                                <p>
                                    Bar and nightclub partners were drowning in reservation requests arriving through fragmented channels (phone, texts, forms, walk-ins). It was nearly impossible for staff to track availability, while users demanded a unified in-app booking experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 02: Research ── */}
                    <div className="pd-section" data-num="02" data-label="Research">
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Strategy</div>
                            <div className="pd-text-content">
                                <h3>Crowded Landscape, Unique Position</h3>
                                <p>
                                    While platforms like OpenTable and Resy focus strictly on reservations, Apollo ID's differentiator is combining bookings with in-app ordering and exclusive tier-based membership benefits. This required a UX that served both regular diners and VIP nightlife clientele.
                                </p>
                            </div>
                        </div>
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src="/images/apollo/apollo-apps05.webp" alt="User Flow" />
                            <p className="pd-img-caption">Architecting the reservation flow from guest selection to confirmation.</p>
                        </div>
                    </div>

                    {/* ── Section 03: System Construction ── */}
                    <div className="pd-section" data-num="03" data-label="Construction">
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">MVP</div>
                            <div className="pd-text-content">
                                <h3>Building the Foundation</h3>
                                <p>
                                    The initial MVP surfaced critical edge cases: handling deposits, tying bookings to member identities, and managing walk-in vs. app reservations. I collaborated closely with engineering to map the backend logic for state changes (Pending → Approved → Confirmed).
                                </p>
                            </div>
                        </div>
                        {/* 🌟 核心修复 1：长图回归全宽排版，不用 screen-compare 包裹 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src="/images/apollo/apollo-apps03.webp" alt="MVP Iterations 1" />
                            <img src="/images/apollo/apollo-apps04.webp" alt="MVP Iterations 2" />
                            <img src="/images/apollo/apollo-apps01.webp" alt="MVP Iterations 3" />
                            <p className="pd-img-caption">Early MVP iterations exploring the core booking logic.</p>
                        </div>
                    </div>

                    {/* ── Section 04: UX/UI Evolution ── */}
                    <div className="pd-section" data-num="04" data-label="Evolution">
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Visual Overhaul</div>
                            <div className="pd-text-content">
                                <h3>From Clutter to Clarity</h3>
                                <p>
                                    The legacy membership screen suffered from visual noise—an unnecessary map background and bulky cards that required excessive scrolling. I redesigned it into a sleek, "wallet-style" stacked interface. By reducing banner heights, updating iconography, and establishing clear visual hierarchy, members can now instantly access their perks.
                                </p>
                            </div>
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-old">OLD DESIGN</span>
                                <img src="/images/apollo/apollo-oldui.png" alt="Old Membership UI" />
                            </div>
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-new">NEW WALLET UI</span>
                                <img src="/images/apollo/apollo-newui.png" alt="New Stacked Cards UI" />
                            </div>
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-new">NEW WALLET UI</span>
                                <img src="/images/apollo/apollo-cardsupdate03.png" alt="New Stacked Cards UI" />
                            </div>
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-new">NEW WALLET UI</span>
                                <img src="/images/apollo/apollo-cardsupdate01.png" alt="New Stacked Cards UI-Lightmode" />
                            </div>
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-new">NEW WALLET UI</span>
                                <img src="/images/apollo/apollo-cardsupdate02.png" alt="New Stacked Cards UI-Darkmode" />
                            </div>
                            <p className="pd-img-caption">Wallet UI Redesign comparison (Before vs. After).</p>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Consumer UX</div>
                            <div className="pd-text-content">
                                <h3>Frictionless Booking Flow</h3>
                                <p>
                                    Embracing mobile-first constraints, I broke the reservation process into sequential screens to avoid overwhelming users. From selecting dates and party sizes to handling real-time chat notifications and Apple Pay deposits, every touchpoint is optimized for minimal cognitive load.
                                </p>
                            </div>
                        </div>
                        {/* 🌟 核心修复 2：6张图换成 3列 网格，变成 3x2 排版 */}
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <div className="screen-compare"><img src="/images/apollo/apollo-new01.png" alt="Venue Page" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-new02.png" alt="Reservation Calendar" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-new03.png" alt="Select Date" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-new04.png" alt="Select Time" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-new05.png" alt="Confirm Detail" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-new06.gif" alt="Reservation Complete" /></div>
                            <p className="pd-img-caption">The finalized end-to-end consumer reservation journey.</p>
                        </div>
                        <div className="pd-img-3col pd-img-group scroll-reveal">
                            <div className="screen-compare"><img src="/images/apollo/apollo-notif01.png" alt="Chat" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-notif02.png" alt="Notification" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-notif03.png" alt="Pay Deposit" /></div>
                            <div className="screen-compare"><img src="/images/apollo/apollo-notif04.png" alt="Confirm Detail" /></div>
                            <p className="pd-img-caption">Pay deposit with Apple Pay</p>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Venue Side (B2B)</div>
                            <div className="pd-text-content">
                                <h3>Empowering the Staff</h3>
                                <p>
                                    Consumer experience is only half the equation. I completely overhauled the venue-facing "Apollo HQ" app. The new Orders dashboard allows staff to instantly parse reservation statuses and manage table assignments with improved typography and intuitive color-coding.
                                </p>
                            </div>
                        </div>
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-old">OLD STAFF APP</span>
                                {/* 🌟 核心修复 3：如果你把两张图放一起，加上 max-width 后它们会自动换行或居中，不会撑爆了 */}
                                <img src="/images/apollo/apollo-oldtable01.png" alt="Old Venue Side" />
                                <img src="/images/apollo/apollo-oldtable02.png" alt="Old Venue Side" />
                            </div>
                            <div className="screen-compare">
                                <span className="img-caption-tag tag-new">NEW APOLLO HQ</span>
                                <img src="/images/apollo/apollo-newtable01.png" alt="New Venue Side" />
                                <img src="/images/apollo/apollo-newtable02.png" alt="New Venue Side" />
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Omnichannel</div>
                            <div className="pd-text-content">
                                <h3>Web Order Extension</h3>
                                <p>
                                    To support venues comprehensively, I translated our native design system to a responsive web platform. This allowed venues to seamlessly accept online orders and reservations directly from their own external websites while maintaining Apollo's backend ecosystem.
                                </p>
                            </div>
                        </div>
                        {/* 🌟 核心修复 4：Web端直接放长图 */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            <img src="/images/apollo/apollo-web01.png" alt="Web Order Experience" />
                            <img src="/images/apollo/apollo-web02.png" alt="Web Order Experience" />
                        </div>
                    </div>

                    {/* ── Section 05: Result ── */}
                    <div className="pd-section" data-num="05" data-label="Impact">
                        <div className="pd-stat-row scroll-reveal">
                            <div className="pd-stat">
                                <div className="stat-num">40%</div>
                                <div className="stat-label">User Retention Boost</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">$2M</div>
                                <div className="stat-label">Q4 Transaction Vol.</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">Seed</div>
                                <div className="stat-label">Successfully Funded</div>
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Outcome</div>
                            <div className="pd-text-content">
                                <h3>Elevating the Premium Experience</h3>
                                <p>
                                    Launched strategically ahead of the Seed round, the redesign drove immediate business impact. Within a single quarter, user retention increased by 40%, and the revamped visual ecosystem facilitated $2M in Q4 transaction volume—successfully cementing Apollo’s positioning as a premium lifestyle brand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── NEXT PROJECT ── */}
            <Link href="/sanvo-website" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">SANVO ECOSYSTEM</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </Link>
        </div>
    )
}