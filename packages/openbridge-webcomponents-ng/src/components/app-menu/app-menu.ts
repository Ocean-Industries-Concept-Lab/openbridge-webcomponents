import {
  Component,
  ElementRef,
  NgZone

} from '@angular/core';


import type {ObcAppMenu as ObcAppMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/app-menu/app-menu.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/app-menu/app-menu.js';

@Component({
  selector: 'obc-app-menu',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAppMenu {
  
  

  constructor(
    _e: ElementRef<ObcAppMenuElement>,
    _ngZone: NgZone
  ) {
    
    
    
  }

  

  
}

