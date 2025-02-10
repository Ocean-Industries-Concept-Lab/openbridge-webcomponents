
    <script lang="ts">
      export type {PoiTargetButtonValue} from '@oicl/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';
export type {Pointer} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';
      import {PoiTargetButtonValue} from '@oicl/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';
import {Pointer} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target';

      export interface Props {
     value?: PoiTargetButtonValue;
     pointer?: Pointer;
     relativeDirection?: number
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