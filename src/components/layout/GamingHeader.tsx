import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { MachineType } from "../../types";
import { BalanceDisplay } from "../gaming/BalanceDisplay";

interface GamingHeaderProps {
  machineType: MachineType;
  machineName: string;
  shopName: string;
  balance: number;
  actionText: string;
  onPrimaryAction: () => void;
  onToggleMachineType?: (type: MachineType) => void;
}

export const GamingHeader: React.FC<GamingHeaderProps> = ({
  machineType,
  machineName,
  shopName,
  balance,
  actionText,
  onPrimaryAction,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };



  return (
    <header className="smart-pc-header">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        {/* Left: Winbet Brand Logo + Machine Station Badge */}
        <div className="d-flex align-items-center gap-3">
          <Link
            to={machineType === "terminal" ? "/terminal" : "/smart-pc"}
            className="d-flex align-items-center gap-2 text-decoration-none me-1"
            title="Betwise Station"
          >
            {/* <img
              src="/assets/images/logo.png"
              alt="BETWISE"
              className="brand-logo-img logo-sm"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            /> */}
            <img
              src="/assets/images/betwise-logo.png"
              alt="Betwise"
              className="brand-logo-img"
              style={{
                height: "34px",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45))",
              }}
            />
          </Link>

          {/* Dedicated Station Badge & Type */}
          <div className="station-badge d-flex align-items-center gap-2">
            <span className="online-dot" title="Station Online"></span>
            {machineType === "smart-pc" ? (
              <span
                className="badge border text-light px-2 py-1 d-inline-flex align-items-center gap-1"
                style={{
                  fontSize: "0.74rem",
                  background: "rgba(11, 74, 112, 0.5)",
                  borderColor: "#0B4A70",
                }}
              >
                <i className="fa-solid fa-desktop text-success"></i> SMART PC
              </span>
            ) : (
              <span
                className="badge bg-dark text-success border border-success-subtle px-2 py-1 d-inline-flex align-items-center gap-1"
                style={{ fontSize: "0.74rem" }}
              >
                <i className="fa-solid fa-receipt"></i> TERMINAL
              </span>
            )}
            <span id="stationCodeDisplay" className="fw-bold text-light">
              {machineName}
            </span>
            <span className="text-secondary">|</span>
            <span className="text-white" id="stationShopDisplay" style={{ fontSize: "0.76rem", color: "#D8E2EC" }}>
              {shopName}
            </span>
          </div>
        </div>

        {/* Right: Balance, Primary Action & Tools */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Balance Display Chip */}
          <BalanceDisplay balance={balance} onClick={onPrimaryAction} />

          {/* Primary Action Button */}
          <button
            type="button"
            className="btn-gold-action"
            id="btnPrimaryCashout"
            onClick={onPrimaryAction}
          >
            <i
              className={
                machineType === "terminal"
                  ? "fa-solid fa-print"
                  : "fa-solid fa-money-bill-transfer"
              }
              id="primaryActionIcon"
            ></i>
            <span id="primaryActionText">{actionText}</span>
          </button>

          {/* Sound Effects Toggle */}
          <button
            type="button"
            className="btn-icon-control"
            id="btnAudioToggle"
            onClick={toggleSound}
            title="Sound Effects"
          >
            <i className={`fa-solid ${soundEnabled ? "fa-volume-high" : "fa-volume-xmark"}`}></i>
          </button>

        </div>
      </div>
    </header>
  );
};
