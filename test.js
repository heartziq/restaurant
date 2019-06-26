const csv = require('csvtojson');
const filePath = './makan.csv';
const { daysOfWeek } = require('./data/driver');
var _ = require('lodash');

const getDayNumbers = timeString => {

  const testRangeRegex = /([A-Z]{1}[a-z]+(-)?)+/g;
  return timeString
          .split(',')
          .map(e => e.match(testRangeRegex)[0])
          .reduce((acc, elem) => {
            if (elem.includes('-')) {
              
              const range = elem.split('-').map(e => daysOfWeek[e]);
              const [ start, stop ] = [...range];
              
              return acc.concat(_.range(start, stop+1))
            } else {
              return acc.concat(daysOfWeek[elem])
            }
          }, [])
}

const populateRestaurant = async () => {
  const result = [];
  const data = await
                csv({noheader: true, headers: ['name', 'time']})
                .fromFile(filePath)

  data.map(eachRestaurant => {
    // in 1 restaurant...
    // insert name here
    let temp = Object.assign({}, { name: eachRestaurant.name });

    let open = [];

    const openEntry = eachRestaurant.time
                                      .split('/')
                                      .map(e => {
                                        // e = 'Mon, Wed-Sun 11 am - 10 pm'

                                        // grab time [ '1 pm', '10:14 pm' ]
                                        const [openAt, closeAt] = e.match(/\d+(:\d+)?\s[p|a]m/g)
                                        const time = { openAt, closeAt };

                                        const et = {time}

                                        et.day = getDayNumbers(e); // [3, 4, 5, 7]

                                        // et = {time: {openAt: x, closeAt: y}}
                                        // open = [{time: {openAt: x, closeAt: y}}]
                                        open.push(et);

                                        // et.day = [1, 2, 3]
                                        return et.day;
                                      });

    temp = Object.assign(temp, {open}) // {name: "Kushi", open:[{time: {openAt: x, closeAt: y}}]}
    result.push(temp); // result = [{name: "Kushi", open:[{time: {openAt: x, closeAt: y}}]},]

  })

  return result;
}


const truncateDays = days => {
  const startDay = days.slice(0, 3);
  const endDay = days.slice(-3)

  return startDay.concat('-', endDay)
}

const getFormattedDays = arrayOfDays => {
  const reduced = arrayOfDays.reduce((acc, elem, index) => {
    const currentDayInNumber = daysOfWeek[elem];
    const prevDay = arrayOfDays[index-1];
    const prevDayInNumber = daysOfWeek[prevDay];

    // console.log(`curr: ${currentDayInNumber} - prev: ${prevDayInNumber}`)

    if ((currentDayInNumber - prevDayInNumber) > 1)
      return acc.concat(`, ${elem}`)

    return acc.concat(elem)
  }, '');

  // e.g. reduced = 'MonTueWed, Sun'
  // Need to truncate MonTueWed to Mon-Wed
  if (reduced.includes(',')) {
    const [fJoin, unJoin] = [...reduced.split(',')];
  
    const many = reduced.match(/([A-Z][a-z]{2}){2,}/g)[0];
    const oneDay = reduced.match(/((,)\s[A-Z][a-z]{2})|^[A-Z][a-z]{2}(,)/g)[0];
    
    return truncateDays(many).concat(oneDay);
  }

  return truncateDays(reduced);

}

module.exports = {
  populateRestaurant,
  getFormattedDays
}