---
paths:
  - "packages/openbridge-webcomponents/src/alert-system/**"
  - "packages/openbridge-webcomponents/src/**/alert-*-experimental/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/alerts.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Alerts

These instructions apply to the alert standards in `src/alert-system/` and the
`-experimental` alert components that draw from them: the icon, the menu item,
the lists, the menu and the small list page (#1330). The stable alert
components, the flashing tempo table and the alert button layers are in
[`ui-components.md`](../../docs/agents/ui-components.md).

## An alert standard is a tree

A standard (`alert-standard.ts`) lists its criticalities, each criticality
lists the states it can be in, and each state is defined on its own:

| Field                        | Decides                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| `glyph`                      | the icon: a frame, and a second frame to cross-fade with       |
| `sortingRank`                | where the alert sorts, lowest first                            |
| `flashingSpeed`              | the tempo; steady when left out                                |
| `includedInFilters`          | the filters that list the alert                                |
| `offeredActions`             | the actions shown as buttons                                   |
| `glyphShownInsteadOfActions` | what the action column shows for a state that offers no action |

Beside the tree a standard declares its `filters` (label and empty state, in
tab order) and its `actions` (label, and whether one click may apply it to
several alerts).

- The components know nothing else about an alert. Acknowledgement, shelving
  and categories are not concepts of the library: a standard that has them
  writes states for them, and one that does not leaves them out.
- Every state is written out, also where two differ in one field. A helper
  that derives states from flags hides the special cases a standard is made
  of. An alert that is shelved while unacknowledged is a state of its own if
  the standard tells the two apart.
- A pair the tree does not define does not exist: `StandardAlertOf` rejects
  it at compile time, and at run time the alert draws no icon, sorts last,
  offers no action and is in no filter.
- The built-in sorting ranks run 10 to 100 for what IEC 62923-1 6.4.2.1
  orders, 200 to 230 for alarms set aside, 300 and up for normal.
- The components know one id, `acknowledge`
  (`ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON`): the action the "ACK
  visible" buttons apply. They know no filter id.

| Constant                | Module                        | Criticalities                            |
| ----------------------- | ----------------------------- | ---------------------------------------- |
| `iec62923AlertStandard` | `iec-62923-alert-standard.ts` | emergency alarm, alarm, warning, caution |
| `isa182AlertStandard`   | `isa-18-2-alert-standard.ts`  | critical, high, medium, low, diagnostic  |

- IEC 62923 has the filters Unacked and Active, and acknowledges one alert
  at a time (MSC.302 9.9). Its `-acknowledge-not-allowed` states are for an
  alert acknowledged elsewhere, such as a category C alert.
- ISA-18.2 follows Figure 3 of the standard: shelved, suppressed by design
  and out of service are states, each with a filter of its own (11.2.4), and
  none of them flashes.
- A standard's name is used to say what the states follow, never more:
  "supports the alert states of ANSI/ISA-18.2", not "compliant" or
  "certified". The library is not affiliated with or endorsed by a
  standard's publisher, and the package README says so. The standard's own
  text is copyrighted: describe its states in your own words, and paste no
  definition, table or figure from it.

## Adding a standard

`defineAlertStandard()` keeps the criticality and state names as types and
rejects a state that names a filter or an action the standard lacks, and
`setAlertStandard()` draws by it.
The Custom Standard stories of the icon and the details list each define
IEC 60601-1-8 that way, in the story file, with glyphs of their own, to show
a standard the application writes; the library does not ship it.

## The alert

`StandardAlert` is `id`, `criticality`, `state` and an optional `memberOf`;
`StandardAlertOf<typeof aStandard>` narrows the pair to what the standard
defines. An application passes its own alert objects as they are. The
column factories of `obc-alert-list-details-experimental` each name the extra
fields they read (`text`, `time`, `tagId`, `acknowledgedBy`), and
`AlertListDataColumn` declares `cell` as a method so such a column fits in
`columns`.

`read-standard-alert.ts` is the only reader: `findAlertStateDefinition()`,
`compareAlertsBySortingRank()`, `isAlertIncludedInFilter()` and
`isAlertActionOffered()`. The state transitions belong to the application;
the stories stand in for it with `alert-system/stories/state-after-action.ts`.

## One standard per application

`setAlertStandard()` (`configured-alert-standard.ts`) sets the one standard
every component draws by; no component or alert names a standard. An
application uses one standard, and importing only the one it sets keeps the
other out of its bundle: the alarm and warning glyphs ISA-18.2 borrows live
in `iec-62923-alert-glyphs.ts`, apart from the IEC 62923 standard.

- Nothing is set until the application sets it. Until then no alert is
  drawn or listed, the lists, the menu and the page say "No alert standard
  is set", and the console says once how to set one. Nothing throws, so an
  application may set the standard after the elements connect.
- `AlertStandardController` re-renders a component when the standard
  changes, also one that was disconnected while it changed, and reports the
  change in `changedProperties` under `ALERT_STANDARD_CHANGE_KEY` so a list
  filters again.
- A story sets its standard with the call an application makes,
  `beforeEach: () => setAlertStandard(iec62923AlertStandard)`; the global
  `beforeEach` in `.storybook/preview.tsx` clears it first. Two standards
  cannot meet in one story.
- Stories are usage documentation: alerts are plain object literals typed
  with `StandardAlertOf`, menu items are plain markup, and what the
  application does on an action is `alert-system/stories/state-after-action.ts`.
  Story-only helpers live in `alert-system/stories/`, which the library
  build leaves out.

## The components

- `obc-alert-icon-experimental` cross-fades the two frames of a glyph through
  `FlashingController`. It fills the box it sits in, like the stable
  `obc-alert-icon`: its host stays inline, and a spec pins it.
- `obc-alert-menu-item-experimental` takes `criticality` and
  `state`, draws the icon itself, shows the first two offered actions as
  buttons and fires `action-click` with the action's id.
- `obc-alert-list-experimental` filters its slotted items by `filterId` and
  owns their `hidden` attribute; a host that gives slotted items
  `display: block` adds `::slotted([hidden]) { display: none; }`.
- `obc-alert-menu-experimental` has one tab per filter of the standard, and
  `obc-alert-list-page-small-experimental` one dropdown entry, opening on
  the first unless `filterId` is set. Both offer
  "ACK visible" only where `acknowledge` may apply to several alerts at once.
  The inherited `hasShelved` has no effect on them.
- `obc-alert-list-details-experimental` takes `filterId` and `customFilter`;
  `actionColumn()` shows a button for the first offered action and reports its
  id in `cell-click`.
- The list, menu and page extend the shared bases of their stable twins
  (`ui-components.md` § Alert lists, menu and page). The stable twins keep
  `Alert` and their own filters unchanged.

## Open

- Designs the standards borrow: the emergency alarm's off frame, glyphs for ISA-18.2 high and medium and for its shelved, suppressed and out-of-service states (#1330).
- A menu item and a table cell show at most two and one action; a state that offers more needs a design (#1330).
- IEC 60601-1-8 asks 1.4 to 2.8 Hz for a high priority, faster than the library's fast tempo (#1330).
