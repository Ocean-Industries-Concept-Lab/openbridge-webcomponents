
    <script lang="ts">
      export type {ObcAlertMenuItemStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js';
export type {ObcMessageMenuItemSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/message-menu-item/message-menu-item.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js';
      import {ObcAlertMenuItemStatus} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js';
import {ObcMessageMenuItemSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/message-menu-item/message-menu-item.js';

      export interface Props {
     hasIcon?: boolean;
     shelved?: boolean;
     hasDay?: boolean;
     hasTime?: boolean;
     status?: ObcAlertMenuItemStatus;
     open?: boolean;
     size?: ObcMessageMenuItemSize
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
        (e: 'ack-click', payload: CustomEvent<unknown>): void,
(e: 'item-click', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onAckClick: (event: CustomEvent<unknown>) => emit('ack-click', event as CustomEvent<unknown>),
onItemClick: (event: CustomEvent<unknown>) => emit('item-click', event as CustomEvent<unknown>)
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
          'obc-alert-menu-item',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>