# POI Component Refactor Summary

## Overview

This document summarizes the property naming refactor for POI (Point of Interest) components and the current state of issues.

## Changes Made

### 1. Property Renaming in `poi-target-button.ts`

**Changed:**

- `visualState` property → `value` property
- Property still reflects to HTML attribute as `value` (not `visualstate`)
- Enum `PoiTargetButtonVisualState` → kept but also exported as `PoiTargetValue`

**Interface/Type Changes:**

- `ObcPoiTargetButtonDatum` → `ObcPoiTargetButtonData`
- Property `values` → `data`
- Property `selectedId` → removed, replaced with `header` object

**New Properties:**

- `header: ObcPoiTargetButtonHeader | null` - Contains:
  - `content?: string` (the ID/label text)
  - `size?: string`
  - `state?: string`
  - `type?: string`
  - `hasIndicator?: boolean`
- Computed getters:
  - `hasData`: boolean (returns `this.data.length > 0`)
  - `hasHeader`: boolean (returns `this.header !== null`)

### 2. Property Renaming in `poi-target.ts`

**Changed:**

- `visualState` property → `value` property
- Old `value` property (TargetValue enum) → `state` property
- `values` array → `data` array
- `selectedId` → removed (now computed into `header` internally, or header passed directly)

**New Enum:**

```typescript
export enum TargetState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}
```

**Export Alias:**

```typescript
export {PoiTargetButtonVisualState as PoiTargetValue};
```

### 3. CSS Updates

**Changed:**

- `poi-target-button.css`: Attribute selectors changed from `[visualstate="overlapped"]` to `[value="overlapped"]`
- Added enhanced type handling for overlapped state: `&.type-enhanced { --poi-size: 36px; }`
- Removed inline custom property settings from CSS (handled by JS functions)
- CSS class names: `has-values` → `has-data`, `has-id-label` → `has-header`

### 4. File Consolidation in `poi-layer`

**Changed:**

- Merged `grouping-utils.ts` content into `poi-layer.ts` (functions inlined)
- Deleted `crossing-utils.ts` (was unused dead code)
- Updated imports from `PoiTargetVisualState` to `PoiTargetValue`
- Updated property usage from `.visualState` to `.value`

**Inlined Functions:**

- `buildClusters<T>()` - DFS clustering algorithm
- `checkOverlap()` - Rectangle overlap detection
- `buildAdjacencyMaps<T>()` - Adjacency map builder
- `GroupingThresholds` interface

### 5. Story Files Updated

**Files:**

- `poi-target.stories.ts`
- `poi-target-button.stories.ts`
- `poi-group.stories.ts`

**Changes:**

- Updated enum references: `PoiTargetVisualState` → `PoiTargetValue`
- Updated property names: `visualState` → `value`
- Updated `selectedId` → `header={{content: "X"}}`
- Updated `values` → `data`

### 6. Other Component Updates

**poi-group.ts:**

- Updated imports and property references
- Changed `child.visualState` to `child.value`
- Updated enum references

**poi-layer-stack.ts:**

- Updated `setTargetSelectedId()` to set `target.header = {content: id}`
- Updated `clearTargetSelectedId()` to set `target.header = null`
- Removed `showId` property references (no longer exists)

## Current State

### What's Working

✅ Property naming is consistent across all files
✅ TypeScript compiles without errors
✅ Story files are updated
✅ CSS selectors match new attribute names
✅ POI group overlapping animations work correctly

### Known Issues

#### 1. POI Layer Smooth Overlapping Not Working

**Symptom:** Overlapping transitions in `poi-layer` are not smooth like they are in `poi-group`

**Root Cause:** The layer uses `applyStandaloneVisualState()` and `clearStandaloneVisualState()` functions that set inline CSS custom properties. These inline styles may conflict with or override the CSS transitions triggered by the `[value="overlapped"]` attribute selector.

**Key Difference:**

- `poi-group.ts` just sets `target.value = PoiTargetValue.Overlapped` and lets CSS handle styling
- `poi-layer.ts` sets both the `value` attribute AND calls `applyStandaloneVisualState()` which sets inline styles

**The Functions:**

```typescript
private applyStandaloneVisualState(target: ObcPoiTarget, overlap: boolean) {
  const isEnhanced = target.type === ObcPoiTargetButtonType.Enhanced;
  const size = this.getVisualTargetSize(isEnhanced, overlap);
  target.style.setProperty('--poi-size', `${size}px`);
  target.style.setProperty('--obc-poi-target-icon-opacity', overlap ? '0' : '1');
  target.style.setProperty('--obc-poi-overlap', overlap ? '1' : '0');
  target.style.setProperty('--obc-poi-overlap-elements-opacity', overlap ? '0' : '1');
  target.style.setProperty('--obc-poi-label-opacity', overlap ? '0' : '1');
  target.style.setProperty('--obc-poi-label-visibility', overlap ? 'hidden' : 'visible');
  target.style.setProperty('--obc-poi-overlap-pointer-events', overlap ? 'none' : 'auto');
}
```

