import {
  Component,
  ElementRef,
  NgZone

} from '@angular/core';


import type {ObcNavigationMenu as ObcNavigationMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu.js';

@Component({
  selector: 'obc-navigation-menu',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcNavigationMenu {
  
  

  constructor(
    _e: ElementRef<ObcNavigationMenuElement>,
    _ngZone: NgZone
  ) {
    
    
    
  }

  

  
}

