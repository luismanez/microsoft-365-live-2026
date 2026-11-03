# Expert Finder: conference opening demo

Allow about 3-4 minutes. Open the deployed agent in advance, check the selected data source and local portrait loading, and keep a fresh conversation ready. Source selection is automatic: Experts in the tenant root selects SharePoint; HTTP 404 selects fictional Demo data. The counts, names and filter examples below assume the mock collection. For that rehearsal, use a controlled tenant without the root Experts list; if it exists, adapt the script to its real rows and match the narration to the source label.

1. Ask: **Who can help me with SPFx?** Copilot selects the tool and supplies the context. Mock mode returns six records; three appear inline.
2. Point out the photo, name, job title and Teams action. Open a mock contact preview and explain that live mode opens a Teams draft chat for the selected tenant person, without sending anything.
3. Choose **Open in fullscreen**. Highlight the fixed SPFx badge and detailed cards.
4. Enter **Al** in Search by name. Select **Digital Workplace** and **Senior M365 Developer**. Alex remains. Clear filters to restore the original skill results. Explain that these interactions are local React state, not another LLM call or data retrieval.
5. Open **Schedule**. The dialog explicitly states that no meeting has been created; it demonstrates where a richer interaction could go.
6. Use the host's light/dark control and, if useful, collapse/reopen to show retained local state.
7. Ask a new question for **databases**: one mock expert. Ask about **Spanish**: no matches. This demonstrates a new skill invocation, not an in-app skill selector.

## Discovery fallback

If propagation delays tool discovery, start a new conversation and use `-developer on` diagnostics where available. If it still does not select the tool, switch openly to Copilot Workbench and fire `{"skill":"SPFx"}` directly. Say: “I am supplying the tool argument manually to show the visual experience while discovery propagates.” This verifies the component, not natural tool discovery. Keep the local HTTPS server running only when using the Workbench fallback.

## Before going on stage

Check the actual tenant/agent, whether the root Experts list is present and accessible, the resulting data-source label, network/profile images, allowed list access if live, Teams navigation for a tenant user if live, host modes/themes, and the fallback. Do not promise presence or calendar availability. No messages or invitations are sent by the app. Keep Hello Copilot separate; this workspace is only the prepared Expert Finder demo.

A real Workbench/Copilot rehearsal is still required in your environment. No browser/tenant rehearsal was claimed by the implementation session.
