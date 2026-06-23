# Color/Styles/Critical

Kodebasestil som speiler `Color/Styles/Alarm` i Figma **Palette**, men peker på **Critical-alarm**-primitiver i stedet for Alarm.

Denne stilen finnes **ikke** i Figma Palette — den er definert kun i kodebasen (`manual.css`).

## Unike primitive-farger per tema

| Tema        | Primitive-farger brukt                                                                 |
| ----------- | -------------------------------------------------------------------------------------- |
| Day         | `Primitives-day/Critical-alarm/400`, `450`, `500`                                      |
| Dusk BETA   | `Primitives-dusk/Critical-alarm/300`, `350`, `400` + `Primitives-dusk/Blue/500`        |
| Night BETA  | `Primitives-night/Critical/300`, `350`, `400`, `500` + `Primitives-night/Enhanced/400` |
| Bright BETA | `Primitives-day/Critical-alarm/400`, `500`, `600` + `Primitives-day/Blue/300`          |

Night bruker mappen `Critical` (ikke `Critical-alarm`) fordi `Primitives-night/Critical-alarm` ikke finnes i Figma.

## Detaljert mapping per state

| State / property    | Day                | Dusk BETA          | Night BETA   | Bright BETA        |
| ------------------- | ------------------ | ------------------ | ------------ | ------------------ |
| Enabled background  | Critical-alarm/400 | Critical-alarm/300 | Critical/400 | Critical-alarm/400 |
| Enabled border      | Critical-alarm/500 | Critical-alarm/350 | Critical/400 | Critical-alarm/600 |
| Hover background    | Critical-alarm/450 | Critical-alarm/350 | Critical/400 | Critical-alarm/500 |
| Hover border        | Critical-alarm/500 | Critical-alarm/350 | Critical/500 | Critical-alarm/600 |
| Pressed background  | Critical-alarm/500 | Critical-alarm/400 | Critical/350 | Critical-alarm/600 |
| Pressed border      | Critical-alarm/500 | Critical-alarm/350 | Critical/500 | Critical-alarm/600 |
| Focused background  | Critical-alarm/400 | Critical-alarm/300 | Critical/400 | Critical-alarm/500 |
| Focused border      | Critical-alarm/500 | Blue/500           | Enhanced/400 | Blue/300           |
| Disabled background | Critical-alarm/400 | Critical-alarm/300 | Critical/300 | Critical-alarm/400 |
| Disabled border     | Critical-alarm/400 | Critical-alarm/300 | Critical/300 | Critical-alarm/400 |

Primitive-prefikser er forkortet (f.eks. `Critical-alarm/400` = `Primitives-day/Critical-alarm/400` for Day og Bright BETA).

## Oppsummering

- **Day** og **Bright BETA** bruker `Primitives-day/Critical-alarm/*` (Bright med mørkere nyanser: 500/600).
- **Dusk BETA** bruker `Primitives-dusk/Critical-alarm/*` (300–400).
- **Night BETA** bruker `Primitives-night/Critical/*` med samme nyansenummer som Alarm bruker for `Primitives-night/Alarm/*`.
- **Focused border** er unntaket — den bruker ikke critical-farger, men blå/enhanced (samme som Alarm):
  - Dusk → `Primitives-dusk/Blue/500`
  - Night → `Primitives-night/Enhanced/400`
  - Bright → `Primitives-day/Blue/300`

## Semantiske tokens (kodebasen)

| Token                                  |
| -------------------------------------- |
| `--critical-enabled-background-color`  |
| `--critical-enabled-border-color`      |
| `--critical-hover-background-color`    |
| `--critical-hover-border-color`        |
| `--critical-pressed-background-color`  |
| `--critical-pressed-border-color`      |
| `--critical-focused-background-color`  |
| `--critical-focused-border-color`      |
| `--critical-disabled-background-color` |
| `--critical-disabled-border-color`     |
| `--on-critical-color`                  |
| `--on-critical-active-color`           |
| `--on-critical-neutral-color`          |
| `--on-critical-disabled-color`         |

## On-critical mapping per tema

| Token                      | Day                   | Dusk BETA                | Night BETA                        | Bright BETA           |
| -------------------------- | --------------------- | ------------------------ | --------------------------------- | --------------------- |
| on-critical-color          | Neutral-inverted/1000 | Neutral/1000             | Neutral-inverted-transparent/1000 | Neutral-inverted/1000 |
| on-critical-active-color   | Neutral-inverted/1000 | Neutral-transparent/1000 | OnCriticalAlarm/Active-color      | Neutral-inverted/1000 |
| on-critical-neutral-color  | Critical-alarm/050    | Neutral-transparent/1000 | OnCriticalAlarm/Neutral-color     | Neutral/000           |
| on-critical-disabled-color | Critical-alarm/200    | Neutral/030              | OnCriticalAlarm/Disabled-color    | Critical-alarm/200    |

Night bruker `Night-config/Styles/OnCriticalAlarm/*` (samme mønster som On-alarm for Night).

## Container-farger

Speiler `Color/Alert/Alarm-container-*` og `Color/Alert/Caution-container-*`, men med Critical-alarm/Notification-primitiver.

| Token                                   | Day                | Dusk BETA          | Night BETA   | Bright BETA        |
| --------------------------------------- | ------------------ | ------------------ | ------------ | ------------------ |
| alert-critical-container-background     | Critical-alarm/100 | Critical-alarm/050 | Critical/100 | Critical-alarm/150 |
| alert-critical-container-border         | Critical-alarm/200 | Critical-alarm/100 | Critical/100 | Critical-alarm/150 |
| alert-notification-container-background | Notification/050   | Notification/050   | Enhanced/100 | Notification/050   |
| alert-notification-container-border     | Notification/100   | Notification/100   | Enhanced/100 | Notification/050   |

Night har ingen `Primitives-night/Notification/*` — notification-container bruker `Primitives-night/Enhanced/100`.

| Token                                             |
| ------------------------------------------------- |
| `--alert-critical-container-background-color`     |
| `--alert-critical-container-border-color`         |
| `--alert-notification-container-background-color` |
| `--alert-notification-container-border-color`     |

Bruk med `@mixin style style=critical` (PostCSS) eller `@mixin alert-critical` (alert-mixin).
