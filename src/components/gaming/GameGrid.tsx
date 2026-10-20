import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { GameItem, MachineType } from "../../types";
import { api } from "../../services/api";
import { LiveWinnersTicker } from "./LiveWinnersTicker";
import { SpribeShowcaseSection } from "./SpribeShowcaseSection";

interface GameGridProps {
  balance: number;
  machineType?: MachineType;
  machineName?: string;
  shopName?: string;
  onBalanceChange?: (newBalance: number) => void;
  showToast?: (message: string) => void;
  onOpenCashout?: () => void;
  onZeroBalance?: () => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  balance,
  machineType = "smart-pc",
  machineName: _machineName,
  shopName: _shopName,
  onBalanceChange: _onBalanceChange,
  showToast: _showToast,
  onOpenCashout,
  onZeroBalance,
}) => {
  const navigate = useNavigate();
  const isTerminal = machineType === "terminal";
  const [catalogGames, setCatalogGames] = useState<GameItem[]>([]);

  // Fetch Spribe games from Backend API on mount to sync live server tokens & uuids
  useEffect(() => {
    let isMounted = true;
    api
      .getGamesPage("Spribe", 1, 50)
      .then((res) => {
        if (isMounted && res.games && Array.isArray(res.games)) {
          const mapped: GameItem[] = res.games.map((item, idx) => ({
            id: item.id || item.uuid || idx + 1,
            name: item.name.toLowerCase(),
            title: item.name.toUpperCase(),
            subtitle: item.description || "LIVE PROVIDER GAME",
            category: (item.category || "crash").toLowerCase(),
            categories: ["crash", "spribe"],
            theme: "theme-purple",
            badge: { text: "LIVE", type: "live" },
            image: item.image || "/assets/games/SPRIBE/AVIATOR.png",
            actionText: "PLAY NOW",
            kind: "provider",
            provider: "Spribe",
            uuid: item.uuid || String(item.id),
            choices: item.choices || [],
          }));
          setCatalogGames(mapped);
        }
      })
      .catch((err) => {
        console.warn("Could not load Spribe games from API:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Launch Game directly on dedicated GamePlayPage
  const handleLaunchGame = useCallback(
    (game: GameItem) => {
      if (balance <= 0) {
        if (onZeroBalance) {
          onZeroBalance();
        } else if (onOpenCashout) {
          onOpenCashout();
        }
        return;
      }

      const gameIdentifier = game.uuid || game.id || game.name;
      const playRoute = isTerminal
        ? `/terminal/play/${encodeURIComponent(gameIdentifier)}`
        : `/smart-pc/play/${encodeURIComponent(gameIdentifier)}`;

      navigate(playRoute, { state: { game } });
    },
    [balance, onZeroBalance, onOpenCashout, isTerminal, navigate]
  );

  return (
    <>
      {/* SECTION 1: LIVE WINNERS REAL-TIME ROLLING FEED (Smart PC Only) */}
      {!isTerminal && <LiveWinnersTicker />}

      {/* SECTION 2: SPRIBE GAMES ONLY (Image 2 Design Spec) */}
      <div className="spribe-only-container mt-2">
        <SpribeShowcaseSection
          onPlay={handleLaunchGame}
          catalogGames={catalogGames}
        />
      </div>
    </>
  );
};
