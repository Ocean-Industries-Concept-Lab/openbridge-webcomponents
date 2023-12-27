import Zod from "zod";

export const PalettUrlZod = Zod.object({
    brightUrl: Zod.string().url(),
    dayUrl: Zod.string().url(),
    duskUrl: Zod.string().url(),
    nightUrl: Zod.string().url(),
});

export const PageZod = Zod.object({
  name: Zod.string().min(1).max(30),
  url: PalettUrlZod,
  icon: Zod.string().regex(/^[a-z0-9-]+$/),
  });

export const AppZod = Zod.object({
  name: Zod.string().min(1).max(30),
  appIcon: Zod.string().regex(/^[a-z0-9-]+$/),
  companyLogo: Zod.string().url(),
  companyPage: Zod.string().url(),
  helpPage: PalettUrlZod,
  configurationPage: PalettUrlZod,
  pages: Zod.array(
    PageZod
  ),
});

export const ConfigurationZod = Zod.object({
    apps: Zod.array(AppZod),
});

export type App = Zod.infer<typeof AppZod>;
export type Page = Zod.infer<typeof PageZod>;
export type PalettUrl = Zod.infer<typeof PalettUrlZod>;
export type Configuration = Zod.infer<typeof ConfigurationZod>;