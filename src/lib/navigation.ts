/** True when `pathname` is `href` or a nested route beneath it. Hash fragments are ignored. */
export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const target = href.split("#")[0] || "/";
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
}
