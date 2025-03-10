import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiKayaking as ObiKayakingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-kayaking.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-kayaking.js';

@Component({
  selector: 'obi-kayaking',
  template: '<ng-content></ng-content>',
})
export class ObiKayaking {
  private _el: ObiKayakingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiKayakingElement>,
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

