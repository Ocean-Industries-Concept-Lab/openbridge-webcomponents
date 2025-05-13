
    <script lang="ts">
      export type {ObcAckAllVisibleClickEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
      import {ObcAckAllVisibleClickEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';

      export interface Props {
     hasShelved?: boolean;
     canAckAll?: boolean
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
        (e: 'ack-all-visible-click', payload: ObcAckAllVisibleClickEvent): void,
(e: 'alert-list-click', payload: CustomEvent): void,
(e: 'silence-click', payload: CustomEvent): void,
(e: 'go-to-alert-list-click', payload: CustomEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onAckAllVisibleClick: (event: ObcAckAllVisibleClickEvent) => emit('ack-all-visible-click', event as ObcAckAllVisibleClickEvent),
onAlertListClick: (event: CustomEvent) => emit('alert-list-click', event as CustomEvent),
onSilenceClick: (event: CustomEvent) => emit('silence-click', event as CustomEvent),
onGoToAlertListClick: (event: CustomEvent) => emit('go-to-alert-list-click', event as CustomEvent)
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
          'obc-alert-menu',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>