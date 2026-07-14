export interface KPICardData {
  id: string;
  label: string;
  value: number | string;
  trend: string;
  trendType: "positive" | "negative" | "neutral";
  iconName: "matches" | "goals" | "players" | "teams" | "venues" | "referees";
}

export interface GoalsTimeline {
  date: string;
  goals: number;
}

export interface MatchesByStage {
  stage: string;
  count: number;
}

export interface GoalsDistribution {
  name: string;
  value: number;
}

export interface TeamPerformance {
  team: string;
  goals: number;
  xg: number;
  possession: number;
}

export interface TopTeam {
  id: number;
  name: string;
  fifaCode: string;
  played: number;
  won: number;
  lost: number;
  draw: number;
  gd: number;
  points: number;
}

export interface TopPlayer {
  id: number;
  name: string;
  teamName: string;
  fifaCode: string;
  position: string;
  goals: number;
  assists: number;
  minutes: number;
}

export interface RecentMatch {
  id: number;
  homeTeam: string;
  homeCode: string;
  homeScore: number | null;
  awayTeam: string;
  awayCode: string;
  awayScore: number | null;
  venue: string;
  city: string;
  stage: string;
  date: string;
  status: string;
}

export interface DashboardTelemetry {
  kpis: KPICardData[];
  goalsTimeline: GoalsTimeline[];
  matchesByStage: MatchesByStage[];
  goalsDistribution: GoalsDistribution[];
  teamPerformance: TeamPerformance[];
  topTeams: TopTeam[];
  topPlayers: TopPlayer[];
  recentMatches: RecentMatch[];
  aiInsights: string[];
}
