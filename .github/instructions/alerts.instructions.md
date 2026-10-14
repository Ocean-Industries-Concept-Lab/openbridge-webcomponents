---
applyTo: "packages/openbridge-webcomponents/src/alert-system/**,packages/openbridge-webcomponents/src/**/alert-*-experimental/**"
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
- A pair the tree does not define does not exist: `StandardAlert` rejects it
  at compile time, and at run time the alert draws no icon, sorts last,
  offers no action and is in no filter. Nothing falls back to another
  standard.
- Sorting ranks are compared as they are across standards. The built-in ones
  share a scale: 10 to 100 for what IEC 62923-1 6.4.2.1 orders, 200 to 230
  for alarms set aside, 300 and up for normal.
- The components know one id, `acknowledge`
  (`ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON`): the action the "ACK
  visible" buttons apply. They know no filter id. Each standard writes its
  own, and alerts of two standards meet in one tab where the ids match, as
  `unacked` and `active` do in the built-in ones.

| Id          | Module                        | Criticalities                            |
| ----------- | ----------------------------- | ---------------------------------------- |
| `iec-62923` | `iec-62923-alert-standard.ts` | emergency alarm, alarm, warning, caution |
| `isa-18.2`  | `isa-18-2-alert-standard.ts`  | critical, high, medium, low, diagnostic  |

- `iec-62923` has the filters Unacked and Active, and acknowledges one alert
  at a time (MSC.302 9.9). Its `-acknowledge-not-allowed` states are for an
  alert acknowledged elsewhere, such as a category C alert.
- `isa-18.2` follows Figure 3 of the standard: shelved, suppressed by design
  and out of service are states, each with a filter of its own (11.2.4), and
  none of them flashes.

## Adding a standard

`defineAlertStandard()` keeps the criticality and state names as types and
rejects a state that names a filter or an action the standard lacks.
`registerAlertStandard()` makes it drawable, and an entry in
`RegisteredAlertStandards` (`standard-alert.ts`) by declaration merging makes
its alerts type-check. `storybook-util.ts` defines IEC 60601-1-8 that way,
with glyphs of its own; the library does not ship it.

## The alert

`StandardAlert` is `id`, `standard`, `criticality`, `state` and an optional
`memberOf`. An application passes its own alert objects as they are. The
column factories of `obc-alert-list-details-experimental` each name the extra
fields they read (`text`, `time`, `tagId`, `acknowledgedBy`), and
`AlertListDataColumn` declares `cell` as a method so such a column fits in
`columns`.

`read-standard-alert.ts` is the only reader: `findAlertStateDefinition()`,
`compareAlertsBySortingRank()`, `isAlertIncludedInFilter()` and
`isAlertActionOffered()`. The state transitions belong to the application;
the stories stand in for it with a table in `storybook-util.ts`.

## The default standard

`setDefaultAlertStandard()` (`alert-standard-registry.ts`) is for what draws
without naming a standard: a menu deciding its tabs, or an icon given only a
criticality and a state. A component's own `standard` overrides it, and
`AlertStandardController` re-renders the component when the default or the
registry changes.

## The components

- `obc-alert-icon-experimental` cross-fades the two frames of a glyph through
  `FlashingController`. It fills the box it sits in, like the stable
  `obc-alert-icon`: its host stays inline, and a spec pins it.
- `obc-alert-menu-item-experimental` takes `standard`, `criticality` and
  `state`, draws the icon itself, shows the first two offered actions as
  buttons and fires `action-click` with the action's id.
- `obc-alert-list-experimental` filters its slotted items by `filterId` and
  owns their `hidden` attribute; a host that gives slotted items
  `display: block` adds `::slotted([hidden]) { display: none; }`.
- `obc-alert-menu-experimental` has one tab per filter of its standard, and
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
