import Zod from 'zod'

export const PalettUrlZod = Zod.object({
  brightUrl: Zod.string().url(),
  dayUrl: Zod.string().url(),
  duskUrl: Zod.string().url(),
  nightUrl: Zod.string().url()
})

export const PageZod = Zod.object({
  name: Zod.string().min(1).max(30),
  url: PalettUrlZod,
  icon: Zod.string().regex(/^[a-z0-9-]+$/)
})

export const AlertTypeZod = Zod.enum(['alarm', 'warning', 'caution'])

export const AlertStatusZod = Zod.enum(['unacked', 'acked', 'rectified', 'silenced'])

export type AlertType = Zod.infer<typeof AlertTypeZod>
export type AlertStatus = Zod.infer<typeof AlertStatusZod>

export const StartAlertZod = Zod.object({
  cause: Zod.string(),
  description: Zod.string(),
  tag: Zod.string(),
  ageSeconds: Zod.number().int(),
  alertType: AlertTypeZod,
  alertStatus: AlertStatusZod,
  source: Zod.string()
})

export const SimulatedAlertZod = Zod.object({
  cause: Zod.string(),
  description: Zod.string(),
  source: Zod.string(),
  tag: Zod.string(),
  startSeconds: Zod.number().int(),
  resolvedSeconds: Zod.number().int(),
  alertType: AlertTypeZod
})

export interface Alert {
  cause: string
  description: string
  source: string
  tag: string
  time: Date
  alertType: AlertType
  alertStatus: AlertStatus
}

export const AppZod = Zod.object({
  name: Zod.string().min(1).max(30),
  appIcon: Zod.string().regex(/^[a-z0-9-]+$/),
  companyLogo: PalettUrlZod,
  companyPage: Zod.string().url(),
  helpPage: PalettUrlZod,
  configurationPage: PalettUrlZod,
  pages: Zod.array(PageZod),
  startAlerts: Zod.array(StartAlertZod),
  simulatedAlerts: Zod.array(SimulatedAlertZod)
})

export const ConfigurationZod = Zod.object({
  apps: Zod.array(AppZod)
})

export type App = Zod.infer<typeof AppZod>
export type Page = Zod.infer<typeof PageZod>
export type PalettUrl = Zod.infer<typeof PalettUrlZod>
export type Configuration = Zod.infer<typeof ConfigurationZod>
export type StartAlert = Zod.infer<typeof StartAlertZod>
export type SimulatedAlert = Zod.infer<typeof SimulatedAlertZod>
