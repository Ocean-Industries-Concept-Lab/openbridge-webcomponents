
    <script lang="ts">
      export type {ObcPoiType, ObcPoiValue, ObcPoiState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi/poi.js';
export type {ObcPoiButtonType, ObcPoiButtonDataItem} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-button/poi-button.js';
export type {ObcPoiPointerType, ObcPoiPointerState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/building-blocks/poi-pointer/poi-pointer.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi/poi-base.js';
      import {ObcPoiType, ObcPoiValue, ObcPoiState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi/poi.js';
import {ObcPoiButtonType, ObcPoiButtonDataItem} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-button/poi-button.js';
import {ObcPoiPointerType, ObcPoiPointerState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/building-blocks/poi-pointer/poi-pointer.js';

      export interface Props {
     type?: ObcPoiType;
     value?: ObcPoiValue;
     state?: ObcPoiState;
     selected?: boolean;
     buttonType?: ObcPoiButtonType;
     overlapOpaque?: boolean;
     data?: ObcPoiButtonDataItem[];
     hasHeader?: boolean;
     headerContent?: string;
     hasPointer?: boolean;
     pointerType?: ObcPoiPointerType | null;
     pointerState?: ObcPoiPointerState | null;
     relativeDirection?: number;
     x?: number;
     y?: number;
     buttonY?: number | null;
     fixedTarget?: boolean;
     boxWidth?: number | null;
     boxHeight?: number | null;
     outsideAngle?: number;
     animatePosition?: boolean;
     buttonOffsetX?: number;
     targetOffsetX?: number
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
          'undefined',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>