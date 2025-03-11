import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiClearNight as ObiClearNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-clear-night.js';

@Component({
  selector: 'obi-clear-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiClearNight {
  private _el: ObiClearNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiClearNightElement>,
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

