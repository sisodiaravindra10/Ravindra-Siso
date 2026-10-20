// Real sun arithmetic for Jodhpur (the standard sunrise equation, good to a minute or two).
const RAD = Math.PI / 180;
const J2000 = 2451545.0;
const toJulian = (d: Date) => d.getTime() / 86400000 - 0.5 + 2440587.5;
const fromJulian = (j: number) => new Date((j - 2440587.5) * 86400000);

export type SunTimes = { rise: Date; set: Date; noon: Date; dec: number };

export function sunTimes(date: Date, lat: number, lon: number): SunTimes {
  const n = Math.round(toJulian(date) - J2000 - lon / 360);
  const jStar = n - lon / 360;
  const M = ((357.5291 + 0.98560028 * jStar) % 360 + 360) % 360;
  const C = 1.9148 * Math.sin(M * RAD) + 0.02 * Math.sin(2 * M * RAD) + 0.0003 * Math.sin(3 * M * RAD);
  const L = (M + C + 180 + 102.9372) % 360;
  const jTransit = J2000 + jStar + 0.0053 * Math.sin(M * RAD) - 0.0069 * Math.sin(2 * L * RAD);
  const dec = Math.asin(Math.sin(L * RAD) * Math.sin(23.4397 * RAD));
  const cosW = (Math.sin(-0.833 * RAD) - Math.sin(lat * RAD) * Math.sin(dec)) / (Math.cos(lat * RAD) * Math.cos(dec));
  const w = Math.acos(Math.max(-1, Math.min(1, cosW))) / RAD;
  return { rise: fromJulian(jTransit - w / 360), set: fromJulian(jTransit + w / 360), noon: fromJulian(jTransit), dec };
}

/** Altitude in degrees right now (negative below the horizon). */
export function altitude(date: Date, lat: number, lon: number) {
  const t = sunTimes(date, lat, lon);
  const H = ((date.getTime() - t.noon.getTime()) / 3600000) * 15 * RAD;
  const a = Math.asin(Math.sin(lat * RAD) * Math.sin(t.dec) + Math.cos(lat * RAD) * Math.cos(t.dec) * Math.cos(H));
  return a / RAD;
}

export function fmtTime(d: Date, tz: string) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
}

/** "07:12" for a fraction of the site's day (0 = 06:30, 1 = 18:50). */
export function clockFor(p: number) {
  const minutes = Math.round((6.5 + 12.33 * Math.max(0, Math.min(1, p))) * 60);
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
