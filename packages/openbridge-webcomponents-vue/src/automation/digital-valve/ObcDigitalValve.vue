
    <script lang="ts">
      export type {AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/digital-valve/digital-valve.js';
      import {AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button';

      export interface Props {
     labelPosition?: AutomationButtonLabelPosition;
     labelSize?: AutomationButtonLabelSize;
     labelStyle?: AutomationBottonLabelStyle;
     alert?: boolean;
     progress?: boolean;
     open?: boolean;
     tag?: string;
     vertical?: boolean
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

      

      const slots = useSlots() as Slots;

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
          'obc-digital-valve',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>