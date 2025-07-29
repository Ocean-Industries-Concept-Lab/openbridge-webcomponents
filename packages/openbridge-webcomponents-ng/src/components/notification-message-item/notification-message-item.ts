import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcTopbarMessageItemItem as ObcTopbarMessageItemItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item-item/topbar-message-item-item.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item-item/topbar-message-item-item.js';

@Component({
  selector: 'obc-topbar-message-item-item',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcTopbarMessageItemItem {
  private _el: ObcTopbarMessageItemItemElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcTopbarMessageItemItemElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set time(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.time = v));
  }

  get time() {
    return this._el.time;
  }
  

  
}

