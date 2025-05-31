<template>
    <div class="screen-control-container">
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
    <div class="screen-container">
        <div class="screen-row upper-screens">
            <div class="screen-item" v-for="screen in upperScreens" :key="screen.name">
                <div class="screen">
                    <ObiIcon :icon="screen.pageIcon" class="screen-icon" />
                    <div class="screen-item-text font-ui-button">{{ screen.page }}</div>
                </div>
                <div class="screen-name font-ui-label">Screen {{ screen.name }}</div>
            </div>
        </div>
        <div class="screen-row middle-screens">
            <div class="screen-item" v-for="screen in middleScreens" :key="screen.name">
                <div class="screen">
                    <ObiIcon :icon="screen.pageIcon" class="screen-icon" />
                    <div class="screen-item-text font-ui-button">{{ screen.page }}</div>
                </div>
                <div class="screen-name font-ui-label">Screen {{ screen.name }}</div>
            </div>
        </div>
        <div class="screen-row lower-screens">
            <div class="screen-item" v-for="screen in lowerScreens" :key="screen.name">
                <div class="screen">
                    <ObiIcon :icon="screen.pageIcon" class="screen-icon" />
                    <div class="screen-item-text font-ui-button">{{ screen.page }}</div>
                </div>
                <div class="screen-name font-ui-label">Screen {{ screen.name }}</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import ObcToggleButtonGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue';
import ObcToggleButtonOption from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue';
import { ObcToggleButtonOptionType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js';
import { useBridgeStore } from '@/stores/bridge';
import type { ObcToggleButtonGroupValueChangeEvent } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
import type { ObcPalette } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu';
import ObiIcon from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/icons/ObiIcon.vue';
import { computed } from 'vue';

const bridgeStore = useBridgeStore();
export interface Screen {
    name: string;
    location: "up" | "middle" | "down";
    pageIcon: string;
    path: string;
    page: string;
}

const screens: Screen[] = [
    {
        name: 'U1',
        location: 'up',
        pageIcon: 'propulsion-azimuth-thruster',
        path: '/small-screen/azimuth-thruster',
        page: 'Azimuth Thruster'
    },
    {
        name: 'U2',
        location: 'up',
        pageIcon: 'weather',
        path: '/small-screen/weather',
        page: 'Weather'
    },
    {
        name: 'C1',
        location: 'middle',
        path: '/ecdis',
        pageIcon: 'ecdis-proposal',
        page: 'ECDIS'
    },
    {
        name: 'C2',
        location: 'middle',
        path: '/',
        pageIcon: 'conning-iec',
        page: 'Conning'
    },
    {
        name: 'D1',
        location: 'down',
        path: '/screen-control',
        pageIcon: 'screens',
        page: 'Screen Control'
    },
]

const upperScreens = computed(() => screens.filter(screen => screen.location === 'up'));
const middleScreens = computed(() => screens.filter(screen => screen.location === 'middle'));
const lowerScreens = computed(() => screens.filter(screen => screen.location === 'down'));

const onPaletteChange = (value: ObcToggleButtonGroupValueChangeEvent) => {
    bridgeStore.setPalette(value.detail.value as ObcPalette);
};
</script>

<style scoped>
.screen-control-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 6fr;
    gap: 16px;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.palette-toggle {
    max-width: 240px;
    justify-self: center;
    width: 100%;
}

.screen-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-top: 1px solid var(--border-divider-color);
    padding: 128px 0;
}

.screen-row {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.screen-item {
    display: flex;
    flex-direction: column;
}

.screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid var(--normal-enabled-border-color);
    background: var(--normal-enabled-background-color);
    width: 240px;
    height: 144px;
    color: var(--element-neutral-color);
}

.middle-screens .screen {
    width: 480px;
    height: 288px;
}

.screen-icon {
    width: 64px;
    height: 64px;
}

.screen-name {
    color: var(--element-active-color);
    text-align: center;
}
</style>