import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGround1Off as ObiGround1OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-1-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ground-1-off.js';

@Component({
  selector: 'obi-ground-1-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiGround1Off {
  private _el: ObiGround1OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGround1OffElement>,
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

