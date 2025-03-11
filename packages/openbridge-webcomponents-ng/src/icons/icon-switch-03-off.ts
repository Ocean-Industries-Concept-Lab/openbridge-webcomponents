import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitch03Off as ObiSwitch03OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-03-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-03-off.js';

@Component({
  selector: 'obi-switch-03-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSwitch03Off {
  private _el: ObiSwitch03OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitch03OffElement>,
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

