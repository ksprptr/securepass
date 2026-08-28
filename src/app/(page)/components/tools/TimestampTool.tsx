'use client';

import { TIMESTAMP_UNITS, TimestampUnit } from '../../enums/tools.enums';
import {
  formatDateTime,
  formatRelative,
  fromDateTimeLocal,
  getLocalTimeZone,
  parseTimestamp,
  toDateTimeLocal,
} from '../../helpers/time.helpers';
import { SelectOption } from '../../types/tools.types';
import ActionButton from '../shared/ActionButton';
import Callout from '../shared/Callout';
import Field, { inputClassName, monoInputClassName } from '../shared/Field';
import OutputField from '../shared/OutputField';
import SegmentedControl from '../shared/SegmentedControl';
import ToolCard from '../shared/ToolCard';
import { useEffect, useState } from 'react';

const UNIT_OPTIONS: SelectOption<TimestampUnit>[] = [
  { value: TIMESTAMP_UNITS.SECONDS, label: 'Seconds' },
  { value: TIMESTAMP_UNITS.MILLISECONDS, label: 'Milliseconds' },
];

/**
 * Function to render the timestamp of a date in the selected unit
 **/
const toTimestamp = (date: Date, unit: TimestampUnit): string =>
  String(unit === TIMESTAMP_UNITS.SECONDS ? Math.floor(date.getTime() / 1000) : date.getTime());

/**
 * Component representing the Unix timestamp converter
 **/
export default function TimestampTool() {
  const [unit, setUnit] = useState<TimestampUnit>(TIMESTAMP_UNITS.SECONDS);
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [timeZone, setTimeZone] = useState('');

  // Seeded after mount: "now" differs between the server render and the browser.
  /* eslint-disable react-hooks/set-state-in-effect -- one mount-time read of the client clock */
  useEffect(() => {
    const now = new Date();

    setTimeZone(getLocalTimeZone());
    setTimestamp(toTimestamp(now, TIMESTAMP_UNITS.SECONDS));
    setDateTime(toDateTimeLocal(now));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const parsed = parseTimestamp(timestamp, unit);
  const date = fromDateTimeLocal(dateTime);
  const digits = timestamp.trim().replace('-', '').length;
  const looksLikeMilliseconds = unit === TIMESTAMP_UNITS.SECONDS && digits >= 12;

  const changeUnit = (next: TimestampUnit) => {
    setUnit(next);

    // Keep the same instant on screen instead of reinterpreting the digits as another unit.
    if (parsed) setTimestamp(toTimestamp(parsed, next));
  };

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <ToolCard>
        <div className='space-y-1.5 text-left'>
          <span className='block text-sm font-medium text-zinc-600 dark:text-zinc-400'>Unit</span>
          <SegmentedControl options={UNIT_OPTIONS} value={unit} onChange={changeUnit} />
        </div>

        <Field label='Unix timestamp'>
          <input
            type='text'
            inputMode='numeric'
            value={timestamp}
            onChange={(event) => setTimestamp(event.target.value)}
            placeholder='1700000000'
            spellCheck={false}
            className={monoInputClassName}
          />
        </Field>

        {timestamp.trim() && !parsed && (
          <Callout tone='warning'>
            A Unix timestamp is a whole number of {unit.toLowerCase()}.
          </Callout>
        )}

        {looksLikeMilliseconds && parsed && (
          <Callout tone='info'>
            {digits} digits — that is usually milliseconds. Switch the unit to read it as
            milliseconds instead.
          </Callout>
        )}

        <OutputField
          label='UTC'
          value={parsed ? `${formatDateTime(parsed, 'UTC')} UTC` : ''}
          placeholder='Waiting for a timestamp'
        />

        <OutputField
          label={timeZone ? `Local · ${timeZone}` : 'Local'}
          value={parsed ? formatDateTime(parsed) : ''}
          placeholder='Waiting for a timestamp'
          hint={parsed ? formatRelative(parsed) : null}
        />

        <OutputField
          label='ISO 8601'
          value={parsed ? parsed.toISOString() : ''}
          placeholder='Waiting for a timestamp'
        />

        <ActionButton
          onClick={() => setTimestamp(toTimestamp(new Date(), unit))}
          icon='Clock'
          variant='secondary'>
          Use current time
        </ActionButton>
      </ToolCard>

      <ToolCard from='bottom' delay={0.08}>
        <Field label='Date and time' hint='Entered in your local time zone.'>
          <input
            type='datetime-local'
            step={1}
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
            className={inputClassName}
          />
        </Field>

        <OutputField
          label='Unix timestamp (seconds)'
          value={date ? toTimestamp(date, TIMESTAMP_UNITS.SECONDS) : ''}
          placeholder='Waiting for a date'
        />

        <OutputField
          label='Unix timestamp (milliseconds)'
          value={date ? toTimestamp(date, TIMESTAMP_UNITS.MILLISECONDS) : ''}
          placeholder='Waiting for a date'
        />

        <OutputField
          label='UTC'
          value={date ? `${formatDateTime(date, 'UTC')} UTC` : ''}
          placeholder='Waiting for a date'
          hint={date ? formatRelative(date) : null}
        />

        <ActionButton
          onClick={() => setDateTime(toDateTimeLocal(new Date()))}
          icon='Clock'
          variant='secondary'>
          Use current time
        </ActionButton>
      </ToolCard>
    </div>
  );
}
