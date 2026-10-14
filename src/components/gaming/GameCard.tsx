import React from "react";
import type { GameItem } from "../../types";

interface GameCardProps {
  game: GameItem;
  onPlay: (game: GameItem) => void;
  hideTitleAndSubtitle?: boolean;
}

interface SpribeGameConfig {
  displayName: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  image: string;
}

export const getSpribeGameConfig = (gameName: string): SpribeGameConfig => {
  const n = (gameName || "").toLowerCase();

  if (n.includes("aviator")) {
    return {
      displayName: "Aviator",
      gradient: "radial-gradient(circle at 50% 35%, #8b1010 0%, #2e0505 100%)",
      borderColor: "rgba(239, 68, 68, 0.45)",
      glowColor: "rgba(239, 68, 68, 0.45)",
      image: "/assets/games/SPRIBE/AVIATOR.png",
    };
  }
  if (n.includes("dice")) {
    return {
      displayName: "DICE",
      gradient: "radial-gradient(circle at 50% 35%, #78350f 0%, #261102 100%)",
      borderColor: "rgba(245, 179, 0, 0.45)",
      glowColor: "rgba(245, 179, 0, 0.45)",
      image: "/assets/games/SPRIBE/DICE.png",
    };
  }
  if (n.includes("goal") || n.includes("soccer") || n.includes("football")) {
    return {
      displayName: "Goal!",
      gradient: "radial-gradient(circle at 50% 35%, #065f46 0%, #02261b 100%)",
      borderColor: "rgba(34, 197, 94, 0.45)",
      glowColor: "rgba(34, 197, 94, 0.45)",
      image: "/assets/games/SPRIBE/SOCCER.png",
    };
  }
  if (n.includes("plinko")) {
    return {
      displayName: "Plinko",
      gradient: "radial-gradient(circle at 50% 35%, #075985 0%, #012133 100%)",
      borderColor: "rgba(6, 182, 212, 0.45)",
      glowColor: "rgba(6, 182, 212, 0.45)",
      image: "/assets/games/SPRIBE/PLINKO.png",
    };
  }
  if (n.includes("wheel") || n.includes("miniroulette") || n.includes("mini-roulette") || n.includes("roulette")) {
    return {
      displayName: "Wheel",
      gradient: "radial-gradient(circle at 50% 35%, #047857 0%, #01281e 100%)",
      borderColor: "rgba(16, 185, 129, 0.45)",
      glowColor: "rgba(16, 185, 129, 0.45)",
      image: "/assets/games/SPRIBE/MINIROULETTE.png",
    };
  }
  if (n.includes("mines") || n.includes("mine")) {
    return {
      displayName: "Mines",
      gradient: "radial-gradient(circle at 50% 35%, #1e40af 0%, #0b1745 100%)",
      borderColor: "rgba(59, 130, 246, 0.45)",
      glowColor: "rgba(59, 130, 246, 0.45)",
      image: "/assets/games/SPRIBE/MINES.png",
    };
  }
  if (n.includes("hotline")) {
    return {
      displayName: "HOTLINE",
      gradient: "radial-gradient(circle at 50% 35%, #831843 0%, #290614 100%)",
      borderColor: "rgba(244, 63, 94, 0.45)",
      glowColor: "rgba(244, 63, 94, 0.45)",
      image: "/assets/games/SPRIBE/HOTLINE.png",
    };
  }
  if (n.includes("hilo") || n.includes("hi-lo")) {
    return {
      displayName: "Hilo",
      gradient: "radial-gradient(circle at 50% 35%, #701a75 0%, #260628 100%)",
      borderColor: "rgba(217, 70, 239, 0.45)",
      glowColor: "rgba(217, 70, 239, 0.45)",
      image: "/assets/games/SPRIBE/HILO.png",
    };
  }
  if (n.includes("80") || n.includes("multi") || n.includes("keno80") || n.includes("kino80")) {
    return {
      displayName: "Keno 80",
      gradient: "radial-gradient(circle at 50% 35%, #4c1d95 0%, #170933 100%)",
      borderColor: "rgba(192, 132, 252, 0.45)",
      glowColor: "rgba(192, 132, 252, 0.45)",
      image: "/assets/games/SPRIBE/KENO80.png",
    };
  }
  if (n.includes("keno") || n.includes("kino")) {
    return {
      displayName: "Keno",
      gradient: "radial-gradient(circle at 50% 35%, #581c87 0%, #1e0733 100%)",
      borderColor: "rgba(168, 85, 247, 0.45)",
      glowColor: "rgba(168, 85, 247, 0.45)",
      image: "/assets/games/SPRIBE/KENO.png",
    };
  }
  if (n.includes("balloon") || n.includes("ballon")) {
    return {
      displayName: "Balloon",
      gradient: "radial-gradient(circle at 50% 35%, #0369a1 0%, #012236 100%)",
      borderColor: "rgba(14, 165, 233, 0.45)",
      glowColor: "rgba(14, 165, 233, 0.45)",
      image: "/assets/games/SPRIBE/BALLON.png",
    };
  }
  if (n.includes("trader") || n.includes("trade")) {
    return {
      displayName: "Trader",
      gradient: "radial-gradient(circle at 50% 35%, #0f766e 0%, #032b27 100%)",
      borderColor: "rgba(20, 184, 166, 0.45)",
      glowColor: "rgba(20, 184, 166, 0.45)",
      image: "/assets/games/SPRIBE/TRADER.png",
    };
  }
  if (n.includes("pilot")) {
    return {
      displayName: "Pilot Chicken",
      gradient: "radial-gradient(circle at 50% 35%, #7c2d12 0%, #270e05 100%)",
      borderColor: "rgba(249, 115, 22, 0.45)",
      glowColor: "rgba(249, 115, 22, 0.45)",
      image: "/assets/games/SPRIBE/PILOT.png",
    };
  }

  return {
    displayName: gameName.toUpperCase(),
    gradient: "radial-gradient(circle at 50% 35%, #3b0764 0%, #120224 100%)",
    borderColor: "rgba(168, 85, 247, 0.35)",
    glowColor: "rgba(168, 85, 247, 0.35)",
    image: "/assets/games/SPRIBE/AVIATOR.png",
  };
};

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay, hideTitleAndSubtitle }) => {
  const config = getSpribeGameConfig(game.name || game.title);
  const cardImage = game.image && game.image.trim() !== "" ? game.image : config.image;

  return (
    <div
      className="spribe-tile-card"
      style={{
        "--tile-border": config.borderColor,
        "--tile-glow": config.glowColor,
      } as React.CSSProperties}
      onClick={() => onPlay(game)}
    >
      <img
        src={cardImage}
        alt={config.displayName}
        className="spribe-tile-img"
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== config.image) {
            e.currentTarget.src = config.image;
          } else {
            e.currentTarget.src = "/assets/games/SPRIBE/AVIATOR.png";
          }
        }}
      />
      <div className="spribe-tile-overlay" />
      <div className="spribe-card-hover-play">
        <i className="fa-solid fa-play"></i>
      </div>
      {!hideTitleAndSubtitle && (
        <div className="spribe-tile-footer">
          <div className="spribe-tile-title">{config.displayName}</div>
        </div>
      )}
    </div>
  );
};

