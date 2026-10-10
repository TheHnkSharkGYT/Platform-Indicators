# Platform Indicators (Revenge plugin starter)

This is a TypeScript starter project for the Revenge plugin template.

## Current status

This ZIP is a **starter source project**, not a verified install-ready plugin.
It includes a manifest and platform-status normalization helpers, but it does
not yet inject icons into Discord's UI. That final part depends on the exact
Revenge API and UI patch points available in the version installed on your
phone; this project intentionally does not invent undocumented imports.

## What can be inferred

Discord's client-status data can report these broad session categories when
available:

- `desktop` — desktop client session
- `mobile` — mobile client session
- `web` — browser session
- `vr` — VR session, if exposed by the client

This data does **not** reliably distinguish Android from iOS, Windows from
macOS/Linux, or identify a console session. Missing data means unknown, not
proof that a platform is unused. Multiple sessions may be active.

## Files

- `manifest.json` — Revenge plugin metadata
- `js/index.ts` — normalization helpers and safe diagnostic entry point

## Integrating with the official template

1. Download/clone the official template:
   https://github.com/revenge-mod/revenge-plugin-template
2. Copy the `platform-indicators` folder into the template's `plugins/` folder.
3. Confirm the plugin API/UI patch API for the exact Revenge version you use.
4. Implement the profile/member UI patch using documented APIs.
5. Build using the template's documented build steps.

The official template currently documents JDK 25+, Android SDK platform/build-tools
36, and Bun or Node.js. Building entirely on Android may require an environment
that supports these tools.

## Helper example

```ts
getPlatformIndicators({ mobile: "online", desktop: "idle" });
// -> ["Desktop", "Mobile"]

formatPlatformIndicators({ web: "online" });
// -> "Web"

formatPlatformIndicators(undefined);
// -> "Platform unknown"
```
