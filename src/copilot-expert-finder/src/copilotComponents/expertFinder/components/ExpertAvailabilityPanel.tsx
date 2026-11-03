import * as React from 'react';
import { Button, Spinner, Tooltip, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { ArrowClockwise16Regular } from '@fluentui/react-icons';
import type { Expert } from '../models/Expert';
import type { AvailabilityStatus, ExpertAvailability } from '../models/ExpertAvailability';
import type { GraphAvailabilityService } from '../services/GraphAvailabilityService';

const statusLabels: Record<AvailabilityStatus, { label: string; marker: string }> = {
  free: { label: 'Free', marker: 'F' }, tentative: { label: 'Tentative', marker: 'T' },
  busy: { label: 'Busy', marker: 'B' }, outOfOffice: { label: 'Out of Office', marker: 'O' }
};

const useStyles = makeStyles({
  root: { borderTop: `1px solid ${tokens.colorNeutralStroke2}`, paddingTop: '16px', minWidth: 0 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' },
  heading: { margin: 0, fontSize: '14px', fontWeight: 600 },
  hint: { margin: '4px 0 12px', fontSize: '12px', lineHeight: '18px', color: tokens.colorNeutralForeground2, overflowWrap: 'anywhere' },
  timeline: { display: 'grid', gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gap: '2px', listStyleType: 'none', margin: '12px 0 4px', padding: 0 },
  slot: { display: 'grid', placeItems: 'center', height: '28px', minWidth: 0, borderRadius: '3px', fontSize: '10px', fontWeight: 600,
    ':focus-visible': { outline: `2px solid ${tokens.colorNeutralForeground1}`, outlineOffset: '2px' } },
  free: { backgroundColor: tokens.colorPaletteGreenBackground1, color: tokens.colorPaletteGreenForeground1 },
  tentative: { backgroundColor: tokens.colorPaletteYellowBackground1, color: tokens.colorPaletteYellowForeground1 },
  busy: { backgroundColor: tokens.colorBrandBackground2, color: tokens.colorBrandForeground1 },
  outOfOffice: { backgroundColor: tokens.colorPaletteRedBackground1, color: tokens.colorPaletteRedForeground1 },
  current: { outline: `2px solid ${tokens.colorNeutralForeground1}`, outlineOffset: '2px' },
  axis: { display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: tokens.colorNeutralForeground2 },
  legend: { display: 'flex', gap: '6px 10px', flexWrap: 'wrap', marginTop: '12px', fontSize: '11px', color: tokens.colorNeutralForeground2 },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: '4px' },
  marker: { display: 'inline-grid', placeItems: 'center', width: '16px', height: '16px', borderRadius: '3px', fontSize: '10px', fontWeight: 600 }
});

type PanelState = { email?: string } & (
  { status: 'loading' } | { status: 'ready'; availability: ExpertAvailability } | { status: 'error'; message: string }
);

export function ExpertAvailabilityPanel({ id, expert, service, isDemo }: {
  id: string; expert: Expert; service?: GraphAvailabilityService; isDemo: boolean;
}): React.ReactElement {
  const styles = useStyles();
  const [state, setState] = React.useState<PanelState>({ status: 'loading' });
  const [refresh, setRefresh] = React.useState(0);
  const [now, setNow] = React.useState(() => new Date());
  const unavailable = isDemo ? 'Calendar availability is not available for fictional demo profiles.'
    : !expert.email ? 'Availability unavailable: no email address.'
    : !service ? 'Calendar availability is not configured.' : undefined;

  React.useEffect(() => {
    if (unavailable || !service || !expert.email) return;
    let active = true;
    const email = expert.email;
    setState({ email, status: 'loading' });
    service.getAvailability(email).then(availability => {
      if (active) { setNow(new Date()); setState({ email, status: 'ready', availability }); }
    }).catch((error: unknown) => {
      if (active) setState({ email, status: 'error', message: error instanceof Error ? error.message : 'Unable to retrieve calendar availability. Please try again.' });
    });
    return () => { active = false; };
  }, [expert.email, service, unavailable, refresh]);

  const matches = state.email === expert.email;
  const loading = !unavailable && (!matches || state.status === 'loading');
  const availability = matches && state.status === 'ready' ? state.availability : undefined;
  const error = unavailable || (matches && state.status === 'error' ? state.message : undefined);

  React.useEffect(() => {
    if (!availability) return;
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, [availability]);

  const zone = availability?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = availability?.date || now;
  const dateOptions: Intl.DateTimeFormatOptions = { timeZone: zone, month: 'short', day: 'numeric', year: 'numeric' };
  const dateLabel = date.toLocaleDateString('en-US', dateOptions) === now.toLocaleDateString('en-US', dateOptions)
    ? 'Today' : date.toLocaleDateString('en-US', dateOptions);
  const timeFormat = new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit' });

  return <section id={id} className={styles.root} aria-label={`Calendar availability for ${expert.displayName}`} aria-busy={loading}>
    <div className={styles.header}>
      <h3 className={styles.heading}>Availability</h3>
      {!unavailable && <Button appearance="subtle" size="small" icon={<ArrowClockwise16Regular />} disabled={loading}
        aria-label={`${error ? 'Try again' : 'Refresh'} availability for ${expert.displayName}`}
        onClick={() => { setState({ email: expert.email, status: 'loading' }); setNow(new Date()); setRefresh(value => value + 1); }}>
        {error ? 'Try again' : 'Refresh'}
      </Button>}
    </div>
    <p className={styles.hint}>{dateLabel} · 09:00–18:00 · {zone}</p>
    {loading ? <Spinner size="tiny" label="Checking availability…" />
      : error ? <p className={styles.hint} role={unavailable ? 'status' : 'alert'}>{error}</p>
      : availability && <>
        <ol className={styles.timeline} aria-label="30-minute calendar availability slots">
          {availability.slots.map(slot => {
            const status = statusLabels[slot.status];
            const current = slot.start.getTime() <= now.getTime() && now.getTime() < slot.end.getTime();
            const label = `${timeFormat.format(slot.start)}–${timeFormat.format(slot.end)}: ${status.label}${current ? '. Current time slot' : ''}`;
            return <Tooltip key={slot.start.getTime()} content={label} relationship="description">
              <li className={mergeClasses(styles.slot, styles[slot.status], current && styles.current)}
                tabIndex={0} aria-label={label} aria-current={current ? 'time' : undefined}>{status.marker}</li>
            </Tooltip>;
          })}
        </ol>
        <div className={styles.axis} aria-hidden="true"><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></div>
        <div className={styles.legend} aria-label="Calendar availability legend">
          {(Object.keys(statusLabels) as AvailabilityStatus[]).map(status => <span key={status} className={styles.legendItem}>
            <span className={mergeClasses(styles.marker, styles[status])} aria-hidden="true">{statusLabels[status].marker}</span>{statusLabels[status].label}
          </span>)}
        </div>
        <p className={styles.hint}>Calendar availability · 30-minute slots</p>
      </>}
  </section>;
}
