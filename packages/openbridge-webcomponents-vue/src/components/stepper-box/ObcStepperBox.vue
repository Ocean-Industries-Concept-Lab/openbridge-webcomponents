
    <script setup lang="ts">
      import { h, useSlots } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js';
      

      export interface Props {
     
   }

      

      const emit = defineEmits<{
        (e: 'down', payload: CustomEvent<unknown>): void,
(e: 'up', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onDown: (event: CustomEvent<unknown>) => emit('down', event as CustomEvent<unknown>),
onUp: (event: CustomEvent<unknown>) => emit('up', event as CustomEvent<unknown>)
  };
        const props = eventProps as (typeof eventProps & Props);

        

        return h(
          'obc-stepper-box',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render /></template>