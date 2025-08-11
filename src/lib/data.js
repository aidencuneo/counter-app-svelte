import { today, dateToStr } from './dates';

export function parseJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {}
}

export function saveCounters(counters) {
    localStorage.setItem('counter_counters', JSON.stringify(counters));
}

export function getCounters() {
    // Transfer data if needed
    if (localStorage.getItem('counter_counters') && !localStorage.getItem('counter_values'))
        transferData();

    return parseJSON(localStorage.getItem('counter_counters') ?? '[]');
}

function transferData() {
    let IDValues = {};

    for (let i = 0; i < localStorage.length; ++i) {
        let k = localStorage.key(i);
        if (k.startsWith('counter_') && k.endsWith('_values') && k.length > 'counter_values'.length)
            IDValues[k.substring(8, k.length - 7)] = localStorage.getItem(k);
    }

    let counters = parseJSON(localStorage.getItem('counter_counters') ?? '[]');
    let values = {};

    for (let i = 0; i < counters.length; ++i)
        values[counters[i][0]] = parseJSON(IDValues[counters[i][0].toLowerCase()]);

    saveValues(values);
}

export function saveValues(values) {
    localStorage.setItem('counter_values', JSON.stringify(values));
}

export function getValues(ensure_counter) {
    let values = parseJSON(localStorage.getItem('counter_values') ?? '{}');

    if (ensure_counter && !values[ensure_counter])
        values[ensure_counter] = {};

    return values;
}

export function setCount(name, value, day) {
    day ??= today();

    let values = getValues(name);
    values[name][day] = value;

    // Clear blank values
    const keys = Object.keys(values[name]);

    for (let j = 0; j < keys.length; j++)
        if (!values[name][keys[j]])
            delete values[name][keys[j]];

    saveValues(values);
    return values[name][day] ?? 0;
}

export function getCount(name, day) {
    day ??= today();

    return getValues(name)[name][day] ?? 0;
}

export function gatherValues(name, from, to) {
    from = new Date(from ?? today());
    to = to ? new Date(to) : undefined;

    if (to > from)
        [from, to] = [to, from];

    let values = getValues(name)[name];
    let filtered = {};

    // Find earliest date
    let dates = Object.keys(values);
    dates.sort((a, b) => new Date(a) - new Date(b));
    console.log(dates);

    // Set to earliest date if one was not given
    if (!to)
        to = new Date(dates[0]);

    for (let date = from; date >= to; from.setDate(date.getDate() - 1)) {
        let dateStr = dateToStr(date);
        filtered[dateStr] = values[dateStr] ?? 0;
    }

    console.log(Object.keys(values).length, '->', Object.keys(filtered).length);

    // console.log(values);
    // console.log(filtered);

    return filtered;
}

export function getLastPage() {
    return localStorage.getItem('counter_page') ?? 'counter';
}

export function setLastPage(lastPage) {
    localStorage.setItem('counter_page', lastPage);
}

export function getStatsOptions() {
    let optionsStr = localStorage.getItem('counter_stats_options');

    if (optionsStr)
        return parseJSON(optionsStr);

    return [null, null];
}

export function setStatsOptions(options) {
    localStorage.setItem('counter_stats_options', JSON.stringify(options));
}

export function getCustomDates() {
    return parseJSON(localStorage.getItem('counter_custom_dates') || '[]');
}

export function setCustomDates(dates) {
    localStorage.setItem('counter_custom_dates', JSON.stringify(dates));
}

export function exportToJSON() {
    return JSON.stringify({
        counters: getCounters(),
        values: getValues(),
    });
}

export function importFromJSON(json) {
    const data = parseJSON(json);
    saveCounters(data.counters);
    saveValues(data.values);
}

export function clear() {
    for (let i = 0; i < localStorage.length; ++i)
        if (localStorage.key(i).startsWith('counter_'))
            localStorage.removeItem(localStorage.key(i--));
}
