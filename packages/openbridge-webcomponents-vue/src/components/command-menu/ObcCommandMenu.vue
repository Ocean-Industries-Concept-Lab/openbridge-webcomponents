
    <script lang="ts">
      export type {ObcCommandMenuChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-menu/command-menu.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-menu/command-menu.js';
      import {ObcCommandMenuChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-menu/command-menu.js';

      export interface Props {
     inCommand?: boolean;
     hasLocation?: boolean
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
        (e: 'change', payload: ObcCommandMenuChangeEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onChange: (event: ObcCommandMenuChangeEvent) => emit('change', event as ObcCommandMenuChangeEvent)
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
          'obc-command-menu',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>