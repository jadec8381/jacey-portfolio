"use client";
// @ts-nocheck
import React, { useEffect, useRef } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": any
    }
  }
}

export default function PortfolioHome() {
  const containerRef = useRef<HTMLDivElement>(null)
  const splineContainerRef = useRef<HTMLDivElement>(null)

  // 1. Spline 引擎注入
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.79/build/spline-viewer.js"
    document.head.appendChild(script)
  }, [])

  // 2. 🌟 修复：让 Spline 区域的滚轮事件穿透到页面
  useEffect(() => {
    const splineEl = splineContainerRef.current
    if (!splineEl) return

    const handleWheel = (e: WheelEvent) => {
      // 阻止 Spline 吃掉 scroll，手动转发给 window
      e.preventDefault()
      window.scrollBy({ top: e.deltaY, behavior: "auto" })
    }

    // 用 passive: false 才能 preventDefault
    splineEl.addEventListener("wheel", handleWheel, { passive: false })
    return () => splineEl.removeEventListener("wheel", handleWheel)
  }, [])

  // 3. 滚动动画
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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )
    containerRef.current.querySelectorAll("[data-scroll]").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="portfolio-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Barlow+Condensed:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root {
          --bg: #0A0D14;
          --black: #F4F3F0;
          --dark: #05070A;
          --gray-80: #E0DDD9;
          --gray-60: #999;
          --gray-40: #666;
          --gray-20: #333;
          --gray-10: rgba(255, 255, 255, 0.03);
          --white: #fff;
          --rule: rgba(255, 255, 255, 0.15);
          --rule-lt: rgba(255, 255, 255, 0.08);
          --hero-rule: rgba(255, 255, 255, 0.15);
        }

        @keyframes orb-move-1 { 0% { top: 0%; left: 0%; } 50% { top: 70%; left: 80%; } 100% { top: 0%; left: 0%; } }
        @keyframes orb-move-2 { 0% { top: 80%; left: 10%; } 50% { top: 20%; left: 90%; } 100% { top: 80%; left: 10%; } }

        .portfolio-container * { margin: 0; padding: 0; box-sizing: border-box; }
        .portfolio-container {
          font-family: 'Barlow', sans-serif;
          background: var(--bg);
          color: var(--black);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          position: relative;
        }

        /* ══════════════════════════════
           HERO
           ══════════════════════════════ */
        .hero-cover {
          position: relative; width: 100%; height: 100vh; min-height: 700px;
          display: flex; flex-direction: column;
          background: var(--bg); overflow: hidden;
        }

        .hero-bg-fluid {
          position: absolute; inset: 0; z-index: 0;
          overflow: hidden; filter: blur(120px); opacity: 0.6;
        }
        .fluid-orb { position: absolute; border-radius: 50%; opacity: 0.8; }
        .orb-1 { width: 80vh; height: 80vh; background: #2D1B69; animation: orb-move-1 25s infinite ease-in-out; }
        .orb-2 { width: 70vh; height: 70vh; background: #E4487C; animation: orb-move-2 20s infinite ease-in-out; right: 0; }

        .spline-container {
          position: absolute; inset: 0; z-index: 2;
          pointer-events: none;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; mix-blend-mode: screen;
        }

        spline-viewer {
          width: 100%; height: 100%;
          transform: scale(1.25);
          transform-origin: center center;
          pointer-events: auto; /* hover/cursor follow 仍然有效 */
        }

        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(10,13,20,0) 0%, rgba(10,13,20,0.2) 60%, var(--bg) 100%);
          z-index: 3; pointer-events: none;
        }

        .hero-content {
          position: relative; display: flex; flex-direction: column;
          height: 100%; justify-content: flex-end;
          padding-bottom: 24px; pointer-events: none;
        }

        .hero-bottom-grid { padding: 0 48px; pointer-events: none; }

        .hero-title-wrap {
          position: relative; z-index: 1;
          border-bottom: 1px solid var(--hero-rule);
          padding-bottom: 16px; margin-bottom: 24px; overflow: hidden;
        }
        .hero-title-wrap h1 {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(60px, 16vw, 240px);
          font-weight: 700; line-height: 0.85; letter-spacing: -0.02em;
          text-transform: uppercase; word-wrap: break-word;
          color: var(--white); mix-blend-mode: screen; opacity: 0.75;
          transform: translateY(110%);
          animation: slideUp 1s cubic-bezier(.16,1,.3,1) .2s forwards;
        }
        @keyframes slideUp { to { transform: translateY(0) } }

        .hero-info-row {
          position: relative; z-index: 4;
          display: grid; grid-template-columns: 1.5fr 1fr auto;
          gap: 40px; align-items: end; pointer-events: auto;
        }
        .info-cell {
          opacity: 0; transform: translateY(12px);
          animation: fadeUp 1s cubic-bezier(.16,1,.3,1) .6s forwards;
        }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0) } }

        .info-tagline { font-size: clamp(16px, 1.5vw, 24px); font-weight: 400; line-height: 1.5; color: rgba(255,255,255,0.9); max-width: 600px; }
        .info-meta { font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; color: rgba(255,255,255,0.7); display: flex; flex-direction: column; gap: 8px; }

        .barcode-wrap { display: flex; flex-direction: column; align-items: flex-end; }
        .barcode { display: flex; gap: 4px; height: 50px; align-items: flex-end; }
        .bc-line { background: var(--white); height: 100%; width: 2px; }
        .bc-num { color: var(--white); font-family: 'Space Mono', monospace; font-size: 10px; margin-top: 6px; letter-spacing: 2px; opacity: 0.8; }

        /* ══════════════════════════════
           WORK SECTIONS
           ══════════════════════════════ */
        .work-sec { padding: 80px 48px 0; }

        .sec-head {
          border-top: 2px solid var(--rule); padding-top: 16px;
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 56px;
          opacity: 0; transform: translateY(20px);
          transition: all .7s cubic-bezier(.16,1,.3,1);
        }
        .sec-head.visible { opacity: 1; transform: translateY(0); }
        .sec-title {
          font-family: 'Oswald', sans-serif; font-weight: 700;
          font-size: clamp(48px, 7vw, 100px); letter-spacing: -.02em;
          text-transform: uppercase; line-height: .9; color: var(--black);
        }
        .sec-count { font-family: 'Space Mono', monospace; font-size: 13px; color: var(--gray-60); }

        /* Hero project card */
        .proj-hero {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          margin-bottom: 1px; border-top: 1px solid var(--rule);
          opacity: 0; transform: translateY(40px);
          transition: all .8s cubic-bezier(.16,1,.3,1);
        }
        .proj-hero.visible { opacity: 1; transform: translateY(0); }

        .proj-meta {
          padding: 32px 40px 32px 0;
          display: flex; flex-direction: column; justify-content: space-between;
          min-height: 420px; border-right: 1px solid var(--rule-lt);
        }
        .proj-meta-header {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 12px; border-bottom: 1px solid var(--rule-lt); margin-bottom: 16px;
        }
        .proj-client { font-family: 'Barlow', sans-serif; font-weight: 600; font-size: 14px; color: var(--black); text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .proj-year { font-family: 'Barlow', sans-serif; font-size: 13px; color: var(--gray-60); }
        .proj-idx { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--black); }
        .proj-title { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: clamp(28px, 3.5vw, 48px); letter-spacing: 1px; text-transform: uppercase; line-height: .95; margin: 24px 0 20px; color: var(--black); }
        .proj-desc { font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 300; color: var(--gray-40); line-height: 1.65; max-width: 400px; margin-bottom: 32px; }

        .meta-table { width: 100%; max-width: 420px; }
        .meta-row { display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px solid var(--rule-lt); font-family: 'Barlow', sans-serif; font-size: 13px; }
        .meta-row .mk { color: var(--gray-60); font-weight: 400; }
        .meta-row .mv { color: var(--black); font-weight: 500; text-align: right; }

        .proj-img-wrap { background: var(--gray-10); overflow: hidden; position: relative; cursor: pointer; min-height: 420px; }
        .proj-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.16,1,.3,1); opacity: 0.9; }
        .proj-hero:hover .proj-img-wrap img { transform: scale(1.03); opacity: 1; }

        .proj-link { display: inline-flex; align-items: center; gap: 8px; font-family: 'Barlow', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: var(--black); text-decoration: none; margin-top: auto; padding-top: 24px; transition: gap .3s; }
        .proj-link:hover { gap: 14px; }

        /* Project row cards */
        .proj-row { display: grid; grid-template-columns: 1.4fr .6fr; gap: 1px; margin-top: 1px; margin-bottom: 80px; }
        .proj-row.rev { grid-template-columns: .6fr 1.4fr; }

        .proj-card { position: relative; overflow: hidden; cursor: pointer; background: var(--dark); opacity: 0; transform: translateY(40px); transition: all .7s cubic-bezier(.16,1,.3,1); }
        .proj-card.visible { opacity: 1; transform: translateY(0); }
        .proj-card:nth-child(2).visible { transition-delay: .08s; }

        .pc-img { width: 100%; height: 100%; min-height: 340px; overflow: hidden; background: var(--dark); }
        .pc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s cubic-bezier(.16,1,.3,1), filter .4s, opacity .4s; opacity: .8; }
        .proj-card:hover .pc-img img { transform: scale(1.04); filter: brightness(.4); opacity: 1; }

        .pc-over { position: absolute; inset: 0; padding: 32px; display: flex; flex-direction: column; justify-content: space-between; opacity: 0; transition: opacity .4s; }
        .proj-card:hover .pc-over { opacity: 1; }
        .pc-over-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .pc-over .pc-idx { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(255,255,255,.5); letter-spacing: 1px; }
        .pc-over .pc-arrow { width: 32px; height: 32px; border: 1px solid rgba(255,255,255,.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,.7); font-size: 14px; transition: all .3s; }
        .proj-card:hover .pc-arrow { border-color: var(--white); color: var(--white); }
        .pc-over .pc-title { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: clamp(22px, 2.5vw, 36px); letter-spacing: 1px; text-transform: uppercase; line-height: .95; color: var(--white); margin-bottom: 6px; }
        .pc-over .pc-sub { font-family: 'Barlow', sans-serif; font-size: 13px; color: rgba(255,255,255,.5); font-weight: 300; }

        .pc-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        .pc-tag { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; padding: 4px 14px; border: 1px solid rgba(255,255,255,.25); border-radius: 20px; font-size: 10px; letter-spacing: 1px; color: rgba(255,255,255,.7); text-transform: uppercase; transition: all .3s; }

        /* Footer */
        .portfolio-container footer { padding: 32px 48px; border-top: 2px solid var(--rule); display: grid; grid-template-columns: 1fr 1fr 1fr; font-family: 'Barlow', sans-serif; font-size: 12px; color: var(--gray-60); letter-spacing: .5px; text-transform: uppercase; font-weight: 500; }
        .portfolio-container footer .fc { text-align: center; }
        .portfolio-container footer .fr { text-align: right; }

        /* ══════════════════════════════
           RESPONSIVE
           ══════════════════════════════ */
        @media (max-width: 1024px) {
          spline-viewer { transform: scale(1.0); }
          .hero-info-row { grid-template-columns: 1fr; gap: 24px; }
          .barcode-wrap { align-items: flex-start; margin-top: 16px; }
          .work-sec { padding: 80px 32px 0; }
          .proj-hero { grid-template-columns: 1fr; border-top: none; }
          .proj-row, .proj-row.rev { grid-template-columns: 1fr; }
          .proj-meta { border-right: none; padding: 40px 0; min-height: auto; border-bottom: 1px solid var(--rule-lt); margin-bottom: 1px; }
        }

        @media (max-width: 768px) {
          spline-viewer { transform: scale(1.0); }
          .hero-bottom-grid { padding: 0 24px; }
          .portfolio-container footer { padding: 24px; grid-template-columns: 1fr; gap: 16px; text-align: center; }
          .portfolio-container footer .fc, .portfolio-container footer .fr { text-align: center; }
          .sec-title { font-size: clamp(36px, 10vw, 60px); }
          .proj-img-wrap { min-height: 260px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-cover">
        <div className="hero-bg-fluid">
          <div className="fluid-orb orb-1" />
          <div className="fluid-orb orb-2" />
        </div>

        {/* 🌟 加了 ref 用于拦截 wheel 事件 */}
        <div className="spline-container" ref={splineContainerRef}>
          <spline-viewer
            loading-anim-type="none"
            url="https://prod.spline.design/gcXjQfAO5aT2HDwj/scene.splinecode"
          />
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-bottom-grid">
            <div className="hero-title-wrap">
              <h1>JACEY CHEN</h1>
            </div>
            <div className="hero-info-row">
              <div className="info-cell info-tagline">
                Product & Visual Designer based in New York City.
                Crafting brand systems, scalable interfaces, and visual narratives.
              </div>
              <div className="info-cell info-meta">
                <span>40.7128° N, 74.0060° W</span>
                <span>Parsons & SVA Alum</span>
                <span>Scroll to explore ↓</span>
              </div>
              <div className="info-cell barcode-wrap">
                <div className="barcode">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bc-line" style={{ width: i % 3 === 0 ? "4px" : "2px" }} />
                  ))}
                </div>
                <div className="bc-num">SYS: JC-2026-NY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT DESIGN ── */}
      <section className="work-sec">
        <div className="sec-head" data-scroll>
          <div className="sec-title">PRODUCT<br />DESIGN</div>
          <div className="sec-count">(03)</div>
        </div>

        {/* 01. SANVO hero */}
        <div className="proj-hero" data-scroll>
          <div className="proj-meta">
            <div>
              <div className="proj-meta-header">
                <div className="proj-client">SANVO Fine Chemicals</div>
                <div className="proj-idx">01/</div>
              </div>
              <div className="proj-year">2026 — Coming Soon</div>
              <h3 className="proj-title">SANVO BILINGUAL<br />WEB ECOSYSTEM</h3>
              <p className="proj-desc">
                Full bilingual web ecosystem with AI-augmented design workflow.
                Led product design, strategy, and creative direction.
              </p>
              <div className="meta-table">
                <div className="meta-row"><span className="mk">Role</span><span className="mv">Product & Strategy Lead</span></div>
                <div className="meta-row"><span className="mk">Scope</span><span className="mv">Web Ecosystem</span></div>
                <div className="meta-row"><span className="mk">Tools</span><span className="mv">Gemini AI, Figma</span></div>
              </div>
            </div>
            <a href="/sanvo-ecosystem" className="proj-link">View Project <span>→</span></a>
          </div>
          <div className="proj-img-wrap">
            {/* TODO: 替换成 Framer CDN URL */}
            <img src="/images/sanvo/website-hero.webp" alt="SANVO" />
          </div>
        </div>

        {/* 02 + 03 row */}
        <div className="proj-row">
          <div className="proj-card" data-scroll>
            <div className="pc-img">
              <img src="/images/grid/grid-hero.webp" alt="GRID" />
            </div>
            <div className="pc-over">
              <div className="pc-over-top"><span className="pc-idx">02/</span><span className="pc-arrow">↗</span></div>
              <div>
                <h3 className="pc-title">GRID GAMERS</h3>
                <p className="pc-sub">Scalable LLM Assistant · Esports Event Planning</p>
                <div className="pc-tags"><span className="pc-tag">AI</span><span className="pc-tag">LLM</span><span className="pc-tag">Design System</span></div>
              </div>
            </div>
          </div>
          <div className="proj-card" data-scroll>
            <div className="pc-img">
              <img src="/images/apollo/apollo-hero.webp" alt="Apollo" />
            </div>
            <div className="pc-over">
              <div className="pc-over-top"><span className="pc-idx">03/</span><span className="pc-arrow">↗</span></div>
              <div>
                <h3 className="pc-title">APOLLO ID</h3>
                <p className="pc-sub">Loyalty Platform · 20+ Venues</p>
                <div className="pc-tags"><span className="pc-tag">UX</span><span className="pc-tag">UI</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL DESIGN ── */}
      <section className="work-sec">
        <div className="sec-head" data-scroll>
          <div className="sec-title">VISUAL<br />DESIGN</div>
          <div className="sec-count">(05)</div>
        </div>

        {/* 01. SANVO Campaign hero */}
        <div className="proj-hero" data-scroll>
          <div className="proj-meta">
            <div>
              <div className="proj-meta-header">
                <div className="proj-client">SANVO Fine Chemicals</div>
                <div className="proj-idx">01/</div>
              </div>
              <div className="proj-year">2026</div>
              <h3 className="proj-title">ART DIRECTION<br />& CAMPAIGN</h3>
              <p className="proj-desc">
                Editorial still life photography across four product series.
                Art direction for brand visual refresh.
              </p>
              <div className="meta-table">
                <div className="meta-row"><span className="mk">Role</span><span className="mv">Creative Director</span></div>
                <div className="meta-row"><span className="mk">Format</span><span className="mv">Advertising Image Campaigns</span></div>
              </div>
            </div>
            <a href="/sanvo-art-direction" className="proj-link">View Project <span>→</span></a>
          </div>
          <div className="proj-img-wrap">
            <img src="/images/sanvo/photography-digi01.jpg" alt="SANVO Campaign" />
          </div>
        </div>

        {/* 02 + 03: Aurora + Ultra */}
        <div className="proj-row">
          <div className="proj-card" data-scroll>
            <div className="pc-img">
              <img src="/images/aurora/aurora-hero01.png" alt="Aurora Series" />
            </div>
            <div className="pc-over">
              <div className="pc-over-top"><span className="pc-idx">02/</span><span className="pc-arrow">↗</span></div>
              <div>
                <h3 className="pc-title">AURORA SERIES</h3>
                <p className="pc-sub">Collegiate Esports · Visual Brand Identity</p>
                <div className="pc-tags"><span className="pc-tag">Brand Identity</span><span className="pc-tag">Visual Lead</span></div>
              </div>
            </div>
          </div>
          <div className="proj-card" data-scroll>
            <div className="pc-img">
              <img src="/images/ultra/ultra-hero01.webp" alt="Ultra Records" />
            </div>
            <div className="pc-over">
              <div className="pc-over-top"><span className="pc-idx">03/</span><span className="pc-arrow">↗</span></div>
              <div>
                <h3 className="pc-title">ULTRA RECORDS</h3>
                <p className="pc-sub">Album Artwork · Sony Music</p>
                <div className="pc-tags"><span className="pc-tag">Music</span><span className="pc-tag">Album Art</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 04 + 05: POP Surge + 4D6 */}
        <div className="proj-row rev">
          <div className="proj-card" data-scroll>
            <div className="pc-img">
              <img src="/images/popsurge/pop-poster7.png" alt="POP Surge" />
            </div>
            <div className="pc-over">
              <div className="pc-over-top"><span className="pc-idx">04/</span><span className="pc-arrow">↗</span></div>
              <div>
                <h3 className="pc-title">POP: SURGE</h3>
                <p className="pc-sub">Award-Winning Brand Identity</p>
                <div className="pc-tags"><span className="pc-tag">Branding</span><span className="pc-tag">Award Winner</span></div>
              </div>
            </div>
          </div>
          <div className="proj-card" data-scroll>
            <div className="pc-img">
              <img src="/images/4d6/4d6-hero.webp" alt="4D6" />
            </div>
            <div className="pc-over">
              <div className="pc-over-top"><span className="pc-idx">05/</span><span className="pc-arrow">↗</span></div>
              <div>
                <h3 className="pc-title">4D6 ESPORTS</h3>
                <p className="pc-sub">MFA Thesis · Brand Identity & Packaging</p>
                <div className="pc-tags"><span className="pc-tag">Thesis</span><span className="pc-tag">Packaging</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>Jacey Chen Studio</span>
        <span className="fc">Product & Visual Design</span>
        <span className="fr">NYC ©2026</span>
      </footer>
    </div>
  )
}