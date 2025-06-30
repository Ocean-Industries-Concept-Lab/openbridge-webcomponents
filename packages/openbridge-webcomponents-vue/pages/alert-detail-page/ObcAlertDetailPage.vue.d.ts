import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';
import { AlertDetailPageType, AlertDetailPageAlertStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';
export interface Props {
    type?: AlertDetailPageType;
    alertStatus?: AlertDetailPageAlertStatus;
    hasSubdescription?: boolean;
    hasActions?: boolean;
    hasTagId?: boolean;
    hasCategory?: boolean;
    hasActivated?: boolean;
    hasTimer?: boolean;
    hasAcknowledged?: boolean;
    hasAcknowledgedBy?: boolean;
    hasRectified?: boolean;
    hasShelvingTimer?: boolean;
    hasShelvedBy?: boolean;
    hasReadoutGraph?: boolean;
}
export type { AlertDetailPageType, AlertDetailPageAlertStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/pages/alert-detail-page/alert-detail-page.js';
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
