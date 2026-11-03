# Demo implementation order

Use the feature map in [README.md](../README.md) and the shared contract in [GLOBAL.md](../GLOBAL.md). Detailed tasks live with their feature; [todo.md](todo.md) is the only status checklist. This is a planning deliverable, not an instruction to start coding now.

## Build order and checkpoints

| Stage | Tasks | Practical checkpoint |
|---|---|---|
| Domain and mock data | DAT-01..DAT-03 | Canonical skills, fictional scenarios and local portraits ready |
| Contact controls | ACT-01 | Teams preview and Schedule demo are honest and usable |
| Phase 1: inline | INL-01..INL-02 | A skill fired in Workbench renders a complete compact experience |
| Phase 1: fullscreen | FUL-01..FUL-02 | Expansion, local filters and cards work over the same results |
| Phase 2: agent | COP-01..COP-02 | Tool/agent schema and natural invocation guidance agree |
| Phase 3: SharePoint | SP-01..SP-03 | Root-list availability automatically selects the delegated skill-filtered provider or mock data |
| Phase 4: demo | DEM-01..DEM-02 | Package, installation instructions, script and fallback ready |

Checkpoints mean run the build and manually exercise the new user flow when the host is available. They are not mandatory approval pauses when the user later invokes the single implementation prompt. Keep edits small and fix build failures before dependent work. Do not generate automated test suites or add quality infrastructure for this demo.

Portrait sourcing can proceed after mock identities exist. Pure filters and list setup notes can be prepared before their consuming UI/provider. Default to one sequential executor; the shared root, props and entry files do not need parallel editing.

## Risks that matter for the session

- A bad LLM argument must produce a clear correction, not an unfiltered query.
- Mode/theme/filter changes must preserve state and avoid duplicate retrieval.
- Person email and Teams UPN may differ; verify identity instead of guessing.
- Photos may fail inside the host; retain a graceful fallback.
- Agent discovery can propagate slowly; keep a new-conversation/Workbench fallback.
- A browser, root-site access, mapped tenant users, or deployed agent may be unavailable. Complete independent local work and leave those checks explicitly pending.

## Single-prompt execution

[IMPLEMENTATION-PROMPT.md](../IMPLEMENTATION-PROMPT.md) authorizes the future local implementation once. The executor resumes unchecked tasks, records actual build/manual results, and continues across features. Local source/package work does not imply authority to provision the tenant, seed people data, upload/sync an agent, or publish. No unfinished task or external check is marked complete without evidence.
