<template>
  <div class="icon-list-container" :class="{ 'has-detail-open': selectedIcon !== null }">
    <div class="top">
      <div class="container">
        <div class="input-form card">
          <ObcTextInputField
            placeholder="Search for icons"
            class="icon-search"
            :hasLeadingIcon="true"
            @input="onInput"
          >
            <obi-search slot="leading-icon"></obi-search>
          </ObcTextInputField>
          <ObcDropdownButton
            :options="filterOptions"
            :value="filterValue"
            class="icon-filter"
            full-width
            @change="onFilterChange"
          >
          </ObcDropdownButton>
          <ObcToggleButtonGroup
            :value="bridgeStore.palette"
            class="palette-toggle"
            :type="ObcToggleButtonOptionType.icon"
            @value="onPaletteChange"
          >
            <ObcToggleButtonOption value="night" :type="ObcToggleButtonOptionType.icon">
              <obi-palette-night slot="icon"></obi-palette-night>
            </ObcToggleButtonOption>
            <ObcToggleButtonOption value="dusk" :type="ObcToggleButtonOptionType.icon">
              <obi-palette-dusk slot="icon"></obi-palette-dusk>
            </ObcToggleButtonOption>
            <ObcToggleButtonOption value="day" :type="ObcToggleButtonOptionType.icon">
              <obi-palette-day slot="icon"></obi-palette-day>
            </ObcToggleButtonOption>
            <ObcToggleButtonOption value="bright" :type="ObcToggleButtonOptionType.icon">
              <obi-palette-day-bright slot="icon"></obi-palette-day-bright>
            </ObcToggleButtonOption>
          </ObcToggleButtonGroup>
        </div>
      </div>
    </div>
    <div class="container result">
      <div class="info-container">
        <ObcElevatedCard
          has-trailing-icon
          :size="ObcElevatedCardSize.MultiLine"
          class="info-button"
          href="https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/releases/download/v0.0.15/OpenBidge.icons.zip"
        >
          <div slot="label">Download all icons</div>
          <span slot="description">Download all icons as SVG files.</span>
          <obi-file-download-google slot="trailing-icon" />
        </ObcElevatedCard>
        <ObcElevatedCard
          class="info-button"
          has-trailing-icon
          :size="ObcElevatedCardSize.MultiLine"
          href="https://www.figma.com/community/file/1445713209741917748/openbridge-icon-pack"
          target="_top"
        >
          <div slot="label">OpenBridge Figma</div>
          <span slot="description"
            >Go to Openbridge Icons to access the icon library directly in figma</span
          >
          <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
        </ObcElevatedCard>
        <ObcElevatedCard
          class="info-button"
          has-trailing-icon
          :size="ObcElevatedCardSize.MultiLine"
          href="https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents"
          target="_top"
        >
          <div slot="label">OpenBridge Github</div>
          <span slot="description">Go to Github to see the coded OpenBridge design system. </span>
          <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
        </ObcElevatedCard>
      </div>
      <div ref="contentContainer" class="content-container">
        <div v-for="(group, groupKey) in icons" :key="groupKey" class="main-catergory">
          <div class="font-ui-title color-element-neutral title">{{ groupKey }}</div>
          <div v-for="(subgroup, subgroupKey) in group" :key="subgroupKey" class="sub-category">
            <div class="font-ui-subtitle color-element-neutral subtitle">{{ subgroupKey }}</div>
            <div class="icon-list">
              <button
                v-for="icon in subgroup"
                :key="icon.name"
                class="icon-item"
                :class="{ selected: selectedIcon?.name === icon.name }"
                :title="icon.name"
                @click="openIconDialog(icon)"
              >
                <span class="color-element-active icon" v-html="icon.icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedIcon" class="icon-detail-wrapper">
      <ObcCard class="icon-detail-panel" :showTitle="false">
        <ObcIconButton
          class="panel-close"
          :variant="IconButtonVariant.flat"
          size="regular"
          aria-label="Close"
          @click="closeIconDialog"
        >
          <obi-close-google></obi-close-google>
        </ObcIconButton>

        <div class="panel-content">
          <div class="preview">
            <span class="preview-icon color-element-active" v-html="selectedIcon.icon"></span>
          </div>
          <div class="panel-info">
            <div class="panel-name font-ui-title color-element-active">
              {{ selectedIcon.name }}
            </div>
            <div class="panel-actions">
              <ObcButton
                :variant="ButtonVariant.raised"
                :showLeadingIcon="true"
                @click="copy(importSnippet(selectedIcon.name), 'import')"
              >
                <obi-check-google v-if="copied === 'import'" slot="leading-icon"></obi-check-google>
                <obi-content-copy-google v-else slot="leading-icon"></obi-content-copy-google>
                {{ copied === 'import' ? 'Copied!' : 'Copy import' }}
              </ObcButton>
              <ObcButton
                :variant="ButtonVariant.raised"
                :showLeadingIcon="true"
                @click="copy(tagSnippet(selectedIcon.name), 'tag')"
              >
                <obi-check-google v-if="copied === 'tag'" slot="leading-icon"></obi-check-google>
                <obi-content-copy-google v-else slot="leading-icon"></obi-content-copy-google>
                {{ copied === 'tag' ? 'Copied!' : 'Copy tag' }}
              </ObcButton>
            </div>
          </div>
        </div>
      </ObcCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconIds } from '@oicl/openbridge-webcomponents/src/icons/names'
