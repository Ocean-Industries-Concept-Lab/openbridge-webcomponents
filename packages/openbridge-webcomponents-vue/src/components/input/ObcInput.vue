
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@oicl/openbridge-webcomponents/dist/components/input/input.js';
      

      export interface Props {
     value?: string;
     placeholder?: string;
     type?: string;
     squared?: boolean;
     textAlign?: string;
     font?: string
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

      const emit = defineEmits<{
        (e: 'input', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    onInput: (event: CustomEvent<unknown>) => emit('input', event as CustomEvent<unknown>)
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
          'obc-input',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>