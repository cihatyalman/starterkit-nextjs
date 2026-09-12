"use client";

import dynamic from "next/dynamic";

export const CCropImage = dynamic(
  () => import("./custom/CCropImage").then((mod) => mod.CCropImage),
  { ssr: false }
);
export const CLineChart = dynamic(
  () => import("./custom/CLineChart").then((mod) => mod.CLineChart),
  { ssr: false }
);
export const CLineChartMulti = dynamic(
  () => import("./custom/CLineChartMulti").then((mod) => mod.CLineChartMulti),
  { ssr: false }
);
export const CLottie = dynamic(
  () => import("./custom/CLottie").then((mod) => mod.CLottie),
  { ssr: false }
);
