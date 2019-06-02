/**
 * Class with all methods to parse to parse mentorship sessions history pages.
 * @class
 */
class Parser {
  /**
   * Initialization of required variables.
   * @constructor
   */
  constructor() {
    this.stats = new Statistics();
    this.stats.initialize();
    this.display = new Display();
    this.display.initializeTables($("div#js-jpax-dynamic-content"), this.stats);
  }

  /**
   * Check if a state is canceled or late canceled.
   * Return 0 = Canceled
   * Return 1 = Late canceled
   * Return -1 = Not canceled
   * @param  {string} str - String to compare
   */
  isCanceled(str) {
    var cancelType = ["Canceled", "Canceled late", "Absent student"];

    return cancelType.indexOf(str);
  }

  /**
   * Add a session to the statistic object.
   * @param  {string} month - A month name
   * @param  {Array} element - One row of the table
   * @param  {int} isCanceled - Define the type of cancel (1: late canceled, -1: not canceled)
   */
  addSessionToStatistics(month, element, isCanceled) {
    var session = new SessionModel();

    session.type = isCanceled;
    session.month = month;
    session.level = element["Level of expertise"];
    session.income = Price.computePriceByLevelAndStatus(
      element["Level of expertise"],
      element["Status"]
    );

    this.stats.addSession(session);
  }

  /**
   * Treat one element and define if it can be add to statistics or not.
   * @param {string} month - A month name
   * @param {Array} element - One row of the table
   */
  treatElement(month, element) {
    var isCanceled = -1;

    if ($.inArray(month, config.months) == -1) {
      return false;
    }

    isCanceled = this.isCanceled(element["Status"]);
    if (isCanceled != 0) {
      this.addSessionToStatistics(month, element, isCanceled);
      this.display.refreshRow(month, this.stats);
    }
  }

  /**
   * Parse a mentorship session history page with his index.
   * @param {int} pageNb - The page index
   */
  launchParsing(pageNb) {
    var loop = true;
    var self = this;

    $.ajax({
      url: config.sessionsHistoryLink + pageNb,
      type: "GET",
      success: function(res) {
        var json = $(res)
          .find("div#js-jpax-dynamic-content table")
          .tableToJSON({
            ignoreHiddenRows: false
          });

        $.each(json, function(index, element) {
          var dateArray = element["Session date"].split(" ");
          var month = dateArray[0];

          if (self.treatElement(month, element) == false) {
            if (month == config.stopMonth) {
              loop = false;
              return false;
            }
          }
        });

        if (loop) self.launchParsing(pageNb + 1);
      }
    });
  }
}
