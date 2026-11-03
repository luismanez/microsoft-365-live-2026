# Expert Finder demo checklist

Planning only: all implementation tasks start unchecked. Use feature task definitions for acceptance and dependencies. Update this file with actual build/manual outcomes while implementing; do not add a separate reporting system.

## Skill scoped mock data

- [ ] **DAT-01** — [Define skill and domain contracts](../expert-data/tasks.md#dat-01)
- [ ] **DAT-02** — [Implement the mock service](../expert-data/tasks.md#dat-02)
- [ ] **DAT-03** — [Bundle demo portraits](../expert-data/tasks.md#dat-03)

## Contact actions

- [ ] **ACT-01** — [Implement honest contact actions](../contact-actions/tasks.md#act-01)

## Inline experience and host shell

- [ ] **INL-01** — [Connect skill input to the inline view](../inline-experience/tasks.md#inl-01)
- [ ] **INL-02** — [Polish inline states and lifetime](../inline-experience/tasks.md#inl-02)

## Fullscreen exploration

- [ ] **FUL-01** — [Add local filter controls](../fullscreen-experience/tasks.md#ful-01)
- [ ] **FUL-02** — [Compose and polish fullscreen cards](../fullscreen-experience/tasks.md#ful-02)

## Copilot tool and agent integration

- [ ] **COP-01** — [Describe the tool and agent behavior](../copilot-integration/tasks.md#cop-01)
- [ ] **COP-02** — [Add starters and invocation examples](../copilot-integration/tasks.md#cop-02)

## SharePoint expert data

- [ ] **SP-01** — [Document list setup and sample data](../sharepoint-integration/tasks.md#sp-01)
- [ ] **SP-02** — [Implement filtered REST retrieval](../sharepoint-integration/tasks.md#sp-02)
- [ ] **SP-03** — [Wire explicit data source selection](../sharepoint-integration/tasks.md#sp-03)

## Package and conference runbook

- [ ] **DEM-01** — [Build and document installation](../demo-readiness/tasks.md#dem-01)
- [ ] **DEM-02** — [Write and rehearse the demo](../demo-readiness/tasks.md#dem-02)

## Final practical checks

- [ ] Production build passes and the sppkg/agent ZIP include the required local assets.
- [ ] Workbench accepts skill arguments; inline shows at most three people and the correct total.
- [ ] Fullscreen, both themes, narrow/wide layouts and keyboard/dialog focus are usable.
- [ ] Name prefix, Department, Role and Clear filters work without another data read; mode changes preserve state.
- [ ] Many/one/zero results, loading/error/retry and image fallback are understandable.
- [ ] Live SharePoint requests are Skill-filtered and obey the actual user's permissions; identity/photos behave correctly.
- [ ] Natural Copilot prompts select the correct tool/skill; unsupported requests do not invent results.
- [ ] Live Teams navigation works for a verified user; mock contacts and Schedule remain clearly simulated.
- [ ] The conference script and discovery fallback have been rehearsed in the available environment.

## Actual results and blockers

No implementation checks have been run for this plan. The prior starter upgrade/build is not evidence for these features.

Append short entries: task/check, command or manual scenario, observed outcome, and any missing prerequisite. Keep live checks open when browser, tenant/site, mapped users, permissions, deployment or propagation are unavailable. Do not include secrets or unnecessary personal data.
