
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/automation/automation-input-modal/automation-input-modal.js';
      

      export interface Props {
     
   }

      

      

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    
  };
        const props = eventProps as (typeof eventProps & Props);

        

        return h(
          'obc-automation-input-modal',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render /></template>