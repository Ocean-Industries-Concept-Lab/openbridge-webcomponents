---
name: alerts
description: Alert standards, the experimental alert icon, filters and display order
globs:
  - packages/openbridge-webcomponents/src/alert-system/**
  - packages/openbridge-webcomponents/src/alert-filter*.ts
  - packages/openbridge-webcomponents/src/**/alert-*-experimental/**
---

# Alerts

These instructions apply to the alert standards in `src/alert-system/` and the
`-experimental` alert components that draw from them: the icon, the list, the
menu and the small list page (#1330). The stable alert components, the
flashing tempo table and the alert button layers are in
[`ui-components.md`](ui-components.md).

## Alert standards

An alert standard decides what an alert looks like and how urgent it is; the
components only draw what it returns. Each one is an `AlertSystem`
(`alert-system.ts`), keyed by its id:

| Id          | Module                       | Criticalities                            |
| ----------- | ---------------------------- | ---------------------------------------- |
| `iec-62923` | `maritime-alert-system.ts`   | emergency alarm, alarm, warning, caution |
| `isa-18.2`  | `automation-alert-system.ts` | critical, high, medium, low, diagnostic  |

- `present(criticality, state, options)` returns an `AlertPresentation`: the
  condition (`active`; `cleared` while an ACK or a reset is still owed;
  `normal`), the acknowledgement (`none`, `unacked`, `acked`), silenced,
  handed over, reset owed, set aside, the flash tempo and the glyph. Nothing
  outside a standard reads its enums.
- `statesOf(criticality)` lists the states a criticality takes: an
  emergency alarm, a caution and a diagnostic alert take no ACK, so they are
  only active or normal. `present()` still answers for any state, taking one
  the criticality lacks as the nearest it has.
- `displayRank()` orders a list: an alert still owed an ACK first, then a
  cleared one owed an ACK, then an acknowledged or handed-over one, then one
  owing only a reset, then a normal one, each by criticality
  (`rankByUrgency`, IEC 62923-1 6.4.2.1). Several standards in one list
  compare these ranks.
- `allowsBulkAcknowledge` decides whether the menu and the page offer "ACK
  visible": ISA-18.2 does, IEC 62923 does not (MSC.302 9.9).
- `noAckGlyph()` picks which of the menu item's two no-ACK glyphs stands for
  an alert acknowledged elsewhere.
- A new standard is one `registerAlertSystem()` call plus an entry in the
  `AlertStandards` interface (`standard-alert.ts`) by declaration merging, so
  its alerts type-check. The Alert Icon Experimental story "Custom Standard"
  registers IEC 60601-1-8 that way; nothing else ships it.

## The alert

`StandardAlert` is a union keyed by `standard`, so the criticality and the
state are always that standard's own. The state is the one source of truth
for whether an alert is active or acknowledged; `acknowledgedBy` and
`acknowledgedAt` only say who and when. `setAside` says why the active and
unacked lists leave it out, and `noAck` that it is acknowledged somewhere
else.

`resolveAlert()` (`present-alert.ts`) finds an alert's standard and presents
it; `compareAlerts()` sorts by `displayRank()`, then by time, least important
first, because the status column sorts descending.

## The default standard

`setDefaultAlertStandard()` (`alert-standard.ts`) is for what draws without
an alert in hand: an icon given only a criticality and a state, or a menu
deciding whether to offer "ACK visible". A component's own `standard`
overrides it; `AlertStandardController` re-renders the component when the
default changes. An unknown id falls back to the default standard.

## Glyphs and the icon

A standard brings its glyphs: `AlertGlyph` is a frame, plus a second frame
when the alert flashes. `obc-alert-icon-experimental` cross-fades the two
through `FlashingController` at the standard's tempo, so it needs no table of
its own and a registered standard draws through it unchanged.

- The icon fills the box it sits in, like the stable `obc-alert-icon`: its
  host stays inline, so a menu item's icon slot or a table cell sizes it.
  `alert-icon-experimental.spec.ts` pins it; an `inline-block` host collapses
  to nothing in a slot.
- It draws nothing for a criticality or a state its standard does not have.
- The tempos are fast, slow and very slow (`ui-components.md`). IEC 60601-1-8
  asks 1.4 to 2.8 Hz for a high priority, faster than fast, so the story's
  health standard flashes fast.
- `alertSystemMatrix()` (`storybook-util.ts`) draws every criticality in
  every state it takes; the per-standard stories use it.

## Filters

`alert-filter.ts` decides what each filter mode lists, from the
presentation: `all` lists every alert, `active` and `unacked` leave set-aside
alerts out, `unacked` keeps a cleared alert until it is acknowledged,
`shelved` lists what an operator set aside (shelved, paused, off), `blocked`
what the system did (blocked, suppressed, out of service), and `custom` runs
the consumer's predicate. `canAcknowledge()` is false for an alert handed
over or acknowledged elsewhere.

- Only the experimental list, menu and page filter through it. A stable
  member keeps its own filter, since changing what a stable tab lists breaks
  consumers (#1300).
- `alertMenuItemState()` and `alertMenuItemStatus()` map a menu item to and
  from that state; `alert-menu-item-state.spec.ts` pins that an item and its
  alert pass the same filters.
- `obc-alert-list-experimental` owns its items' `hidden` attribute, since CSS
  cannot run a consumer's predicate; a host that gives slotted items
  `display: block` adds `::slotted([hidden]) { display: none; }`.

## The experimental twins

`obc-alert-list-experimental`, `obc-alert-menu-experimental` and
`obc-alert-list-page-small-experimental` extend the shared bases of their
stable twins (`ui-components.md` § Alert lists, menu and page) and override
only their filtering and their alert type. `obc-alert-list-details-experimental`
is a table of its own, with no stable base. All four take `StandardAlert`;
the stable twins keep `Alert` unchanged.

## Open

- The contract still lacks a state label, the actions an alert offers, the lists and set-aside reasons each standard declares, and site priorities; the latched and set-aside states await a decision (#1330).
- Designs the standards borrow: the emergency alarm's off frame, red or magenta for the most critical level, and a glyph for a latched alarm that owes a reset (#1330).
