<template>
    <ObcSlider v-model="fontWidth" :min="90" :max="100" :step=".1" />
    <div class="font-test" :style="{ '--font-width': fontWidth }">
        <FontTestComponent v-for="phrase in phrases" :key="phrase" :phrase="phrase" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ObcSlider from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/slider/ObcSlider.vue';

const phrases = [
    "Submit",
    "Cancel",
    "Save",
    "Delete",
    "Edit",
    "Add New",
    "Search",
    "Filter",
    "Sort",
    "Apply",
    "Reset",
    "Clear All",
    "Select All",
    "Deselect All",
    "Next",
    "Previous",
    "Continue",
    "Back",
    "Confirm",
    "Close"
]

const fontWidth = ref(95)

</script>

<style>
.font-test {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>