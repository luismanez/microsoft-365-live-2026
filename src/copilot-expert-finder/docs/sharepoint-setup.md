# Experts list setup

The component selects its data source automatically by checking the list named Experts in the tenant root site. List creation and seeding are manual tenant-owner steps; this application only reads data.

## Create the list

1. Open the tenant root site, for example `https://contoso.sharepoint.com`. The list must be here, not under `/sites/demo` or another site. Use an account with the required access.
2. Create a blank list named Experts. Keep the Title internal name and use it for the job title.
3. Create the following columns using the exact names below before renaming any display labels.

| Internal name | Type | Setting |
|---|---|---|
| Title | Single line text | Required; job title |
| Expert | Person | Required; one person, people only |
| Skill | Choice | Required; one value; SPFx, Copilot, DB, Spanish; fill-in disabled |
| ShortCV | Multiple lines | Plain text |
| Department | Single line text | Department/team |

Use roughly 15 rows. A person may have separate rows for different skills, but avoid duplicate rows for the same person/skill. `experts-sample-data.json` contains fictional example rows, not an import script. Replace ExpertName placeholders with actual authorized tenant test users in the Person picker; do not create accounts or copy fictional names into claims. Row counts for a skill depend on the records the current user can read.

## Automatic source selection

There is no site URL or data-source setting to edit. The same build can be installed in several tenants.

At initialization the factory derives the root from `new URL(this.context.pageContext.web.absoluteUrl).origin` and sends:

```http
GET https://YOUR-TENANT.sharepoint.com/_api/web/lists/getbytitle('Experts')?$select=Id
```

| Response | Selected source |
|---|---|
| HTTP 200 | SharePointExpertService; the header shows SharePoint |
| HTTP 404 | MockExpertService; the header shows Demo data |
| Any other HTTP failure or network error | An error is displayed; mock data is not substituted |

To use real data, create/populate Experts in the root and reload the component. To demonstrate mocks, use a controlled tenant where this availability request returns HTTP 404. A network connection is needed for this initial check even when mocks are eventually selected. An empty existing list or no matches for a skill stays an empty SharePoint result, not a mock search.

The selection is made once per component instance, before the first React render. Filtering, theme changes and inline/fullscreen transitions reuse that selection. Reopening/reloading a new instance checks again. In Workbench the context web can be the site hosting Workbench, but `.origin` still selects the root; no host-type detection is needed. The LLM supplies only the skill and cannot choose the site or source.

## What is read

When SharePoint is selected, a second authenticated delegated GET retrieves matching items with `$filter=Skill eq 'SPFx'` (canonical value), a minimal `$select`, `$expand=Expert`, and `$top=100`. The service never reads the directory or the whole list as a search strategy. An unexpected continuation is reported instead of displaying a misleading truncated count; keep this conference list small.

The Person projection uses Id, Title and Name. Standard SharePoint Online membership claims (`i:0#.f|membership|UPN`) supply the UPN. EMail is intentionally not requested: email is unnecessary for this UI and is not proof of a Teams UPN. Unresolved/nonstandard claims render the profile with contact unavailable and initials.

## Profile photos

Live photos come from Graph v1.0 `GET /users/{encodedUPN}/photo/$value` through the authenticated SPFx MSGraphClientV3, rather than SharePoint's `userphoto.aspx`. This uses the Graph photo already verified in Graph Explorer for the unlicensed demo user; photo access from the component must also be checked in the actual host.

Cards render immediately after the list responds. Photos for the small skill result set load in parallel, including those beyond the first three inline rows. Each avatar reserves its existing size and shows a circular Fluent shimmer until its image loads. Missing identities, unavailable photos, denied requests and other photo failures show initials without failing the expert list or selecting mocks.

The loader shares one lazily acquired client and caches pending, successful and unavailable photos per normalized UPN for the component lifetime. Filters and mode/theme changes reuse the results. Graph loading has a five-second logical timeout, followed by a separate five-second image-load limit when necessary; late Graph responses are ignored rather than cancelling transport. Blob URLs are released at teardown. Reload the component to retry a cached unavailable photo after uploading a picture or fixing consent. Mock data retains its bundled portraits and never calls Graph.

Follow [Graph photo permissions with M365 CLI](graph-permissions.md) to reuse compatible delegated consent or grant `ProfilePhoto.Read.All` when missing. The conference tenant already has `User.ReadBasic.All`; its consent is reused. The package does not request additional permissions.

## Check with the tenant

In your controlled tenant, check source selection with the root list absent (404), present, and present but empty. Verify that an explicit 403 or network error is shown rather than activating mocks. Then use an authorized account and, where available, another account with genuinely restricted list/item access. Verify filtered network requests, counts, Person names, photos, UPN chat navigation, permission failures, and the no-results case. Check the local name/department/role filters make no new GETs. If the selected list later disappears, or an item request is denied, slow or malformed, an understandable error is shown; there is no second fallback. Reload to perform source selection again. No automatic tenant writes, messages or meetings are performed.

The provider and automatic selection are implemented locally. Actual tenant availability responses, projection/photo behavior and permissions still need validation in your environment.

References: [SharePoint REST query operations](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/use-odata-query-operations-in-sharepoint-rest-requests), [Teams UPN chat links](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-link-teams).
