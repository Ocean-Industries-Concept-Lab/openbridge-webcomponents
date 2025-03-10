import {
  Component,
  ElementRef,
  NgZone

} from '@angular/core';


import type {ObcDivider as ObcDividerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/divider/divider.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/divider/divider.js';

@Component({
  selector: 'obc-divider',
  template: '<ng-content></ng-content>',
})
export class ObcDivider {
  
  

  constructor(
    _e: ElementRef<ObcDividerElement>,
    _ngZone: NgZone
  ) {
    
    
    
  }

  

  
}

