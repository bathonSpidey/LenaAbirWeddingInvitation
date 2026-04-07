/* ─── Exact styles from BridgertonInvitation ─────────────────────────────── */
export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Pinyon+Script&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes petalDrift {
    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50%  { transform: translateY(-8px) rotate(4deg); opacity: 1; }
    100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  }

  /* ── Outer wrapper — shimmer gold border ── */
  .card-outer {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    animation: fadeIn 1.2s ease forwards;
  }

  .card-outer::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 3px;
    background: linear-gradient(135deg, #AF944D, #E8C97A, #AF944D, #c8a45a, #E8C97A);
    background-size: 300% 300%;
    animation: shimmer 4s linear infinite;
    z-index: -1;
  }

  /* ── Card surface ── */
  .card {
    background: rgba(253, 250, 245, 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 1.1rem clamp(1rem, 4vw, 1.8rem) 0.9rem;
    position: relative;
    overflow: hidden;
  }

  /* Watercolour wash inside */
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 10% 10%, rgba(91,141,184,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 60% at 90% 90%, rgba(185,140,140,0.07) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Outer inner border */
  .card::after {
    content: '';
    position: absolute;
    inset: 10px;
    border: 0.5px solid rgba(175,148,77,0.35);
    pointer-events: none;
  }

  /* Second inner border */
  .inner-border {
    position: absolute;
    inset: 16px;
    border: 0.5px solid rgba(175,148,77,0.18);
    pointer-events: none;
  }

  /* ── Corner flourishes ── */
  .corner-flourish {
    position: absolute;
    width: 36px;
    height: 36px;
    color: #AF944D;
    opacity: 0.65;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .corner-flourish.tl { top: 4px; left: 4px; }
  .corner-flourish.tr { top: 4px; right: 4px; transform: scaleX(-1); }
  .corner-flourish.bl { bottom: 4px; left: 4px; transform: scaleY(-1); }
  .corner-flourish.br { bottom: 4px; right: 4px; transform: scale(-1); }

  /* ── Content ── */
  .content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #5B8DB8;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.3s forwards;
    margin-bottom: 0.45rem;
  }

  .monogram-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    margin-bottom: 0.45rem;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.5s forwards;
  }

  .mono-line {
    height: 0.5px;
    flex: 1;
    background: linear-gradient(to right, transparent, #AF944D);
  }
  .mono-line.right {
    background: linear-gradient(to left, transparent, #AF944D);
  }

  .monogram {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.4rem;
    color: #AF944D;
    line-height: 1;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  .together-text {
    font-size: 0.78rem;
    font-style: italic;
    color: rgba(42,63,92,0.55);
    letter-spacing: 0.06em;
    margin-bottom: 0.4rem;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.65s forwards;
  }

  .names {
  opacity: 0;
  animation: fadeUp 0.9s ease 0.8s forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin: 0.2rem 0 0.8rem; /* Increased vertical space around the name block */
}

.name-primary {
  font-family: 'Pinyon Script', cursive;
  font-size: 3.4rem; /* Slightly larger for drama */
  color: #2a3f5c;
  line-height: 0.8;
  filter: drop-shadow(0.5px 0.5px 0px rgba(175,148,77,0.2)); /* Subtle gold "ink" depth */
}

.name-ampersand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  color: #AF944D; /* Changed from pinkish to Gold for a more "Royal" look */
  font-style: italic;
  font-weight: 300;
  margin-top: 0.5rem;
}

  .divider-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    margin: 0.55rem 0;
    opacity: 0;
    animation: fadeUp 0.8s ease 1s forwards;
    color: #AF944D;
  }

  .divider-ornament .line {
    height: 0.5px;
    flex: 1;
    background: linear-gradient(to right, transparent, #AF944D 40%, transparent);
  }

  .divider-ornament .flourish {
    font-size: 0.9rem;
    animation: petalDrift 4s ease-in-out infinite;
  }

  /* ── Celebration subtitle ── */
  .celebration-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem;
    font-style: italic;
    color: rgba(42,63,92,0.6);
    margin-bottom: 0.1rem;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.05s forwards;
  }

  .reception-text {
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #AF944D;
    font-weight: 600;
    margin-bottom: 0.55rem;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.1s forwards;
  }

  /* ── Details grid ── */
  .details-grid {
    opacity: 0;
    animation: fadeUp 0.8s ease 1.2s forwards;
    border-top: 0.5px solid rgba(175,148,77,0.25);
    border-bottom: 0.5px solid rgba(175,148,77,0.25);
    padding: 0.45rem 0;
    margin-bottom: 0.55rem;
  }

  .detail-label {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(42, 63, 92, 0.6);
  margin-bottom: 0.2rem;
  display: block;
}

  .detail-main {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 500;
    color: #2a3f5c;
    line-height: 1.15;
    display: block;
  }

  .detail-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.78rem;
    font-style: italic;
    color: rgba(42,63,92,0.5);
    display: block;
  }

  .venue-time-grid {
    display: grid;
    grid-template-columns: 1fr 0.5px 1fr;
    gap: 0 0.75rem;
    margin-top: 0.35rem;
    padding-top: 0.35rem;
    border-top: 0.5px solid rgba(175,148,77,0.18);
  }

  .venue-time-divider {
    background: rgba(175,148,77,0.22);
    align-self: stretch;
  }

  /* ── Petal row ── */
  .petal-row-inner {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    color: #b98c8c;
    font-size: 0.7rem;
    margin-bottom: 0.45rem;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.35s forwards;
  }

  .petal-row-inner .petal-a { animation: petalDrift 4s ease-in-out infinite; }
  .petal-row-inner .petal-b { animation: petalDrift 5.5s ease-in-out 1.5s infinite; }
  .petal-row-inner .petal-c { animation: petalDrift 3.5s ease-in-out 0.7s infinite; }

  /* ── Slider + Decline slot ── */
  .action-slot {
    opacity: 0;
    animation: fadeUp 0.8s ease 1.45s forwards;
    width: 100%;
  }

  /* ── Decline button ── */
  .decline-btn {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(91,141,184,0.65);
    border: 0.5px solid rgba(91,141,184,0.28);
    background: transparent;
    padding: 0.55rem 1.6rem;
    min-height: 44px;
    border-radius: 999px;
    cursor: pointer;
    margin-top: 0.4rem;
    transition: transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .decline-btn:hover { transform: scale(1.02); }

  /* ── Countdown slot ── */
  .countdown-slot {
    margin-top: 0.4rem;
    width: 100%;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.6s forwards;
  }

  /* ── Footer ── */
  .footer-flourish {
    margin-top: 0.4rem;
    opacity: 0;
    animation: fadeUp 0.8s ease 1.75s forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
  }

  .footer-petal-row {
    display: flex;
    gap: 0.4rem;
    color: #b98c8c;
    font-size: 0.65rem;
    opacity: 0.6;
  }

  .footer-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.6rem;
    font-style: italic;
    color: rgba(42,63,92,0.38);
    letter-spacing: 0.1em;
  }
`;
