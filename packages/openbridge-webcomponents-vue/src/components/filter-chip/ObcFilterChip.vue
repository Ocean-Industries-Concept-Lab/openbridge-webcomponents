
    <script lang="ts">
      export type {ObcFilterChipChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/filter-chip/filter-chip.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/filter-chip/filter-chip.js';
      import {ObcFilterChipChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/filter-chip/filter-chip.js';

      export interface Props {
     disabled?: boolean;
     label?: string;
     checked?: boolean;
     showIcon?: boolean
   }

      
  const vueProps = defineProps<Props>();

  const defaults = reactive({} as Props);
  const vDefaults = {
    created(el: any) {
      for (const p in vueProps) {
        defaults[p as keyof Props] = el[p];
      }
    }
  };

  let hasRendered = false;

      const emit = defineEmits<{
        (e: 'chip-toggle', payload: ObcFilterChipChangeEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onChipToggle: (event: ObcFilterChipChangeEvent) => emit('chip-toggle', event as ObcFilterChipChangeEvent)
  };
        const props = eventProps as (typeof eventProps & Props);

        
      for (const p in vueProps) {
        const v = vueProps[p as keyof Props];
        if ((v !== undefined) || hasRendered) {
          (props[p as keyof Props] as unknown) = v ?? defaults[p as keyof Props];
        }
      }

      hasRendered = true;
    

        return h(
          'obc-filter-chip',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>