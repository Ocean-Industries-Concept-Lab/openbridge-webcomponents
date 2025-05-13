
    <script lang="ts">
      export type {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types.js';
export type {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice.js';
export type {PropellerType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/thruster.js';
      import {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types.js';
import {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice.js';
import {PropellerType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller.js';

      export interface Props {
     thrust?: number;
     setpoint?: number | undefined;
     touching?: boolean;
     atSetpoint?: boolean;
     disableAutoAtSetpoint?: boolean;
     autoAtSetpointDeadband?: number;
     setpointAtZeroDeadband?: number;
     state?: InstrumentState;
     tunnel?: boolean;
     singleSided?: boolean;
     singleDirection?: boolean;
     singleDirectionHalfSize?: boolean;
     advices?: LinearAdvice[];
     topPropeller?: PropellerType;
     bottomPropeller?: PropellerType
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
          'obc-thruster',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>