import * as React from 'react';
import { createComponent } from '@lit/react';
import { ObcPoiTargetButtonGroup as ObcPoiTargetButtonGroupElement } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/ar/poi-target-button-group/poi-target-button-group.js';
export const ObcPoiTargetButtonGroup = createComponent({
    react: React,
    tagName: 'obc-poi-target-button-group',
    elementClass: ObcPoiTargetButtonGroupElement,
    events: {
        onExpand: 'expand',
    }
});
//# sourceMappingURL=poi-target-button-group.js.map