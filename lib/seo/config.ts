type SeoEnvironment = {
  siteUrl?: string;
  nodeEnv?: string;
  vercelEnv?: string;
  deployContext?: string;
};

/** A configured origin is always the real site, never an inferred preview URL. */
export function resolveSiteConfig(env: SeoEnvironment) {
  let url: URL | undefined;
  const configured = env.siteUrl?.trim();
  if (configured) {
    const message = "NEXT_PUBLIC_SITE_URL must be a public HTTPS origin, without a path, credentials, query, or fragment.";
    try {
      const parsed = new URL(configured);
      const host = parsed.hostname.toLowerCase().replace(/\.$/, "");
      const local = host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host === "[::1]"
        || /^(0|10|127)\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host)
        || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
      if (parsed.protocol !== "https:" || local || !host.includes(".") || parsed.port
        || parsed.username || parsed.password || parsed.pathname !== "/" || parsed.search || parsed.hash) {
        throw new Error(message);
      }
      parsed.hostname = host;
      url = new URL(parsed.origin);
    } catch {
      throw new Error(message);
    }
  }

  const preview = Boolean(
    (env.vercelEnv && env.vercelEnv !== "production")
    || (env.deployContext && env.deployContext !== "production"),
  );
  return {
    url,
    // Local previews can resolve social assets; production never falls back to localhost.
    metadataBase: url ?? (env.nodeEnv === "development" ? new URL("http://localhost:3000") : undefined),
    indexable: env.nodeEnv === "production" && Boolean(url) && !preview,
  };
}
