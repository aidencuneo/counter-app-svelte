export function today() {
    return dateToStr(new Date());
}

export function dateToStr(date) {
    let month = ('' + (date.getMonth() + 1)).padStart(2, '0');
    let datePadded = ('' + date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${datePadded}`;
}

export function addDays(str, days) {
    let date = new Date(str);
    date.setDate(date.getDate() + days);
    return dateToStr(date);
}

export function addMonths(str, months) {
    let date = new Date(str);
    date.setMonth(date.getMonth() + months);
    return dateToStr(date);
}

export function addYears(str, years) {
    let date = new Date(str);
    date.setFullYear(date.getFullYear() + years);
    return dateToStr(date);
}

export function getDaysInMonth(year, month) {
    return (
        year % 4 == 0
            ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    )[month - 1];
}

export function timeToNum(time) {
    let segments = time.split(':');

    if (segments.length == 3)
        return parseInt(segments[0]) * 60 + parseInt(segments[1]) + parseInt(segments[2]) / 60;
    else if (segments.length == 2)
        return parseInt(segments[0]) + parseInt(segments[1]) / 60;
}
