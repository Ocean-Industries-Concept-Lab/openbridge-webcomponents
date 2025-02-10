
    <script lang="ts">
      export type {InstrumentState} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types';
export type {LinearAdvice} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
export type {PropellerType} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/thruster.js';
      import {InstrumentState} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types';
import {LinearAdvice} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
import {PropellerType} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller';

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