import Zod from "zod";

export const PageZod = Zod.object({
    brightUrl: Zod.string().url(),
    dayUrl: Zod.string().url(),
    duskUrl: Zod.string().url(),
    nightUrl: Zod.string().url(),
});

export const AppZod = Zod.object({
  name: Zod.string().min(1).max(30),
  appIcon: Zod.string(),
  companyLogo: Zod.string().url(),
  companyPage: Zod.string().url(),
  helpPage: PageZod,
  configurationPage: PageZod,
  pages: Zod.array(
    Zod.object({
        name: Zod.string().min(1).max(30),
        url: PageZod,
        icon: Zod.string(),
        })
  ),
});

export const ConfigurationZod = Zod.object({
    apps: Zod.array(AppZod),
});

export type App = Zod.infer<typeof AppZod>;
export type Page = Zod.infer<typeof PageZod>;
export type Configuration = Zod.infer<typeof ConfigurationZod>;