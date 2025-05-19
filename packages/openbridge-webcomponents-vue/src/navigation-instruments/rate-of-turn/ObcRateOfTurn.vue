
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/rate-of-turn/rate-of-turn.js';
      

      export interface Props {
     
   }

      

      

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    
  };
        const props = eventProps as (typeof eventProps & Props);

        

        return h(
          'obc-rate-of-turn',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render /></template>