import { icon2element } from '@/business/icon2element'
import ObcTextInputField from '@oicl/openbridge-webcomponents-vue/components/text-input-field/ObcTextInputField.vue'
import { watch } from 'vue'
import { IconButtonVariant } from '@oicl/openbridge-webcomponents/dist/components/icon-button/icon-button'
import ObcIconButton from '@oicl/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import { useBridgeStore } from '@/stores/bridge'
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import { ObcToggleButtonOptionType } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'
import ObcDropdownButton from '@oicl/openbridge-webcomponents-vue/components/dropdown-button/ObcDropdownButton.vue'
import { computed } from 'vue'
import ObcElevatedCard from '@oicl/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'
import { ObcElevatedCardSize } from '@oicl/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import ObcCard from '@oicl/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import { ButtonVariant } from '@oicl/openbridge-webcomponents/dist/components/button/button'
import '@oicl/openbridge-webcomponents/dist/icons/icon-close-google'
import '@oicl/openbridge-webcomponents/dist/icons/icon-content-copy-google'
import '@oicl/openbridge-webcomponents/dist/icons/icon-check-google'

const search = ref('')
const bridgeStore = useBridgeStore()
const hasScrolled = ref(false)
const contentContainer = ref<HTMLElement | null>(null)

function onInput(v: CustomEvent) {
  search.value = (v.target as HTMLInputElement).value
  if (!hasScrolled.value && contentContainer.value) {
    hasScrolled.value = true
    const y = contentContainer.value.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: y - 180, behavior: 'smooth' })
  }
}

function onPaletteChange(v: CustomEvent) {
  bridgeStore.setPalette(v.detail.value)
}

interface Icon {
  name: string
  icon: string
}

const groups = {
  'UI icons': ['Communication and media', 'Data and metrics', 'General', 'Systems and devices'],
  'Alert icons': ['General alerts', 'Additional alert icons', 'Alerts'],
  'Application icons': ['Applications'],
  'Maritime icons': [
    'Targets',
    'Chart display',
    'Navigation and operation',
    'Objects and equipment',
    'Paper chart symbols',
    'Command and users',
    'Chart targets'
  ],
  'Weather & Environment icons': ['Forecast', 'General'],
  'Automation icons': [
    'Automation system',
    'Electricity',
    'Motors, pumps and fans',
    'Pipes, wires, lines and ducts',
    'Switches',
    'Valves '
  ],
  Cursors: ['Cursors']
}

const filterValue = ref('All')
function onFilterChange(v: CustomEvent) {
  filterValue.value = v.detail.value
}

const filterOptions = computed(() => {
  return [
    {
      label: 'All categories',
      value: 'All'
    },
    ...Object.entries(groups).flatMap(([group, subgroups]) => {
      if (subgroups.length === 1) {
        return [
          {
            label: group,
            value: group
          }
        ]
      }
      return [
        {
          label: group,
          value: group
        },
        ...subgroups.map((subgroup) => ({
          label: subgroup,
          value: `${group}-${subgroup}`,
          level: 3
        }))
      ]
    }),
    {
      label: 'IEC',
      value: 'IEC'
    }
  ]
})

const icons = ref<Record<string, Record<string, Icon[]>>>({})

function updateIconList() {
  const filteredIcons: Icon[] = Object.keys(iconIds)
    .filter((iconId) => {
      return iconId.toLowerCase().includes(search.value.toLowerCase())
    })
    .map((icon) => {
      return { name: icon, icon: icon2element(icon, { useCssColor: true }) }
    })
  // icon mapped in groups and subgroups
  const grouped: Record<string, Record<string, Icon[]>> = {}

  // prefill the grouped object with empty arrays
  for (const [group, subgroups] of Object.entries(groups)) {
    grouped[group] = {}
    for (const subgroup of subgroups) {
      grouped[group][subgroup] = []
    }
  }

  for (const iconId of filteredIcons) {
    const categories = iconIds[iconId.name]
    if (!categories) {
      continue
    }
    const [group, subgroup] = categories
    try {
      if (
        group !== undefined &&
        subgroup !== undefined &&
        grouped[group] &&
        grouped[group][subgroup]
      ) {
        grouped[group][subgroup].push(iconId)
      }
    } catch {
      console.error(`Error adding icon ${iconId.name} to group ${group} and subgroup ${subgroup}`)
    }
  }
  // Make an IEC group
  const iecIcons = filteredIcons.filter((icon) => icon.name.endsWith('iec'))
  grouped.IEC = {
    IEC: iecIcons
  }

  // remove empty subgroups
  for (const [group, subgroups] of Object.entries(grouped)) {
    for (const [subgroup, icons] of Object.entries(subgroups)) {
      if (icons.length === 0 && grouped[group] && grouped[group][subgroup]) {
        delete grouped[group][subgroup]
      }
    }
    if (grouped[group] && Object.keys(grouped[group]).length === 0) {
      delete grouped[group]
    }
  }

  // show only the selected category
  if (filterValue.value !== 'All') {
    const [group, subgroup] = filterValue.value.split('-')
    if (
      group === undefined ||
      subgroup === undefined ||
      grouped[group] === undefined ||
      grouped[group][subgroup] === undefined
    ) {
      return
    }
    if (subgroup) {
      icons.value = {
        [group]: {
          [subgroup]: grouped[group][subgroup]
        }
      }
    } else {
      icons.value = {
        [group]: grouped[group]
      }
    }
    return
  }
  icons.value = grouped
}

