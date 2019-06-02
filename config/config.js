var config = {
  sessionsHistoryLink:
    "https://openclassrooms.com/en/mentorship/dashboard/mentorship-sessions-history?page=",
  sessionPrices: {
    "1": 30,
    "2": 35,
    "3": 40
  },
  months: DateUtils.getLastThreeMonths(),
  stopMonth: DateUtils.getStopMonth(),
  tablesConfig: {
    totalSessions: {
      idName: "totalSessions",
      title: "Total sessions",
      headers: {
        Month: "{0}",
        "Level 1": "{0}€ - {1} session(s)",
        "Level 2": "{0}€ - {1} session(s)",
        "Level 3": "{0}€ - {1} session(s)",
        Earnings: "{0}€ - {1} session(s)"
      },
      update: "getTotalSessionsStats"
    },
    totalNoShows: {
      idName: "totalNoShows",
      title: "Total no-shows",
      headers: {
        Month: "{0}",
        "Level 1": "{0}€ - {1} session(s)",
        "Level 2": "{0}€ - {1} session(s)",
        "Level 3": "{0}€ - {1} session(s)",
        Earnings: "{0}€ - {1} session(s)"
      },
      update: "getTotalNoShowsStats"
    },
    totalIncomes: {
      idName: "totalIncomes",
      title: "Total",
      headers: {
        Month: "{0}",
        "Hourly average": "{0}€/h ({1}€/h without no-shows)",
        "Mentoring hours": "{0}h and {1}h in no-shows",
        Earnings: "{0}€ including {1}€ in no-shows"
      },
      update: "getGlobalStatistics"
    }
  }
};
