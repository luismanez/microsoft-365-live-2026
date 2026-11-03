export type ExpertSkill = 'SPFx' | 'Copilot' | 'DB' | 'Spanish';

export interface Expert {
  readonly id: string;
  readonly displayName: string;
  readonly jobTitle: string;
  readonly skill: ExpertSkill;
  readonly shortCV: string;
  readonly department: string;
  readonly userPrincipalName?: string;
  readonly photoUrl?: string;
}
