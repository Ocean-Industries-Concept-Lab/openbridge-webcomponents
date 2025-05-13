
    <script lang="ts">
      export type {AlertType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types.js';
export type {ObcAlertButtonType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button.js';
      import {AlertType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types.js';
import {ObcAlertButtonType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-button/alert-button.js';

      export interface Props {
     nAlerts?: number;
     alertType?: AlertType | undefined;
     type?: ObcAlertButtonType;
     large?: boolean;
     showSilenceButton?: boolean;
     silenceButtonDisabled?: boolean;
     counter?: boolean;
     blinking?: boolean;
     flatMaxBreakpointPx?: number;
     silenceButtonMinBreakpointPx?: number
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
        (e: 'click-alert', payload: CustomEvent<unknown>): void,
(e: 'click-silence', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onClickAlert: (event: CustomEvent<unknown>) => emit('click-alert', event as CustomEvent<unknown>),
onClickSilence: (event: CustomEvent<unknown>) => emit('click-silence', event as CustomEvent<unknown>)
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
          'obc-alert-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>