# Package and install Expert Finder

## Build locally

Run from src/copilot-expert-finder:

```bash
npm install
npm run build
```

The existing build compiles TypeScript, lints, bundles, expands the declarative agent and creates `sharepoint/solution/copilot-expert-finder.sppkg`. The generated agent ZIP is `teams/expert-finder.zip`. Portraits are bundled as client assets. Do not edit generated manifests or archives directly.

Component ID: 980d322c-2c03-4d8b-a05a-6b724ee174a1. Solution ID: aa4326b3-eeff-4ca7-8f74-f695935a8bbb. Existing identities are preserved. The toolchain manages the generated Teams manifest version when content changes.

## Validate locally in Workbench

```bash
npm start -- --nobrowser
```

Open the authenticated licensed tenant's `/_layouts/15/copilotworkbench.aspx`, load the local debug manifests from `https://localhost:4321/temp/build/manifests.js` as prompted by Workbench, select ExpertFinderTool and fire `{"skill":"SPFx"}`. A trusted local HTTPS development certificate is required. Setting SPFX_SERVE_TENANT_DOMAIN supplies the tenant domain when opening the configured initial page automatically.

The component always checks the tenant root, even when this Workbench is opened on another site. Reload the component after creating the Experts list; source selection runs once per instance. Choose host inline/fullscreen and light/dark modes. Check compact rows, expansion, local filters, clear, dialogs and small widths. No additional preview app or hosting project is required. If an agent sandbox cannot watch files, run the same command in the normal authorized terminal rather than altering the project watch configuration.

## Tenant installation (manual, separately authorized)

1. Choose the tenant setup for the demo. An existing Experts list in the root selects SharePoint; an HTTP 404 selects mock data. Follow sharepoint-setup.md to prepare real data. The same package needs no tenant-specific URL changes.
2. Before distributing, replace placeholder publisher/contact/website/privacy/terms metadata in copilot/manifest.json, copilot/ai-plugin.json and config/package-solution.json with reviewed real values. These were not fabricated for this demo.
3. Upload the sppkg to the tenant SharePoint App Catalog and enable it for all sites as required by the Copilot integration.
4. Perform the initial Add to Teams / baseline agent synchronization from the App Catalog, following your tenant's current controls.
5. Allow policy/propagation time, open the agent in Microsoft 365 Copilot, start a new conversation, and follow copilot-invocation.md.
6. When changing the baseline agent (for example instructions, descriptions or starters), synchronize the updated baseline as required. Ordinary component/tool parameter changes still require a rebuilt/redeployed solution but use dynamic tool discovery.

If upgrading an already deployed package, increase the solution/package version as required by the tenant before uploading the new build. Keep identities stable. This implementation does not upload, sync, grant permissions, create lists or modify the tenant automatically.

## Graph profile photos

Live photos use delegated Graph access managed explicitly through M365 CLI. Follow [Graph photo permissions with M365 CLI](graph-permissions.md) to inspect the SPFx grant, reuse an existing compatible permission, or grant `ProfilePhoto.Read.All` while preserving existing scopes. The conference tenant reuses `User.ReadBasic.All`. This workflow does not add a photo permission request to the solution manifest for approval in SharePoint Admin Center.

After loading the rebuilt component, invoke SPFx with the real Experts list. Check a licensed user and the unlicensed user whose Graph photo was verified: cards should appear first, then photos replace circular shimmers. Expand, filter and switch themes; loaded photos should remain without new Graph requests. Also check an unavailable photo falls back to initials. Record cold/warm photo timing in Copilot; about 1–2 seconds after the cards is a demo target, not a verified guarantee. Reload creates a fresh component cache. These host checks remain pending until performed in the tenant.

Reference: [Build and deploy a Copilot UX component](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/get-started/build-your-first-copilot-app).
