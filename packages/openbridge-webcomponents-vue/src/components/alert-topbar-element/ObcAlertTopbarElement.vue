
    <script lang="ts">
      export type {AlertType} from 'openbridge-webcomponents/dist/types';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import 'openbridge-webcomponents/dist/components/alert-topbar-element/alert-topbar-element.js';
      import {AlertType} from 'openbridge-webcomponents/dist/types';

      export interface Props {
     nAlerts?: number;
     alertType?: AlertType;
     showAck?: boolean;
     alertMuted?: boolean;
     minimized?: boolean;
     maxWidth?: number
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
        (e: 'muteclick', payload: CustomEvent<unknown>): void,
(e: 'ackclick', payload: CustomEvent<unknown>): void,
(e: 'alertclick', payload: CustomEvent<unknown>): void,
(e: 'messageclick', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    onMuteclick: (event: CustomEvent<unknown>) => emit('muteclick', event as CustomEvent<unknown>),
onAckclick: (event: CustomEvent<unknown>) => emit('ackclick', event as CustomEvent<unknown>),
onAlertclick: (event: CustomEvent<unknown>) => emit('alertclick', event as CustomEvent<unknown>),
onMessageclick: (event: CustomEvent<unknown>) => emit('messageclick', event as CustomEvent<unknown>)
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
          'obc-alert-topbar-element',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>