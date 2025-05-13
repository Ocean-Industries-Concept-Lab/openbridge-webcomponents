
    <script lang="ts">
      export type {ObcArAlertType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/types.js';
export type {ObcPoiTargetButtonType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button/poi-target-button.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button/poi-target-button.js';
      import {ObcArAlertType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/types.js';
import {ObcPoiTargetButtonType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button/poi-target-button.js';

      export interface Props {
     relativeDirection?: number;
     selected?: boolean;
     selectedId?: string | null;
     alertType?: ObcArAlertType;
     overlap?: boolean;
     type?: ObcPoiTargetButtonType;
     inExpandedGroup?: boolean
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
          'obc-poi-target-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>