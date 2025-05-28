
    <script lang="ts">
      export type {VesselImage} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/pitch-roll/pitch-roll.js';
      import {VesselImage} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';

      export interface Props {
     pitch?: number;
     roll?: number;
     minAvgPitch?: number;
     maxAvgPitch?: number;
     minAvgRoll?: number;
     maxAvgRoll?: number;
     vesselImageFore?: VesselImage;
     vesselImageSide?: VesselImage;
     maxPitchAdvice?: number | undefined;
     maxRollAdvice?: number | undefined;
     triggerPitchAdvice?: boolean;
     triggerRollAdvice?: boolean
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
          'obc-pitch-roll',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>