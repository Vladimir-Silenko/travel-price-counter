const DateTime = luxon.DateTime;
function addLeadingZero(str) {
    let a = str.split('')
    if (a.length == 1) a.unshift('0')
    a = a.join('')
    return a
}
function departureTime(hours, minutes) {
    let dt = DateTime.fromISO(`${hours}:${minutes}:00`, { zone: 'Europe/Moscow' })
    dt = dt.toLocal()
    let h = dt.hour.toLocaleString()
    let m = addLeadingZero(dt.minute.toString())
    return `${h}:${m}`
}
const val = (hour, minute) => {
    let dt = DateTime.fromISO(`${hour}:${minute}:00`, { zone: 'Europe/Moscow' })
    return dt.toLocal()
}

