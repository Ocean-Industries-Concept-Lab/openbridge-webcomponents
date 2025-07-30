
    <script lang="ts">
      export type {ObcTopbarMessageItemAction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item/topbar-message-item.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item/topbar-message-item.js';
      import {ObcTopbarMessageItemAction} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item/topbar-message-item.js';

      export interface Props {
     large?: boolean;
     empty?: boolean;
     hasSecondaryIcon?: boolean;
     action?: ObcTopbarMessageItemAction
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
        (e: 'message-click', payload: CustomEvent<unknown>): void,
(e: 'action-click', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onMessageClick: (event: CustomEvent<unknown>) => emit('message-click', event as CustomEvent<unknown>),
onActionClick: (event: CustomEvent<unknown>) => emit('action-click', event as CustomEvent<unknown>)
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
          'obc-topbar-message-item',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>