import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcNavigationItem as ObcNavigationItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js';

@Component({
  selector: 'obc-navigation-item',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcNavigationItem {
  private _el: ObcNavigationItemElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcNavigationItemElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set label(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }
  
  @Input()
  set href(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.href = v));
  }

  get href() {
    return this._el.href;
  }
  
  @Input()
  set checked(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.checked = v));
  }

  get checked() {
    return this._el.checked;
  }
  

  
}

