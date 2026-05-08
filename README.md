<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cash-Flow-Minimizer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0d12;
    --surface: #111520;
    --surface2: #161c2a;
    --border: rgba(99, 220, 180, 0.15);
    --accent: #3dffa0;
    --accent2: #00c9ff;
    --accent3: #ff6b6b;
    --text: #e8edf5;
    --muted: #7a8aa0;
    --mono: 'Space Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(61,255,160,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(61,255,160,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    animation: gridShift 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes gridShift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(48px, 48px); }
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: orbFloat 8s ease-in-out infinite;
  }
  .orb1 { width: 400px; height: 400px; background: rgba(61,255,160,0.07); top: -100px; right: -100px; }
  .orb2 { width: 300px; height: 300px; background: rgba(0,201,255,0.06); bottom: 100px; left: -80px; animation-delay: -4s; }

  @keyframes orbFloat {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(20px, -20px) scale(1.05); }
  }

  .page {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 24px 80px;
  }

  /* ── HERO ── */
  .hero { text-align: center; margin-bottom: 64px; }

  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(61,255,160,0.08);
    border: 1px solid rgba(61,255,160,0.2);
    color: var(--accent);
    font-family: var(--mono);
    font-size: 11px;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 24px;
    animation: fadeDown 0.6s ease both;
  }
  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }

  .hero h1 {
    font-family: var(--mono);
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1px;
    animation: fadeDown 0.7s ease 0.1s both;
  }
  .hero h1 .accent  { color: var(--accent); }
  .hero h1 .accent2 { color: var(--accent2); }

  .hero-sub {
    margin-top: 20px;
    color: var(--muted);
    font-size: 17px;
    line-height: 1.6;
    max-width: 560px;
    margin-inline: auto;
    animation: fadeDown 0.7s ease 0.2s both;
  }

  .hero-cta {
    margin-top: 36px;
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    animation: fadeDown 0.7s ease 0.3s both;
  }
  .btn {
    font-family: var(--mono);
    font-size: 12px;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn-primary {
    background: var(--accent);
    color: #0a0d12;
    font-weight: 700;
    box-shadow: 0 0 24px rgba(61,255,160,0.3);
  }
  .btn-primary:hover { box-shadow: 0 0 36px rgba(61,255,160,0.5); }
  .btn-secondary {
    background: transparent;
    color: var(--text);
    border: 1px solid rgba(255,255,255,0.15);
  }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.4); }

  /* ── FLOW VIZ ── */
  .flow-viz { margin: 48px 0; animation: fadeDown 0.8s ease 0.4s both; }
  .flow-nodes {
    display: flex; align-items: center; justify-content: center;
    gap: 0; flex-wrap: nowrap; overflow-x: auto;
  }
  .node {
    flex-shrink: 0;
    width: 64px; height: 64px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono); font-size: 11px; font-weight: 700;
    transition: transform 0.3s;
  }
  .node:hover { transform: scale(1.1); }
  .node-a { background: rgba(61,255,160,0.15);  border: 1.5px solid rgba(61,255,160,0.5);  color: var(--accent); }
  .node-b { background: rgba(0,201,255,0.15);   border: 1.5px solid rgba(0,201,255,0.5);   color: var(--accent2); }
  .node-c { background: rgba(255,107,107,0.15); border: 1.5px solid rgba(255,107,107,0.5); color: var(--accent3); }
  .node-d { background: rgba(255,200,80,0.15);  border: 1.5px solid rgba(255,200,80,0.5);  color: #ffc850; }
  .node-e { background: rgba(180,120,255,0.15); border: 1.5px solid rgba(180,120,255,0.5); color: #b478ff; }

  .flow-arrow {
    flex-shrink: 0;
    display: flex; flex-direction: column; align-items: center;
    gap: 3px; padding: 0 4px;
  }
  .arrow-label { font-family: var(--mono); font-size: 9px; color: var(--accent); white-space: nowrap; }
  .arrow-line {
    height: 1.5px; width: 40px;
    background: linear-gradient(90deg, rgba(61,255,160,0.4), rgba(0,201,255,0.4));
    position: relative; overflow: hidden;
  }
  .arrow-line::after {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, #3dffa0, transparent);
    animation: flowAnim 2s linear infinite;
  }
  @keyframes flowAnim { to { left: 100%; } }
  .arrow-tip { font-size: 10px; color: var(--accent); margin-left: 36px; margin-top: -12px; }

  /* ── STATS BAR ── */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 64px;
    animation: fadeUp 0.7s ease 0.5s both;
  }
  .stat { background: var(--surface); padding: 20px 24px; text-align: center; transition: background 0.2s; }
  .stat:hover { background: var(--surface2); }
  .stat-val  { font-family: var(--mono); font-size: 26px; font-weight: 700; color: var(--accent); display: block; }
  .stat-label { font-size: 11px; color: var(--muted); margin-top: 4px; display: block; text-transform: uppercase; letter-spacing: 0.5px; }

  /* ── SECTION HEADER ── */
  .section { margin-bottom: 56px; animation: fadeUp 0.6s ease both; }
  .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .section-icon {
    width: 32px; height: 32px;
    background: rgba(61,255,160,0.1);
    border: 1px solid rgba(61,255,160,0.2);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 14px;
  }
  .section-title { font-family: var(--mono); font-size: 13px; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; }
  .section-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(61,255,160,0.2), transparent); }

  /* ── FEATURES ── */
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
  .feature-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px; transition: border-color 0.2s, transform 0.2s; cursor: default;
  }
  .feature-card:hover { border-color: rgba(61,255,160,0.35); transform: translateY(-3px); }
  .feature-icon  { font-size: 22px; margin-bottom: 12px; display: block; }
  .feature-title { font-family: var(--mono); font-size: 12px; color: var(--text); font-weight: 700; margin-bottom: 6px; }
  .feature-desc  { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* ── TECH STACK ── */
  .stack-section { margin-bottom: 16px; }
  .stack-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-family: var(--mono); }
  .stack-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag { font-family: var(--mono); font-size: 11px; padding: 5px 12px; border-radius: 6px; border: 1px solid; }
  .tag-green  { color: var(--accent);  border-color: rgba(61,255,160,0.3);  background: rgba(61,255,160,0.07); }
  .tag-blue   { color: var(--accent2); border-color: rgba(0,201,255,0.3);   background: rgba(0,201,255,0.07); }
  .tag-red    { color: #ff6b6b;        border-color: rgba(255,107,107,0.3); background: rgba(255,107,107,0.07); }
  .tag-purple { color: #b478ff;        border-color: rgba(180,120,255,0.3); background: rgba(180,120,255,0.07); }
  .tag-yellow { color: #ffc850;        border-color: rgba(255,200,80,0.3);  background: rgba(255,200,80,0.07); }

  /* ── ALGO CARDS ── */
  .algo-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 500px) { .algo-cards { grid-template-columns: 1fr; } }
  .algo-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px; position: relative; overflow: hidden; transition: border-color 0.2s;
  }
  .algo-card:hover { border-color: rgba(61,255,160,0.3); }
  .algo-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    opacity: 0; transition: opacity 0.2s;
  }
  .algo-card:hover::before { opacity: 1; }
  .algo-name { font-family: var(--mono); font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .algo-tag  { display: inline-block; font-family: var(--mono); font-size: 9px; padding: 2px 8px; border-radius: 4px; margin-bottom: 10px; }
  .algo-tag-fast { background: rgba(61,255,160,0.1); color: var(--accent); }
  .algo-tag-opt  { background: rgba(0,201,255,0.1);  color: var(--accent2); }
  .algo-desc { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* ── SETUP STEPS ── */
  .steps { display: flex; flex-direction: column; gap: 0; }
  .step { display: flex; gap: 16px; position: relative; }
  .step:not(:last-child)::after {
    content: ''; position: absolute; left: 15px; top: 40px;
    width: 1px; bottom: 0; background: var(--border);
  }
  .step-num {
    flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%;
    background: var(--surface2); border: 1px solid rgba(61,255,160,0.3);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono); font-size: 12px; color: var(--accent);
    font-weight: 700; position: relative; z-index: 1;
  }
  .step-content { padding-bottom: 28px; flex: 1; }
  .step-title { font-family: var(--mono); font-size: 13px; color: var(--text); font-weight: 700; margin-bottom: 8px; padding-top: 5px; }

  /* ── CODE BLOCK ── */
  .code-block { background: #080b10; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 12px; }
  .code-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; border-bottom: 1px solid var(--border); background: var(--surface);
  }
  .code-dots { display: flex; gap: 6px; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-r { background: #ff5f57; } .dot-y { background: #febc2e; } .dot-g { background: #28c840; }
  .code-filename { font-family: var(--mono); font-size: 11px; color: var(--muted); }
  .code-body { padding: 16px; font-family: var(--mono); font-size: 12px; line-height: 1.8; color: #a8b8cc; overflow-x: auto; }
  .code-body .c-key { color: #c792ea; }
  .code-body .c-str { color: var(--accent); }
  .code-body .c-cmt { color: #546e7a; }
  .code-body .c-val { color: var(--accent2); }
  .code-body .c-num { color: #f78c6c; }

  /* ── HOW IT WORKS ── */
  .how-step { display: flex; gap: 20px; align-items: flex-start; padding: 0 0 28px; position: relative; }
  .how-step:not(:last-child)::after {
    content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, rgba(61,255,160,0.3), transparent);
  }
  .how-icon {
    flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px;
    background: rgba(61,255,160,0.1); border: 1px solid rgba(61,255,160,0.25);
    display: flex; align-items: center; justify-content: center; font-size: 18px; position: relative; z-index: 1;
  }
  .how-body { padding-top: 8px; }
  .how-title { font-family: var(--mono); font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .how-desc  { font-size: 14px; color: var(--muted); line-height: 1.6; }

  /* ── ROADMAP ── */
  .roadmap-list { display: flex; flex-direction: column; gap: 8px; }
  .roadmap-item {
    display: flex; align-items: center; gap: 12px;
    background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
    padding: 12px 16px; transition: border-color 0.2s, transform 0.2s; cursor: default;
  }
  .roadmap-item:hover { border-color: rgba(61,255,160,0.3); transform: translateX(4px); }
  .roadmap-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; background: var(--muted); }
  .roadmap-text { font-size: 14px; color: var(--muted); flex: 1; }
  .roadmap-pill {
    font-family: var(--mono); font-size: 9px; padding: 2px 8px;
    border-radius: 4px; background: rgba(255,255,255,0.05); color: var(--muted);
  }

  /* ── FOOTER ── */
  .footer {
    margin-top: 64px; padding-top: 32px;
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
    animation: fadeUp 0.6s ease 1s both;
  }
  .footer-brand { font-family: var(--mono); font-size: 13px; color: var(--muted); }
  .footer-brand span { color: var(--accent); }
  .license-badge {
    font-family: var(--mono); font-size: 11px; color: var(--muted);
    background: var(--surface); border: 1px solid var(--border);
    padding: 4px 12px; border-radius: 6px;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .section:nth-child(2) { animation-delay: 0.1s; }
  .section:nth-child(3) { animation-delay: 0.2s; }
  .section:nth-child(4) { animation-delay: 0.3s; }
  .section:nth-child(5) { animation-delay: 0.4s; }
  .section:nth-child(6) { animation-delay: 0.5s; }
</style>
</head>
<body>

<div class="grid-bg"></div>
<div class="orb orb1"></div>
<div class="orb orb2"></div>

<div class="page">

  <!-- Hero -->
  <div class="hero">
    <div class="badge">
      <div class="badge-dot"></div>
      MERN Stack · Open Source
    </div>
    <h1>
      <span class="accent">Cash</span><span class="accent2">Flow</span><br>Minimizer
    </h1>
    <p class="hero-sub">
      Settle group expenses with <em>fewer transactions</em>. Powered by greedy minimization and min-cost max-flow algorithms.
    </p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="#">⚡ Get Started</a>
      <a class="btn btn-secondary" href="#">📖 View Docs</a>
    </div>
  </div>

  <!-- Flow Visualization -->
  <div class="flow-viz">
    <div class="flow-nodes">
      <div class="node node-a">Alice</div>
      <div class="flow-arrow">
        <div class="arrow-label">$40</div>
        <div class="arrow-line"></div>
        <div class="arrow-tip">▶</div>
      </div>
      <div class="node node-b">Bob</div>
      <div class="flow-arrow">
        <div class="arrow-label">$25</div>
        <div class="arrow-line"></div>
        <div class="arrow-tip">▶</div>
      </div>
      <div class="node node-c">Carol</div>
      <div class="flow-arrow">
        <div class="arrow-label">$60</div>
        <div class="arrow-line"></div>
        <div class="arrow-tip">▶</div>
      </div>
      <div class="node node-d">Dave</div>
      <div class="flow-arrow">
        <div class="arrow-label">$15</div>
        <div class="arrow-line"></div>
        <div class="arrow-tip">▶</div>
      </div>
      <div class="node node-e">Eve</div>
    </div>
  </div>

  <!-- Stats Bar -->
  <div class="stats-bar">
    <div class="stat">
      <span class="stat-val">↓ 70%</span>
      <span class="stat-label">Fewer Transfers</span>
    </div>
    <div class="stat">
      <span class="stat-val">2</span>
      <span class="stat-label">Algorithms</span>
    </div>
    <div class="stat">
      <span class="stat-val">MERN</span>
      <span class="stat-label">Tech Stack</span>
    </div>
    <div class="stat">
      <span class="stat-val">JWT</span>
      <span class="stat-label">Auth</span>
    </div>
  </div>

  <!-- Features -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">✦</div>
      <div class="section-title">Features</div>
      <div class="section-line"></div>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <span class="feature-icon">🔐</span>
        <div class="feature-title">Authentication</div>
        <div class="feature-desc">Secure register/login with JWT-based sessions.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">👥</span>
        <div class="feature-title">Group Management</div>
        <div class="feature-desc">Create and manage groups with multiple members.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">💸</span>
        <div class="feature-title">Expense Tracking</div>
        <div class="feature-desc">Add expenses and auto-track who owes whom.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">⚡</span>
        <div class="feature-title">Settlement Engine</div>
        <div class="feature-desc">Minimized transaction suggestions, instantly computed.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">📤</span>
        <div class="feature-title">Export Support</div>
        <div class="feature-desc">Download or share settlement results.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🔴</span>
        <div class="feature-title">Real-time Sockets</div>
        <div class="feature-desc">Live group updates via WebSocket integration.</div>
      </div>
    </div>
  </div>

  <!-- Algorithms -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">⚙</div>
      <div class="section-title">Algorithms</div>
      <div class="section-line"></div>
    </div>
    <div class="algo-cards">
      <div class="algo-card">
        <div class="algo-name">Greedy Minimizer</div>
        <div><span class="algo-tag algo-tag-fast">O(n log n)</span></div>
        <div class="algo-desc">Fast heuristic that reduces transfers by greedily matching the largest creditor with the largest debtor.</div>
      </div>
      <div class="algo-card">
        <div class="algo-name">Min-Cost Max-Flow</div>
        <div><span class="algo-tag algo-tag-opt">Optimal</span></div>
        <div class="algo-desc">Guarantees the globally optimal settlement with minimum total cost across all transfers.</div>
      </div>
    </div>
  </div>

  <!-- Tech Stack -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">🛠</div>
      <div class="section-title">Tech Stack</div>
      <div class="section-line"></div>
    </div>
    <div class="stack-section">
      <div class="stack-label">Frontend</div>
      <div class="stack-row">
        <span class="tag tag-blue">React</span>
        <span class="tag tag-blue">Vite</span>
        <span class="tag tag-blue">Axios</span>
      </div>
    </div>
    <div class="stack-section">
      <div class="stack-label">Backend</div>
      <div class="stack-row">
        <span class="tag tag-green">Node.js</span>
        <span class="tag tag-green">Express</span>
        <span class="tag tag-green">MongoDB</span>
        <span class="tag tag-green">Mongoose</span>
        <span class="tag tag-yellow">Redis</span>
      </div>
    </div>
    <div class="stack-section">
      <div class="stack-label">Infrastructure</div>
      <div class="stack-row">
        <span class="tag tag-purple">JWT Auth</span>
        <span class="tag tag-purple">WebSockets</span>
        <span class="tag tag-red">REST API</span>
      </div>
    </div>
  </div>

  <!-- Quick Start -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">🚀</div>
      <div class="section-title">Quick Start</div>
      <div class="section-line"></div>
    </div>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">Clone the repo</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
              <span class="code-filename">bash</span>
            </div>
            <div class="code-body">
              <span class="c-cmt"># Clone &amp; enter directory</span><br>
              git clone &lt;your-repo-url&gt;<br>
              cd Cash-Flow-Minimizer
            </div>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">Configure backend</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
              <span class="code-filename">backend/.env</span>
            </div>
            <div class="code-body">
              <span class="c-key">PORT</span>=<span class="c-num">5000</span><br>
              <span class="c-key">NODE_ENV</span>=<span class="c-str">development</span><br>
              <span class="c-key">MONGO_URI</span>=<span class="c-str">your_mongodb_uri</span><br>
              <span class="c-key">JWT_SECRET</span>=<span class="c-str">your_secret</span>
            </div>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">Install &amp; run</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
              <span class="code-filename">bash</span>
            </div>
            <div class="code-body">
              <span class="c-cmt"># Backend → http://localhost:5000</span><br>
              cd backend &amp;&amp; npm install &amp;&amp; npm run dev<br><br>
              <span class="c-cmt"># Frontend → http://localhost:5173</span><br>
              cd frontend &amp;&amp; npm install &amp;&amp; npm run dev
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- How It Works -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">💡</div>
      <div class="section-title">How It Works</div>
      <div class="section-line"></div>
    </div>
    <div class="how-steps">
      <div class="how-step">
        <div class="how-icon">📝</div>
        <div class="how-body">
          <div class="how-title">Record Expenses</div>
          <div class="how-desc">Members log shared expenses within a group. Each entry tracks who paid and how it splits.</div>
        </div>
      </div>
      <div class="how-step">
        <div class="how-icon">⚖️</div>
        <div class="how-body">
          <div class="how-title">Compute Net Balances</div>
          <div class="how-desc">The system calculates each member's total owed vs. owes across all expenses.</div>
        </div>
      </div>
      <div class="how-step">
        <div class="how-icon">🔁</div>
        <div class="how-body">
          <div class="how-title">Minimize Transfers</div>
          <div class="how-desc">The algorithm produces the smallest possible set of transactions to clear all debts.</div>
        </div>
      </div>
      <div class="how-step">
        <div class="how-icon">✅</div>
        <div class="how-body">
          <div class="how-title">Settle &amp; Export</div>
          <div class="how-desc">View clear settlement instructions. Export results or share them with your group.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Roadmap -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">🗺</div>
      <div class="section-title">Roadmap</div>
      <div class="section-line"></div>
    </div>
    <div class="roadmap-list">
      <div class="roadmap-item">
        <div class="roadmap-dot"></div>
        <div class="roadmap-text">Multi-currency support with exchange rates</div>
        <span class="roadmap-pill">planned</span>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-dot"></div>
        <div class="roadmap-text">Expense attachments &amp; receipt uploads</div>
        <span class="roadmap-pill">planned</span>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-dot"></div>
        <div class="roadmap-text">Admin roles and permissions for groups</div>
        <span class="roadmap-pill">planned</span>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-dot"></div>
        <div class="roadmap-text">Improved export formats (PDF, CSV)</div>
        <span class="roadmap-pill">planned</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-brand">
      <span>Cash</span>Flow<span>Minimizer</span> · MIT License
    </div>
    <div class="license-badge">PRs Welcome ↗</div>
  </div>

</div>
</body>
</html>