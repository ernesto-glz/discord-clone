import cluster from 'cluster';

let inc = 0;
let lastSnowflake: string;
const discordEpoch = 1577836800000;

// https://discord.com/developers/docs/reference#snowflakes
// https://github.com/accord-dot-app/app/blob/v2-dev/backend/src/data/snowflake-entity.ts
export function generateSnowflake() {
  const pad = (num: number, by: number) => num.toString(2).padStart(by, '0');

  const msSince = pad(new Date().getTime() - discordEpoch, 42);
  const pid = pad(process.pid, 5).slice(0, 5);
  const wid = pad(cluster.worker?.id ?? 0, 5);
  const getInc = (add: number) => pad(inc + add, 12);

  let snowflake = `0b${msSince}${wid}${pid}${getInc(inc)}`;
  snowflake === lastSnowflake ? (snowflake = `0b${msSince}${wid}${pid}${getInc(++inc)}`) : (inc = 0);

  lastSnowflake = snowflake;
  return BigInt(snowflake).toString();
}

function binary64(val: string) {
  try {
    return `0b${BigInt(val).toString(2).padStart(64, '0')}`;
  } catch (e) {
    return '';
  }
}

export function snowflakeToDate(snowflake: string) {
  const snowFlakePattern = /^\d{18}$/;
  if (!snowFlakePattern.test(snowflake)) throw new TypeError('Invalid snowflake provided');
  const sinceEpochMs = Number(binary64(snowflake).slice(0, 42 + 2));
  return new Date(sinceEpochMs + discordEpoch);
}