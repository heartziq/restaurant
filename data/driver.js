const moment = require("moment");

const daysOfWeek = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
};

function convertTo24(h) {
  const hour = parseInt(moment(h, ["h:mm A"]).format("HH"));
  const minute = moment(h, ["h:mm A"]).minute() || 0;

  return {
    hour,
    minute
  };
}

function getTimeRange(rangeInString) {
  const trimmed = rangeInString.replace(/\s+/, "");
  const openAt = convertTo24(trimmed.split("-")[0]);
  const closeAt = convertTo24(trimmed.split("-")[1]);

  return {
    openAt,
    closeAt
  };
}

/*
 * Use case #1: opens now
 * 1 - day number in list? proceed else return false
 * 2 - grab closeAt time.. and compare
 *
 */

function filterOpenNow(db) {
  const timeNow = moment().hour();
  const minuteNow = moment().minute();

  const now = moment({ hour: timeNow, minute: minuteNow }).format();

  const openThisDay = db.filter(e => {
    for (let each of e.open) {
      if (each.day.includes(moment().day())) {
        const { hour: hourStart, minute: minuteStart } = convertTo24(
          each.time.openAt
        );

        const { hour: hourEnd, minute: minuteEnd } = convertTo24(
          each.time.closeAt
        );

        if (
          now >= moment({ hour: hourStart, minute: minuteStart }).format() &&
          now < moment({ hour: hourEnd, minute: minuteEnd }).format()
        )
          return true;
      }
    }
  });

  return openThisDay;
}

/*
 * Use case #2: after _x_ am/pm
 * 1 - closeAt after x? return true : false
 */
function opensAfter(db, time) {
  // get time = {hour: 20, minute: 40}
  // const { hour, minute } = convertTo24(time);
  const { hour, minute } = time;
  const now = moment({ hour, minute }).format();

  const openThisDay = db.filter(e => {
    for (let each of e.open) {
      const { hour: hourEnd, minute: minuteEnd } = convertTo24(
        each.time.closeAt
      );
      if (now < moment({ hour: hourEnd, minute: minuteEnd }).format())
        return true;
    }
  });

  return openThisDay;
}

/*
 * Use case #3: on _x_ day
 * 1 - daysOfWeek[x] in .open[n].day ?
 */

function openAtDay(db, day) {
  if (day === "" || day === "All") {
    return db;
  }

  const dayInAbbreviation = day[0]
    .toUpperCase()
    .concat(day.slice(1, 3).toLowerCase());

  const openThisDay = db.filter(e => {
    for (let each of e.open) {
      if (each.day.includes(daysOfWeek[dayInAbbreviation])) {
        return true;
      }
    }
  });
  return openThisDay;
}

function getNow() {
  return moment({
    day: moment().day(),
    hour: moment().hour(),
    minute: moment().minute()
  }).format();
}

function isOpenNow() {
  const now = getNow();
  const target = moment({
    day: daysOfWeek["Mon"],
    hour: 22,
    minute: 30
  }).format();

  return now < target;
}

function getDayRange(dayRange) {
  if (dayRange.includes("-")) {
    const start = daysOfWeek[dayRange.split("-")[0]];
    const end = daysOfWeek[dayRange.split("-")[1]];

    let range = [];

    for (let i = start; i <= end; i++) range.push(i);
    return range;
  } else {
    return [daysOfWeek[dayRange]];
  }
}

function getComplete(dayRange) {
  if (dayRange.includes(",")) {
    return dayRange
      .replace(/\s+/, "")
      .split(",")
      .reduce((acc, ele) => acc.concat(getDayRange(ele)), []);
  }
  return getDayRange(dayRange);
}

function getDayFromNumber(...number) {
  const result = Object
                  .keys(daysOfWeek)
                  .filter(key => number.includes(daysOfWeek[key]));
  
  return result;
}

module.exports = {
  filterOpenNow,
  openAtDay,
  opensAfter,
  getDayFromNumber,
  convertTo24,
  daysOfWeek
};
