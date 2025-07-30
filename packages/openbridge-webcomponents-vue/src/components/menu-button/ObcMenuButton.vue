
    <script lang="ts">
      export type {ContextMenuOption, ContextMenuType, ColumnGroup} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/menu-button/menu-button.js';
      import {ContextMenuOption, ContextMenuType, ColumnGroup} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';

      export interface Props {
     label?: string;
     options?: ContextMenuOption[];
     selectedValues?: string[];
     fullWidth?: boolean;
     hasIcon?: boolean;
     menuType?: ContextMenuType;
     multiSelect?: boolean | undefined;
     selectPerGroup?: boolean | undefined;
     persistSelection?: boolean;
     hasTitleBar?: boolean;
     menuTitle?: string;
     columnGroups?: ColumnGroup[];
     itemsPerColumn?: number;
     openTop?: boolean;
     disabled?: boolean
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
        (e: 'change', payload: CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>): void,
(e: 'item-click', payload: CustomEvent<{value: string, option: ContextMenuOption}>): void,
(e: 'close', payload: CustomEvent<void>): void
      }>();

      const slots = useSlots() as Slots;

      const render = () => {
        const eventProps = {
    onChange: (event: CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>) => emit('change', event as CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>),
onItemClick: (event: CustomEvent<{value: string, option: ContextMenuOption}>) => emit('item-click', event as CustomEvent<{value: string, option: ContextMenuOption}>),
onClose: (event: CustomEvent<void>) => emit('close', event as CustomEvent<void>)
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
          'obc-menu-button',
          props,
          assignSlotNodes(slots)
        );
      };
    </script>
    <template><render v-defaults /></template>