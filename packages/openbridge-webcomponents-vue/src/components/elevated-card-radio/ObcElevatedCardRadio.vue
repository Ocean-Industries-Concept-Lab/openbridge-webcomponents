
    <script lang="ts">
      export type {ObcElevatedCardPosition, ObcElevatedCardSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card-radio/elevated-card-radio.js';
      import {ObcElevatedCardPosition, ObcElevatedCardSize} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';

      export interface Props {
     position?: ObcElevatedCardPosition;
     size?: ObcElevatedCardSize;
     graphicBorder?: boolean;
     border?: boolean;
     name?: string;
     value?: string;
     label?: string;
     checked?: boolean;
     disabled?: boolean;
     required?: boolean
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
          'obc-elevated-card-radio',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>