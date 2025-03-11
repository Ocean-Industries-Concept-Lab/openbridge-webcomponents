import {
  Component,
  ElementRef,
  NgZone

} from '@angular/core';


import type {ObcScrollbar as ObcScrollbarElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/scrollbar/scrollbar.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/scrollbar/scrollbar.js';

@Component({
  selector: 'obc-scrollbar',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcScrollbar {
  
  

  constructor(
    _e: ElementRef<ObcScrollbarElement>,
    _ngZone: NgZone
  ) {
    
    
    
  }

  

  
}

