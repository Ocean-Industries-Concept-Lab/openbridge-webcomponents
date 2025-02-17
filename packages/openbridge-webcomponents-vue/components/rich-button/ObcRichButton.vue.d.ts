import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/rich-button/rich-button.js';
export interface Props {
    position?: string;
    size?: string;
    info?: boolean;
    hasLeadingIcon?: boolean;
    hasTrailingIcon?: boolean;
    hasStatus?: boolean;
    hasGraphic?: boolean;
    graphicBorder?: boolean;
    border?: boolean;
    href?: string | undefined;
    target?: string | undefined;
}
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
