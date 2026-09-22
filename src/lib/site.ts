/**
 * Site-wide identity strings.
 *
 * The role was spelled three different ways across the site — "Full-Stack
 * Developer" in the page metadata, "Full-Stack Engineer" in the JSON-LD and
 * "Full-stack engineer" in the navbar and hero — so the browser tab, the
 * link preview and the page itself each claimed something slightly
 * different. It lives here now, and every one of those reads it.
 *
 * In `lib` rather than exported from `layout.tsx`: a route file's job is to
 * render a route, and importing constants out of one couples every consumer
 * to that module's evaluation.
 */
export const SITE_URL = "https://www.vtcodecraft.in";
export const SITE_NAME = "Vishesh Tripathi";

export const ROLE_PRIMARY = "Full Stack AI Engineer";
export const ROLE_SECONDARY = "Software Engineer";

/** Both roles, as shown on the page and in the OG card. */
export const ROLE_FULL = `${ROLE_PRIMARY} / ${ROLE_SECONDARY}`;
