export interface HighestEarningEvent {
  name: string;
  revenue: number;
}

export interface OverviewStats {
  overview: {
    totalUsers: number;
    newUsersThisMonth: number;
    activeUsersThisMonth: number;
  };
  events: {
    totalEvents: number;
    upcomingEventsThisMonth: number;
    pastEventsThisMonth: number;
  };
  tickets: {
    ticketsSoldThisMonth: number;
    ticketsAvailableThisMonth: number;
    checkinsThisMonth: number;
    attendanceRateThisMonth: number;
  };
  finance: {
    revenueTotal: number;
    revenueThisMonth: number;
    highestEarningEvent: HighestEarningEvent;
  };
}
