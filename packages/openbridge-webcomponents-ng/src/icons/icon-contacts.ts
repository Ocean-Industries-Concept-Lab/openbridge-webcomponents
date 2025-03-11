import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContacts as ObiContactsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-contacts.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-contacts.js';

@Component({
  selector: 'obi-contacts',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiContacts {
  private _el: ObiContactsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContactsElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

