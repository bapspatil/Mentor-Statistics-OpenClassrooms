/**
 * Static class with all utilities to use dates.
 * @class
 */
class DateUtils {
  /**
   * Return an array with all month names.
   * @static
   */
  static getMonthList() {
    var monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return monthList;
  }

  /**
   * Return the current month name.
   * @static
   */
  static getCurrentMonth() {
    var date = new Date();

    return DateUtils.getMonthList()[date.getMonth()];
  }

  /**
   * Return the month name (based on index) before current month.
   * Example: Index = 1; Current month = February; Return (February - Index) = January.
   * @param {int} index
   */
  static getMonthFromCurrentMonth(index) {
    var date = new Date();

    return DateUtils.getMonthList()[
      date.getMonth() == 0 ? 12 - index : date.getMonth() - index
    ];
  }

  /**
   * Return the last three month names.
   * @static
   */
  static getLastThreeMonths() {
    var index = 0;
    var monthList = [];

    for (index; index < 3; index++) {
      monthList.push(DateUtils.getMonthFromCurrentMonth(index));
    }

    return monthList;
  }

  /**
   * Return the month name where parser should stop to parse.
   * @static
   */
  static getStopMonth() {
    var date = new Date();

    return DateUtils.getMonthList()[
      date.getMonth() == 0 ? 9 : date.getMonth() - 3
    ];
  }
}
