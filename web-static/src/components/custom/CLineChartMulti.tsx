"use client"
// Kullanım Şekli
// const data = [{ K: "Ocak", V: 400 }];
// const data = [{ K: "Ocak", V: 400, A: 500, B: 600, C: 700 }];
// await delay(10); // Veri çekince grafiğe eklemeden önce 10ms gecikme koy. Animasyon düzgün çalışır.

import React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CButton } from "./CButton";

const chartColorList = [
  "rgba(255, 159, 64, 0.9)", // Turuncu
  "rgba(255, 99, 132, 0.9)", // Kırmızı (soft)
  "rgba(54, 162, 235, 0.9)", // Mavi (canlı)
  "rgba(153, 102, 255, 0.9)", // Mor
  "rgba(255, 99, 255, 0.9)", // Pembe
  "rgba(75, 192, 192, 0.9)", // Yesil
  "rgba(255, 206, 86, 0.9)", // Sarı (doygun)
];

const buttonColorList = [
  { base: "bg-orange-400", hover: "hover:bg-orange-500" },
  { base: "bg-red-400", hover: "hover:bg-red-500" },
  { base: "bg-blue-400", hover: "hover:bg-blue-500" },
  { base: "bg-purple-400", hover: "hover:bg-purple-500" },
  { base: "bg-pink-400", hover: "hover:bg-pink-500" },
  { base: "bg-emerald-400", hover: "hover:bg-emerald-500" },
  { base: "bg-yellow-400", hover: "hover:bg-yellow-500" },
];

interface CLineChartMultiProps {
  data: MyRecord[];
  title?: string;
  keyName?: string;
  valueNameList?: string[];
  height?: number;
}

export const CLineChartMulti = ({
  data,
  title = "Grafik",
  keyName = "K",
  valueNameList = ["V"],
  height = 300,
}: CLineChartMultiProps) => {
  const [activeChart, setActiveChart] = useState(0);
  const [activeColor, setActiveColor] = useState(
    chartColorList[activeChart % chartColorList.length]
  );

  useEffect(() => {
    setActiveColor(chartColorList[activeChart % chartColorList.length]);
  }, [activeChart]);

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold ml-14 mr-2 self-center">{title}</h3>
        <div className="flex gap-1 mr-2 overflow-auto">
          {valueNameList.map((e, index) => (
            <CButton
              key={index}
              className={cn(
                "w-16",
                buttonColorList[index % buttonColorList.length].base,
                buttonColorList[index % buttonColorList.length].hover
              )}
              onClick={async () => setActiveChart(index)}
            >
              {e}
            </CButton>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey={keyName}
            axisLine={{ stroke: "#ccc", strokeWidth: 2 }}
            tick={{ fontWeight: "bold", fontSize: 14 }}
          />
          <YAxis
            axisLine={{ stroke: "#ccc", strokeWidth: 2 }}
            tick={{ fontWeight: "bold", fontSize: 14 }}
          />
          {data.length > 0 && (
            <Line
              key={valueNameList[activeChart]}
              type="monotone"
              dataKey={valueNameList[activeChart]}
              stroke={activeColor}
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={<CustomActiveDot color={activeColor} />}
              animationDuration={1000}
            />
          )}
          <Tooltip cursor={false} content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = React.memo(({ active, payload, label }: MyAny) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md p-2">
      <strong style={{ textDecoration: "underline" }}>{label}</strong>
      <br />{" "}
      {payload.map((e: MyAny, index: number) => (
        <div key={index} style={{ color: e.color, fontWeight: "bold" }}>
          {payload.length > 1 ? `${e.name}: ${e.value}` : e.value}
        </div>
      ))}
    </div>
  );
});
CustomTooltip.displayName = "CustomTooltip";

const CustomDot = React.memo((props: MyAny) => {
  const { cx, cy, stroke } = props;
  if (cx === undefined || cy === undefined) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={2}
      stroke={stroke}
      strokeWidth={2}
      fill="white"
    />
  );
});
CustomDot.displayName = "CustomDot";

const CustomActiveDot = React.memo(({ cx, cy, color }: MyAny) => {
  if (cx === undefined || cy === undefined) return null;

  return <circle cx={cx} cy={cy} r={5} fill={color} />;
});
CustomActiveDot.displayName = "CustomActiveDot";
