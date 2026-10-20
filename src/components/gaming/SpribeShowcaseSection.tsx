import React, { useState, useEffect } from "react";
import type { GameItem } from "../../types";

export interface StaticSpribeGame {
  id: string;
  uuid: string;
  name: string;
  title: string;
  subtitle: string;
  actionText: string;
  image: string;
  badgeText: string;
  category: string;
  row: 1 | 2;
  accentColor: string;
  accentGlow: string;
  icon: string;
}

export const STATIC_SPRIBE_GAMES: StaticSpribeGame[] = [
  // ROW 1: 7 games
  {
    id: "dice",
    uuid: "dice",
    name: "dice",
    title: "DICE",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "PLAY NOW",
    image: "/assets/games/SPRIBE/DICE.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.55)",
    icon: "fa-solid fa-dice-d6",
  },
  {
    id: "goal",
    uuid: "goal",
    name: "goal",
    title: "GOAL",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "KICK NOW",
    image: "/assets/games/SPRIBE/SOCCER.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#00e676",
    accentGlow: "rgba(0, 230, 118, 0.55)",
    icon: "fa-solid fa-futbol",
  },
  {
    id: "plinko",
    uuid: "plinko",
    name: "plinko",
    title: "PLINKO",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "DROP NOW",
    image: "/assets/games/SPRIBE/PLINKO.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#00e5ff",
    accentGlow: "rgba(0, 229, 255, 0.55)",
    icon: "fa-solid fa-shapes",
  },
  {
    id: "aviator",
    uuid: "aviator",
    name: "aviator",
    title: "AVIATOR",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "FLY NOW",
    image: "/assets/games/SPRIBE/AVIATOR.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#ff1744",
    accentGlow: "rgba(255, 23, 68, 0.55)",
    icon: "fa-solid fa-plane-departure",
  },
  {
    id: "mines",
    uuid: "mines",
    name: "mines",
    title: "MINES",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "MINE NOW",
    image: "/assets/games/SPRIBE/MINES.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#3b82f6",
    accentGlow: "rgba(59, 130, 246, 0.55)",
    icon: "fa-solid fa-bomb",
  },
  {
    id: "mini-roulette",
    uuid: "mini-roulette",
    name: "mini-roulette",
    title: "WHEEL",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "SPIN NOW",
    image: "/assets/games/SPRIBE/MINIROULETTE.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.55)",
    icon: "fa-solid fa-dharmachakra",
  },
  {
    id: "balloon",
    uuid: "balloon",
    name: "balloon",
    title: "BALLOON",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "PUMP NOW",
    image: "/assets/games/SPRIBE/BALLON.png",
    badgeText: "LIVE",
    category: "crash",
    row: 1,
    accentColor: "#14b8a6",
    accentGlow: "rgba(20, 184, 166, 0.55)",
    icon: "fa-solid fa-cloud-arrow-up",
  },

  // ROW 2: 6 games
  {
    id: "hi-lo",
    uuid: "hi-lo",
    name: "hi-lo",
    title: "HI-LO",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "GUESS NOW",
    image: "/assets/games/SPRIBE/HILO.png",
    badgeText: "LIVE",
    category: "crash",
    row: 2,
    accentColor: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.55)",
    icon: "fa-solid fa-arrows-up-down",
  },
  {
    id: "hotline",
    uuid: "hotline",
    name: "hotline",
    title: "HOTLINE",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "LINE NOW",
    image: "/assets/games/SPRIBE/HOTLINE.png",
    badgeText: "LIVE",
    category: "crash",
    row: 2,
    accentColor: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.55)",
    icon: "fa-solid fa-phone-volume",
  },
  {
    id: "keno",
    uuid: "keno",
    name: "keno",
    title: "KENO",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "PICK NOW",
    image: "/assets/games/SPRIBE/KENO.png",
    badgeText: "LIVE",
    category: "crash",
    row: 2,
    accentColor: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.55)",
    icon: "fa-solid fa-table-cells",
  },
  {
    id: "multi-keno",
    uuid: "multi-keno",
    name: "multi-keno",
    title: "KENO 80",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "PICK NOW",
    image: "/assets/games/SPRIBE/KENO80.png",
    badgeText: "LIVE",
    category: "crash",
    row: 2,
    accentColor: "#00d2ff",
    accentGlow: "rgba(0, 210, 255, 0.55)",
    icon: "fa-solid fa-grip",
  },
  {
    id: "pilot-chicken",
    uuid: "pilot-chicken",
    name: "pilot-chicken",
    title: "PILOT",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "FLY NOW",
    image: "/assets/games/SPRIBE/PILOT.png",
    badgeText: "LIVE",
    category: "crash",
    row: 2,
    accentColor: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.55)",
    icon: "fa-solid fa-jet-fighter",
  },
  {
    id: "trader",
    uuid: "trader",
    name: "trader",
    title: "TRADER",
    subtitle: "LIVE PROVIDER GAME.",
    actionText: "TRADE NOW",
    image: "/assets/games/SPRIBE/TRADER.png",
    badgeText: "LIVE",
    category: "crash",
    row: 2,
    accentColor: "#00f2fe",
    accentGlow: "rgba(0, 242, 254, 0.55)",
    icon: "fa-solid fa-chart-line",
  },
];

