
    <script lang="ts">
      export type {ContextMenuOption, ContextMenuType, ColumnGroup} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/split-button/split-button.js';
      import {ContextMenuOption, ContextMenuType, ColumnGroup} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';

      export interface Props {
     label?: string;
     hasIcon?: boolean;
     options?: ContextMenuOption[];
     selectedValues?: string[];
     menuType?: ContextMenuType;
     multiSelect?: boolean | undefined;
     selectPerGroup?: boolean | undefined;
     itemsPerColumn?: number;
     hasTitleBar?: boolean;
     menuTitle?: string;
     fullWidth?: boolean;
     disabled?: boolean;
     openTop?: boolean;
     columnGroups?: ColumnGroup[];
     persistSelection?: boolean
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
        (e: 'click', payload: CustomEvent<{action: 'primary' | 'dropdown', value?: string, option?: ContextMenuOption}>): void,
(e: 'change', payload: CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onClick: (event: CustomEvent<{action: 'primary' | 'dropdown', value?: string, option?: ContextMenuOption}>) => emit('click', event as CustomEvent<{action: 'primary' | 'dropdown', value?: string, option?: ContextMenuOption}>),
onChange: (event: CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>) => emit('change', event as CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>)
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
          'obc-split-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>