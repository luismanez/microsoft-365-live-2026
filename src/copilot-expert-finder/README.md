# Expert Finder for Microsoft 365 Copilot

A SharePoint Framework 1.24.1 Copilot UX Component for the Microsoft 365 Live 2026 community demo. Copilot supplies a skill; React renders matching experts inline or fullscreen. The UI uses React 18, TypeScript, Fluent UI v9 and local fictional portraits.

## Run and build

Use Node.js 24.x (24.20.0 in this workspace). From this folder:

```bash
npm install
npm start -- --nobrowser
npm run build
```

The development server is HTTPS localhost:4321. Open your tenant's Copilot Workbench and fire `{"skill":"SPFx"}`. Set SPFX_SERVE_TENANT_DOMAIN if using automatic initial-page tenant substitution. The production package is `sharepoint/solution/copilot-expert-finder.sppkg`.

## Demo behavior

- Fixed invocation skills: SPFx, Copilot, DB, Spanish. There is no Skill selector.
- Inline: correct total and up to three experts, portraits, roles, contact and expansion.
- Fullscreen: responsive cards plus local name-prefix, department and role filters.
- Clear filters and host mode/theme changes reuse the fetched data.
- When the root Experts list returns HTTP 404, mock data provides SPFx 6, Copilot 8, DB 1, Spanish 0. Profiles are fictional and visibly labeled.
- Mock contact is a preview. Schedule is explicitly simulated. Live Teams links never send a message.

## Data source

The component automatically checks `Experts` in the tenant root site once during initialization. HTTP 200 selects SharePoint; HTTP 404 selects the fictional mock collection. Other errors are shown without switching to mocks. There is no manual data-source or site-URL setting. The same package works across tenants using this convention.

The root URL comes from `new URL(this.context.pageContext.web.absoluteUrl).origin`, including when Workbench is opened in a subsite. The SharePoint provider filters Skill on the server using SPHttpClient with the current user's permissions. An existing list with zero matching items shows the empty state. Reload the component after creating the list to select the source again.

Live profile photos use delegated Microsoft Graph through SPFx's MSGraphClientV3: `GET /users/{UPN}/photo/$value`. Cards appear before the photos, with a circular shimmer until each image loads and initials when unavailable. Requests run in parallel and are cached per UPN for the component lifetime; filters and inline/fullscreen reuse them. Mock profiles still use bundled portraits and make no Graph requests. See the [CLI consent guide](docs/graph-permissions.md); the conference tenant reuses its existing `User.ReadBasic.All` grant. No package permission requests or new dependencies were added. Actual photo access and latency in Workbench/Copilot still need a live check.

## Session resources

- [SharePoint list setup and sample data](docs/sharepoint-setup.md)
- [Graph photo permissions with M365 CLI](docs/graph-permissions.md)
- [Build, Workbench and installation](docs/deployment.md)
- [Natural invocation checklist](docs/copilot-invocation.md)
- [Conference script and discovery fallback](docs/demo-runbook.md)
- [Portrait provenance](src/copilotComponents/expertFinder/assets/README.md)
- [Repository implementation specs](../../specs/README.md)

The scope is a community demo: no automated test suites or extra infrastructure were added. Use the existing build and practical host checks. Actual Workbench, tenant permission/photo, natural discovery and live Teams validation must be recorded separately from compilation.
