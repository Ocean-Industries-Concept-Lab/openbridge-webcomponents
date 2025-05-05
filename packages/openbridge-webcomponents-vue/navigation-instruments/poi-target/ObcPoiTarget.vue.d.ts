import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
import { TargetValue, Pointer } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
export interface Props {
    height?: number;
    value?: TargetValue;
    pointerType?: Pointer;
    relativeDirection?: number;
}
export type { TargetValue, Pointer } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
