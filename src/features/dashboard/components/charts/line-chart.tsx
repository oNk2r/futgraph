"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface LineChartProps {
  data: { date: string; goals: number }[];
}

export function LineChart({ data }: LineChartProps) {
  const chartOptions = useMemo(() => {
    // Format dates for display
    const dates = data.map((item) => {
      try {
        const d = new Date(item.date);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      } catch {
        return item.date;
      }
    });
    const values = data.map((item) => item.goals);

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
            <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 4px;">${item.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; bg-color: #22C55E; background-color: #22C55E; box-shadow: 0 0 8px #22C55E;"></span>
              <span style="font-weight: 600; color: #ffffff;">${item.value} Goals Scored</span>
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
        data: dates,
        boundaryGap: false,
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
          margin: 12,
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
          name: "Goals",
          type: "line",
          data: values,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: "#22C55E",
            width: 2.5,
            shadowColor: "rgba(34, 197, 94, 0.4)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "#22C55E",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(34, 197, 94, 0.15)", // Green glow color start
                },
                {
                  offset: 1,
                  color: "rgba(34, 197, 94, 0)", // Fade to zero
                },
              ],
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
