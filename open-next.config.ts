import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// shortcut: every route is prerendered, so pages are served read-only from static assets;
// switch to the R2 incremental cache if a route ever uses revalidate/ISR.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
