
    <script lang="ts">
      export type {ObcPoiCardHeaderVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-card-header/poi-card-header.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-card-header/poi-card-header.js';
      import {ObcPoiCardHeaderVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-card-header/poi-card-header.js';

      export interface Props {
     variant?: ObcPoiCardHeaderVariant;
     index?: string;
     cardTitle?: string;
     description?: string;
     source?: string;
     timestamp?: string;
     hasLeadingIcon?: boolean;
     hasCloseButton?: boolean
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
        (e: 'close-click', payload: CustomEvent<void>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onCloseClick: (event: CustomEvent<void>) => emit('close-click', event as CustomEvent<void>)
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
          'obc-poi-card-header',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>