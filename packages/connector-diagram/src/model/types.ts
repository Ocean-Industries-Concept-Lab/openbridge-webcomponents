export type Direction = 'top' | 'right' | 'bottom' | 'left'

/**
 * Pipe value states from Figma design system.
 * Controls both color pair and stroke style.
 */
export type PipeValue =
  | 'open-flow'       // Tertiary-color outline + Primary-color fill (grey border, white fill)
  | 'open-generic'    // Same colors as open-flow
  | 'empty'           // Tertiary-inverted outline + Primary-inverted fill
  | 'medium-flow'     // Generic-border outline + Generic-background fill (teal)
  | 'enhanced'        // Enhanced-border outline + Enhanced-background fill (blue)
  | 'running'         // Running-border outline + Running-background fill (green)
  | 'closed'          // Single stroke, Tertiary-color, solid
  | 'closed-dash'     // Single stroke, Tertiary-color, dashed 2,2

/** Pipe size — controls stroke weight */
export type PipeSize = 'small' | 'medium' | 'large' | 'xl'

/**
 * Per-end terminal glyph — the four author-selectable types (toolbar cycle).
 * `undefined` = auto: a free end resolves to `cap` (the T bar), an attached
 * (component/junction) end resolves to `none` (the box/trunk caps it). An end
 * freed by deleting what it was attached to therefore shows the normal cap.
 * `arrow-out` = flow leaving this end; `arrow-in` = flow arriving at this end.
 */
export type Terminal = 'none' | 'cap' | 'arrow-in' | 'arrow-out'

/**
 * Flow-direction chevron drawn ON a pipe (Figma "direction arrow").
 * `forward` points from the pipe's `from` end toward its `to` end, `reverse`
 * the opposite, `none` draws nothing. Bindable per pipe, like `state`.
 */
export type PipeDirection = 'none' | 'forward' | 'reverse'

/**
 * Where along the pipe the direction chevron sits, measured along the drawn
 * polyline: `start` one grid step in from the `from` end, `end` one grid step
 * in from the `to` end, `center` at mid-length. Always relative to from/to,
 * independent of which way the chevron points.
 */
export type DirectionPosition = 'start' | 'center' | 'end'

export interface ViaPoint {
  id: string
  x: number
  y: number
}

/**
 * A connection end is one of three kinds (discriminated by `kind`). `kind` is
 * optional and defaults to 'component', so existing data/fixtures keep working.
 * `x`/`y` are world coordinates: authored for a component (from its box), and
 * FILLED by resolveEndpoints for junction (from the target via-point) and free.
 */
export interface ComponentEndpoint {
  kind?: 'component'
  componentId: string
  direction: Direction      // fixed by the port side
  /** Which connection point on that side, for parts declaring several (see
   *  Box.ports). Absent — the norm — means the single centred port every
   *  ordinary part has, so existing data reads back unchanged. */
  slot?: string
  x: number
  y: number
  terminal?: Terminal
}

/** Joined to another pipe at one of its via-points (a tee/cross junction). */
export interface JunctionEndpoint {
  kind: 'junction'
  ref: {connectionId: string; viaPointId: string}
  direction?: Direction     // DERIVED by resolveEndpoints (perpendicular approach)
  x: number
  y: number
  terminal?: Terminal
}

/** A loose end hanging in empty space (no component, no pipe). */
export interface FreeEndpoint {
  kind: 'free'
  x: number
  y: number                 // the clicked point; no direction — derived from route
  terminal?: Terminal
}

/** A first-class junction point shared by several pipes (a tee/cross). Owned
 *  by the scene, not by any one pipe — legs reference it by nodeId. */
export interface DiagramNode {
  id: string
  x: number
  y: number
}

/** A background grouping box drawn beneath parts and pipes; pure visuals +
 *  mini-map massing, never affects routing or flow. */
export interface Zone {
  id: string
  x: number
  y: number
  w: number
  h: number
  label?: string
  /** Perspective view path shown when the zone expands at runtime. Non-empty
   *  makes the zone an expandable region card. */
  detailView?: string
  /** Extra params for the detail view; the host injects zoneId/zoneLabel. */
  viewParams?: Record<string, unknown>
}

/** Whether a zone expands into a region modal at runtime. */
export function isExpandable(zone: Zone): boolean {
  return typeof zone.detailView === 'string' && zone.detailView !== ''
}

