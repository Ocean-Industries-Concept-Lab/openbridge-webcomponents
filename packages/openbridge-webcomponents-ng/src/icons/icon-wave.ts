import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWave as ObiWaveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wave.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wave.js';

@Component({
  selector: 'obi-wave',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWave {
  private _el: ObiWaveElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWaveElement>,
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

