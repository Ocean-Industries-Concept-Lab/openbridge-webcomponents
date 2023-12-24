
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
        './src/components/alert-button/AlertButton.vue', './src/components/icons/Obi14Alerts.vue'
      ],
      
      preserveEntrySignatures: true,
      output: {
        format: 'es',
        entryFileNames: (opt) => {
          return `${opt.name}.js`},
        sourcemap: true,
        preserveModules: true,
			  preserveModulesRoot: 'src',
      },
    },
    outDir: './'
  },
  plugins: [vue(), typescript()],
};