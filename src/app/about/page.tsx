"use client";
import React, { useEffect, useRef } from "react"
import Link from "next/link"

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null)

    // 滚动渐显动画监听
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
        <div ref={containerRef} className="about-container">
            <style>{`
                :root {
                    --bg: #0A0D14; 
                    --white: #F4F3F0;
                    --gray-text: #999;
                    --rule: rgba(255, 255, 255, 0.15);
                    --rule-lt: rgba(255, 255, 255, 0.08);
                }

                .about-container * { box-sizing: border-box; margin: 0; padding: 0; }
                .about-container {
                    background: var(--bg);
                    color: var(--white);
                    font-family: 'Barlow', sans-serif;
                    width: 100%;
                    padding-bottom: 100px;
                }

                /* ══════════════════════════════
                   HERO SECTION: FULL BLEED BACKGROUND
                   ══════════════════════════════ */
                .about-hero {
                    position: relative;
                    width: 100%;
                    min-height: 90vh; /* 霸气的全屏高度 */
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end; /* 内容沉底，更有电影感 */
                    padding: 160px 48px 80px 48px;
                    margin-bottom: 80px;
                    overflow: hidden;
                }

                /* 全屏背景图 */
                .about-hero-bg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                    filter: grayscale(100%); /* 保持黑白的高级感 */
                }

                /* 核心：60-70% 深灰蓝遮罩，底部完美融入背景色 */
                .about-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to bottom, 
                        rgba(10, 13, 20, 0.6) 0%, 
                        rgba(10, 13, 20, 0.8) 70%, 
                        var(--bg) 100%
                    );
                    z-index: 1;
                }

                /* 悬浮在图片上方的文字容器 */
                .about-info {
                    position: relative;
                    z-index: 2;
                    max-width: 800px; /* 限制宽度，保证阅读舒适度 */
                }

                .about-title {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(60px, 10vw, 140px);
                    line-height: 0.85;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 32px;
                    letter-spacing: -0.02em;
                    color: var(--white);
                }

                .about-bio {
                    font-size: clamp(16px, 1.8vw, 20px);
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.6;
                    font-weight: 300;
                    margin-bottom: 48px;
                }

                /* 联系方式表格 */
                .about-meta-table {
                    width: 100%;
                    max-width: 600px;
                    border-top: 2px solid rgba(255,255,255,0.3);
                }
                .about-meta-row {
                    display: flex;
                    padding: 16px 0;
                    border-bottom: 1px solid var(--rule-lt);
                }
                .about-mk {
                    width: 140px;
                    font-family: 'Space Mono', monospace;
                    font-size: 11px;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.6);
                    letter-spacing: 1px;
                }
                .about-mv {
                    flex: 1;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1.5;
                    color: var(--white);
                }
                .about-mv a {
                    color: var(--white);
                    text-decoration: none;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    transition: border-color 0.3s;
                }
                .about-mv a:hover { border-color: var(--white); }

                /* ══════════════════════════════
                   RESUME SECTIONS: COLUMNS & ROWS
                   ══════════════════════════════ */
                .resume-section {
                    padding: 0 48px;
                    margin-bottom: 100px;
                }
                .resume-header {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(40px, 6vw, 80px);
                    font-weight: 700;
                    text-transform: uppercase;
                    border-bottom: 2px solid var(--rule);
                    padding-bottom: 16px;
                    margin-bottom: 32px;
                    letter-spacing: -0.01em;
                }

                /* 列表行排版 */
                .resume-row {
                    display: grid;
                    grid-template-columns: 200px 1.5fr 1fr;
                    gap: 24px;
                    padding: 24px 0;
                    border-bottom: 1px solid var(--rule-lt);
                    transition: background 0.3s ease, padding-left 0.3s ease;
                    align-items: baseline;
                }
                .resume-row:hover {
                    background: rgba(255, 255, 255, 0.02);
                    padding-left: 16px; /* 悬浮时的小彩蛋互动 */
                }

                .res-date {
                    font-family: 'Space Mono', monospace;
                    font-size: 12px;
                    color: var(--gray-text);
                    text-transform: uppercase;
                }
                .res-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--white);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .res-sub {
                    font-size: 13px;
                    color: var(--gray-text);
                    margin-top: 4px;
                }
                .res-role {
                    font-size: 15px;
                    font-weight: 400;
                    color: var(--gray-text);
                    text-align: right;
                }

                /* 滚动动画 */
                .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

                /* ══════════════════════════════
                   响应式断点 1：TABLET
                   ══════════════════════════════ */
                @media (max-width: 1024px) {
                    .about-hero { padding: 140px 32px 80px 32px; }
                    .resume-section { padding: 0 32px; }
                    .resume-row { grid-template-columns: 150px 1fr 1fr; }
                }

                /* ══════════════════════════════
                   响应式断点 2：MOBILE
                   ══════════════════════════════ */
                @media (max-width: 768px) {
                    .about-hero { padding: 120px 24px 60px 24px; min-height: 85vh; }
                    .resume-section { padding: 0 24px; margin-bottom: 80px; }
                    
                    .about-title { font-size: clamp(48px, 15vw, 80px); margin-bottom: 24px; }
                    .about-bio { font-size: 15px; margin-bottom: 32px; }
                    
                    /* 手机端列表排版堆叠 */
                    .resume-row { 
                        grid-template-columns: 1fr; 
                        gap: 8px; 
                        padding: 20px 0; 
                    }
                    .resume-row:hover { padding-left: 0; background: transparent; }
                    .res-role { text-align: left; color: var(--white); font-weight: 500; font-family: 'Space Mono', monospace; font-size: 12px;}
                    .res-title { font-size: 16px; order: -1; }
                    .res-date { font-size: 11px; margin-bottom: 4px; }
                }
            `}</style>

            {/* ── 1. FULL BLEED HERO ── */}
            <section className="about-hero">
                {/* 替换成你抱着烤面包机的那张图片URL！ */}
                <img
                    className="about-hero-bg"
                    src="/images/about-photo.jpg"
                    alt="Jacey Chen Portrait"
                />
                {/* 深灰蓝渐变遮罩 */}
                <div className="about-hero-overlay"></div>

                <div className="about-info scroll-reveal">
                    <h1 className="about-title">
                        JACEY
                        <br />
                        CHEN
                    </h1>
                    <p className="about-bio">
                        Jacey is a multidisciplinary designer based in New York
                        City. She graduated from Parsons School of Design with a
                        BFA in Communication Design and an MFA at the School of
                        Visual Arts focusing on Products of Design. Jacey is
                        experienced with UI/UX, editorial design, brand
                        identity, motion graphics, and photography. She is
                        thrilled to apply her design and user research knowledge
                        to create products that enhance users' daily lives.
                    </p>

                    <div className="about-meta-table">
                        <div className="about-meta-row">
                            <span className="about-mk">Focus</span>
                            <span className="about-mv">
                                Product Design, Visual Identity, Art Direction
                            </span>
                        </div>
                        <div className="about-meta-row">
                            <span className="about-mk">Connect</span>
                            <span className="about-mv">
                                <a
                                    href="https://www.linkedin.com/in/jaceychen/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn ↗
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. WORK EXPERIENCE ── */}
            <section className="resume-section scroll-reveal">
                <h2 className="resume-header">Experience</h2>
                <div className="resume-list">
                    <div className="resume-row">
                        <span className="res-date">Jun '24 — Feb '26</span>
                        <div>
                            <div className="res-title">GRID Gamers</div>
                        </div>
                        <span className="res-role">UI/UX Designer Lead</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">Oct '23 — Dec '24</span>
                        <div>
                            <div className="res-title">Aurora Series</div>
                        </div>
                        <span className="res-role">Visual Designer</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">Jun '23 — Aug '23</span>
                        <div>
                            <div className="res-title">Ultra Records</div>
                            <div className="res-sub">
                                Sony Music Entertainment
                            </div>
                        </div>
                        <span className="res-role">Creative Intern</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">Jul '22 — Aug '23</span>
                        <div>
                            <div className="res-title">Apollo ID</div>
                        </div>
                        <span className="res-role">UI/UX Designer</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">Feb '21 — May '22</span>
                        <div>
                            <div className="res-title">TODA New York</div>
                        </div>
                        <span className="res-role">
                            Graphic & UI/UX Designer
                        </span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">Jun '21 — Sep '21</span>
                        <div>
                            <div className="res-title">
                                The Beryl Consulting
                            </div>
                        </div>
                        <span className="res-role">Product Lead Intern</span>
                    </div>
                </div>
            </section>

            {/* ── 3. EDUCATION ── */}
            <section className="resume-section scroll-reveal">
                <h2 className="resume-header">Education</h2>
                <div className="resume-list">
                    <div className="resume-row">
                        <span className="res-date">2022 — 2024</span>
                        <div>
                            <div className="res-title">
                                School of Visual Arts
                            </div>
                            <div className="res-sub">New York, NY</div>
                        </div>
                        <span className="res-role">MFA Products of Design</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">2018 — 2022</span>
                        <div>
                            <div className="res-title">
                                Parsons School of Design
                            </div>
                            <div className="res-sub">
                                Minors: Immersive Storytelling, Japanese
                            </div>
                        </div>
                        <span className="res-role">
                            BFA Communication Design
                        </span>
                    </div>
                </div>
            </section>

            {/* ── 4. AWARDS & PUBLICATION ── */}
            <section className="resume-section scroll-reveal">
                <h2 className="resume-header">Recognition</h2>
                <div className="resume-list">
                    <div className="resume-row">
                        <span className="res-date">April 2026</span>
                        <div>
                            <div className="res-title">
                                INDIGO Awards
                            </div>
                        </div>
                        <span className="res-role">Silver - Branding for Graphic Design; Bronze - Branding for Sports</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">November 2025</span>
                        <div>
                            <div className="res-title">
                                Design Intelligence Award
                            </div>
                        </div>
                        <span className="res-role">Honorable Mention Award</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">June 2024</span>
                        <div>
                            <div className="res-title">
                                Core77 Design Awards
                            </div>
                        </div>
                        <span className="res-role">Student Notable</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">May 2024</span>
                        <div>
                            <div className="res-title">
                                FIT Sport Design Awards
                            </div>
                        </div>
                        <span className="res-role">Winner, Urban Sports</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">April 2024</span>
                        <div>
                            <div className="res-title">
                                NY Product Design Awards
                            </div>
                        </div>
                        <span className="res-role">Product Design Award</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">March 2024</span>
                        <div>
                            <div className="res-title">MUSE Design Awards</div>
                        </div>
                        <span className="res-role">Silver (Student)</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">2023</span>
                        <div>
                            <div className="res-title">Hiiibrand Awards</div>
                            <div className="res-sub">
                                Student Branding & Logo
                            </div>
                        </div>
                        <span className="res-role">Merit Award</span>
                    </div>
                    <div className="resume-row">
                        <span className="res-date">January 2025</span>
                        <div>
                            <div className="res-title">Canvas Rebel</div>
                        </div>
                        <span className="res-role">Interview Feature</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