interface SpribeShowcaseSectionProps {
  onPlay: (game: GameItem) => void;
  catalogGames?: GameItem[];
}

export const SpribeShowcaseSection: React.FC<SpribeShowcaseSectionProps> = ({
  onPlay,
  catalogGames = [],
}) => {
  // Live simulated multipliers feed matching reference screenshot
  const [multipliers, setMultipliers] = useState([
    { id: "#680 748", rsg: "RSG: 930100", m1: "7.67", m2: "6.04" },
    { id: "#680 742", rsg: "RSG: 930100", m1: "2.13", m2: "24.58" },
    { id: "#680 768", rsg: "RSG: 930100", m1: "3.74", m2: "15.57" },
    { id: "#680 769", rsg: "RSG: 930100", m1: "8.01", m2: "22.74" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMultipliers((prev) => {
        const randIndex = Math.floor(Math.random() * prev.length);
        const copy = [...prev];
        const m1Num = (Math.random() * 8 + 1.2).toFixed(2);
        const m2Num = (Math.random() * 25 + 1.5).toFixed(2);
        copy[randIndex] = {
          ...copy[randIndex],
          m1: m1Num,
          m2: m2Num,
        };
        return copy;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleLaunch = (staticGame: StaticSpribeGame) => {
    const found = catalogGames.find(
      (g) =>
        String(g.id).toLowerCase() === staticGame.id.toLowerCase() ||
        String(g.uuid).toLowerCase() === staticGame.uuid.toLowerCase() ||
        g.name.toLowerCase() === staticGame.name.toLowerCase()
    );

    const gameToLaunch: GameItem = {
      id: found?.id || staticGame.id,
      uuid: found?.uuid || staticGame.uuid,
      name: found?.name || staticGame.name,
      title: staticGame.title,
      subtitle: staticGame.subtitle,
      category: "crash",
      categories: ["crash", "spribe"],
      theme: "theme-purple",
      badge: { text: "LIVE", type: "live" },
      image: staticGame.image,
      actionText: staticGame.actionText,
      kind: "provider",
      provider: "Spribe",
      choices: found?.choices || [],
    };

    onPlay(gameToLaunch);
  };

  const handleQuickBet = () => {
    const aviatorGame =
      STATIC_SPRIBE_GAMES.find((g) => g.id === "aviator") || STATIC_SPRIBE_GAMES[0];
    handleLaunch(aviatorGame);
  };

  const row1Games = STATIC_SPRIBE_GAMES.filter((g) => g.row === 1);
  const row2Games = STATIC_SPRIBE_GAMES.filter((g) => g.row === 2);

  return (
    <section className="spribe-showcase-section" id="spribeShowcaseSection">
      {/* Main Outer Display Frame with Cyan/Neon Border */}
      <div className="spribe-showcase-frame">
        {/* Crown Accent in Top Left Corner */}
        <div className="spribe-frame-crown-accent">
          <i className="fa-solid fa-crown"></i>
        </div>

        {/* Left Feature Card: Live Multipliers & Bet CTA */}
        <div className="spribe-feature-sidebar">
          <div className="spribe-sidebar-top-badges">
            <span className="spribe-pill-live-mult">
              <span className="live-dot-pulse"></span>
              LIVE MULTIPLIERS
            </span>
            <span className="spribe-pill-fair">
              <i className="fa-solid fa-scale-balanced"></i> FAIR
            </span>
          </div>

          <div className="spribe-sidebar-hero">
            <h3 className="spribe-sidebar-title">
              Spribe <span className="text-neon-title">Games</span>
            </h3>
            <p className="spribe-sidebar-desc">
              Unlock the thrill of Aviator, Plinko, and more! Get an exclusive deposit match to
              boost your play across all Spribe's exhilarating turbo games.
            </p>
          </div>

          {/* Live Multiplier Rows */}
          <div className="spribe-multipliers-feed">
            {multipliers.map((item, idx) => (
              <div key={idx} className="spribe-feed-row">
                <div className="spribe-feed-left">
                  <span className="spribe-plane-icon">✈</span>
                  <div className="spribe-flight-info">
                    <span className="spribe-flight-id">{item.id}</span>
                    <span className="spribe-flight-rsg">{item.rsg}</span>
                  </div>
                </div>
                <div className="spribe-feed-chips">
                  <div className="spribe-mult-box">
                    <span className="mult-x">X</span>
                    <span className="mult-val">{item.m1}</span>
                  </div>
                  <div className="spribe-mult-box">
                    <span className="mult-x">X</span>
                    <span className="mult-val">{item.m2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dual Action Quick Bet Buttons */}
          <div className="spribe-sidebar-actions">
            <button
              type="button"
              className="spribe-bet-btn"
              onClick={handleQuickBet}
              title="Launch Aviator with 1.00 USD"
            >
              <i className="fa-solid fa-bolt"></i>
              <span>BET 1.00 USD</span>
            </button>
            <button
              type="button"
              className="spribe-bet-btn"
              onClick={handleQuickBet}
              title="Launch Aviator with 1.00 USD"
            >
              <i className="fa-solid fa-bolt"></i>
              <span>BET 1.00 USD</span>
            </button>
          </div>
        </div>

        {/* Right Section: 2-Row Static Games Grid */}
        <div className="spribe-games-content">
          {/* Row 1: 7 Cards */}
          <div className="spribe-row-grid">
            {row1Games.map((game) => (
              <div
                key={game.id}
                className="spribe-game-card"
                style={
                  {
                    borderColor: game.accentColor,
                    boxShadow: `0 4px 14px rgba(0, 0, 0, 0.5), 0 0 14px ${game.accentGlow}`,
                    "--card-accent": game.accentColor,
                    "--card-accent-glow": game.accentGlow,
                  } as React.CSSProperties
                }
                onClick={() => handleLaunch(game)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLaunch(game);
                  }
                }}
              >
                <div className="spribe-card-thumb-wrap">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="spribe-card-img"
                    loading="lazy"
                  />
                  <span className="spribe-card-live-tag">{game.badgeText}</span>
                </div>

                <div className="spribe-card-info">
                  <div className="spribe-card-title">
                    <i className={`${game.icon} me-1`} style={{ color: game.accentColor }}></i>
                    <span>{game.title}</span>
                  </div>
                  <div className="spribe-card-subtitle">{game.subtitle}</div>
                </div>

                <button
                  type="button"
                  className="spribe-card-action-btn"
                  style={{
                    borderColor: game.accentColor,
                    boxShadow: `0 0 8px ${game.accentGlow}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunch(game);
                  }}
                >
                  <span>{game.actionText}</span>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Row 2: 6 Cards (Aligned to identical 7-column grid) */}
          <div className="spribe-row-grid">
            {row2Games.map((game) => (
              <div
                key={game.id}
                className="spribe-game-card"
                style={
                  {
                    borderColor: game.accentColor,
                    boxShadow: `0 4px 14px rgba(0, 0, 0, 0.5), 0 0 14px ${game.accentGlow}`,
                    "--card-accent": game.accentColor,
                    "--card-accent-glow": game.accentGlow,
                  } as React.CSSProperties
                }
                onClick={() => handleLaunch(game)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleLaunch(game);
                  }
                }}
              >
                <div className="spribe-card-thumb-wrap">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="spribe-card-img"
                    loading="lazy"
                  />
                  <span className="spribe-card-live-tag">{game.badgeText}</span>
                </div>

                <div className="spribe-card-info">
                  <div className="spribe-card-title">
                    <i className={`${game.icon} me-1`} style={{ color: game.accentColor }}></i>
                    <span>{game.title}</span>
                  </div>
                  <div className="spribe-card-subtitle">{game.subtitle}</div>
                </div>

                <button
                  type="button"
                  className="spribe-card-action-btn"
                  style={{
                    borderColor: game.accentColor,
                    boxShadow: `0 0 8px ${game.accentGlow}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunch(game);
                  }}
                >
                  <span>{game.actionText}</span>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
