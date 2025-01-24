<template>
  <div>
    <div class="top">
      <div class="container">
        <div class="input-form card">
          <ObcInput
            v-model="search"
            placeholder="Search for icons"
            class="icon-search"
            @input="onInput"
            claas="icon-search"
          >
            <obi-search slot="icon"></obi-search>
          </ObcInput>
          <ObcSelect
            :options="filterOptions"
            :value="filterValue"
            @change="onFilterChange"
            class="icon-filter"
            fullWidth
          >
          </ObcSelect>
          <ObcButton
            hug-text
            class="icon-download"
            href="https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/releases/download/v0.0.15/OpenBidge.icons.zip"
          >
            Download all
            <obi-file-download-google slot="leading-icon" />
          </ObcButton>
          <ObcToggleButtonGroup
            :value="bridgeStore.palette"
            @value="onPaletteChange"
            class="palette-toggle"
          >
            <ObcToggleButtonOption value="night">
              <obi-palette-night slot="icon"></obi-palette-night>
            </ObcToggleButtonOption>
            <ObcToggleButtonOption value="dusk">
              <obi-palette-dusk slot="icon"></obi-palette-dusk>
            </ObcToggleButtonOption>
            <ObcToggleButtonOption value="day">
              <obi-palette-day slot="icon"></obi-palette-day>
            </ObcToggleButtonOption>
            <ObcToggleButtonOption value="bright">
              <obi-palette-day-bright slot="icon"></obi-palette-day-bright>
            </ObcToggleButtonOption>
          </ObcToggleButtonGroup>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="info-container">
        <ObcRichButton
          class="info-button"
          hasTrailingIcon
          size="multi-line"
          href="https://www.figma.com/community/file/1445713209741917748/openbridge-icon-pack"
          target="_top"
        >
          <div slot="label">OpenBridge Figma</div>
          <span slot="description"
            >Go to Openbridge Icons to access the icon library directly in figma</span
          >
          <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
        </ObcRichButton>
        <ObcRichButton
          class="info-button"
          hasTrailingIcon
          size="multi-line"
          href="https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents"
          target="_top"
        >
          <div slot="label">OpenBridge Github</div>
          <span slot="description">Go to Github to see the coded OpenBridge design system. </span>
          <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
        </ObcRichButton>
      </div>
      <div class="content-container">
        <div class="main-catergory" v-for="(group, groupKey) in icons" :key="groupKey">
          <div class="font-ui-title color-element-neutral title">{{ groupKey }}</div>
          <div v-for="(subgroup, subgroupKey) in group" :key="subgroupKey" class="sub-category">
            <div class="font-ui-subtitle color-element-neutral subtitle">{{ subgroupKey }}</div>
            <div class="icon-list">
              <div v-for="icon in subgroup" :key="icon.name" class="icon-item font-ui-label">
                <ObcIconButton class="color-element-active icon" variant="flat" size="large">
                  <span v-html="icon.icon"></span>
                </ObcIconButton>
                <span class="color-element-neutral icon-description">{{ icon.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconIds } from '@oicl/openbridge-webcomponents/src/icons/names'
import { icon2element } from '@/business/icon2element'
import ObcInput from '@oicl/openbridge-webcomponents-vue/components/input/ObcInput.vue'
import { watch } from 'vue'
import ObcButton from '@oicl/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import ObcIconButton from '@oicl/openbridge-webcomponents-vue/components/icon-button/ObcIconButton.vue'
import { useBridgeStore } from '@/stores/bridge'
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'
import ObcSelect from '@oicl/openbridge-webcomponents-vue/components/select/ObcSelect.vue'
import { computed } from 'vue'
import ObcRichButton from '@oicl/openbridge-webcomponents-vue/components/rich-button/ObcRichButton.vue'

const search = ref('')
const bridgeStore = useBridgeStore()

function onInput(v: CustomEvent) {
  search.value = (v.target as HTMLInputElement).value
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
  'Alert icons': ['Additional alert icons', 'Alerts'],
  'App Icons': ['App icons'],
  Maritime: [
    'Targets',
    'Chart display',
    'Navigation and operation',
    'Objects and equipment',
    'Paper chart symbols',
    'Command and users'
  ],
  'Weather & Environment': ['Forecast', 'General'],
  Automation: [
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
    grouped[group][subgroup].push(iconId)
  }
  // Make an IEC group
  const iecIcons = filteredIcons.filter((icon) => icon.name.endsWith('iec'))
  grouped.IEC = {
    IEC: iecIcons
  }

  // remove empty subgroups
  for (const [group, subgroups] of Object.entries(grouped)) {
    for (const [subgroup, icons] of Object.entries(subgroups)) {
      if (icons.length === 0) {
        delete grouped[group][subgroup]
      }
    }
    if (Object.keys(grouped[group]).length === 0) {
      delete grouped[group]
    }
  }

  // show only the selected category
  if (filterValue.value !== 'All') {
    const [group, subgroup] = filterValue.value.split('-')
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
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.main-catergory {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 24px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.icon::part(icon) {
  width: 36px;
  height: 36px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  padding-top: 48px;
  max-width: 1024px;
  margin: 0 auto;
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
  grid-template-areas: 'search filter download palette';
  justify-content: stretch;
  gap: 16px;
  row-gap: 0;
  flex-wrap: wrap;

  padding-bottom: 24px;

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr min-content min-content;

    grid-template-areas:
      'search search search'
      'filter download palette';
  }

  @media screen and (max-width: 680px) {
    grid-template-columns: min-content 1fr;
    grid-template-areas:
      'search search'
      'filter filter'
      'download palette';
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'search'
      'filter'
      'download'
      'palette';
  }

  .icon-search {
    min-width: 250px;
    grid-area: search;
  }

  .icon-filter {
    min-width: 270px;
    grid-area: filter;
  }

  .icon-download {
    min-width: 160px;
    grid-area: download;
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
  margin-bottom: -48px;
}

.subtitle {
  padding-bottom: 24px;
}

.icon-description {
  color: var(--element-neutral-color, rgba(0, 0, 0, 0.59));
  text-align: center;
  font-feature-settings:
    'ss02' on,
    'liga' off,
    'clig' off;
  font-family: 'Noto Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 370;
  line-height: 24px;
  /* 150% */
}
</style>
