import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { BaseCopilotComponent } from '@microsoft/sp-copilot-component';
import ExpertFinder from './components/ExpertFinder';
import type { IExpertFinderProps } from './components/IExpertFinderProps';
import { propertiesSchema, type IExpertFinderCopilotComponentProperties } from './ExpertFinderCopilotComponentProperties';
import type { IExpertService } from './services/IExpertService';
import { createExpertService } from './services/createExpertService';
import { normalizeSkill } from './utils/skills';

export default class ExpertFinderCopilotComponent extends BaseCopilotComponent<IExpertFinderCopilotComponentProperties> {
  private _root: Root | undefined;
  private _service: IExpertService | undefined;
  private _isDemo: boolean = false;
  private _configurationError: string | undefined;

  protected async onInit(): Promise<void> {
    try {
      const selection = await createExpertService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);
      this._service = selection.service;
      this._isDemo = selection.isDemo;
    } catch (error) {
      this._configurationError = error instanceof Error ? error.message : 'The expert data source could not be selected.';
    }
  }

  private _requestFullscreen = async (): Promise<void> => {
    const result = await this.requestDisplayModeAsync('fullscreen');
    if (result.mode !== 'fullscreen') throw new Error('Fullscreen is not available in this host.');
  };

  private _openLink = async (url: string): Promise<void> => {
    const result = await this.context.copilotBridge.openLinkAsync(url);
    if (result.isError) throw new Error('The host could not open this link.');
  };

  protected render(): void {
    const input = propertiesSchema.safeParse(this.properties);
    const skill = input.success ? normalizeSkill(input.data.skill) : undefined;
    const props: IExpertFinderProps = {
      skill,
      inputError: skill ? undefined : 'Ask Copilot to find an expert in SPFx, Copilot, DB or Spanish.',
      service: this._service,
      isDemo: this._isDemo,
      configurationError: this._configurationError,
      hostContext: this.hostContext,
      targetDocument: this.context.domElement.ownerDocument,
      onRequestFullscreen: this._requestFullscreen,
      onOpenLink: this._openLink
    };
    if (!this._root) this._root = createRoot(this.context.domElement);
    this._root.render(React.createElement(ExpertFinder, props));
  }

  protected onTeardown(): Promise<void> {
    this._root?.unmount();
    this._root = undefined;
    return Promise.resolve();
  }
}
