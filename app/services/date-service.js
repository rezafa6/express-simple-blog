const moment = require('jalali-moment');

exports.convertDateToFormat = (date , format) => {
// Convert the date to Jalali date
const jalaliDate = moment(date).locale('fa');
return jalaliDate.format(format);
}