**These functions are called at:**

- Line 294: `handleGroupExpand` when group expands
- Line 946: Main grouping logic for standalone targets
- Line 950: Clearing state for non-standalone targets
- Line 1046: When target joins a group

#### 2. CSS Property Conflict

**Issue:** The CSS rule `:host([value="overlapped"])` originally set properties like `--poi-size: 32px`, but these were removed to avoid conflict with inline styles. However, this means the CSS no longer drives the transitions.

**Current CSS State:**

```css
:host([value='overlapped']) & {
  width: 48px;
  height: 48px;
  /* Note: --poi-size is set dynamically by applyStandaloneVisualState in poi-layer */
  /* Note: opacity and visibility props are set dynamically by applyStandaloneVisualState */

  .button-wrapper {
    align-items: flex-end;
  }
}
```

## What Needs To Be Fixed

### Option 1: Remove Inline Style Functions (Simpler)

Remove `applyStandaloneVisualState()` and `clearStandaloneVisualState()` calls and restore CSS properties to handle everything via attribute selectors, like `poi-group` does.

**Pros:** Simple, consistent with poi-group, CSS transitions work naturally
**Cons:** Loses dynamic size calculation via `getVisualTargetSize()` that reads CSS variables

### Option 2: Make Inline Styles Work With Transitions (Complex)

Keep the functions but ensure CSS transitions still work. This requires:

1. CSS transitions must be on the properties that USE the custom properties (width/height), not the custom properties themselves
2. Ensure inline styles don't override transition-triggering CSS
3. May need to use `requestAnimationFrame` to separate attribute and inline style changes

**Pros:** Keeps dynamic sizing logic, maintains configurability via CSS variables
**Cons:** More complex, harder to debug

### Option 3: Hybrid Approach

Set the `value` attribute and let CSS handle base transitions, but use inline styles only for dynamic sizing differences (like enhanced vs regular type).

## Key Files Modified

```
src/ar/poi-target/poi-target.ts
src/ar/poi-target-button/poi-target-button.ts
src/ar/poi-target-button/poi-target-button.css
src/ar/poi-layer/poi-layer.ts
src/ar/poi-layer/poi-layer.css (minimal changes)
src/ar/poi-group/poi-group.ts
src/ar/poi-layer-stack/poi-layer-stack.ts
src/ar/poi-target/poi-target.stories.ts
src/ar/poi-target-button/poi-target-button.stories.ts
src/ar/poi-group/poi-group.stories.ts
```

## Files Deleted

```
src/ar/poi-layer/grouping-utils.ts (merged into poi-layer.ts)
src/ar/poi-layer/crossing-utils.ts (unused dead code)
```

## Migration Notes for Users

### Breaking Changes

1. `visualState` property is now `value`
2. `selectedId` property is now `header` object
3. `values` array is now `data` array
4. `TargetValue` enum is now `TargetState`
5. Import `PoiTargetValue` instead of `PoiTargetVisualState`

### Code Migration Examples

**Before:**

```typescript
target.visualState = PoiTargetVisualState.Overlapped;
target.selectedId = '123';
target.values = [{value: '10', label: 'Speed', unit: 'kts'}];
```

**After:**

```typescript
target.value = PoiTargetValue.Overlapped;
target.header = {content: '123'};
target.data = [{value: '10', label: 'Speed', unit: 'kts'}];
```

**HTML Before:**

```html
<obc-poi-target
  selectedId="1"
  values='[{"value":"10","label":"Lab","unit":"Unit"}]'
></obc-poi-target>
```

**HTML After:**

```html
<obc-poi-target .header={{content: "1"}} .data=${[{value:"10",label:"Lab",unit:"Unit"}]}></obc-poi-target>
```

## Recommendations for Next Steps

1. **Test poi-group overlapping** - Verify it still works correctly (should work)
2. **Debug poi-layer overlapping** - Use browser DevTools to:
   - Check if `value` attribute is changing correctly
   - Inspect computed styles during transition
   - Check if inline styles are overriding CSS
   - Monitor timing of attribute vs inline style changes
3. **Consider Option 1** (remove inline functions) as the simplest path forward
4. **Update MIGRATION-POI-LAYER.md** with final property names and examples

## Testing Checklist

- [ ] poi-group smooth overlapping works
- [ ] poi-layer smooth overlapping works
- [ ] Enhanced type sizing correct when overlapped (36px vs 32px)
- [ ] Transitions work in both directions (overlap ↔ normal)
- [ ] Header content displays correctly
- [ ] Data values display correctly
- [ ] All story examples work
- [ ] No TypeScript errors
- [ ] No console errors in Storybook
