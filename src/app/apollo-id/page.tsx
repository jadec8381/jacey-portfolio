"use client";
import React, { useEffect, useRef, useState } from "react"

export default function ApolloDetail() {
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

                /* Highlight stat block */
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
                        src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                        alt="Apollo ID Project Cover"
                    />
                </div>

                <div className="pd-hero-info">
                    <div className="pd-title-wrap">
                        <h1>APOLLO ID</h1>
                        <p className="pd-title-summary">
                            Designing an end-to-end table reservation system for
                            NYC's premier venue membership loyalty platform —
                            serving 100+ partner venues across restaurants,
                            bars, and nightclubs.
                        </p>
                    </div>

                    <div className="pd-meta-table">
                        <div className="pd-meta-row">
                            <span className="mk">Client</span>
                            <span className="mv">Apollo Technology</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Role</span>
                            <span className="mv">
                                UI Designer & User Researcher
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Duration</span>
                            <span className="mv">July 2021 — August 2022</span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Scope</span>
                            <span className="mv">
                                User Research, Interface Design
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Team</span>
                            <span className="mv">
                                Jacey Chen + Rainey Chak (Co-designer)
                            </span>
                        </div>
                        <div className="pd-meta-row">
                            <span className="mk">Tool</span>
                            <span className="mv">Figma</span>
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
                            <div className="pd-text-title">About</div>
                            <div className="pd-text-content">
                                <h3>The Venue Membership Platform</h3>
                                <p>
                                    Apollo ID is NYC's venue membership loyalty
                                    app, connecting users to exclusive perks —
                                    expedited entry, complimentary drinks, BOGO
                                    deals — across 100+ partner restaurants,
                                    bars, nightclubs, and karaoke lounges. Users
                                    discover and book; venues manage members
                                    through the companion Apollo HQ app.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Challenge</div>
                            <div className="pd-text-content">
                                <h3>Reservation Chaos</h3>
                                <p>
                                    Bar and nightclub partners were drowning in
                                    reservation requests arriving through phone
                                    calls, texts, emails, website forms, in-app
                                    chat, and walk-ins — especially before
                                    weekends. This fragmented workflow made it
                                    nearly impossible for staff to track
                                    availability or respond consistently. Both
                                    venues and users were asking for a single,
                                    unified booking channel inside the app.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Solution</div>
                            <div className="pd-text-content">
                                <h3>In-App Table Reservations</h3>
                                <p>
                                    A reservation feature enabling users to
                                    request tables on specific dates, with
                                    venues reviewing and acting on requests
                                    (approve / deny) through Apollo HQ. Designed
                                    for bar and nightclub partners first, then
                                    expanded to restaurants.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 02: Research ── */}
                    <div
                        className="pd-section"
                        data-num="02"
                        data-label="Research"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Competitive Analysis
                            </div>
                            <div className="pd-text-content">
                                <h3>Crowded Landscape, Unique Position</h3>
                                <p>
                                    Analyzed OpenTable, Resy, SevenRooms, Tock,
                                    and MiniTable to understand how reservation
                                    platforms handle guest input, date/time
                                    selection, and table availability display.
                                    The insight: these platforms only do
                                    reservations. Apollo ID's differentiator is
                                    combining reservations with in-app ordering
                                    and exclusive membership benefits —
                                    positioning us as a one-stop venue
                                    management solution.
                                </p>
                            </div>
                        </div>
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">
                                Stakeholder Interviews
                            </div>
                            <div className="pd-text-content">
                                <h3>Learning the Business</h3>
                                <p>
                                    Partnered with the Account Executive
                                    managing venue relationships to understand
                                    how each venue type handles reservations
                                    differently. Despite operational
                                    differences, the core UX needed to remain
                                    consistent across all venue types — a key
                                    design constraint that shaped every
                                    subsequent decision.
                                </p>
                            </div>
                        </div>

                        {/* User flow diagram placeholder */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            {/* TODO: 替换成你的 user flow 截图 */}
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo ID User Flow"
                            />
                            <p className="pd-img-caption">
                                Reservation user flow — from guest count to
                                confirmation
                            </p>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">User Flow</div>
                            <div className="pd-text-content">
                                <h3>Step-by-Step on Mobile</h3>
                                <p>
                                    Embracing mobile-first constraints, I broke
                                    the reservation flow into sequential screens
                                    to avoid overwhelming users: guest count →
                                    date & time → available tables → deposit
                                    info → confirmation. Each step shows only
                                    what's needed, keeping cognitive load low.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 03: Design ── */}
                    <div
                        className="pd-section"
                        data-num="03"
                        data-label="Design"
                    >
                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">MVP V1</div>
                            <div className="pd-text-content">
                                <h3>First Pass & Hard Questions</h3>
                                <p>
                                    Presented initial screens to the team for
                                    MVP scoping. The review surfaced critical
                                    questions that pushed the design far beyond
                                    the original scope:
                                </p>
                                <ul>
                                    <li>
                                        How do guests add notes or special
                                        requests?
                                    </li>
                                    <li>
                                        How do we tie reservations to individual
                                        member identity?
                                    </li>
                                    <li>
                                        How can group members find their table
                                        location?
                                    </li>
                                    <li>
                                        How do members invite friends to join a
                                        table?
                                    </li>
                                    <li>
                                        How do venues communicate with members
                                        post-booking?
                                    </li>
                                    <li>
                                        Where do pending/upcoming reservations
                                        live in the app?
                                    </li>
                                    <li>
                                        How do staff review and approve requests
                                        in Apollo HQ?
                                    </li>
                                    <li>
                                        How do we handle deposits and no-shows?
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* MVP screens */}
                        <div className="pd-img-2col pd-img-group scroll-reveal">
                            {/* TODO: 替换成 MVP V1 的 screens */}
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo MVP V1 Screen 1"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo MVP V1 Screen 2"
                            />
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">MVP Reiteration</div>
                            <div className="pd-text-content">
                                <h3>Addressing the Gaps</h3>
                                <p>
                                    Armed with these questions, I redesigned the
                                    flow to address each gap. Key additions on
                                    the consumer side: a "pending request"
                                    status indicator, a special requests input
                                    field, integration with the existing
                                    notification system, and a streamlined
                                    deposit flow. Complex features like adding
                                    friends to reservations were intentionally
                                    deferred to V2 to control scope.
                                </p>
                                <p>
                                    On the venue side, designed new Apollo HQ
                                    screens for staff to review, approve, and
                                    manage incoming reservation requests — a
                                    workflow that didn't exist before.
                                </p>
                            </div>
                        </div>

                        {/* Reiterated screens */}
                        <div className="pd-img-mixed pd-img-group scroll-reveal">
                            {/* TODO: 替换成 MVP V2 的 screens */}
                            <img
                                className="img-span-full"
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo Reiterated Flow"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo HQ Staff View"
                            />
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo Deposit Flow"
                            />
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Implementation</div>
                            <div className="pd-text-content">
                                <h3>Collaborating with Engineering</h3>
                                <p>
                                    Entered a collaborative phase with the CTO /
                                    lead engineer to build the feature. Beyond
                                    UI implementation, this involved deep
                                    discussions on backend logic: how
                                    reservation states flow (pending → approved
                                    → confirmed), deposit processing, and
                                    notification triggers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Section 04: Result ── */}
                    <div
                        className="pd-section"
                        data-num="04"
                        data-label="Result"
                    >
                        {/* Impact stats */}
                        <div className="pd-stat-row scroll-reveal">
                            <div className="pd-stat">
                                <div className="stat-num">100+</div>
                                <div className="stat-label">Partner Venues</div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">$47K</div>
                                <div className="stat-label">
                                    Monthly Revenue (May '23)
                                </div>
                            </div>
                            <div className="pd-stat">
                                <div className="stat-num">56%</div>
                                <div className="stat-label">
                                    MoM Revenue Growth
                                </div>
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Launch</div>
                            <div className="pd-text-content">
                                <h3>From Bars to Restaurants</h3>
                                <p>
                                    Reservations launched January 2023,
                                    initially for bar and nightclub partners,
                                    then expanding to restaurants. Member
                                    reservations drove $30K in April 2023 and
                                    $47K in May 2023 in app revenue — consistent
                                    month-over-month growth that validated the
                                    feature's impact on the business.
                                </p>
                            </div>
                        </div>

                        <div className="pd-text-block scroll-reveal">
                            <div className="pd-text-title">Next Steps</div>
                            <div className="pd-text-content">
                                <h3>Social Layer Integration</h3>
                                <p>
                                    Planned V2 iterations include integrating
                                    the social layer: members will be able to
                                    add friends to existing reservations, split
                                    deposits and payments within the app. These
                                    features will be revisited as the platform's
                                    social infrastructure matures.
                                </p>
                            </div>
                        </div>

                        {/* Final showcase */}
                        <div className="pd-img-full pd-img-group scroll-reveal">
                            {/* TODO: 替换成最终 showcase 截图 */}
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/6391439e98db89152adb614f/d2733603-0d5c-4529-9958-4dc2707f58d3/Apollo+Mock+%281%29.png"
                                alt="Apollo ID Final Showcase"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                NEXT PROJECT
                ══════════════════════════════ */}
            <a href="#" className="pd-next scroll-reveal">
                <div>
                    <div className="pd-next-label">Next Project</div>
                    <div className="pd-next-title">SANVO ECOSYSTEM</div>
                </div>
                <div className="pd-next-arrow">→</div>
            </a>
        </div>
    )
}
