
    <script lang="ts">
      export type {Tickmark} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch-flat/tickmark-flat';
export type {Label} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/compass-flat/compass-flat';
export type {SVGTemplateResult} from 'lit';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch-flat/watch-flat.js';
      import {Tickmark} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch-flat/tickmark-flat';
import {Label} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/compass-flat/compass-flat';
import {SVGTemplateResult} from 'lit';

      export interface Props {
     width?: number;
     height?: number;
     padding?: number;
     rotation?: number;
     tickmarkSpacing?: number;
     angleSetpoint?: number | undefined;
     tickmarks?: Tickmark[];
     labels?: Label[];
     FOVIndicator?: SVGTemplateResult[];
     trackHeight?: number;
     ticksHeight?: number;
     borderRadius?: number
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

      

      const slots = useSlots();

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
          'obc-watch-flat',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>