"use client";

import { CLineChart } from "@/components/custom/CLineChart";
import { CLineChartMulti } from "@/components/custom/CLineChartMulti";

export const DemoGraphic = () => {
  const dataSet1 = [
    { K: "Ocak", V: 400 },
    { K: "Şubat", V: 450 },
    { K: "Mart", V: 200 },
    { K: "Nisan", V: 550 },
    { K: "Mayıs", V: 300 },
  ];
  const dataSet2 = [
    { K: "Ocak", V: 400, A: 500, B: 600, C: 700 },
    { K: "Şubat", V: 300, A: 800, B: 300, C: 1400 },
    { K: "Mart", V: 200, A: 1100, B: 500, C: 1100 },
    { K: "Nisan", V: 500, A: 900, B: 800, C: 900 },
    { K: "Mayıs", V: 700, A: 1000, B: 1000, C: 400 },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-96">
          <CLineChart data={dataSet1} title="Tek Elemanlı Grafik" />
        </div>
        <div className="flex-1 min-w-96">
          <CLineChart
            data={dataSet2}
            title="Çok Elemanlı Grafik"
            valueNameList={["V", "A", "B", "C"]}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-96">
          <CLineChartMulti
            data={dataSet2}
            title="Seçmeli Grafik"
            valueNameList={["V", "A", "B", "C"]}
          />
        </div>
      </div>
    </div>
  );
};
