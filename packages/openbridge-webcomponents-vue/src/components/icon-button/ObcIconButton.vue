
    <script lang="ts">
      export type {IconButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';
      import {IconButtonVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/icon-button/icon-button.js';

      export interface Props {
     variant?: IconButtonVariant;
     activated?: boolean;
     cornerLeft?: boolean;
     cornerRight?: boolean;
     activeColor?: boolean;
     wide?: boolean;
     disabled?: boolean;
     progress?: number | undefined
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
          'obc-icon-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>