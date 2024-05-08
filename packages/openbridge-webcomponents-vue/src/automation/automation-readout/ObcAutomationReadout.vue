
    <script lang="ts">
      export type {AutomationReadoutPosition} from '@oicl/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
export type {LineType} from '@oicl/openbridge-webcomponents/dist/automation';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
      import {AutomationReadoutPosition} from '@oicl/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
import {LineType} from '@oicl/openbridge-webcomponents/dist/automation';

      export interface Props {
     value?: number;
     unit?: string;
     numberOfDigits?: number;
     position?: AutomationReadoutPosition;
     lineType?: LineType | undefined
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

      

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    
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
          'obc-automation-readout',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>