export const round = (n, prec) =>
    Math.round(n * (10 ** (prec ?? 0))) / (10 ** (prec ?? 0));

export const formatPerc = (n, prec) =>
    round(100 * n, prec) + '%';

export const asID = s =>
    s.replace(/ /g, '_').replace(/[^_a-zA-Z]/g, '');
