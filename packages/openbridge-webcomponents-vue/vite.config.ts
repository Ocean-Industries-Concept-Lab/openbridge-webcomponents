
import vue from '@vitejs/plugin-vue';
import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      // Ensures no deps are bundled with build.
      // Source paths are expected to start with `./` or `/` but may be
      // `x:` on Windows.
      external: (id: string) => !id.match(/^((\w:)|(\.?[\\/]))/),
      input: [
        './src/components/alert-button/AlertButton.vue', './src/components/alert-menu/AlertMenu.vue', './src/components/app-button/AppButton.vue', './src/components/app-menu/AppMenu.vue', './src/components/breadcrumb/Breadcrumb.vue', './src/components/brilliance-menu/BrillianceMenu.vue', './src/components/button/Button.vue', './src/components/card-list-button/CardListButton.vue', './src/components/clock/Clock.vue', './src/components/demo/Demo.vue', './src/components/divider/Divider.vue', './src/components/icon/Icon.vue', './src/components/icon-button/IconButton.vue', './src/components/icons/Obi14Alerts.vue', './src/components/input/Input.vue', './src/components/navigation-item/NavigationItem.vue', './src/components/navigation-menu/NavigationMenu.vue', './src/components/notification-button/NotificationButton.vue', './src/components/notification-message/NotificationMessage.vue', './src/components/notification-message-item/NotificationMessageItem.vue', './src/components/slider/Slider.vue', './src/components/toggle-button-group/ToggleButtonGroup.vue', './src/components/toggle-button-option/ToggleButtonOption.vue', './src/components/toggle-switch/ToggleSwitch.vue', './src/components/tooltip/Tooltip.vue', './src/components/top-bar/TopBar.vue'
      ],
      preserveModules: true,
			preserveModulesRoot: 'src',
      preserveEntrySignatures: true,
      output: {
        format: 'es',
        entryFileNames: ({ name }) => `${name}.js`,
        dir: './',
        sourcemap: true
      }
    },
    outDir: './'
  },
  plugins: [vue(), typescript()],
};