
    <script lang="ts">
      export type {ObcStartStopSwitchChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/start-stop-switch/start-stop-switch.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/start-stop-switch/start-stop-switch.js';
      import {ObcStartStopSwitchChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/start-stop-switch/start-stop-switch.js';

      export interface Props {
     checked?: boolean;
     hasUncheckedStateIcon?: boolean;
     hasCheckedStateIcon?: boolean
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
        (e: 'change', payload: ObcStartStopSwitchChangeEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onChange: (event: ObcStartStopSwitchChangeEvent) => emit('change', event as ObcStartStopSwitchChangeEvent)
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
          'obc-start-stop-switch',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>