import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDiver as ObiDiverElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diver.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-diver.js';

@Component({
  selector: 'obi-diver',
  template: '<ng-content></ng-content>',
})
export class ObiDiver {
  private _el: ObiDiverElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDiverElement>,
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

