import * as React from 'react';
import { Card, makeStyles, tokens } from '@fluentui/react-components';
import { PeopleTeam20Regular } from '@fluentui/react-icons';
import type { Expert } from '../models/Expert';
import { ExpertAvatar } from './ExpertAvatar';
import { ExpertActions } from './ExpertActions';

const useStyles = makeStyles({
  card: { padding: '24px', borderRadius: '16px', border: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow4, backgroundColor: tokens.colorNeutralBackground1, minWidth: 0, gap: '20px' },
  person: { display: 'flex', alignItems: 'center', gap: '16px' },
  details: { minWidth: 0, overflowWrap: 'anywhere' },
  name: { margin: 0, fontSize: '18px', lineHeight: '24px', fontWeight: 600 },
  role: { margin: '4px 0 0', color: tokens.colorNeutralForeground2, lineHeight: '20px' },
  summary: { margin: 0, color: tokens.colorNeutralForeground2, lineHeight: '22px', overflowWrap: 'anywhere' },
  department: { display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '16px', marginTop: 'auto',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`, color: tokens.colorNeutralForeground2, fontSize: '13px' }
});

export function ExpertCard({ expert, isDemo, onOpenLink }: {
  expert: Expert; isDemo: boolean; onOpenLink: (url: string) => Promise<void>;
}): React.ReactElement {
  const styles = useStyles();
  return <Card className={styles.card}>
    <div className={styles.person}>
      <ExpertAvatar expert={expert} size={72} />
      <div className={styles.details}><h2 className={styles.name}>{expert.displayName}</h2><p className={styles.role}>{expert.jobTitle}</p></div>
    </div>
    <p className={styles.summary}>{expert.shortCV || 'No professional summary provided.'}</p>
    <div className={styles.department}><PeopleTeam20Regular aria-hidden="true" />{expert.department || 'Department not specified'}</div>
    <ExpertActions expert={expert} isDemo={isDemo} onOpenLink={onOpenLink} />
  </Card>;
}
