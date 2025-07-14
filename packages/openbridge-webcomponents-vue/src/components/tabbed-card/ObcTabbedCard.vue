
    <script lang="ts">
      export type {ObcTabbedCardChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tabbed-card/tabbed-card.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tabbed-card/tabbed-card.js';
      import {ObcTabbedCardChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tabbed-card/tabbed-card.js';

      export interface Props {
     nTabs?: number;
     selectedTab?: number;
     hasDefaultSlotOnly?: boolean
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
        (e: 'tab-change', payload: ObcTabbedCardChangeEvent): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onTabChange: (event: ObcTabbedCardChangeEvent) => emit('tab-change', event as ObcTabbedCardChangeEvent)
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
          'obc-tabbed-card',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>