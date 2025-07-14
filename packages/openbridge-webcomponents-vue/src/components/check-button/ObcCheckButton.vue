
    <script lang="ts">
      export type {CheckButtonType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/check-button/check-button.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/check-button/check-button.js';
      import {CheckButtonType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/check-button/check-button.js';

      export interface Props {
     type?: CheckButtonType;
     checked?: boolean;
     disabled?: boolean;
     fullWidth?: boolean;
     width?: string;
     showIcon?: boolean;
     hasCheckedIcon?: boolean;
     hasUncheckedIcon?: boolean
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
        (e: 'check-button-click', payload: CustomEvent<{checked: boolean, type: string}>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onCheckButtonClick: (event: CustomEvent<{checked: boolean, type: string}>) => emit('check-button-click', event as CustomEvent<{checked: boolean, type: string}>)
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
          'obc-check-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>