import React from "react";

interface VipPromotionsSectionProps {
  onClaimPromo?: (promoTitle: string) => void;
  onOpenCashout?: () => void;
}

export const VipPromotionsSection: React.FC<VipPromotionsSectionProps> = ({
  onClaimPromo,
  onOpenCashout,
}) => {
  const PERKS = [
    {
      id: "reload",
      theme: "vault-gold",
      badge3d: "/assets/images/vip/1.png",
      icon: "fa-solid fa-vault",
      tag: "DAILY BONUS",
      bigStat: "2X MATCH",
      title: "100% Reload Bonus",
      desc: "Top up your session with the cashier and double your initial credits up to N$ 1,000!",
      actionText: "CLAIM AT CASHIER",
      actionIcon: "fa-solid fa-coins",
      actionType: "claim",
    },
    {
      id: "cashback",
      theme: "vault-emerald",
      badge3d: "/assets/images/vip/2.png",
      icon: "fa-solid fa-shield-halved",
      tag: "AUTO REBATE",
      bigStat: "15% BACK",
      title: "Weekly Cash Shield",
      desc: "Automatic cash protection. 15% cashback returned directly to your Smart PC balance every Monday.",
      actionText: "SHIELD ACTIVE",
      actionIcon: "fa-solid fa-check",
      actionType: "vip",
    },
    {
      id: "cashout-desk",
      theme: "vault-purple",
      badge3d: "/assets/images/vip/3.png",
      icon: "fa-solid fa-money-bill-transfer",
      tag: "COUNTER PAY",
      bigStat: "0s DELAY",
      title: "Instant Desk Cashout",
      desc: "Click Cash Out at any time. Session balance is locked and instantly paid in cash at the counter.",
      actionText: "REQUEST CASHOUT",
      actionIcon: "fa-solid fa-hand-holding-dollar",
      actionType: "cashout",
    },
    {
      id: "highroller",
      theme: "vault-cyan",
      badge3d: "/assets/images/vip/4.png",
      icon: "fa-solid fa-gem",
      tag: "HIGH LIMIT",
      bigStat: "N$ 500 MAX",
      title: "High Stakes Club",
      desc: "Unlocked higher spin limits up to N$ 500 per spin with dedicated VIP shop manager support.",
      actionText: "VIEW PRIVILEGES",
      actionIcon: "fa-solid fa-crown",
      actionType: "claim",
    },
  ];

  return (
    <section className="vip-vault-section mb-5">
      {/* Header bar */}
      <div className="vip-vault-header">
        <div className="vault-header-left">
          <div className="vault-header-icon">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <h2 className="vault-header-title">Smart PC VIP Club & Cashier Perks</h2>
            <div className="vault-header-sub">Exclusive shop floor privileges & instant cashier rewards</div>
          </div>
        </div>
        <div className="vault-header-right">
          <div className="vault-membership-badge">
            <i className="fa-solid fa-certificate"></i>
            <span>MEMBERSHIP ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {PERKS.map((perk) => (
          <div key={perk.id} className="col-12 col-md-6 col-lg-3">
            <div className={`vip-vault-card ${perk.theme}`}>
              {/* Floating 3D Graphic Badge on Right */}
              <div className="vault-3d-badge-wrap">
                <img src={perk.badge3d} alt={perk.title} className="vault-3d-badge-img" />
              </div>
              <div className="vault-card-glow" />

              <div className="vault-card-inner">
                {/* Top Badge & Icon */}
                <div className="vault-top-row">
                  <div className="vault-icon-circle">
                    <i className={perk.icon}></i>
                  </div>
                  <span className="vault-badge">{perk.tag}</span>
                </div>

                {/* Big Stat Callout */}
                <div className="vault-stat-callout">{perk.bigStat}</div>

                {/* Title & Description */}
                <div className="vault-info">
                  <h3 className="vault-card-title">{perk.title}</h3>
                  <p className="vault-card-desc">{perk.desc}</p>
                </div>

                {/* Action CTA */}
                <div className="vault-action-wrap">
                  <button
                    type="button"
                    className={`vault-action-btn btn-${perk.theme}`}
                    onClick={() => {
                      if (perk.actionType === "cashout") {
                        onOpenCashout?.();
                      } else {
                        onClaimPromo?.(perk.title);
                      }
                    }}
                  >
                    <i className={perk.actionIcon}></i>
                    <span>{perk.actionText}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
