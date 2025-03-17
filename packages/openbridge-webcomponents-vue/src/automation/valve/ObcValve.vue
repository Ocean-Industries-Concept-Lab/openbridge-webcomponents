
    <script lang="ts">
      export type {AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button';
export type {Direction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/valve/valve.js';
      import {AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button';
import {Direction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types';

      export interface Props {
     labelPosition?: AutomationButtonLabelPosition;
     labelSize?: AutomationButtonLabelSize;
     labelStyle?: AutomationBottonLabelStyle;
     alert?: boolean;
     progress?: boolean;
     tag?: string;
     direction?: Direction;
     value?: number;
     closed?: boolean;
     showDirectionLabel?: boolean;
     variant?: AutomationButtonVariant
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
          'obc-valve',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>