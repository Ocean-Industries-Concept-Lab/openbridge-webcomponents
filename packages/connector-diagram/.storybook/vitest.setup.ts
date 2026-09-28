import {setProjectAnnotations} from '@storybook/html-vite'
import * as projectAnnotations from './preview.js'
import {vis, visAnnotations} from 'storybook-addon-vis/vitest-setup'

// Disable animations for deterministic visual snapshots
const style = document.createElement('style')
style.textContent = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`
document.head.appendChild(style)

setProjectAnnotations([projectAnnotations, visAnnotations])

vis.setup()
