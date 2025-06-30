<template>
    <div class="font-test-component">
        <div class="body-width">Body: {{ bodyWidth }}</div>
        <div class="button-width">Button: {{ buttonWidth }}</div>
        <div class="body-active-width">Body Active: {{ bodyActiveWidth }}</div>
        <div ref="bodyRef" class="body">{{ phrase }}</div>
        <div ref="buttonRef" class="button">{{ phrase }}</div>
        <div ref="bodyActiveRef" class="body-active">{{ phrase }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
    phrase: string
}>()

const bodyRef = ref<HTMLDivElement>()
const buttonRef = ref<HTMLDivElement>()
const bodyActiveRef = ref<HTMLDivElement>()

const bodyWidth = ref(0)
const buttonWidth = ref(0)
const bodyActiveWidth = ref(0)

onMounted(() => {
    bodyWidth.value = bodyRef.value?.clientWidth ?? 0
    buttonWidth.value = buttonRef.value?.clientWidth ?? 0
    bodyActiveWidth.value = bodyActiveRef.value?.clientWidth ?? 0
})
</script>

<style scoped>
.font-test-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.body {
    letter-spacing: 0.08px;
    font-feature-settings: 'ss04' on, 'liga' off, 'clig' off;
    font-family: var(--font-family-main);
    font-size: var(--global-typography-ui-body-font-size);
    font-style: normal;
    font-weight: var(--global-typography-ui-body-font-weight);
    line-height: var(--global-typography-ui-body-line-height);
    text-decoration: none;
}

.body-active {
    letter-spacing: -0.24px;
    font-feature-settings: 'ss04' on, 'liga' off, 'clig' off;
    font-family: var(--font-family-main);
    font-size: var(--global-typography-ui-body-active-font-size);
    font-style: normal;
    font-weight: var(--font-weight-bold);
    line-height: var(--global-typography-ui-body-active-line-height);
    font-variation-settings: "wdth" var(--font-width);
}

.button {
    font-feature-settings: 'ss04' on, 'liga' off, 'clig' off;
    font-family: var(--font-family-main);
    font-size: var(--global-typography-ui-button-font-size);
    font-style: normal;
    font-weight: var(--global-typography-ui-button-font-weight);
    line-height: var(--global-typography-ui-button-line-height);
    font-variation-settings: "wdth" var(--font-width);
}
</style>