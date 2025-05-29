
    <script lang="ts">
      export type {AngleAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js';
export type {VesselImage} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass/compass.js';
      import {AngleAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js';
import {VesselImage} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';

      export interface Props {
     heading?: number;
     courseOverGround?: number;
     headingSetPoint?: number | null;
     atHeadingSetpoint?: boolean;
     disableAutoAtHeadingSetpoint?: boolean;
     autoAtHeadingSetpointDeadband?: number;
     touching?: boolean;
     headingAdvices?: AngleAdvice[];
     windSpeed?: number | null;
     windFromDirection?: number | null;
     currentSpeed?: number | null;
     currentFromDirection?: number | null;
     vesselImage?: VesselImage
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
          'obc-compass',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>