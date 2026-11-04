# Expert Finder demo checklist

The baseline and Graph photo source/documentation are implemented locally. Expert availability is also implemented locally; its host acceptance remains pending. External acceptance remains pending. Checked tasks have local evidence below. Tasks needing real Workbench, tenant or dialog interaction remain unchecked until that acceptance is verified; their code can already be implemented. No automated test suites are being added.

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

## Graph profile photos — host acceptance pending

- [x] **GP-01** — [Retrieve Graph photos with a small cached loader](plan.md#gp-01-retrieve-graph-photos)
- [ ] **GP-02** — [Show progressive avatars in the existing UI](plan.md#gp-02-show-progressive-avatars) — source implemented; host acceptance pending
- [ ] **GP-03** — [Build, check the demo and update current docs](plan.md#gp-03-build-and-check-the-demo) — build/docs complete; tenant checks pending

## Expert availability panel — host acceptance pending

- [x] **AV-01** — [Read one expert's free/busy](../expert-availability/tasks.md#av-01)
- [ ] **AV-02** — [Render the compact Availability panel](../expert-availability/tasks.md#av-02) — source implemented; host visual checks pending
- [ ] **AV-03** — [Connect selection in fullscreen cards](../expert-availability/tasks.md#av-03) — source/build complete; host lifecycle checks pending
- [ ] **AV-04** — [Prepare and validate the conference demonstration](../expert-availability/tasks.md#av-04) — build/docs complete; tenant rehearsal pending

## Confirmed Teams meetings — host acceptance pending

- [x] Implement and build the [confirmed Teams meeting flow](../expert-availability/spec.md#confirmed-teams-meetings), its guarded Graph service, UI and permission/demo notes.
- [ ] Verify real invitation delivery, Teams link, self/past/no-write cancellation, both-calendar conflicts, duplicate/uncertain outcomes and modal focus with controlled non-family accounts in Workbench/Copilot.

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

### Graph profile photo implementation (2026-11-03)

- GP-01: added GraphPhotoService using the installed SPFx MSGraphClientV3 and Graph v1.0 `/users/{UPN}/photo/$value`. Source review confirms one lazy client, per-UPN pending/success/unavailable caching, a five-second logical timeout, no Blob URL creation from stale responses, and URL disposal at teardown. The SharePoint provider no longer builds `userphoto.aspx` URLs. No dependencies or package permission requests were added; the existing compatible consent is reused.
- GP-02: the app renders SharePoint results independently and starts all photos for the small result set in parallel. Photo/image-loading state lives above inline/fullscreen, with circular 48/72 px Fluent Skeletons until image load and initials on failure. A separate five-second image-load limit prevents indefinite shimmer. Mock mode retains local portraits and creates no Graph loader. Compilation/lint passed; actual host visuals, mode/filter behavior and licensed/unlicensed user photos remain pending.
- GP-03: `npm run build` exited 0 with no TypeScript or lint warnings/errors. The generated sppkg and current agent ZIP passed archive integrity inspection; the packaged production bundle includes the Graph photo endpoint and omits the previous SharePoint photo URL. README, setup, deployment and CLI permission docs now describe the implementation. Local Markdown links and `git diff --check` passed. No unit tests, browser automation, tenant changes or deployment were performed.
- Manual acceptance still required in Workbench and Copilot: authenticated SPFx photo access, the unlicensed user's uploaded photo, unavailable-photo fallback, both themes, no repeat Graph loads across fullscreen/filters, and cold/warm first-three-photo timing. The 1–2 second target is unmeasured. Graph Explorer success alone does not verify the component's authorization. GP-02/GP-03 remain unchecked for those host checks.

### Expert Availability Panel implementation (2026-11-03)

- AV-01: added optional SMTP email from Person EMail without changing the Teams/photo UPN, a small typed slot model and GraphAvailabilityService. The service uses the existing delegated SPFx Graph factory and posts exactly one SMTP schedule to `/me/calendar/getSchedule`, with UTC boundaries for local 09:00–18:00 and a 30-minute interval. Source review confirms validated codes, per-schedule error handling, no raw event details in UI state, a ten-second logical timeout and friendly HTTP/mailbox/sharing/service errors. Missing or invalid email is optional in the model and does not fail response-schema validation. Actual SharePoint SMTP projection and calendar access are unverified in the tenant.
- AV-02: implemented the compact panel with 18 text-marked, keyboard-focusable Fluent tooltip slots, a labeled legend, current-slot outline, viewing date/zone, local loading and explicit unavailable/error/Refresh states. Only a local minute clock updates automatically. No calendar cache or Graph polling was added; unavailable/invalid data is never shown as Free. Visual, keyboard and actual host runtime checks remain pending.
- AV-03: connected only the selected fullscreen card. Selection is idempotent, clears when hidden by filters or when fullscreen/skill changes, and old panel requests are ignored through cleanup and identity guards. Mock profiles/missing email make no calendar request. Search, GraphPhotoService and ExpertActions were preserved. Actual A→B, duplicate-click, filter/mode request-count and regression checks remain pending.
- AV-04: TypeScript checks passed after AV-01 and AV-02. Final `npm run build` exited 0 without TypeScript/lint warnings/errors; the existing Jest stage found no tests, and no test suite was added. Both the sppkg and current agent ZIP passed CRC integrity checks; the production bundle contains both calendar and photo endpoints. The package has no webApiPermissionRequests; dependency manifests and existing photo/contact implementation files are unchanged. Documentation links/anchors and nine shell examples passed static validation without executing consent commands.
- Native Date conversion was inspected locally in Node with TZ=Europe/Madrid: Jan 15 maps 09:00–18:00 to 08:00–17:00 UTC; Jul 15 and Mar 29 map to 07:00–16:00 UTC; Oct 25 maps to 08:00–17:00 UTC. All four ranges contain 18 half-hour slots. This is a local time-conversion spot check, not Graph/Outlook/browser acceptance.
- README, SMTP list notes, the scope-preserving M365 CLI guide and the live conference segment are updated. The previously reported Calendars.Read grant has not been rechecked or changed. No live calendar requests, tenant changes, calendar writes, browser automation, new dependencies or unit tests were performed/added.
- Remaining manual acceptance: effective SPFx calendar consent; selected non-family expert with an accessible Exchange mailbox; comparison against Outlook for all four states and time zones/DST; missing email/mailbox and policy/401/403/404/429/empty/per-schedule/network failure states; current-slot boundaries; Refresh; rapid A→B; filter/mode behavior; both themes and narrow cards. AV-02/AV-03/AV-04 remain unchecked until these host checks have actual results.

### Availability period navigation (2026-11-04)

- Updated only ExpertAvailabilityPanel UI/state: 56 px high time-labeled blocks with 18 px status markers; Morning 09:00–14:00 (10 slots) and Afternoon 14:00–18:00 (8 slots); accessible local previous/next buttons disabled at the ends. Initial selection follows the local hour; Refresh and minute clock updates preserve it. The Graph service and its full-day request are unchanged.
- CSS container queries use the panel's own width: one row from 600 px, otherwise two rows of five morning slots or four afternoon slots. Colors, legend, tooltips, current-slot outline and mock/unavailable behavior are retained. README, the demo segment and the existing AV-02/spec text describe the new layout; no new task structure or dependencies were introduced.
- `npm run build` exited 0 without TypeScript/lint warnings/errors and regenerated the sppkg. No new tests or tenant operations were added. Actual arrow/Refresh request-count checks, initial selection around 14:00, keyboard announcements/focus and narrow/wide light/dark host layout remain pending; no browser automation or live host verification was performed for this update.

### Confirmed Teams meeting creation (2026-11-04)

- Added GraphMeetingService, MeetingConfirmationDialog and small typed organizer/result models. Future Free slots become native Fluent buttons only for another expert with resolved SMTP; self checks normalize the SPFx user's email/loginName and expert mail/UPN. Non-bookable cells remain informational and retain their time/status labels. Mock mode constructs no meeting service.
- Confirmation displays parties/date/local time/duration and optional plain-text Notes (1,000 characters). Cancel before confirmation makes no write; pending actions/dismissal are locked. The service checks Teams provider support and both participants' free/busy for the selected half hour before POST /me/events with Teams settings, one expert attendee, UTC times and transactionId.
- Per-instance in-flight/completed/uncertain attempts are guarded by expert/interval. Unknown POST outcomes stay blocked and ask the user to inspect Outlook; a delayed/missing join URL triggers one read of the existing event, never another creation. Calendar results refresh after an attempt without treating the expert as Busy without evidence. Guard state is not persisted across reloads.
- Final npm run build exited 0 without TypeScript/lint warnings/errors. Both archives passed CRC checks; the production bundle includes the create-event path, transactionId, confirmation/Teams links and existing photo/availability endpoints. Dependency manifests, package permission configuration, GraphPhotoService, GraphAvailabilityService and existing ExpertActions are unchanged. Documentation links and ten shell examples passed static checks; no consent example was executed. Initial supported-style/Promise-lib/ref-lint issues were fixed without disabling checks or changing compiler configuration; a transient Heft staging collision did not recur in the final build.
- README, SharePoint setup, CLI permissions and conference runbook now distinguish real confirmed invitations from the existing Schedule preview. The user reports Calendars.ReadWrite granted; no tenant grant was inspected or modified, no real meeting was created, and no browser automation or unit tests were added/run. Manual runtime and end-to-end invitation/link checks remain pending.
