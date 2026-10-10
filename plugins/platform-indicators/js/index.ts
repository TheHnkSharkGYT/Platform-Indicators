/**
 * Platform Indicators — Revenge plugin
 *
 * Important limitation:
 * Discord's client-status object may expose desktop/mobile/web/VR session
 * status, but this plugin does not guess console, Android-vs-iOS, or
 * Windows-vs-macOS. The current Revenge template/API must expose a member's
 * presence/client_status data and a supported UI patch point before the
 * indicators can be injected into the UI.
 *
 * This starter safely exports normalization helpers and logs a diagnostic.
 * It intentionally avoids undocumented internal imports and fragile patches.
 */

type PlatformKey = "desktop" | "mobile" | "web" | "vr";

type ClientStatusLike = Partial<Record<PlatformKey, string | null | undefined>>;

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  web: "Web",
  vr: "VR",
};

export function getPlatformIndicators(
  clientStatus?: ClientStatusLike | null,
): string[] {
  if (!clientStatus || typeof clientStatus !== "object") return [];

  const platforms = (Object.keys(PLATFORM_LABELS) as PlatformKey[])
    .filter((key) => {
      const status = clientStatus[key];
      return typeof status === "string" && status.length > 0;
    })
    .map((key) => PLATFORM_LABELS[key]);

  return platforms;
}

export function formatPlatformIndicators(
  clientStatus?: ClientStatusLike | null,
): string {
  const platforms = getPlatformIndicators(clientStatus);
  return platforms.length ? platforms.join(" · ") : "Platform unknown";
}

/**
 * Plugin entry point. This intentionally uses no undocumented Revenge imports.
 * UI integration requires confirming the exact plugin API/UI patch APIs
 * available in the target Revenge version.
 */
export default {
  name: "Platform Indicators",
  description: "Detects platform categories from exposed client-status data.",
  start() {
    console.info("[Platform Indicators] Loaded.");
    console.info(
      "[Platform Indicators] UI integration is not enabled in this starter: " +
      "the current Revenge API's supported user/profile/member patch API must be confirmed first.",
    );
  },
  stop() {
    console.info("[Platform Indicators] Stopped.");
  },
};
      
