
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/components/context-menu/context-menu.js';
      

      export interface Props {
     
   }

      

      

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    
  };
        const props = eventProps as (typeof eventProps & Props);

        

        return h(
          'obc-context-menu',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render /></template>