/** Attached to a DiagramNode. x/y are FILLED by resolveEndpoints from the
 *  node's position (stored form carries nodeId only). */
export interface NodeEndpoint {
  kind: 'node'
  nodeId: string
  x: number
  y: number
  terminal?: Terminal
}

export type ConnectionEndpoint = ComponentEndpoint | JunctionEndpoint | FreeEndpoint | NodeEndpoint

/**
 * What flows (or doesn't) through a pipe. closed → closed style and
 * empty → empty style in both view modes; an OPEN pipe draws medium-flow
 * (coloured by mediumColor) in `medium` view mode and open-flow in `regular`.
 */
export type PipeState = 'open' | 'closed' | 'empty'

/** Named medium colours — the modes of the Figma "Color-categorical" variable
 *  collection, plus 'Enhanced' (the Color/Automation/Medium highlight pair,
 *  resolved from --automation-medium-enhanced-* rather than a base family).
 *  Colours the medium-flow style when a pipe is open in `medium` view mode.
 *  Resolved from the OpenBridge palette CSS variables at runtime
 *  (mediumColorsFromCss in theme.ts); DEFAULT_THEME carries day-palette
 *  fallbacks. */
export type MediumColor =
  | 'Neutral'
  | 'Enhanced'
  | 'Blue'
  | 'Cyan'
  | 'Teal'
  | 'Green'
  | 'Yellow'
  | 'Orange'
  | 'Red'
  | 'Purple'
  | 'Indigo'

/** Scene-wide display mode — decides how OPEN pipes draw: `medium` →
 *  medium-flow coloured by mediumColor, `regular` → open-flow. closed/empty
 *  pipes look the same in both. */
export type ViewMode = 'regular' | 'medium'

/**
 * One entry of the scene's medium palette: a stable identity, the colour it
 * currently paints, what it is called ("Hot", "Cold"), and how thick its pipes
 * draw.
 *
 * The `id` is the identity — colour, label and size are all editable, so a pipe
 * that referenced any of them would lose its medium the moment someone renamed,
 * re-coloured or resized it. Two entries MAY share a colour; they are still
 * distinct mediums.
 */
export interface MediumEntry {
  id: string
  color: MediumColor
  label: string
  /**
   * Stroke size for every pipe on this medium that has not overridden it.
   *
   * Absent → 'medium', so a palette stored before mediums carried a size reads
   * back at the size those pipes already drew at.
   */
  size?: PipeSize
}

/** Scene-wide style: the view mode and the medium palette that `mediumId`
 *  resolves colour AND size through.
 *
 *  `size` is the legacy scene-wide size. Mediums now carry their own, so it is
 *  no longer author-facing (the settings modal's "Global pipe size" section is
 *  gone) and no longer participates in resolution — see styleConnection. Kept
 *  optional so existing callers and stored views still type-check. */
export interface SceneStyle {
  viewMode: ViewMode
  size?: PipeSize
  /** Absent or empty → no pipe can resolve a medium, so every pipe falls back
   *  to its own `mediumColor` and to DEFAULT_MEDIUM_SIZE. */
  mediums?: MediumEntry[]
}

