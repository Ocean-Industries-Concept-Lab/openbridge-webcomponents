
    <script lang="ts">
      export type {ObcStepperBoxType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js';
      import {ObcStepperBoxType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js';

      export interface Props {
     type?: ObcStepperBoxType;
     hasHelperText?: boolean
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
        (e: 'down', payload: CustomEvent<unknown>): void,
(e: 'up', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onDown: (event: CustomEvent<unknown>) => emit('down', event as CustomEvent<unknown>),
onUp: (event: CustomEvent<unknown>) => emit('up', event as CustomEvent<unknown>)
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
          'obc-stepper-box',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>