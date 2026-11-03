import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import type { Expert } from '../models/Expert';

export function ExpertAvatar({ expert, size = 48 }: { expert: Expert; size?: 48 | 72 }): React.ReactElement {
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [expert.photoUrl]);
  return <Avatar name={expert.displayName} size={size} color="brand" aria-hidden="true"
    image={expert.photoUrl && !failed ? { src: expert.photoUrl, onError: () => setFailed(true), alt: '' } : undefined} />;
}
