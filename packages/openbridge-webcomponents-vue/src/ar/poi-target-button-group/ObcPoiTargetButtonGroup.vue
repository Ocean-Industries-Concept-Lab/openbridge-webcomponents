
    <script lang="ts">
      export type {ExpandEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button-group/poi-target-button-group.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button-group/poi-target-button-group.js';
      import {ExpandEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button-group/poi-target-button-group.js';

      export interface Props {
     expand?: boolean;
     positionVertical?: string
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
        (e: 'expand', payload: ExpandEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onExpand: (event: ExpandEvent) => emit('expand', event as ExpandEvent)
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
          'obc-poi-target-button-group',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>