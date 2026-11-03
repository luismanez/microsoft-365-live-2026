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

## Live calendar availability segment

This segment needs SharePoint mode and a non-family demo expert with a valid Person email and an accessible Exchange calendar. The earlier mock script does not provide live calendar data. Recheck the [delegated calendar permission](graph-permissions.md#calendar-availability-permission) and compare the prepared expert's calendar in Outlook before the session. Prepare any known Free/Tentative/Busy/Out of Office entries manually; the app creates none.

1. Open fullscreen and select **Check availability** on that expert. Point out that expert cards and photos already worked before any calendar request was made.
2. Explain **Today · 09:00–18:00**, the viewing time zone, the half-hour timeline and its legend. This is calendar free/busy; it does not indicate Teams presence.
3. Choose **Refresh** for a new read. Switching to another expert replaces the panel and ignores the previous response if it arrives late. Filters and ordinary host re-renders do not poll calendars.
4. Optionally select a controlled mailbox-free user to show the honest unavailable state. In mock mode the panel explains that fictional profiles have no calendar; it does not invent a timeline.
5. Keep **Schedule** as the existing preview. No invitation, booking or calendar write takes place.

Manual rehearsal: check light/dark and narrow cards, keyboard slot tooltips, current-slot boundaries, duplicate clicks and A→B while pending. Compare local/UTC payload alignment for winter, summer and the Europe/Madrid transition dates 2026-03-29 / 2026-10-25 using browser time-zone inspection rather than adding date navigation. Record actual results and leave unavailable permission/mailbox/error scenarios pending. If live availability is unavailable on stage, retain the rest of Expert Finder and explain the calendar state instead of showing simulated free time.

## Before going on stage

Check the actual tenant/agent, whether the root Experts list is present and accessible, the resulting data-source label, network/profile images, allowed list access if live, Teams navigation for a tenant user if live, host modes/themes, and the fallback. For the calendar segment, verify an accessible mailbox, consent and the returned free/busy snapshot; it is not a guarantee that an expert can accept a meeting. No messages or invitations are sent by the app. Keep Hello Copilot separate; this workspace is only the prepared Expert Finder demo.

A real Workbench/Copilot rehearsal is still required in your environment. No browser/tenant rehearsal was claimed by the implementation session.
