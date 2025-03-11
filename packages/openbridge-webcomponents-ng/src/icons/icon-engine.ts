import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEngine as ObiEngineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-engine.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-engine.js';

@Component({
  selector: 'obi-engine',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEngine {
  private _el: ObiEngineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEngineElement>,
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

