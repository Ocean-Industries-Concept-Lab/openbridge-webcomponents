
    <script lang="ts">
      export type {ObcPivotItemDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/pivot-item/pivot-item.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/pivot-item-group/pivot-item-group.js';
      import {ObcPivotItemDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/pivot-item/pivot-item.js';

      export interface Props {
     direction?: ObcPivotItemDirection;
     selectedValue?: string;
     allowDeselect?: boolean
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
        (e: 'change', payload: CustomEvent<{selectedValue: string}>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onChange: (event: CustomEvent<{selectedValue: string}>) => emit('change', event as CustomEvent<{selectedValue: string}>)
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
          'obc-pivot-item-group',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>