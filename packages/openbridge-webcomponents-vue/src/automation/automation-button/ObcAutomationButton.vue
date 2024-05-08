
    <script lang="ts">
      export type {AutomationButtonSize, AutomationButtonVariant, AutomationButtonState, AutomationButtonLabel, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonDirection} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
      import {AutomationButtonSize, AutomationButtonVariant, AutomationButtonState, AutomationButtonLabel, AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonDirection} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';

      export interface Props {
     size?: AutomationButtonSize;
     variant?: AutomationButtonVariant;
     state?: AutomationButtonState;
     labels?: AutomationButtonLabel[];
     labelPosition?: AutomationButtonLabelPosition;
     labelSize?: AutomationButtonLabelSize;
     labelStyle?: AutomationBottonLabelStyle;
     alert?: boolean;
     progress?: boolean;
     direction?: AutomationButtonDirection
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
          'obc-automation-button',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>