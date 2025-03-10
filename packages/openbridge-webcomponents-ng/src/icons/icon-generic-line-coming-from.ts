import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineComingFrom as ObiGenericLineComingFromElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-coming-from.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-coming-from.js';

@Component({
  selector: 'obi-generic-line-coming-from',
  template: '<ng-content></ng-content>',
})
export class ObiGenericLineComingFrom {
  private _el: ObiGenericLineComingFromElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineComingFromElement>,
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

