import * as React from 'react';
import {
  Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent,
  DialogActions, makeStyles, tokens
} from '@fluentui/react-components';
import { Chat20Regular, CalendarLtr20Regular } from '@fluentui/react-icons';
import type { Expert } from '../models/Expert';
import { getTeamsChatUrl } from '../utils/expertLinks';

const useStyles = makeStyles({
  actions: { display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalS },
  compact: { minWidth: '36px', minHeight: '36px' }
});

interface ExpertActionsProps {
  expert: Expert;
  isDemo: boolean;
  compact?: boolean;
  onOpenLink: (url: string) => Promise<void>;
}

export function ExpertActions({ expert, isDemo, compact, onOpenLink }: ExpertActionsProps): React.ReactElement {
  const styles = useStyles();
  const [dialog, setDialog] = React.useState<'contact' | 'schedule' | 'error'>();
  const [opening, setOpening] = React.useState(false);
  const lastTrigger = React.useRef<HTMLButtonElement | null>(null);
  const close = (): void => {
    setDialog(undefined);
    window.setTimeout(() => lastTrigger.current?.focus(), 0);
  };
  const url = getTeamsChatUrl(expert.userPrincipalName);
  const unavailable = !isDemo && !url;

  const contact = async (): Promise<void> => {
    if (isDemo) { setDialog('contact'); return; }
    if (!url) return;
    setOpening(true);
    try { await onOpenLink(url); } catch { setDialog('error'); }
    finally { setOpening(false); }
  };

  const title = dialog === 'schedule' ? 'Schedule preview' : dialog === 'error' ? 'Unable to open Teams' : 'Demo contact';
  return (
    <div className={styles.actions}>
      <Button className={compact ? styles.compact : undefined} appearance={compact ? 'outline' : 'primary'}
        icon={<Chat20Regular />} disabled={unavailable || opening}
        aria-label={unavailable ? `Teams contact unavailable for ${expert.displayName}: identity has not been resolved` : `Chat in Teams with ${expert.displayName}`}
        title={unavailable ? 'A verified Teams user identity is not available for this expert.' : `Chat in Teams with ${expert.displayName}`}
        onClick={event => { lastTrigger.current = event.currentTarget; return contact(); }}>
        {compact ? undefined : opening ? 'Opening Teams…' : 'Chat in Teams'}
      </Button>
      {!compact && <Button appearance="outline" icon={<CalendarLtr20Regular />} onClick={event => { lastTrigger.current = event.currentTarget; setDialog('schedule'); }}>Schedule</Button>}
      {unavailable && !compact && <small>Teams identity unavailable</small>}
      <Dialog open={dialog !== undefined} onOpenChange={(_, data) => { if (!data.open) close(); }}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              {dialog === 'contact' && <p>{expert.displayName} is a fictional demo profile. No Teams chat has been opened.</p>}
              {dialog === 'schedule' && <p>This demonstrates scheduling with {expert.displayName}. No meeting has been created and no invitation has been sent.</p>}
              {dialog === 'error' && <p>The host could not open the Teams link. Please try again or open Teams directly.</p>}
            </DialogContent>
            <DialogActions><Button appearance="primary" onClick={close}>Close</Button></DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
