<template>
    <div class="screen-item">
                <button class="screen" :style="{ 'anchor-name': `--screen-anchor-${screen.name}` } as any" @click="showContextMenu = !showContextMenu">
                    <ObiIcon :icon="screen.page.icon" class="screen-icon" />
                    <div class="screen-item-text font-ui-button">{{ screen.page.name }}</div>
                </button>
                <div class="screen-name font-ui-label">Screen {{ screen.name }}</div>
                <ObcContextMenu class="screen-context-menu" :style="{ 'position-anchor': `--screen-anchor-${screen.name}` } as any" v-if="showContextMenu">
                    <ObcNavigationItem v-for="page in screenPages" :key="page.name" :label="page.app + ' - ' + page.name" @click="onPageChange(page)">
                        <ObiIcon :icon="page.icon" class="screen-icon" />
                    </ObcNavigationItem>
                </ObcContextMenu>
            </div>
</template>

<script setup lang="ts">
import ObiIcon from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/icons/ObiIcon.vue';
import ObcContextMenu from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/context-menu/ObcContextMenu.vue';
import ObcNavigationItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/navigation-item/ObcNavigationItem.vue';
import { ref } from 'vue';
import { useBridgeStore, type Screen, type ScreenPage } from '@/stores/bridge';
import { screenPages } from '@/router';

const showContextMenu = ref(false);

const bridgeStore = useBridgeStore();


const props = defineProps<{
    screen: Screen;
}>();

const onPageChange = (page: ScreenPage) => {
    bridgeStore.updateScreen({ ...props.screen, page: page });
    console.log('Screen updated', page, props.screen)
    showContextMenu.value = false;
};
</script>

<style scoped>
.screen-item {
    display: flex;
    flex-direction: column;
}

.screen {
    appearance: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid var(--normal-enabled-border-color);
    background: var(--normal-enabled-background-color);
    width: 240px;
    height: 144px;
    margin: 0;
    color: var(--element-neutral-color);
    anchor-name: --screen-anchor;
    cursor: pointer;

    &:hover {
        background: var(--normal-hover-background-color);
        border-color: var(--normal-hover-border-color);
    }

    &:active {
        background: var(--normal-pressed-background-color);
        border-color: var(--normal-pressed-border-color);
    }
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

.screen-context-menu {
    position: absolute;
    top: calc(anchor(bottom) + 4px);
    right: anchor(right);
}
</style>