watch([search, filterValue], updateIconList, { immediate: true })

// Icon details dialog with copy-to-clipboard
const selectedIcon = ref<Icon | null>(null)
const copied = ref<'tag' | 'import' | null>(null)
let copiedTimeout: number | undefined

function openIconDialog(icon: Icon) {
  selectedIcon.value = icon
  copied.value = null
}

function closeIconDialog() {
  selectedIcon.value = null
  copied.value = null
  if (copiedTimeout !== undefined) {
    window.clearTimeout(copiedTimeout)
    copiedTimeout = undefined
  }
}

function tagSnippet(name: string): string {
  return `<obi-${name}></obi-${name}>`
}

function importSnippet(name: string): string {
  return `import '@oicl/openbridge-webcomponents/dist/icons/icon-${name}.js'`
}

async function copy(text: string, kind: 'tag' | 'import') {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copied.value = kind
  if (copiedTimeout !== undefined) {
    window.clearTimeout(copiedTimeout)
  }
  copiedTimeout = window.setTimeout(() => {
    copied.value = null
    copiedTimeout = undefined
  }, 1500)
}
</script>

<style scoped>
.icon-list-container {
  isolation: isolate;
}

.icon-list-container.has-detail-open {
  padding-bottom: 200px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.main-catergory {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 4px;
}

.icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border-radius: 6px;
  min-width: 0;
  aspect-ratio: 1;
  transition: background-color 0.12s ease-out;
}

.icon-item:hover {
  background-color: var(--button-flat-hover-background-color, rgba(255, 255, 255, 0.04));
}

.icon-item.selected {
  background-color: var(--button-flat-active-background-color, rgba(255, 255, 255, 0.08));
}

.icon {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon :deep(svg) {
  width: 32px;
  height: 32px;
}

/* Native button reset */
.icon-item {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
}


.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  padding-top: 48px;
  max-width: 1024px;
  margin: 0 auto;

  @media screen and (max-width: 680px) {
    padding: 12px;
  }

  &.result {
    min-height: calc(100vh + 150px);
  }
}

.top {
  box-shadow: var(--shadow-flat);
  position: sticky;
  top: 0;
  background-color: var(--container-background-color);
}

.info-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    flex-basis: 320px;
    flex-grow: 1;
  }
}

.input-form {
  display: grid;
  grid-template-columns: 1fr 1fr min-content min-content;
  grid-template-areas: 'search filter palette';
  justify-content: stretch;
  gap: 16px;
  row-gap: 0;
  flex-wrap: wrap;

  padding-bottom: 24px;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr min-content min-content;

    grid-template-areas:
      'search search search'
      'filter palette';
  }

  @media screen and (max-width: 680px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'search'
      'filter'
      'palette';
    padding-bottom: 0;
  }

  .icon-search {
    min-width: 250px;
    grid-area: search;
  }

  .icon-filter {
    min-width: 270px;
    grid-area: filter;
  }

  .palette-toggle {
    min-width: 192px;
    grid-area: palette;
  }
}

.info-button::part(wrapper) {
  background-color: var(--container-global-color);
}

.title {
  margin-bottom: 0;
}

.subtitle {
  padding-bottom: 16px;
}

.icon-detail-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 16px;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 0 16px;
}

.icon-detail-panel {
  position: relative;
  width: 560px;
  max-width: 100%;
  pointer-events: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.icon-detail-panel::part(content) {
  padding: 0;
}

.panel-close {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.panel-content {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  padding: 20px;
  padding-right: 56px;
  align-items: center;

  @media screen and (max-width: 520px) {
    grid-template-columns: 1fr;
    padding: 20px;
    padding-top: 56px;
  }
}

.preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: var(--container-global-color, rgba(0, 0, 0, 0.04));
  border-radius: 6px;
  flex-shrink: 0;
  justify-self: start;
}

.preview-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.preview-icon :deep(*) {
  width: 72px;
  height: 72px;
}

.preview-icon :deep(svg) {
  width: 72px;
  height: 72px;
  display: block;
}

.panel-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  align-items: flex-start;
}

.panel-name {
  font-size: 18px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  min-width: 0;
}

.panel-actions {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
}

.panel-actions obc-button {
  flex-shrink: 0;
  min-width: 140px;
}
</style>
