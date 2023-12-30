declare module "bun" {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  interface Env {
    DISCORD_TOKEN: string;
    APPLICATION_ID: string;
  }
}
