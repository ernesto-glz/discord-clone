import { patterns } from '../../shared/patterns';
import { generateSnowflake } from '../snowflake';

describe('Snowflake tests', () => {
  const snowflake = generateSnowflake();

  test('Should have a length of 18', () => {
    expect(patterns.snowflake.test(snowflake)).toEqual(true);
  });
});
