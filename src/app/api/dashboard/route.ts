import { NextResponse } from "next/server";
import { DashboardService } from "@/features/dashboard/services/dashboard.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await DashboardService.getTelemetry();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard telemetry data." },
      { status: 500 }
    );
  }
}
