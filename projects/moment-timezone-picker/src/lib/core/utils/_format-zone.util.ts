import {TZone} from '../types';
import * as momentZone from 'moment-timezone';

/**
 * Make TZone object from simple string.
 */
export const formatZone = (zone: string): TZone => {
  const foundZone = momentZone.tz(zone);
  const utc: string = foundZone.format('Z');
  const abbr: string = foundZone.zoneAbbr();
  return {
    name: `${zone} (${utc})`,
    nameValue: zone,
    timeValue: utc,
    group: zone.split('/', 1)[0],
    abbr: abbr
  };
};
