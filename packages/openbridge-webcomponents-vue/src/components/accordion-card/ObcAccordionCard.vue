
    <script lang="ts">
      export type {Position, AccordionSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/accordion-card/accordion-card.js';
export type {ObcAlertFrameType, ObcAlertFrameThickness, ObcAlertFrameStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-frame/alert-frame.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/accordion-card/accordion-card.js';
      import {Position, AccordionSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/accordion-card/accordion-card.js';
import {ObcAlertFrameType, ObcAlertFrameThickness, ObcAlertFrameStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-frame/alert-frame.js';

      export interface Props {
     cardTitle?: string;
     description?: string;
     statusLabel?: string;
     expanded?: boolean;
     disabled?: boolean;
     hasAlert?: boolean;
     hasDescription?: boolean;
     hasStatusLabel?: boolean;
     hasLeadingIcon?: boolean;
     position?: Position;
     size?: AccordionSize;
     alertFrameType?: ObcAlertFrameType;
     alertFrameThickness?: ObcAlertFrameThickness;
     alertFrameStatus?: ObcAlertFrameStatus
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
          'obc-accordion-card',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>