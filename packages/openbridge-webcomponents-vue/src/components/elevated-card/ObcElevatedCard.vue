
    <script lang="ts">
      export type {ObcElevatedCardPosition, ObcElevatedCardSize, ObcElevatedCardTag} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';
      import {ObcElevatedCardPosition, ObcElevatedCardSize, ObcElevatedCardTag} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';

      export interface Props {
     position?: ObcElevatedCardPosition;
     size?: ObcElevatedCardSize;
     overrideTag?: ObcElevatedCardTag | undefined;
     notClickable?: boolean;
     info?: boolean;
     graphicBorder?: boolean;
     border?: boolean;
     hasAction?: boolean;
     hasLeadingIcon?: boolean;
     hasTrailingIcon?: boolean;
     hasGraphic?: boolean;
     hasStatus?: boolean;
     href?: string | undefined;
     target?: string | undefined
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
        (e: 'action-click', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onActionClick: (event: CustomEvent<unknown>) => emit('action-click', event as CustomEvent<unknown>)
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
          'obc-elevated-card',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>