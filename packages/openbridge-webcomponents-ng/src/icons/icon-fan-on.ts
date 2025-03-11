import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiFanOn as ObiFanOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fan-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-fan-on.js';

@Component({
  selector: 'obi-fan-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiFanOn {
  private _el: ObiFanOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiFanOnElement>,
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

