import React, { useState, useEffect } from "react";

interface TournamentSectionProps {
  onJoinTournament?: (tournamentName: string) => void;
}

export const TournamentSection: React.FC<TournamentSectionProps> = ({ onJoinTournament }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 38 });
  const [joinedSlot, setJoinedSlot] = useState(false);
  const [joinedAviator, setJoinedAviator] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoinSlot = () => {
    setJoinedSlot(true);
    onJoinTournament?.("Grand Spribe Championship");
  };

  const handleJoinAviator = () => {
    setJoinedAviator(true);
    onJoinTournament?.("Aviator 100x Multiplier Hunt");
  };

  const padZero = (num: number) => num.toString().padStart(2, "0");

  return (
    <section className="cyber-arena-section mb-5">
      {/* Header bar */}
      <div className="cyber-section-header">
        <div className="cyber-header-left">
          <div className="cyber-header-icon">
            <i className="fa-solid fa-trophy"></i>
          </div>
          <div>
            <h2 className="cyber-header-title">Daily Tournaments & Arenas</h2>
            <div className="cyber-header-sub">Compete in live turbo races and share daily prize pools</div>
          </div>
        </div>
        <div className="cyber-header-right">
          <div className="cyber-live-pulse-badge">
            <span className="live-radar-dot"></span>
            <span>2 ARENAS ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Tournament 1: Grand Spribe Championship */}
        <div className="col-12 col-xl-6">
          <div className="cyber-arena-card arena-purple-gold">
            <div
              className="cyber-card-backdrop"
              style={{ backgroundImage: `url('/assets/games/SPRIBE/DICE.png')` }}
            />
            <div className="cyber-card-glow" />

            <div className="cyber-card-content">
              {/* Top Meta Strip */}
              <div className="cyber-meta-strip">
                <div className="cyber-badge-group">
                  <span className="cyber-tag tag-live">
                    <span className="tag-dot"></span> LIVE SPRINT
                  </span>
                  <span className="cyber-tag tag-perk">
                    <i className="fa-solid fa-ticket"></i> FREE ENTRY
                  </span>
                </div>
                <div className="cyber-timer-chip">
                  <i className="fa-regular fa-clock"></i>
                  <span>
                    {padZero(timeLeft.hours)}:{padZero(timeLeft.minutes)}:{padZero(timeLeft.seconds)}
                  </span>
                </div>
              </div>

              {/* Title & Prize Showcase */}
              <div className="cyber-card-hero">
                <div className="cyber-hero-text">
                  <h3 className="cyber-arena-title">
                    <i className="fa-solid fa-crown title-icon-gold"></i>
                    Grand Spribe Championship
                  </h3>
                  <p className="cyber-arena-desc">
                    Play any Spribe game to score points. Top 10 players share the daily jackpot pool!
                  </p>
                </div>

                <div className="cyber-prize-block">
                  <div className="cyber-prize-label">TOTAL PRIZE POOL</div>
                  <div className="cyber-prize-amount text-gold">N$ 75,000</div>
                  <div className="cyber-prize-split">
                    <span>🥇 50%</span>
                    <span>🥈 30%</span>
                    <span>🥉 20%</span>
                  </div>
                </div>
              </div>

              {/* 3-Step 3D Stadium Podium */}
              <div className="cyber-podium-stage">
                <div className="podium-stage-header">
                  <div className="stage-title">
                    <i className="fa-solid fa-ranking-star text-warning"></i>
                    <span>TOP 3 CHAMPIONS</span>
                  </div>
                  <div className="stage-live-count">
                    <i className="fa-solid fa-users"></i>
                    <span>1,420 Active Racers</span>
                  </div>
                </div>

                <div className="podium-pillars-grid">
                  {/* 2nd Place (Silver) */}
                  <div className="podium-column rank-2">
                    <div className="podium-avatar-wrap silver-glow">
                      <div className="podium-medal-badge silver">2nd</div>
                      <div className="podium-avatar-circle silver-avatar">
                        <i className="fa-solid fa-medal"></i>
                      </div>
                    </div>
                    <div className="podium-player-name">Player #3041</div>
                    <div className="podium-player-score">39,150 pts</div>
                    <div className="podium-pedestal pedestal-silver">
                      <span className="pedestal-rank-num">2</span>
                      <div className="pedestal-shine"></div>
                    </div>
                  </div>

                  {/* 1st Place (Gold, Tall Center) */}
                  <div className="podium-column rank-1">
                    <div className="podium-crown-badge">
                      <i className="fa-solid fa-crown"></i>
                    </div>
                    <div className="podium-avatar-wrap gold-glow">
                      <div className="podium-medal-badge gold">1st</div>
                      <div className="podium-avatar-circle gold-avatar">
                        <i className="fa-solid fa-trophy"></i>
                      </div>
                    </div>
                    <div className="podium-player-name gold-name">Player #9812</div>
                    <div className="podium-player-score gold-score">48,200 pts</div>
                    <div className="podium-pedestal pedestal-gold">
                      <span className="pedestal-rank-num">1</span>
                      <div className="pedestal-shine"></div>
                    </div>
                  </div>

                  {/* 3rd Place (Bronze) */}
                  <div className="podium-column rank-3">
                    <div className="podium-avatar-wrap bronze-glow">
                      <div className="podium-medal-badge bronze">3rd</div>
                      <div className="podium-avatar-circle bronze-avatar">
                        <i className="fa-solid fa-award"></i>
                      </div>
                    </div>
                    <div className="podium-player-name">Player #7749</div>
                    <div className="podium-player-score">31,800 pts</div>
                    <div className="podium-pedestal pedestal-bronze">
                      <span className="pedestal-rank-num">3</span>
                      <div className="pedestal-shine"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sprint Progress Gauge */}
              <div className="cyber-progress-gauge">
                <div className="gauge-header">
                  <span className="gauge-label">
                    <i className="fa-solid fa-gauge-high text-warning"></i> SPRINT COMPLETION
                  </span>
                  <span className="gauge-percentage">74% COMPLETE</span>
                </div>
                <div className="gauge-track">
                  <div className="gauge-fill fill-purple" style={{ width: "74%" }}>
                    <div className="gauge-fill-glint"></div>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="cyber-cta-wrap">
                <button
                  type="button"
                  className={`cyber-action-btn btn-gold ${joinedSlot ? "is-enrolled" : ""}`}
                  onClick={handleJoinSlot}
                  disabled={joinedSlot}
                >
                  {joinedSlot ? (
                    <>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>ENROLLED • RANK #4</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-flag-checkered"></i>
                      <span>JOIN TOURNAMENT NOW</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament 2: Aviator Multiplier Hunt */}
        <div className="col-12 col-xl-6">
          <div className="cyber-arena-card arena-crimson-red">
            <div
              className="cyber-card-backdrop"
              style={{ backgroundImage: `url('/assets/games/SPRIBE/AVIATOR.png')` }}
            />
            <div className="cyber-card-glow glow-red" />

            <div className="cyber-card-content">
              {/* Top Meta Strip */}
              <div className="cyber-meta-strip">
                <div className="cyber-badge-group">
                  <span className="cyber-tag tag-fire">
                    <span className="tag-dot dot-red"></span> HIGH FLYER
                  </span>
                  <span className="cyber-tag tag-plane">
                    <i className="fa-solid fa-plane"></i> CRASH & TURBO
                  </span>
                </div>
                <div className="cyber-timer-chip chip-red">
                  <i className="fa-regular fa-clock"></i>
                  <span>
                    {padZero(timeLeft.hours + 2)}:{padZero(timeLeft.minutes)}:{padZero(timeLeft.seconds)}
                  </span>
                </div>
              </div>

              {/* Title & Prize Showcase */}
              <div className="cyber-card-hero">
                <div className="cyber-hero-text">
                  <h3 className="cyber-arena-title">
                    <i className="fa-solid fa-rocket title-icon-red"></i>
                    Aviator 100x Multiplier Hunt
                  </h3>
                  <p className="cyber-arena-desc">
                    Catch highest cashout multipliers on Aviator, Pilot, Balloon & Mines to climb ranks!
                  </p>
                </div>

                <div className="cyber-prize-block">
                  <div className="cyber-prize-label">TOTAL PRIZE POOL</div>
                  <div className="cyber-prize-amount text-red">N$ 35,000</div>
                  <div className="cyber-prize-split">
                    <span>🥇 50%</span>
                    <span>🥈 30%</span>
                    <span>🥉 20%</span>
                  </div>
                </div>
              </div>

              {/* 3-Step 3D Stadium Podium */}
              <div className="cyber-podium-stage">
                <div className="podium-stage-header">
                  <div className="stage-title">
                    <i className="fa-solid fa-fire text-danger"></i>
                    <span>TOP MULTIPLIERS HIT</span>
                  </div>
                  <div className="stage-live-count">
                    <i className="fa-solid fa-users"></i>
                    <span>985 Active Racers</span>
                  </div>
                </div>

                <div className="podium-pillars-grid">
                  {/* 2nd Place (Silver) */}
                  <div className="podium-column rank-2">
                    <div className="podium-avatar-wrap silver-glow">
                      <div className="podium-medal-badge silver">2nd</div>
                      <div className="podium-avatar-circle silver-avatar">
                        <i className="fa-solid fa-medal"></i>
                      </div>
                    </div>
                    <div className="podium-player-name">Player #1829</div>
                    <div className="podium-player-score neon-green">98.40x</div>
                    <div className="podium-pedestal pedestal-silver pedestal-red-trim">
                      <span className="pedestal-rank-num">2</span>
                      <div className="pedestal-shine"></div>
                    </div>
                  </div>

                  {/* 1st Place (Center, Elevated) */}
                  <div className="podium-column rank-1">
                    <div className="podium-crown-badge crown-red">
                      <i className="fa-solid fa-bolt"></i>
                    </div>
                    <div className="podium-avatar-wrap red-glow">
                      <div className="podium-medal-badge gold">1st</div>
                      <div className="podium-avatar-circle crimson-avatar">
                        <i className="fa-solid fa-rocket"></i>
                      </div>
                    </div>
                    <div className="podium-player-name text-light">Player #4410</div>
                    <div className="podium-player-score neon-green-lg">142.80x</div>
                    <div className="podium-pedestal pedestal-crimson">
                      <span className="pedestal-rank-num">1</span>
                      <div className="pedestal-shine"></div>
                    </div>
                  </div>

                  {/* 3rd Place (Bronze) */}
                  <div className="podium-column rank-3">
                    <div className="podium-avatar-wrap bronze-glow">
                      <div className="podium-medal-badge bronze">3rd</div>
                      <div className="podium-avatar-circle bronze-avatar">
                        <i className="fa-solid fa-award"></i>
                      </div>
                    </div>
                    <div className="podium-player-name">Player #9002</div>
                    <div className="podium-player-score neon-green">81.15x</div>
                    <div className="podium-pedestal pedestal-bronze pedestal-red-trim">
                      <span className="pedestal-rank-num">3</span>
                      <div className="pedestal-shine"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sprint Progress Gauge */}
              <div className="cyber-progress-gauge">
                <div className="gauge-header">
                  <span className="gauge-label">
                    <i className="fa-solid fa-gauge-high text-danger"></i> SPRINT COMPLETION
                  </span>
                  <span className="gauge-percentage">82% COMPLETE</span>
                </div>
                <div className="gauge-track">
                  <div className="gauge-fill fill-red" style={{ width: "82%" }}>
                    <div className="gauge-fill-glint"></div>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="cyber-cta-wrap">
                <button
                  type="button"
                  className={`cyber-action-btn btn-crimson ${joinedAviator ? "is-enrolled" : ""}`}
                  onClick={handleJoinAviator}
                  disabled={joinedAviator}
                >
                  {joinedAviator ? (
                    <>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>ENROLLED • RANK #7</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plane-departure"></i>
                      <span>PLAY QUALIFIER NOW</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
