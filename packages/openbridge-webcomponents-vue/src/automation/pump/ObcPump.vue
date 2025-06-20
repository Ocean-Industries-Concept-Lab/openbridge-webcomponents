
    <script lang="ts">
      export type {AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonVariant, AutomationButtonDirection, AutomationButtonLabelDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
export type {ObcAlertFrameType, ObcAlertFrameThickness, ObcAlertFrameStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-frame/alert-frame.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/pump/pump.js';
      import {AutomationButtonLabelPosition, AutomationButtonLabelSize, AutomationBottonLabelStyle, AutomationButtonVariant, AutomationButtonDirection, AutomationButtonLabelDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
import {ObcAlertFrameType, ObcAlertFrameThickness, ObcAlertFrameStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-frame/alert-frame.js';

      export interface Props {
     vertical?: boolean;
     labelPosition?: AutomationButtonLabelPosition;
     labelSize?: AutomationButtonLabelSize;
     labelStyle?: AutomationBottonLabelStyle;
     alert?: boolean;
     alertFrameType?: ObcAlertFrameType;
     alertFrameThickness?: ObcAlertFrameThickness;
     alertFrameStatus?: ObcAlertFrameStatus;
     progress?: boolean;
     on?: boolean;
     speedInPercent?: number;
     tag?: string;
     variant?: AutomationButtonVariant;
     direction?: AutomationButtonDirection;
     labelDirection?: AutomationButtonLabelDirection
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
          'obc-pump',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>