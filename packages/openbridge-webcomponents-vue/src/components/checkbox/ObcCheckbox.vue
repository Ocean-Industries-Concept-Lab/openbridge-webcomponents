
    <script lang="ts">
      export type {ObcCheckboxChangeEvent, CheckboxStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/checkbox/checkbox.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/checkbox/checkbox.js';
      import {ObcCheckboxChangeEvent, CheckboxStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/checkbox/checkbox.js';

      export interface Props {
     status?: CheckboxStatus;
     disabled?: boolean;
     label?: string;
     ariaDescribedby?: string
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
        (e: 'change', payload: ObcCheckboxChangeEvent): void,
(e: 'disabled', payload: ObcCheckboxChangeEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onChange: (event: ObcCheckboxChangeEvent) => emit('change', event as ObcCheckboxChangeEvent),
onDisabled: (event: ObcCheckboxChangeEvent) => emit('disabled', event as ObcCheckboxChangeEvent)
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
          'obc-checkbox',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>