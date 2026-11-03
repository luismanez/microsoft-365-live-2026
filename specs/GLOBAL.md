# Global specification: Expert Finder community demo

## Goal and current base

Demonstrate a useful visual application inside Microsoft 365 Copilot: a prompt identifies a skill, the agent invokes ExpertFinderTool, the component loads matching experts, and the user explores them inline or in fullscreen.

Use the existing project at `src/copilot-expert-finder`. Inspected baseline: SPFx 1.24.1, React/React DOM 18.3.1, TypeScript 5.8.3 strict, Fluent UI v9 9.75.1, Zod 4.6.7, Heft 1.3.2. Reinspect before implementation. The current starter accepts message, makes demonstration Graph/site reads, and already wires createRoot, host context, FluentProvider targetDocument, and teardown. Preserve those useful lifecycle patterns and the existing component, solution, and agent IDs.

## Demo quality bar

Keep only what helps the conference experience. Use small React components and a simple service interface. Verification is compilation/lint/packaging through the existing build plus manual functional and visual checks. Do not add unit tests, automated integration suites, test libraries, coverage requirements, CI pipelines, telemetry platforms, or architectural frameworks. Keep runtime argument validation, safe SharePoint queries, understandable error/loading states, and image fallback because they prevent a broken demo.

The implementation stages remain mock UI -> Copilot discovery -> SharePoint -> package/demo. Introduce the minimal skill input while building the mock UI so Workbench can exercise the real contract; complete the agent wording later.

## Fixed input and domain contract

ExpertFinderTool receives one required skill string. Validate raw arguments with Zod at runtime, trim/collapse whitespace, compare casing consistently, and normalize to one of SPFx, Copilot, DB, Spanish. Reject empty, overlong, malformed, or unsupported input before retrieval. An 80-character maximum is sufficient. Keep JSON Schema conversion compatible with the installed Zod/SPFx generator; avoid unsupported schema transforms.

Skill is fixed for an invocation. Changing it requires a new Copilot request. No Skill selector or All Skills option exists in the UI.

```typescript
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

export interface IExpertService {
  getExpertsBySkill(skill: ExpertSkill): Promise<Expert[]>;
}
```

Use one canonical skill registry. Mock and SharePoint services expose the same skill-scoped boundary. React never receives experts for other skills. Raw SharePoint response types stay inside that adapter. No second LLM, chatbot, backend, Redux, CQRS, or generic repository framework is needed.

## Data sources

Start with roughly 15 fictional records: SPFx 6, Copilot 8, DB 1, Spanish 0. This supports several results, more than three, one result, and no results. Include varied departments/roles and use Alex Morgan, Sam Carter, and Jamie Taylor as the first SPFx examples. Mark mock mode visibly as Demo data.

Bundle local photographic portraits and a short provenance/license record. Generated portraits must depict fictional adults; stock photos must be lawfully redistributable and clearly illustrative. Do not fetch avatars from a third-party service at runtime. Fall back gracefully when a photo is unavailable.

Final SharePoint list: Experts.

| Internal name | Type | Purpose |
|---|---|---|
| Title | Single line text | Job title / Role |
| Expert | Person, single value | Person name and identity |
| Skill | Choice, single value | One canonical skill |
| ShortCV | Multiple lines, plain text | Professional summary |
| Department | Single line text | Department |

SharePoint MUST filter on the server using Skill eq '<canonical value>'. Escape OData literals and encode query values, select only required fields, and expand the Person field. Use SPHttpClient with delegated user access. Never download the full list to search by skill or remove the filter as a fallback. This is a small demo list, not a large-directory search system; handle an unexpected continuation explicitly rather than silently reporting incomplete totals.

Use one explicit settings module/provider factory outside React. Default to mock. Live mode requires an explicitly configured same-tenant SharePoint site and list; Copilot's current web context is not assumed to be that site. Settings are not tool parameters. Never silently replace a live error with mock results.

Resolve Teams identity and photographs through supported SharePoint information where possible. A mail attribute does not guarantee the UPN required by Teams. If identity cannot be resolved, explain why contact is unavailable. Use a verified SharePoint photo mechanism with fallback; no extra Graph permissions or profile beta API.

## State and host behavior

Instantiate the service once at the SPFx composition boundary. Keep one React root, mount through context.domElement, preserve targetDocument for Fluent styling, and clean up on teardown. Remove starter Graph /me and /_api/web requests that do not contribute to Expert Finder.

The React root owns the invocation skill, fetched results/load state, and name/department/role filters. Derive visible results with a pure helper/useMemo. Read the effective host theme/mode directly; request fullscreen through the installed supported API and handle denial honestly.

Theme/mode/size changes and local filters must not refetch data. Preserve fetched results and local filter state across ordinary re-renders. Inline always shows the full invocation total and its first three experts; returning to fullscreen restores local exploration. A genuine new skill resets incompatible local state. Ignore stale async completions after retry, changed invocation, or unmount. A real host teardown/new instance may fetch again; no cross-instance cache is required.

