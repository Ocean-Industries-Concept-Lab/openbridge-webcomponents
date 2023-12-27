
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import 'openbridge-webcomponents/dist/components/demo/demo.js';
      


      const slots = useSlots();

      const render = () => {
        const eventProps = {
    
  };

        const props = eventProps as (typeof eventProps);

        return h(
          'obc-demo',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>