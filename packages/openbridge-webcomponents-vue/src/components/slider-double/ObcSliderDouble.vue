
    <script lang="ts">
      export type {ObcSliderDoubleValueEvent, ObcSliderDoubleVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider-double/slider-double.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider-double/slider-double.js';
      import {ObcSliderDoubleValueEvent, ObcSliderDoubleVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider-double/slider-double.js';

      export interface Props {
     low?: number;
     high?: number;
     min?: number;
     max?: number;
     step?: number | undefined;
     stepClick?: number;
     variant?: ObcSliderDoubleVariant;
     allowSeeking?: boolean;
     seekingSpeed?: number;
     labelUnit?: string;
     labelDecimals?: number;
     labelWidth?: string
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
        (e: 'value', payload: ObcSliderDoubleValueEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onValue: (event: ObcSliderDoubleValueEvent) => emit('value', event as ObcSliderDoubleValueEvent)
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
          'obc-slider-double',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>