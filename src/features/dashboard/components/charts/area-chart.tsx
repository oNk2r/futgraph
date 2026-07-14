"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

interface AreaChartProps {
  data: { team: string; goals: number; xg: number; possession: number }[];
}

export function AreaChart({ data }: AreaChartProps) {
  const chartOptions = useMemo(() => {
    const teams = data.map((item) => item.team);
    const goals = data.map((item) => item.goals);
    const xg = data.map((item) => item.xg);

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
          let html = `<div style="font-size: 11px; color: #a1a1aa; margin-bottom: 6px; font-weight: 500;">${params[0].name} Performance</div>`;
          params.forEach((param: any) => {
            const color = param.color;
            html += `
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 2px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${color};"></span>
                  <span style="color: #a1a1aa;">${param.seriesName}</span>
                </div>
                <span style="font-weight: 600; color: #ffffff;">${param.value} / match</span>
              </div>
            `;
          });
          return html;
        },
      },
      legend: {
        right: "5%",
        top: "0%",
        icon: "roundRect",
        itemGap: 14,
        textStyle: {
          color: "#A1A1AA",
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
        },
      },
      grid: {
        top: 40,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: teams,
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
        name: "Per Match",
        nameTextStyle: {
          color: "#71717A",
          fontFamily: "Inter, sans-serif",
          fontSize: 9,
          padding: [0, 0, 0, -20],
        },
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
          name: "Actual Goals",
          type: "line",
          data: goals,
          smooth: true,
          showSymbol: true,
          symbolSize: 6,
          lineStyle: {
            color: "#22C55E",
            width: 2,
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
                  color: "rgba(34, 197, 94, 0.12)",
                },
                {
                  offset: 1,
                  color: "rgba(34, 197, 94, 0)",
                },
              ],
            },
          },
        },
        {
          name: "Expected Goals (xG)",
          type: "line",
          data: xg,
          smooth: true,
          showSymbol: true,
          symbolSize: 6,
          lineStyle: {
            color: "#3B82F6",
            width: 2,
            type: "dashed",
          },
          itemStyle: {
            color: "#3B82F6",
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
                  color: "rgba(59, 130, 246, 0.1)",
                },
                {
                  offset: 1,
                  color: "rgba(59, 130, 246, 0)",
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
