
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/fan/fan.js';
      

      export interface Props {
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

        

        return h(
          'obc-fan',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render /></template>