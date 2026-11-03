# Expert Finder demo checklist

Local source and documentation implementation is complete; external acceptance remains pending. Checked tasks have local evidence below. Tasks needing real Workbench, tenant or dialog interaction remain unchecked until that acceptance is verified; their code can already be implemented. No automated test suites are being added.

## Skill scoped mock data

- [x] **DAT-01** — [Define skill and domain contracts](../expert-data/tasks.md#dat-01)
- [x] **DAT-02** — [Implement the mock service](../expert-data/tasks.md#dat-02)
- [x] **DAT-03** — [Bundle demo portraits](../expert-data/tasks.md#dat-03)

## Contact actions

- [ ] **ACT-01** — [Implement honest contact actions](../contact-actions/tasks.md#act-01)

## Inline experience and host shell

- [ ] **INL-01** — [Connect skill input to the inline view](../inline-experience/tasks.md#inl-01)
- [ ] **INL-02** — [Polish inline states and lifetime](../inline-experience/tasks.md#inl-02)

## Fullscreen exploration

- [ ] **FUL-01** — [Add local filter controls](../fullscreen-experience/tasks.md#ful-01)
- [ ] **FUL-02** — [Compose and polish fullscreen cards](../fullscreen-experience/tasks.md#ful-02)

## Copilot tool and agent integration

- [x] **COP-01** — [Describe the tool and agent behavior](../copilot-integration/tasks.md#cop-01)
- [ ] **COP-02** — [Add starters and invocation examples](../copilot-integration/tasks.md#cop-02)

## SharePoint expert data

- [x] **SP-01** — [Document list setup and sample data](../sharepoint-integration/tasks.md#sp-01)
- [ ] **SP-02** — [Implement filtered REST retrieval](../sharepoint-integration/tasks.md#sp-02)
- [ ] **SP-03** — [Select data source from root list availability](../sharepoint-integration/tasks.md#sp-03)

## Package and conference runbook

- [x] **DEM-01** — [Build and document installation](../demo-readiness/tasks.md#dem-01)
- [ ] **DEM-02** — [Write and rehearse the demo](../demo-readiness/tasks.md#dem-02)

## Final practical checks

- [x] Production build passes and the sppkg/agent ZIP include the required local assets.
- [ ] Workbench accepts skill arguments; inline shows at most three people and the correct total.
- [ ] Fullscreen, both themes, narrow/wide layouts and keyboard/dialog focus are usable.
- [ ] Name prefix, Department, Role and Clear filters work without another data read; mode changes preserve state.
- [ ] Many/one/zero results, loading/error/retry and image fallback are understandable.
- [ ] Root availability selects SharePoint on 200, mocks on 404, and errors on 403/network failures; existing empty lists stay empty and host/filter changes do not repeat the check.
- [ ] Live SharePoint requests are Skill-filtered and obey the actual user's permissions; identity/photos behave correctly.
- [ ] Natural Copilot prompts select the correct tool/skill; unsupported requests do not invent results.
- [ ] Live Teams navigation works for a verified user; mock contacts and Schedule remain clearly simulated.
- [ ] The conference script and discovery fallback have been rehearsed in the available environment.

## Actual results and blockers

2026-11-03:

- DAT-01/DAT-02: implemented the typed skill registry, runtime normalization, provider contract and fictional mock records. TypeScript/lint build passed. Source/fixture review confirms SPFx 6, Copilot 8, DB 1, Spanish 0. Some of the eight fictional people have records for multiple skills; no duplicate person exists within a skill result set.
- DAT-03: generated and visually inspected eight fictional adult headshots. Local copies and provenance are in the app assets folder; the intermediate production package included all eight portrait files. No external image host is used.
- ACT-01, INL-01/02, FUL-01/02: source implemented, including contact/Schedule dialogs, invalid/loading/empty/error/retry states, persistent root/filter state, local filtering and theme/mode adaptation. The complete source passes TypeScript/lint/webpack. Actual host layout, keyboard/dialog behavior and request-count observation remain pending.
- COP-01: descriptions and instructions updated; the generated agent package uses dynamic discovery and preserves identities. COP-02 starters and invocation guide are written; natural selection is not yet verified in Copilot.
- SP-01: list instructions and 15 fictional sample rows are written; Person placeholders require actual authorized tenant users. No tenant provisioning or seeding was performed.
- SP-02/SP-03: the delegated skill-filtered provider now uses automatic root-list selection. Manual source/site settings have been removed. HTTP 404 is the only mock selection condition, and service/isDemo are returned together. Actual tenant 200/404/403 responses, permissions, Person projections, photo access and Teams navigation remain pending.
- DEM-01: final npm run build exited 0 without lint warnings or TypeScript errors. Package/agent ZIP CRC integrity checks passed; the sppkg embeds the generated agent and all eight local portraits. Package size: 16.57 MiB. The compiled Draft 7 schema has exactly one required skill and no message argument. Four starters are packaged. The generated Teams version is 1.0.0.1; component/solution identities are unchanged.
- Local HTTPS: npm start -- --nobrowser compiled successfully outside the restricted sandbox; curl returned HTTP 200 for /temp/build/manifests.js. No browser was opened. The temporary server was stopped after inspection.
- DEM-02: installation/runbook/fallback documents are complete; actual host rehearsal remains pending. This task remains unchecked until the available environment has been rehearsed.
- Computer Use could not obtain permission to control the browser. After explaining its purpose, the implementation continued without it; visual/tenant checks are explicitly pending for the user. No real chat, meeting, tenant change, upload or sync has occurred.
- Existing build tooling was retained. No unit tests, automated integration suites, test libraries, coverage rules, CI or new dependencies were added.

### Automatic root-list selection update (2026-11-03)

The user approved the demo convention: Experts is in the tenant root. Selection runs once in onInit; root is derived from the context URL origin, including Workbench opened on another site. A present but empty list, zero matching items, or later item-read failure never activates mocks. Verification: npm run build exited 0 with no TypeScript/lint errors or warnings. The regenerated sppkg passed archive integrity inspection and includes the eight portraits and agent ZIP. Manual 200/404/403 availability checks and empty-list/host behavior remain unverified in the tenant. No tests, dependencies, browser automation or tenant writes are added.