Show loading, success, no skill matches, no local filter matches, invalid input, and error states. Provide an explicit retry for retrieval failures. Check HTTP status and response shape, bound slow retrieval with a simple timeout, and do not create a retry framework or pretend a logical timeout cancels transport.

## Visual brief

Reproduce only the inner Expert Finder UI from the user's mockup. The chat image is not currently stored in the repository; this brief is sufficient to implement without it. Exclude the conference banner, neon framing, explanatory arrows, and host-owned close/pop-out controls.

Use Fluent UI v9 with light/dark semantic tokens, purple primary actions, restrained blue/teal accents, soft corners, quiet borders/shadows, generous spacing, and clear typography. A subtle decorative lavender/blue header wave is enough; no animation library is needed.

Inline: people/search icon, Expert Finder title, correct count for the requested skill, up to three compact photo/name/title rows with Teams action, an indication of more results, and Open in fullscreen when the host supports it. Do not show summaries, departments, or extra skills there.

Fullscreen: Expert Finder header, fixed Experts in <skill> subtitle/badge, a wrapping toolbar, result count, and a responsive grid. Cards include photograph, full name, job title, a short professional summary, department, Chat in Teams, and Schedule. Expanded cards provide the detailed profile information; no separate drawer is needed for this version. Omit location, multiple skill tags, undefined overflow menus, and grid/list switching.

Filters are exclusively Search by name, Department, Role, and Clear filters. Name compares normalized full-display-name startsWith, not contains/fuzzy/semantic search. Department/Role compare normalized exact values; active filters combine with AND. Dropdown options come from the full fetched skill dataset. All includes that subset, including missing optional metadata. Clear filters resets only these three controls and makes no request.

Use real accessible labels, useful names for icon buttons, visible focus, readable contrast, announcements for loading/results/errors, and proper dialog focus. Check both themes around 320/768/1280 px and at 200% zoom, including long text and missing photographs. Cards must fit the host without horizontal overflow.

## Contact actions

Live Chat in Teams opens the supported HTTPS chat deep link with a verified, encoded UPN via the host bridge; it sends no message. Fictional mock contacts open a clearly labeled preview instead of launching a chat for an invented account. Schedule opens a clearly labeled demo dialog saying no meeting has been created. Do not implement calendar access, availability, or presence.

## Minimal code organization

Keep the entry class and adapt components/ExpertFinder.tsx as the app root. Add models/Expert.ts; utils/skills.ts and expertFilters.ts; services/IExpertService.ts, MockExpertService.ts, SharePointExpertService.ts; a small settings/provider factory; data/mockExperts.ts and local assets. Add inline/fullscreen/search/card/avatar/action components only as their responsibilities justify them. Avoid multiplying helper layers. Use strict TypeScript, hooks, existing formatting, English copy, and Fluent v9. Preserve existing localization where useful without an i18n overhaul.

## Commands and checks

Run from src/copilot-expert-finder:

```bash
npm run build
npm start -- --nobrowser
```

Use the existing build script as generated/configured. Verify the production sppkg at sharepoint/solution/copilot-expert-finder.sppkg and generated agent ZIP under teams. For local hosting the debug manifests are served at https://localhost:4321/temp/build/manifests.js. Set SPFX_SERVE_TENANT_DOMAIN for automatic tenant URL substitution or navigate to Workbench manually.

Do not change project watchers to fix an agent-sandbox-only fs.watch/EMFILE restriction; use an authorized normal execution context after diagnosis. A successful build does not establish actual Workbench rendering, natural Copilot discovery, or live SharePoint permissions.

## Authority and completion

A future single implementation prompt may cover all local features without approval between each one. New dependencies or broader permissions need a concrete reason and approval. Tenant provisioning/seeding, package upload/sync, and publishing need the corresponding authorization. No secrets, raw HTML insertion, real messages/meetings, fake presence, or changes to Hello Copilot.

External prerequisites: target site URL, correctly provisioned list and real test-user mappings, browser/tenant access, and a deployed/synced agent. Finish independent local work if one is unavailable; leave the corresponding manual checklist open and report the exact missing input. Do not manufacture publisher metadata, contact identities, screenshots, or successful host results.

Local completion means the code, lawful assets, build/package, setup notes and demo runbook are ready. Host/tenant validation is complete only when the manual checks in tasks/todo.md have actual recorded results.

## Technical references

- [SPFx 1.24.1](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.24.1)
- [Copilot UX overview](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/overview-copilot-apps)
- [First component / Workbench](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/get-started/build-your-first-copilot-app)
- [SharePoint REST OData operations](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/use-odata-query-operations-in-sharepoint-rest-requests)
- [Teams chat links](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-link-teams)
- [Zod JSON Schema](https://zod.dev/json-schema)
- [My Day sample](https://github.com/pnp/spfx-copilot-components/tree/main/samples/my-day)

Verify API details against installed declarations and official sources while implementing; do not copy the older sample's entire architecture.
