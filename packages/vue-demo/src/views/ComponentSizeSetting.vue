<script setup lang="ts">
import ObcElevatedCardRadioGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card-radio-group/ObcElevatedCardRadioGroup.vue'
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import ObcElevatedCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'

import { computed, ref } from 'vue';
import { onMounted } from 'vue';

const showSizeOptions = ref(false);
const size = ref('regular');

const sizeOptions = [
    {label: 'Regular', value: 'regular'},
    {label: 'Medium', value: 'medium'},
    {label: 'Large', value: 'large'},
    {label: 'Xtra-large', value: 'xl'}
];

const activeSizeLabel = computed(() => {
    return sizeOptions.find(option => option.value === size.value)?.label;
});

function onSizeChange(event: CustomEvent) {
    const newSize = event.detail.value;
    size.value = newSize;
    const root = document.querySelector('.root');
    if (root) {
        root.classList.remove(
            'obc-component-size-regular',
            'obc-component-size-medium',
            'obc-component-size-large',
            'obc-component-size-xl'
        );
        root.classList.add(`obc-component-size-${newSize}`);
    }
}

onMounted(() => {
    const root = document.querySelector('.root');
    if (root) {
        root.classList.forEach(className => {
            if (className.startsWith('obc-component-size-')) {
                const newSize = className.replace('obc-component-size-', '');
                size.value = newSize;
            }
        });
    }
});
</script>

<template>
    <div>
	<ObcElevatedCard has-leading-icon has-trailing-icon :size="ObcElevatedCardSize.DoubleLine" :position="showSizeOptions ? ObcElevatedCardPosition.Top : ObcElevatedCardPosition.Bottom" @click="showSizeOptions = !showSizeOptions" :border="showSizeOptions">
	        <template #leading-icon>
	          <obi-resize-corner></obi-resize-corner>
	        </template>
	        <template #label>
	          <div>Component size</div>
	        </template>
	        <template #description>
	          <div>Set the global component size</div>
	        </template>
	        <template #trailing-icon>
                <obi-chevron-up-google v-if="showSizeOptions"></obi-chevron-up-google>
	            <obi-chevron-right-google v-else></obi-chevron-right-google>
	        </template>
            <template #status>
                <div>{{ activeSizeLabel }}</div>
            </template>
	      </ObcElevatedCard>
	      <ObcElevatedCardRadioGroup v-if="showSizeOptions" :options="sizeOptions" :value="size" @change="onSizeChange" >
	
	      </ObcElevatedCardRadioGroup>
        </div>
</template>
