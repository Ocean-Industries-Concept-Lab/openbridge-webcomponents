import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEco as ObiEcoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-eco.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-eco.js';

@Component({
  selector: 'obi-eco',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEco {
  private _el: ObiEcoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEcoElement>,
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

