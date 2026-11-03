# Copilot invocation checklist

Workbench injects arguments directly. It verifies the UI/argument path, not natural tool selection. Actual Copilot selection requires the installed/synced agent and a new conversation. Counts below apply when the root Experts list returns HTTP 404 and mock data is selected. If the list exists, use its actual rows/counts instead.

| Prompt | Expected behavior |
|---|---|
| Who can help me with SPFx? | ExpertFinderTool, skill SPFx; 6 mock results, first 3 inline |
| Find a SharePoint Framework developer. | skill SPFx |
| Who can help me build a Copilot agent? | skill Copilot; 8 mock results |
| Find a database expert. | skill DB; 1 mock result |
| Find someone who knows Spanish. | skill Spanish; honest empty state |
| Find an expert. | Ask which skill |
| Who can help with Azure Functions? | Explain the supported skills; do not invent a match |

In Workbench, fire {"skill":"SPFx"}, then try lowercase/whitespace variants, an empty string, an unknown skill and a non-string value. Invalid input must show a correction without querying expert items. The independent list-availability check still runs once when the component initializes. The app never changes the skill inside an invocation.

Enable Copilot Developer Mode with `-developer on` if available in your tenant to inspect actual tool choice and arguments. Record what you observe; do not describe Workbench injection as natural discovery. On agent or discovery updates, start a new conversation. Runtime tool discovery and baseline-agent updates are different: rebuild/redeploy component changes, and re-sync when changing baseline instructions, descriptions or starters as appropriate to the current platform guidance.
