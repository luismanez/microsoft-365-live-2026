# Feature: Expert Availability Panel

Implemented locally. Build/packaging passed; actual Workbench/Copilot and tenant validation remain pending. This extends the existing [global spec](../GLOBAL.md) without reopening unrelated tasks.

## Scope and existing seams

In fullscreen, add `Check availability` to each existing `ExpertCard`. These cards already contain the detailed profile; no new details page or drawer is needed. One selected card expands a compact Availability section. Inline stays compact; Teams contact, Schedule preview, Graph photos, search and source selection retain their behavior.

Use one small `GraphAvailabilityService`, one `ExpertAvailabilityPanel` and local fullscreen selection state. Reuse SPFx's `msGraphClientFactory.getClient('3')` infrastructure already used by GraphPhotoService. Do not initialize another SDK client or authentication flow, add dependencies, or change photo caching. Add optional `Expert.email` from the existing SharePoint Person field's `EMail`; retain the UPN separately for photos/Teams. Missing or invalid email must not reject an otherwise valid expert record.

This feature follows the session's explicit demo choices: existing build plus manual checks, no unit tests or test infrastructure, and delegated consent through M365 CLI rather than `webApiPermissionRequests`. Application code is implemented; tenant settings have not been changed.

## Calendar read contract

Use delegated Graph v1.0 `POST /me/calendar/getSchedule`. `/me` is the signed-in caller; `schedules` contains exactly the selected expert's SMTP email, never their display name or an assumed UPN/email substitution. Request `availabilityViewInterval: 30`, with `startTime`/`endTime` expressed as UTC `dateTimeTimeZone` values.

Build today's 09:00 and 18:00 boundaries in the viewing browser's local time zone, then convert each boundary to UTC for the request. Use the local date, not the UTC date, to decide today. Native Date/Intl are sufficient; do not hardcode a UTC offset, use the expert's workingHours as the viewing zone, or introduce a date library. Recompute the window on Check/Refresh. The initial window contains 18 half-hour slots; align each code with the requested UTC start plus its slot offset, then format labels locally.

Validate the single returned schedule before using `availabilityView`. A valid 18-character view maps `0` to Free (including Working Elsewhere), `1` to Tentative, `2` to Busy and `3` to Out of Office. An empty/missing view, unexpected length/code or `scheduleInformation.error` yields unavailable/error, never fabricated Free slots. Keep only normalized slots/date/zone needed by the UI. Discard scheduleItems and workingHours; never render, retain in state or log event subjects, locations, attendees, raw payloads or tokens.

A simple bounded request timeout and friendly errors are sufficient. Handle HTTP 401/403/404/429, missing mailbox, Exchange sharing restrictions and network/service failures without interrupting expert results. Permission errors and mailbox/policy errors must not be presented as definitive proof of one specific cause. Retry is explicit; no retry framework or Graph polling.

## Panel behavior

- Show `Availability`, `Today · 09:00–18:00`, and the viewing time-zone label. Use a compact horizontal timeline with 18 segments, a small labeled legend, and local time/status tooltips and accessible labels. Distinguish states beyond color with a short marker or pattern; use Fluent semantic tokens for both themes. Preserve readability at narrow card widths without horizontal page overflow.
- Highlight the current segment when `start <= now < end`; no segment is current outside the window. A local minute timer may update this marker while open, without another Graph call. Refresh recalculates today's range. Keep the queried date associated with the result so an older date is not mislabeled Today.
- Show loading only inside the panel, plus understandable unavailable/error states and `Refresh` or `Try again` when useful. Prevent duplicate clicks while loading. An unresolved SMTP address shows `Availability unavailable: no email address` with no Graph call.
- Mount a panel only after Check availability selects that expert. Repeating Check for the already selected expert does not refetch; Refresh does. Switching experts immediately removes the previous result and ignores late completions using an ordinary effect cleanup/request guard. Clear selection when filters hide the expert, a new skill is loaded, or fullscreen closes; it must not silently fetch again when a card returns.
- Keep only the active panel's result in memory until selection changes/unmounts. No cross-expert or persistent calendar cache. Mock mode shows an honest unavailable explanation and performs no calendar calls or simulated free/busy reads. Calendar state is separate from Teams presence; Schedule remains a preview and creates no meeting.

## Permissions and conference prerequisites

The current getSchedule method reference lists delegated `Calendars.ReadBasic` as least privilege and accepts existing `Calendars.Read`/`Calendars.ReadWrite`. The previously supplied SPFx grant already included `Calendars.Read`; recheck it through the documented CLI workflow before proposing another consent. If a compatible scope is absent, document adding `Calendars.ReadBasic` while preserving every existing scope. Do not execute grants or add manifest permission requests. CLI installation, login and application setup remain outside the demo docs.

The general free/busy overview still says Calendars.Read is the minimum; follow the current endpoint permission table for Calendars.ReadBasic. Both the caller's calendar access and the expert's accessible Exchange mailbox/sharing matter. An Entra photo or account alone does not establish mailbox availability. Use a controlled expert with a working Exchange calendar for the successful demonstration; a user without an accessible mailbox demonstrates the unavailable state. Do not use family accounts for the demo, provision mailboxes, change licenses or seed calendar events automatically.

## Acceptance and execution

Follow [AV-01 through AV-04](tasks.md); progress lives only in [tasks/todo.md](../tasks/todo.md). Build/packaging can be completed locally. Actual SMTP projection, consent, mailbox access, timeline alignment, theme/layout and stale-response behavior need manual Workbench/Copilot verification. Record unavailable checks as pending; Graph Explorer alone is not component verification.

## References

- [getSchedule endpoint, request and current permissions](https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0)
- [scheduleInformation and availability codes](https://learn.microsoft.com/en-us/graph/api/resources/scheduleinformation?view=graph-rest-1.0)
- [Free/busy overview, sharing and returned event data](https://learn.microsoft.com/en-us/graph/outlook-get-free-busy-schedule)
- [Date: local time, UTC and daylight saving offsets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_components_and_time_zones)
- [Existing CLI permission workflow](../../src/copilot-expert-finder/docs/graph-permissions.md)
