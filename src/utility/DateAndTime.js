import moment from "moment";

class DateTimeMethods {
    constructor(props) { }

    getUnixWithZeroTime = (value) => {
        let momentFormattedDate = moment(value).format("YYYY-MM-DDT00:00:00Z");
        let utcDate = moment(momentFormattedDate).utc();
        let unixUtcDate = moment(utcDate).unix();

        return unixUtcDate;
    };

    getUnixWithActualTime = (value) => {
        let momentFormattedDate = moment(value).format("YYYY-MM-DDTHH:mm:ssZ");
        let utcDate = moment(momentFormattedDate).utc();
        let unixUtcDate = moment(utcDate).unix();

        return unixUtcDate;
    };

    getFormattedDate = (unixTimeStamp) => {
        return moment.unix(unixTimeStamp).format("ddd. MMM D, YYYY");
    };

    getFormattedTime = (unixTimeStamp) => {
        return moment.unix(unixTimeStamp).format("hh:mm A");
    };

    getFormattedTimeWith24Hours = (unixTimeStamp) => {
        return moment.unix(unixTimeStamp).format("HH:mm");
    };

    getDurationFromSeconds = (seconds) => {
        let date = new Date();
        date.setMinutes(0);
        date.setHours(0);
        date.setSeconds(seconds);
        return `${moment(date).format(`${date.getHours() > 0 ? "HH:" : ""}mm:ss`)}`;
    };
    formatDateForDatePicker = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        return formattedDate.replace(/\//g, '-');
    };
}

const DateAndTime = new DateTimeMethods();

export default DateAndTime;