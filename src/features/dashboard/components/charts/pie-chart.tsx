"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface PieChartProps {
  data: { name: string; value: number }[];
}

export function PieChart({ data }: PieChartProps) {
  const chartOptions = useMemo(() => {
    // Premium color palette for the donut slices
    const colors = ["#22C55E", "#3B82F6", "#A78BFA", "#F59E0B", "#F43F5E", "#10B981"];

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: "#111113",
        borderColor: "#27272A",
        borderWidth: 1,
        textStyle: {
          color: "#FAFAFA",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
        },
        padding: [10, 14],
        formatter: (params: any) => {
          return `
            <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 4px;">Goals Contribution</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${params.color}; box-shadow: 0 0 8px ${params.color};"></span>
              <span style="font-weight: 500; color: #ffffff;">${params.name}:</span>
              <span style="font-weight: 600; color: #ffffff;">${params.value} Goals (${params.percent}%)</span>
            </div>
          `;
        },
      },
      legend: {
        orient: "vertical",
        right: "5%",
        top: "middle",
        icon: "circle",
        itemGap: 14,
        textStyle: {
          color: "#A1A1AA",
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
        },
      },
      series: [
        {
          name: "Goals Distribution",
          type: "pie",
          radius: ["50%", "72%"],
          center: ["40%", "50%"],
          avoidLabelOverlap: false,
          color: colors,
          itemStyle: {
            borderRadius: 6,
            borderColor: "#111113",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              color: "#FAFAFA",
              fontFamily: "Inter, sans-serif",
              formatter: "{b}\n{c} Goals",
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };
  }, [data]);

  return (
    <div className="w-full h-[320px] relative">
      <ReactECharts
        option={chartOptions}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
