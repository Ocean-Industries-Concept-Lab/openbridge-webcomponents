
    <script lang="ts">
      export type {ObcFloatingMessageType, ObcFloatingMessageDirection, ObcFloatingMessageLineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';
      import {ObcFloatingMessageType, ObcFloatingMessageDirection, ObcFloatingMessageLineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';

      export interface Props {
     type?: ObcFloatingMessageType;
     direction?: ObcFloatingMessageDirection;
     hasTimestamp?: boolean;
     hasDay?: boolean;
     action?: boolean;
     action2?: boolean;
     lineType?: ObcFloatingMessageLineType
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
        (e: 'action-click', payload: CustomEvent<void>): void,
(e: 'action2-click', payload: CustomEvent<void>): void,
(e: 'dismiss-click', payload: CustomEvent<void>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onActionClick: (event: CustomEvent<void>) => emit('action-click', event as CustomEvent<void>),
onAction2Click: (event: CustomEvent<void>) => emit('action2-click', event as CustomEvent<void>),
onDismissClick: (event: CustomEvent<void>) => emit('dismiss-click', event as CustomEvent<void>)
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
          'obc-floating-message',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>