export interface Connection {
  id: string
  from: ConnectionEndpoint
  to: ConnectionEndpoint
  viaPoints: ViaPoint[]
  /**
   * Stored routed corner polyline in world coords (both port points + every
   * interior corner), produced once by routePath on connect/reattach and then
   * edited directly by local moves. Absent → the router computes it on the fly
   * exactly as before, so existing data/fixtures keep working. Purely additive.
   */
  path?: import('./segment.js').Point[]
  /** Default 'open'. */
  state?: PipeState
  /** 'manual' → state is authored/bound, engine only renders it. Default 'auto'. */
  flow?: 'auto' | 'manual'
  /**
   * Whether the pipe is DRAWN. Absent or true → drawn, so every existing view
   * is unchanged.
   *
   * Purely cosmetic, and deliberately so: a hidden pipe still conducts, still
   * carries flow to whatever is downstream, and still reports port charge. Only
   * the drawing (and with it hit-testing, which reads the same segments) skips
   * it. Hiding a run therefore never changes what the REST of the diagram
   * shows — mirroring the rule that stored state 'closed' is the only
   * pipe-level blocker.
   *
   * Bind it to hide pipes per session/role/equipment without the diagram's
   * logic shifting underneath the operator.
   */
  visible?: boolean
  /**
   * The MEDIUM this pipe carries — an id into the scene's medium palette
   * (SceneStyle.mediums), not a colour. Changing what a medium means (its
   * colour) therefore repaints every pipe assigned to it.
   *
   * Absent = no medium chosen, which is the state every pipe authored before
   * mediums had identity is in. Such a pipe renders from `mediumColor` and the
   * editor prompts for a medium, so an existing view keeps its exact
   * appearance until someone assigns one.
   */
  mediumId?: string
  /**
   * Direct colour for this pipe. When unset the pipe renders its `mediumId`'s
   * colour, falling back to 'Neutral' if that medium no longer exists.
   *
   * Authored and BINDABLE (the designer's pipe binding panel writes
   * `connections.<id>.mediumColor`), so it is never removed — and it WINS over
   * `mediumId` whenever it is set, so a binding always beats the palette. That
   * is why assigning a medium in the toolbar deletes it (see setMedium):
   * without that, the stored colour would keep overriding the new medium.
   */
  mediumColor?: MediumColor
  /** Default 'inherit' → takes the size of the pipe's MEDIUM, falling back to
   *  DEFAULT_MEDIUM_SIZE. The scene-wide size plays no part; see resolveSize. */
  size?: PipeSize | 'inherit'
  /** Flow-direction chevron drawn on the pipe. Absent = 'none'. Authored and
   *  BINDABLE (`connections.<id>.direction`), like `state`. */
  direction?: PipeDirection
  /** Where the chevron sits along the pipe. Absent = 'center'. */
  directionPosition?: DirectionPosition
}

/**
 * A connection with its drawing style resolved against a SceneStyle: `value`
 * is the concrete drawing style (the drawing layer's language, unchanged from
 * the Figma design set), `size` a concrete PipeSize. Produced by
 * styleConnection() at the routing entry point — routing/drawing internals
 * only ever see styled connections.
 */
export type StyledConnection = Connection & {
  value: PipeValue
  size: PipeSize
  mediumColor: MediumColor
  state: PipeState
}

// --- Routing output ---

// The drawable segment model (grid-free, exact) lives in its own file.
export type {Point, Segment, Straight, Corner, CornerDirection, Endpoint, Arrow, DirectionArrow} from './segment.js'

// --- Drawing context ---

/**
 * Color tokens from the Figma Palette variable collection.
 * Light-mode defaults extracted from the Figma design.
 */
export interface ThemeVars {
  // Color/Automation/Pipe/*
  pipeOutlineColor: string       // Tertiary-color       rgb(83,83,83)
  pipeFillColor: string          // Primary-color        rgb(255,255,255)
  pipeOutlineInverted: string    // Tertiary-inverted    rgb(142,142,142)
  pipeFillInverted: string       // Primary-inverted     rgb(205,205,205)
  // Color/Automation/Medium/*
  genericBorder: string          // Generic-border       rgb(0,67,70)
  genericBackground: string      // Generic-background   rgb(128,202,205)
  enhancedBorder: string         // Enhanced-border      rgb(45,84,139)
  enhancedBackground: string     // Enhanced-background  rgb(93,143,213)
  runningBorder: string          // Running-border       rgb(0,98,0)
  runningBackground: string      // Running-background   rgb(57,162,52)
  /** Halo around the small/medium direction chevron, lifting it off the pipe
   *  stroke — Border/Silhouette rgb(247,247,247) in the day palette. */
  pipeDirectionHalo: string
  /** Border/background pair per named medium colour — colours the medium-flow
   *  style for open pipes. Teal = the generic medium pair. */
  mediumColors: Record<MediumColor, {border: string; background: string}>
}

// Runtime values live in sibling files (theme.ts / constants.ts) so this file
// stays pure types. Re-exported here so existing `model/types.js` imports of
// DEFAULT_THEME / GRID / STROKE_WEIGHTS / OVERLAP_HALF_GAP keep working.
export {DEFAULT_THEME, MEDIUM_COLORS, mediumColorsFromCss, themeFromCss, mediumCssVars, zoneThemeFromCss, alertColorsFromCss} from './theme.js'
export type {CssVarReader, ZoneTheme, AlertColors, AlertDotColors} from './theme.js'
export {GRID, STROKE_WEIGHTS, OVERLAP_HALF_GAP, CORNER_RADIUS} from './constants.js'
