# Graph photo permissions with M365 CLI

The component loads live profile photos from Graph v1.0 through SPFx's MSGraphClientV3. This guide covers the delegated consent required for that access. SharePoint still supplies expert records and UPNs; mock portraits remain local.

Assume M365 CLI is already configured, authenticated and authorized to inspect service principals and manage delegated consent in the target tenant. CLI installation, application configuration and sign-in are outside this guide.

## Choose the permission

The minimum dedicated delegated permission for `GET /users/{userPrincipalName}/photo/$value` is `ProfilePhoto.Read.All`. Existing compatible permissions, including `User.ReadBasic.All` and `User.Read.All`, also authorize this operation. Reuse a compatible permission instead of adding a redundant grant. See the [Graph photo API permission table](https://learn.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#permissions).

For the conference tenant, the existing SPFx grant includes `User.ReadBasic.All`. We reused that authorization and did not add `ProfilePhoto.Read.All`.

Photo consent belongs to the SPFx service principal used by `MSGraphClientV3`. The CLI application is the administrative tool that manages this consent. This demo uses explicit CLI provisioning rather than adding a photo permission request to `package-solution.json` for approval in SharePoint Admin Center.

## 1. Find the tenant-specific Object IDs

Use [entra enterpriseapp get](https://pnp.github.io/cli-microsoft365/cmd/entra/enterpriseapp/enterpriseapp-get/) to inspect the current SPFx principal:

```bash
m365 entra enterpriseapp get \
  --id "08e18876-6177-487e-b8b5-cf950c1e598c" \
  --query "{name:displayName,appId:appId,objectId:id}" \
  --output json
```

The expected name is `SharePoint Online Web Client Extensibility`. Microsoft documents this principal in its [Copilot UX component permission guidance](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/copilot/troubleshooting-copilot-ux-components#a-microsoft-graph-permission-cant-be-approved).

Find Microsoft Graph by name:

```bash
m365 entra enterpriseapp get \
  --displayName "Microsoft Graph" \
  --query "{name:displayName,appId:appId,objectId:id}" \
  --output json
```

Check that the returned Graph `appId` is `00000003-0000-0000-c000-000000000000`. Querying by name avoids the `Invalid UUID` validation error observed when passing that special App ID to `--id` in the demo CLI.

Copy the two returned `objectId` values into these shell variables. Object IDs belong to this tenant; they are different from the fixed App IDs above.

```bash
spfxPrincipalId="<SPFX_SERVICE_PRINCIPAL_OBJECT_ID>"
graphPrincipalId="<GRAPH_SERVICE_PRINCIPAL_OBJECT_ID>"
```

## 2. Inspect the existing delegated consent

Use [entra oauth2grant list](https://pnp.github.io/cli-microsoft365/cmd/entra/oauth2grant/oauth2grant-list/) to select the Graph grant with `consentType` equal to `AllPrincipals`:

```bash
m365 entra oauth2grant list \
  --spObjectId "$spfxPrincipalId" \
  --query "[?resourceId=='$graphPrincipalId' && consentType=='AllPrincipals'].{grantId:id,scope:scope}" \
  --output json
```

If `scope` already contains `ProfilePhoto.Read.All` or another compatible permission such as `User.ReadBasic.All`, no change is needed. This was the outcome in the conference tenant.

If a grant is returned without a compatible permission, follow the existing-grant branch below. If the result is `[]`, follow the new-grant branch.

## 3. Grant photo access only when missing

### Update an existing grant

Copy its `grantId` and the entire current `scope` value from step 2:

```bash
grantId="<EXISTING_GRANT_ID>"
existingScopes="<EXACT_CURRENT_SCOPE_VALUE>"

m365 entra oauth2grant set \
  --grantId "$grantId" \
  --scope "$existingScopes ProfilePhoto.Read.All"
```

The [set command](https://pnp.github.io/cli-microsoft365/cmd/entra/oauth2grant/oauth2grant-set/) replaces the scope list. Keeping the full existing value and appending the photo permission preserves the other grants. Scopes are separated by spaces. This consent is shared by SPFx solutions using the same principal in the tenant.

### Create a grant when none exists

Only when step 2 returned `[]`, use [entra oauth2grant add](https://pnp.github.io/cli-microsoft365/cmd/entra/oauth2grant/oauth2grant-add/):

```bash
m365 entra oauth2grant add \
  --clientId "$spfxPrincipalId" \
  --resourceId "$graphPrincipalId" \
  --scope "ProfilePhoto.Read.All"
```

Here, `--clientId` and `--resourceId` are service-principal Object IDs. Use `oauth2grant` for the component's delegated access; `entra approleassignment add` grants application permissions and is not the consent model used by this component.

## 4. Verify the result

Rerun the query from step 2. Confirm that the grant includes `ProfilePhoto.Read.All`, or the compatible permission being reused. After an update, also confirm that the previous scopes are still present.

This verifies consent configuration. Validate the authenticated photo request from the component in Workbench and Copilot, including the unlicensed demo user with an uploaded photo. Cards render independently; avatars show a circular shimmer, then the photo or initials on failure. Filters and inline/fullscreen reuse the per-instance photo cache. Reload after changing consent or uploading a missing photo to retry an unavailable result. Graph Explorer has its own consent and does not establish that the SPFx client can make the same call.

Implementation reference: [Use MSGraphClientV3 in SPFx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph). Actual component authorization and cold/warm photo latency still require a host check; a successful local build does not verify them.
