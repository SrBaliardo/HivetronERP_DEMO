export function parseColumnWidth(width) {
  if (Number.isFinite(width) && width > 0) return { min: width, fraction: 0 };
  if (typeof width !== 'string') return null;
  const match =
    /^minmax\(\s*(\d+(?:\.\d+)?)px\s*,\s*(\d+(?:\.\d+)?)fr\s*\)$/.exec(
      width.trim(),
    );
  if (!match) return null;
  const min = Number(match[1]);
  const fraction = Number(match[2]);
  return Number.isFinite(min) &&
    min >= 0 &&
    Number.isFinite(fraction) &&
    fraction > 0
    ? { min, fraction }
    : null;
}

export function distributeColumnWidths(tracks, availableWidth, actionWidth) {
  const widths = tracks.map((track) => track.min);
  const minimum = widths.reduce((total, width) => total + width, actionWidth);
  const tableWidth = Math.max(minimum, availableWidth);
  let remaining = tableWidth - actionWidth;
  let flexible = [];
  tracks.forEach((track, index) => {
    if (track.fraction) flexible.push(index);
    else remaining -= track.min;
  });
  if (!flexible.length && tracks.length) {
    widths[widths.length - 1] += tableWidth - minimum;
    return { widths, tableWidth };
  }
  while (flexible.length) {
    const fractions = flexible.reduce(
      (total, index) => total + tracks[index].fraction,
      0,
    );
    const unit = remaining / fractions;
    const constrained = flexible.filter(
      (index) => tracks[index].min > unit * tracks[index].fraction,
    );
    if (!constrained.length) {
      flexible.forEach((index) => {
        widths[index] = unit * tracks[index].fraction;
      });
      break;
    }
    constrained.forEach((index) => {
      remaining -= tracks[index].min;
    });
    flexible = flexible.filter((index) => !constrained.includes(index));
  }
  return { widths, tableWidth };
}
