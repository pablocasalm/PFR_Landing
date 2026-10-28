// Lo único de Node que usa vite.config.ts (la fecha de git para el sitemap). El proyecto no
// instala @types/node; si algún día se instala, este archivo sobra.
declare module "node:child_process" {
  export function execSync(command: string, options: { encoding: "utf8" }): string;
}
