
    <script lang="ts">
      export type {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types.js';
export type {WatchCircleType, WatchArea, WatchBarArea, WatchNeedle, WatchVessel} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';
export type {Tickmark} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/tickmark.js';
export type {AngleAdviceRaw} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';
      import {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types.js';
import {WatchCircleType, WatchArea, WatchBarArea, WatchNeedle, WatchVessel} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';
import {Tickmark} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/tickmark.js';
import {AngleAdviceRaw} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js';

      export interface Props {
     state?: InstrumentState;
     watchCircleType?: WatchCircleType;
     northArrow?: boolean;
     angleSetpoint?: number | undefined;
     atAngleSetpoint?: boolean;
     padding?: number;
     areas?: WatchArea[];
     barAreas?: WatchBarArea[];
     needles?: WatchNeedle[];
     tickmarks?: Tickmark[];
     advices?: AngleAdviceRaw[];
     crosshairEnabled?: boolean;
     labelFrameEnabled?: boolean;
     vessels?: WatchVessel[];
     wind?: number | null;
     windFromDirectionDeg?: number | null;
     windSymbolRadius?: number | null;
     current?: number | null;
     currentFromDirectionDeg?: number | null;
     currentSymbolRadius?: number | null;
     starboardPortIndicator?: boolean;
     clipTop?: number;
     clipBottom?: number;
     scaleWindIcon?: number
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
          'obc-watch',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>