import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { GameItem, MachineType } from "../../types";
import { api } from "../../services/api";
import { GameCard } from "./GameCard";
import { LiveWinnersTicker } from "./LiveWinnersTicker";

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
  showToast,
  onOpenCashout,
  onZeroBalance,
}) => {
  const navigate = useNavigate();
  const isTerminal = machineType === "terminal";
  const [searchQuery, setSearchQuery] = useState("");
  const [catalogGames, setCatalogGames] = useState<GameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalGames, setTotalGames] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Helper mapper for live API items
  const mapApiGame = useCallback(
    (
      item: {
        id?: string | number;
        uuid?: string;
        name: string;
        description?: string;
        category?: string;
        provider?: string;
        payout_label?: string;
        image?: string | null;
        provider_image?: string | null;
        kind?: "provider" | "local";
        choices?: string[];
      },
      idx: number
    ): GameItem => ({
      id: item.id || item.uuid || idx + 1,
      name: item.name.toLowerCase(),
      title: item.name.toUpperCase(),
      subtitle: item.description || "LIVE PROVIDER GAME",
      category: (item.category || "slots").toLowerCase(),
      categories: [
        (item.category || "slots").toLowerCase(),
        (item.provider || "provider").toLowerCase(),
      ],
      theme: (["theme-gold", "theme-red", "theme-green", "theme-purple", "theme-blue"] as const)[
        idx % 5
      ],
      badge: item.payout_label
        ? { text: item.payout_label, type: "hot" }
        : { text: "LIVE", type: "live" },
      image: (() => {
        const n = item.name.toLowerCase();
        const prov = (item.provider || "").toLowerCase();

        // Spribe provider or specific Spribe game names
        if (prov.includes("spribe") || item.category === "spribe") {
          if (n.includes("pilot")) return "/assets/games/SPRIBE/PILOT.png";
          if (n.includes("balloon") || n.includes("ballon")) return "/assets/games/SPRIBE/BALLON.png";
          if (n.includes("dice") || n.includes("odd") || n.includes("even")) return "/assets/games/SPRIBE/DICE.png";
          if (n.includes("hi-lo") || n.includes("hilo") || n.includes("hi lo") || n.includes("card")) return "/assets/games/SPRIBE/HILO.png";
          if (n.includes("hotline")) return "/assets/games/SPRIBE/HOTLINE.png";
          if (n.includes("keno80") || n.includes("keno 80") || n.includes("kino80") || n.includes("kino 80") || ((n.includes("keno") || n.includes("kino")) && n.includes("80"))) return "/assets/games/SPRIBE/KENO80.png";
          if (n.includes("keno") || n.includes("kino")) return "/assets/games/SPRIBE/KENO.png";
          if (n.includes("mines") || n.includes("mine") || n.includes("bomb")) return "/assets/games/SPRIBE/MINES.png";
          if (n.includes("miniroulette") || n.includes("mini-roulette") || n.includes("roulette")) return "/assets/games/SPRIBE/MINIROULETTE.png";
          if (n.includes("plinko")) return "/assets/games/SPRIBE/PLINKO.png";
          if (n.includes("soccer") || n.includes("goal") || n.includes("kick") || n.includes("football")) return "/assets/games/SPRIBE/SOCCER.png";
          if (n.includes("trader") || n.includes("trade") || n.includes("chart")) return "/assets/games/SPRIBE/TRADER.png";
          return "/assets/games/SPRIBE/AVIATOR.png";
        }

        // If provider returned a live image URL, use it as primary
        if (item.image && item.image.trim() !== "") return item.image.trim();
        if (item.provider_image && item.provider_image.trim() !== "") return item.provider_image.trim();

        // Exact Spribe flagship game names fallback
        if (n === "aviator") return "/assets/games/SPRIBE/AVIATOR.png";
        if (n === "plinko") return "/assets/games/SPRIBE/PLINKO.png";
        if (n === "mines") return "/assets/games/SPRIBE/MINES.png";
        if (n === "dice") return "/assets/games/SPRIBE/DICE.png";
        if (n === "balloon" || n === "ballon") return "/assets/games/SPRIBE/BALLON.png";

        // General default local placeholder
        return "/assets/games/placeholder.png";
      })(),
      actionText: "PLAY NOW",
      kind: item.kind || "provider",
      provider: item.provider || "Game Provider",
      uuid: item.uuid || String(item.id),
      choices: item.choices || [],
    }),
    []
  );

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setCurrentPage(1);

    api
      .getGamesPage("Spribe", 1, 50)
      .then((res) => {
        if (isMounted) {
          if (res.games && Array.isArray(res.games) && res.games.length > 0) {
            // Filter out 'mobile' duplicate games from catalog view
            const filtered = res.games.filter((g) => !g.name.toLowerCase().includes("mobile"));
            const mapped = filtered.map((item, idx) => mapApiGame(item, idx));
            setCatalogGames(mapped);
            setHasMore(res.hasMore);
            setTotalGames(res.total);
          } else {
            setCatalogGames([]);
            setHasMore(false);
            setTotalGames(0);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("Could not load Spribe games from API:", err);
          setCatalogGames([]);
          setHasMore(false);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [mapApiGame]);

  // Load Next Page of Games ("View More Games")
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    const nextPage = currentPage + 1;

    try {
      const res = await api.getGamesPage("Spribe", nextPage, 50);
      if (res.games && Array.isArray(res.games) && res.games.length > 0) {
        const filtered = res.games.filter((g) => !g.name.toLowerCase().includes("mobile"));
        const mapped = filtered.map((item, idx) => mapApiGame(item, catalogGames.length + idx));
        setCatalogGames((prev) => [...prev, ...mapped]);
        setCurrentPage(nextPage);
        setHasMore(res.hasMore);
        setTotalGames(res.total);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.warn("Failed to load more Spribe games:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredGames = useMemo(() => {
    return catalogGames.filter((game) => {
      // Platform Filter: Laptop/Desktop view shows desktop games, Mobile shows mobile games
      const isMobileGame =
        game.name.toLowerCase().includes("mobile") ||
        game.title.toLowerCase().includes("mobile");

      if (!isMobileDevice && isMobileGame) {
        // Exclude mobile-specific variants on desktop/laptop
        return false;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.name.toLowerCase().includes(q) ||
        game.categories?.some((c) => c.includes(q));

      return matchesSearch;
    });
  }, [catalogGames, searchQuery, isMobileDevice]);

  // Open Game directly on dedicated GamePlayPage with Header
  const handleLaunchGame = (game: GameItem) => {
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
  };



interface LiveRoundItem {
  id: string;
  code: string;
  m1: string;
  m2: string;
  type: "pink" | "purple" | "blue" | "cyan";
}

  // Live simulated Aviator multiplier round history for sidebar (Screenshot 2 design)
  const [liveRounds, setLiveRounds] = useState<LiveRoundItem[]>([
    { id: "680 747", code: "ESG 900100", m1: "50.25", m2: "10.25", type: "pink" },
    { id: "712 403", code: "ESG 900100", m1: "40.25", m2: "75.25", type: "purple" },
    { id: "594 118", code: "ESG 900100", m1: "9.25", m2: "6.25", type: "blue" },
  ]);

  useEffect(() => {
    const roundInterval = setInterval(() => {
      const randomId = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(
        100 + Math.random() * 900
      )}`;

      const m1 = (1.1 + Math.random() * 30).toFixed(2);
      const m2 = (1.2 + Math.random() * 50).toFixed(2);

      const types = ["pink", "purple", "blue", "cyan"] as const;
      const type = types[Math.floor(Math.random() * types.length)];

      setLiveRounds((prev) => [
        {
          id: randomId,
          code: "ESG 900100",
          m1,
          m2,
          type,
        },
        ...prev.slice(0, 2),
      ]);
    }, 4000);

    return () => clearInterval(roundInterval);
  }, []);

  const handleLaunchAviator = (stake?: string) => {
    const aviatorGame =
      catalogGames.find((g) => g.name.toLowerCase().includes("aviator")) ||
      catalogGames[0];
    if (aviatorGame) {
      if (stake && showToast) {
        showToast(`Launching Aviator with Quick Stake $${stake}...`);
      }
      handleLaunchGame(aviatorGame);
    }
  };

  // Sort games matching the row-by-row arrangement in Screenshot 2
  const sortedGames = useMemo(() => {
    const getScore = (name: string) => {
      const n = name.toLowerCase();
      if (n.includes("aviator")) return 1;
      if (n.includes("dice")) return 2;
      if (n.includes("goal") || n.includes("soccer") || n.includes("football")) return 3;
      if (n.includes("plinko")) return 4;
      if (n.includes("wheel") || n.includes("roulette") || n.includes("miniroulette")) return 5;
      if (n.includes("mines") || n.includes("mine")) return 6;
      if (n.includes("hotline")) return 7;
      if (n.includes("hilo") || n.includes("hi-lo")) return 8;
      if (n.includes("keno80") || n.includes("keno 80") || n.includes("kino80") || n.includes("kino 80") || ((n.includes("keno") || n.includes("kino")) && n.includes("80"))) return 9;
      if (n.includes("keno") || n.includes("kino")) return 10;
      if (n.includes("balloon") || n.includes("ballon")) return 11;
      if (n.includes("trader") || n.includes("trade")) return 12;
      if (n.includes("pilot")) return 13;
      return 99;
    };
    return [...filteredGames].sort((a, b) => getScore(a.name) - getScore(b.name));
  }, [filteredGames]);

  return (
    <>
      {/* ==============================================================
           SECTION 1: LIVE WINNERS REAL-TIME ROLLING FEED (Smart PC Only)
      =============================================================== */}
      {!isTerminal && <LiveWinnersTicker />}

      {/* ==============================================================
           SECTION 2: SPRIBE SHOWCASE & GAMES GRID (Screenshot 2 Theme Layout)
      =============================================================== */}
      <section id="categorySection" className="mb-5 showcase-block-panel">
        <div className="spribe-showcase-wrap">
          <div className="spribe-showcase-layout">
            {/* Left Sidebar Card (Screenshot 2 design) */}
            <div className="spribe-sidebar-card">
              <div className="spribe-sidebar-card-top">
                <div className="spribe-badge-row">
                  <span className="spribe-turbo-tag">
                    <i className="fa-solid fa-bolt"></i> TURBO SUITE
                  </span>
                  <span className="spribe-radar-status">
                    <span className="spribe-pulse-ping"></span> RADAR LIVE
                  </span>
                </div>

                <h2 className="spribe-sidebar-title">
                  SPRIBE <span className="text-warning">TURBO</span>
                </h2>
                <p className="spribe-sidebar-desc">
                  High-speed crash, instant multipliers &amp; Provably Fair arcade games with instant cashier cashout.
                </p>

                {/* Telemetry Header */}
                <div className="spribe-telemetry-header">
                  <span className="telemetry-label">
                    <i className="fa-solid fa-satellite-dish"></i> AVIATOR TELEMETRY
                  </span>
                  <span className="telemetry-updated">REAL-TIME</span>
                </div>

                {/* Live Flights / Multiplier History */}
                <div className="spribe-round-list">
                  {liveRounds.map((round, idx) => (
                    <div key={idx} className="spribe-round-row">
                      <div className="spribe-round-meta">
                        <i className="fa-solid fa-plane-up spribe-plane-icon"></i>
                        <div>
                          <div className="spribe-round-id">#{round.id}</div>
                          <div className="spribe-round-sub">{round.code}</div>
                        </div>
                      </div>
                      <div className="spribe-multiplier-group">
                        <span className={`spribe-multi-chip ${round.type}`}>
                          x {round.m1}
                        </span>
                        <span className={`spribe-multi-chip ${round.type}`}>
                          x {round.m2}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Bet Launchpad */}
              <div className="spribe-sidebar-actions-wrap">
                <div className="spribe-stake-chips-row">
                  <span className="stake-label">QUICK STAKE:</span>
                  <button
                    type="button"
                    className="spribe-stake-chip"
                    onClick={() => handleLaunchAviator("1.00")}
                  >
                    $1.00
                  </button>
                  <button
                    type="button"
                    className="spribe-stake-chip"
                    onClick={() => handleLaunchAviator("5.00")}
                  >
                    $5.00
                  </button>
                  <button
                    type="button"
                    className="spribe-stake-chip"
                    onClick={() => handleLaunchAviator("10.00")}
                  >
                    $10.00
                  </button>
                  <button
                    type="button"
                    className="spribe-stake-chip"
                    onClick={() => handleLaunchAviator("25.00")}
                  >
                    $25.00
                  </button>
                </div>

                <div className="spribe-sidebar-actions">
                  <button
                    type="button"
                    className="spribe-bet-btn spribe-bet-primary"
                    onClick={() => handleLaunchAviator("1.00")}
                  >
                    <i className="fa-solid fa-jet-fighter"></i> LAUNCH AVIATOR
                  </button>
                  <button
                    type="button"
                    className="spribe-bet-btn spribe-bet-turbo"
                    onClick={() => handleLaunchAviator("5.00")}
                  >
                    <i className="fa-solid fa-bolt"></i> TURBO $5
                  </button>
                </div>
              </div>
            </div>

            {/* Right Spribe Games Grid (Screenshot 2 design) */}
            <div className="spribe-grid-wrap">
              {isLoading ? (
                <div className="spribe-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div
                      key={n}
                      className="p-4 rounded-4 text-center d-flex flex-column align-items-center justify-content-center"
                      style={{
                        height: "165px",
                        background: "rgba(13, 5, 29, 0.7)",
                        border: "1px solid rgba(147, 51, 234, 0.25)",
                        animation: "pulse 1.5s infinite ease-in-out",
                      }}
                    >
                      <div className="spinner-border text-warning spinner-border-sm mb-2" role="status"></div>
                      <span className="text-secondary small fw-bold">Loading...</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="spribe-grid" id="categoryGamesGridContainer">
                  {sortedGames.map((game) => (
                    <GameCard key={game.id} game={game} onPlay={handleLaunchGame} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View More Games Pagination Loader Section */}
        {!isLoading && filteredGames.length > 0 && hasMore && (
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mt-4 pt-3 pb-2 border-top border-purple-subtle gap-3 px-2">
            {/* Left Side: Game Count & Progress Bar */}
            <div className="d-flex align-items-center gap-3">
              <div className="text-secondary small">
                Showing <strong className="text-warning">{catalogGames.length}</strong> of{" "}
                <strong className="text-light">{totalGames}</strong> Live Games
              </div>
              <div
                className="progress"
                style={{
                  width: "140px",
                  height: "7px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{
                    width: `${Math.min(100, Math.round((catalogGames.length / (totalGames || 1)) * 100))}%`,
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
              <span className="badge bg-dark text-warning border border-warning border-opacity-25 rounded-pill px-2 py-1 small">
                {Math.min(100, Math.round((catalogGames.length / (totalGames || 1)) * 100))}%
              </span>
            </div>

            {/* Right Side: View More Games Button */}
            <div>
              <button
                id="viewMoreGamesBtn"
                type="button"
                className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm transition-all"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading more games...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-angles-down"></i>
                    View More Games (+50)
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredGames.length === 0 && (
          <div id="noGamesFoundState" className="text-center py-5">
            <div className="mb-3" style={{ fontSize: "3rem", color: "#a855f7" }}>
              <i className="fa-solid fa-gamepad"></i>
            </div>
            <h3 className="fw-bold text-light mb-2">No Live Games Found</h3>
            <p className="text-secondary small mb-4">
              {searchQuery
                ? `No live games matching "${searchQuery}". Try another keyword or filter.`
                : "No live games found in this category from provider."}
            </p>
            {searchQuery && (
              <button
                className="btn btn-outline-warning rounded-pill px-4 py-2"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </section>


    </>
  );
};

