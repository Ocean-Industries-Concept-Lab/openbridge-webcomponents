import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSpeedGood as ObiSpeedGoodElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-good.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speed-good.js';

@Component({
  selector: 'obi-speed-good',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSpeedGood {
  private _el: ObiSpeedGoodElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSpeedGoodElement>,
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

