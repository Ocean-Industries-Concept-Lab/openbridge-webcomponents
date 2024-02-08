
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@tibnor/openbridge-webcomponents/dist/components/divider/divider.js';
      

      export interface Props {
     
   }

      

      

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    
  };
        const props = eventProps as (typeof eventProps & Props);

        

        return h(
          'obc-divider',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render /></template>