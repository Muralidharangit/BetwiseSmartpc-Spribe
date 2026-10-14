import React from "react";

interface SmartPCHelpBarProps {
  machineName?: string;
  shopName?: string;
}

export const SmartPCHelpBar: React.FC<SmartPCHelpBarProps> = ({ 
  machineName = "Smart PC",
  shopName = "Central Shop"
}) => {
  return (
    <section className="smart-pc-help-banner mb-4">
      <div className="help-banner-ambient" />
      <div className="help-banner-content">
        {/* Left Side: Support & Station Identity */}
        <div className="help-left-section">
          <div className="help-icon-glow">
            <i className="fa-solid fa-headset"></i>
            <span className="help-status-dot" />
          </div>
          <div className="help-text-group">
            <div className="help-title-row">
              <h4 className="help-banner-title">Need Help or Cash Balance Top-Up?</h4>
              <span className="help-live-badge">
                <i className="fa-solid fa-circle"></i> CASHIER ACTIVE
              </span>
            </div>
            <p className="help-banner-desc">
              Visit the <strong className="text-light">{shopName}</strong> counter for cash deposits, chip reloads, or voucher assistance.
            </p>
            <div className="help-chips-row">
              <div className="help-station-chip">
                <i className="fa-solid fa-desktop"></i>
                <span>Station:</span>
                <strong className="station-code">{machineName}</strong>
              </div>
              <div className="help-location-chip">
                <i className="fa-solid fa-store"></i>
                <span>Shop Desk:</span>
                <strong>{shopName}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Trust & Security Badges */}
        <div className="help-right-section">
          <div className="trust-pill trust-rng">
            <i className="fa-solid fa-shield-halved"></i>
            <div className="trust-pill-content">
              <span className="trust-pill-sub">CERTIFIED</span>
              <span className="trust-pill-title">FAIR RNG</span>
            </div>
          </div>
          <div className="trust-pill trust-payout">
            <i className="fa-solid fa-bolt"></i>
            <div className="trust-pill-content">
              <span className="trust-pill-sub">INSTANT</span>
              <span className="trust-pill-title">COUNTER PAY</span>
            </div>
          </div>
          <div className="trust-pill trust-security">
            <i className="fa-solid fa-lock"></i>
            <div className="trust-pill-content">
              <span className="trust-pill-sub">256-BIT</span>
              <span className="trust-pill-title">ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
