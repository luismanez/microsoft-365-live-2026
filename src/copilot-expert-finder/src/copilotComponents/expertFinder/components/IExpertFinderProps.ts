import type { ICopilotComponentHostContext } from '@microsoft/sp-copilot-component';
import type { ExpertSkill } from '../models/Expert';
import type { IExpertService } from '../services/IExpertService';
import type { GraphPhotoService } from '../services/GraphPhotoService';

export interface IExpertFinderProps {
  skill?: ExpertSkill;
  inputError?: string;
  configurationError?: string;
  service?: IExpertService;
  photoService?: GraphPhotoService;
  isDemo: boolean;
  hostContext: ICopilotComponentHostContext;
  targetDocument: Document;
  onRequestFullscreen: () => Promise<void>;
  onOpenLink: (url: string) => Promise<void>;
}
