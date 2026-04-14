
    <script lang="ts">
      export type {PoiFitMode, PoiFrame, PoiDetection, PoiKeyFn} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-controller/poi-controller.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-controller/poi-controller.js';
      import {PoiFitMode, PoiFrame, PoiDetection, PoiKeyFn} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-controller/poi-controller.js';

      export interface Props {
     fit?: PoiFitMode;
     frames?: PoiFrame[] | null;
     detections?: PoiDetection[] | null;
     frameIndex?: number | null;
     confidenceMin?: number | null;
     classFilter?: string[] | null;
     keyFn?: PoiKeyFn | null
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
          'obc-poi-controller',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>