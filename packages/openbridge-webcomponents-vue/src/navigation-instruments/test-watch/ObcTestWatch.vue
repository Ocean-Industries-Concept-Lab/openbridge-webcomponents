
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@tibnor/openbridge-webcomponents/dist/navigation-instruments/test-watch/test-watch.js';
      

      export interface Props {
     
   }

      

      

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    
  };
        const props = eventProps as (typeof eventProps & Props);

        

        return h(
          'obc-test-watch',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render /></template>