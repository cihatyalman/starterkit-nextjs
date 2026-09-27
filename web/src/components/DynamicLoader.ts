"use client";

import dynamic from "next/dynamic";

export const CCropImage = dynamic(
  () => import("./custom/image/CCropImage").then((mod) => mod.CCropImage),
  { ssr: false },
);
export const CLineChart = dynamic(
  () => import("./custom/graphic/CLineChart").then((mod) => mod.CLineChart),
  { ssr: false },
);
export const CLineChartMulti = dynamic(
  () =>
    import("./custom/graphic/CLineChartMulti").then(
      (mod) => mod.CLineChartMulti,
    ),
  { ssr: false },
);
export const CLottie = dynamic(
  () => import("./custom/tools/CLottie").then((mod) => mod.CLottie),
  { ssr: false },
);
