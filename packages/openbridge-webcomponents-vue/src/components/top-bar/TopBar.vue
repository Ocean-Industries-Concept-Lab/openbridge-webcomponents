
    <script lang="ts">
      export type {BreadcrumbItem} from 'openbridge-webcomponents/dist/components/breadcrumb/breadcrumb';
    </script>
    <script setup lang="ts">
      import { h, useSlots, reactive } from "vue";
      import { assignSlotNodes, Slots } from "@lit-labs/vue-utils/wrapper-utils.js";
      import 'openbridge-webcomponents/dist/components/top-bar/top-bar.js';
      import {BreadcrumbItem} from 'openbridge-webcomponents/dist/components/breadcrumb/breadcrumb';

      export interface Props {
     appTitle?: string;
     pageName?: string;
     date?: string;
     wideMenuButton?: boolean;
     showAppsButton?: boolean;
     showDimmingButton?: boolean;
     showClock?: boolean;
     inactive?: boolean;
     sizeSmall?: boolean;
     settings?: boolean;
     breadcrumbItems?: BreadcrumbItem[]
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
        (e: 'menu-button-clicked', payload: CustomEvent<unknown>): void
      }>();

      const slots = useSlots();

      const render = () => {
        const eventProps = {
    onMenuButtonClicked: (event: CustomEvent<unknown>) => emit('menu-button-clicked', event as CustomEvent<unknown>)
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
          'obc-top-bar',
          props,
          assignSlotNodes(slots as Slots)
        );
      };
    </script>
    <template><render v-defaults /></template>