import {
  Component,
  ElementRef,
  NgZone

} from '@angular/core';


import type {ObcContextMenu as ObcContextMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu/context-menu.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu/context-menu.js';

@Component({
  selector: 'obc-context-menu',
  template: '<ng-content></ng-content>',
})
export class ObcContextMenu {
  
  

  constructor(
    _e: ElementRef<ObcContextMenuElement>,
    _ngZone: NgZone
  ) {
    
    
    
  }

  

  
}

