import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUser as ObiUserElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user.js';

@Component({
  selector: 'obi-user',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiUser {
  private _el: ObiUserElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUserElement>,
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

