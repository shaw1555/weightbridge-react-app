export interface HeaderLink {
  label: string;
  path?: string;
  public?: boolean; // optional, true = visible even when not logged in
  permission?: string; // required permission (if any)
  children?: HeaderLink[]; // 👈 for sub-links
}