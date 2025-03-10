import {
  Component,
  ElementRef,
  NgZone

} from '@angular/core';


import type {ObcAutomationInputModal as ObcAutomationInputModalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-input-modal/automation-input-modal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-input-modal/automation-input-modal.js';

@Component({
  selector: 'obc-automation-input-modal',
  template: '<ng-content></ng-content>',
})
export class ObcAutomationInputModal {
  
  

  constructor(
    _e: ElementRef<ObcAutomationInputModalElement>,
    _ngZone: NgZone
  ) {
    
    
    
  }

  

  
}

