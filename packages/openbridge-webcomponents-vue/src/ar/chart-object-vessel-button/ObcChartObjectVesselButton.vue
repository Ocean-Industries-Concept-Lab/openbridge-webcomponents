
    <script lang="ts">
      export type {SpeedIndicator, State, Type} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/chart-object-vessel-button/chart-object-vessel-button.js';
export type {VesselImage} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/chart-object-vessel-button/chart-object-vessel-button.js';
      import {SpeedIndicator, State, Type} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/chart-object-vessel-button/chart-object-vessel-button.js';
import {VesselImage} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel.js';

      export interface Props {
     heading?: number;
     course?: number;
     speedIndicator?: SpeedIndicator;
     turnRate?: number;
     number?: number | undefined;
     name?: string | undefined;
     state?: State;
     type?: Type;
     selected?: boolean;
     courseArrowPx?: number | undefined;
     ownShipIndicator?: boolean;
     vesselImage?: VesselImage | null;
     vesselImageSize?: number
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
          'obc-chart-object-vessel-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>