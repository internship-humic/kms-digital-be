import RiskStatus from "../common/enums/risk-status.enum.js";

export function calculateRiskStatus({ zscore_bb, zscore_tb, zscore_gizi }) {
  const scores = [zscore_bb, zscore_tb, zscore_gizi].filter(
    (score) => score !== null && score !== undefined,
  );

  if (scores.some((score) => score < -3 || score > 3)) {
    return RiskStatus.HighRisk;
  }

  if (scores.some((score) => score < -2 || score > 2)) {
    return RiskStatus.LowRisk;
  }

  return RiskStatus.Normal;
}
