/**
 * Public API Surface of @ocean-industries-concept-lab/openbridge-webcomponents-ng
 *
 * Start small: export the Angular wrapper components/directives you want consumers to import.
 * You can expand this file as you add more wrappers.
 */

// Button (Angular standalone wrapper for <obc-button>)
export {ObcButton, ButtonVariant, segmentPosition } from './components/button/button';
export {ObcDropdownButton} from './components/dropdown-button/dropdown-button';

// Re-export the related types so Angular consumers can import from the wrapper package.
export type {ObcDropdownButtonChangeEvent} from "./components/dropdown-button/dropdown-button";