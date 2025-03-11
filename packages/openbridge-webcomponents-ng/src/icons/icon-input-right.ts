import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputRight as ObiInputRightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-right.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-right.js';

@Component({
  selector: 'obi-input-right',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiInputRight {
  private _el: ObiInputRightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputRightElement>,
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

