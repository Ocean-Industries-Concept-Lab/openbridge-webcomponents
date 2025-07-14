
    <script lang="ts">
      export type {ObcToggleButtonGroupValueChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
export type {ObcToggleButtonOptionType, ObcToggleButtonOptionVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
      import {ObcToggleButtonGroupValueChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
import {ObcToggleButtonOptionType, ObcToggleButtonOptionVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js';

      export interface Props {
     value?: string;
     type?: ObcToggleButtonOptionType;
     variant?: ObcToggleButtonOptionVariant;
     hugText?: boolean
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
        (e: 'value', payload: ObcToggleButtonGroupValueChangeEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onValue: (event: ObcToggleButtonGroupValueChangeEvent) => emit('value', event as ObcToggleButtonGroupValueChangeEvent)
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
          'obc-toggle-button-group',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>