"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface BarChartProps {
  data: { stage: string; count: number }[];
}

export function BarChart({ data }: BarChartProps) {
  const chartOptions = useMemo(() => {
    // Sort stages if necessary, e.g., group stages first
    const stages = data.map((item) => item.stage);
    const counts = data.map((item) => item.count);

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
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
          const item = params[0];
          return `
            <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 4px;">Tournament Stage</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #3B82F6; box-shadow: 0 0 8px #3B82F6;"></span>
              <span style="font-weight: 500; color: #ffffff;">${item.name}:</span>
              <span style="font-weight: 600; color: #ffffff;">${item.value} Matches</span>
            </div>
          `;
        },
      },
      grid: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: stages,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#27272A",
          },
        },
        axisLabel: {
          color: "#71717A",
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          rotate: 25,
          margin: 14,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "#1C1C1F",
          },
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#71717A",
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          margin: 12,
        },
      },
      series: [
        {
          name: "Matches",
          type: "bar",
          data: counts,
          barWidth: "40%",
          itemStyle: {
            color: "#3B82F6",
            borderRadius: [4, 4, 0, 0],
            shadowColor: "rgba(59, 130, 246, 0.2)",
            shadowBlur: 8,
          },
          emphasis: {
            itemStyle: {
              color: "#60A5FA",
            },
          },
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
