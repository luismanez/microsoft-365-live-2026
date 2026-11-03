# Tasks: SharePoint expert data

Commands run from `src/copilot-expert-finder`. File paths below are relative to `src/copilotComponents/expertFinder` unless they start with config, copilot, docs, README, or Specs. Completion status lives only in [tasks/todo.md](../tasks/todo.md).

## SP-01

**Document list setup and sample data**

Write concise instructions for Experts and a small seed file that can be mapped to tenant test users.

- Acceptance: Use exact internal names and single-value Skill/Expert, plain-text ShortCV, and explicit user/site setup. No real tenant data is fabricated or provisioned automatically.
- Verification: Review the fields against GLOBAL.md; the tenant owner can follow the instructions for live setup.
- Dependencies: DAT-02.
- Likely files: docs/sharepoint-setup.md; docs/experts-sample-data.json.

## SP-02

**Implement filtered REST retrieval**

Implement SharePointExpertService with canonical skill validation, safe OData/URL construction, minimal select/Person expansion, and simple mapping. Resolve identity/photos through supported SharePoint information.

- Acceptance: Every query is skill-filtered and delegated. Check HTTP/response failures, timeout and empty results; explain unexpected pagination rather than silently truncating totals. Never broaden the query or fall back to mock.
- Verification: Run npm run build. With a configured tenant, inspect the request and returned users/photos; without it, record the live check as pending.
- Dependencies: DAT-01, SP-01.
- Likely files: services/SharePointExpertService.ts.

## SP-03

**Wire explicit data source selection**

Add one settings/provider factory and wire it into the existing entry. Keep mock as the initial demo default and require an explicit site for live mode.

- Acceptance: The same UI works with either service; host re-renders keep a stable provider. Mock/live labeling is clear and live errors remain errors.
- Verification: Compile; switch modes deliberately in configuration and manually verify skill results, missing identity/photo behavior, and delegated access when the tenant is available.
- Dependencies: SP-02, INL-02.
- Likely files: expertFinderSettings.ts; services/createExpertService.ts; ExpertFinderCopilotComponent.tsx; README.md.
