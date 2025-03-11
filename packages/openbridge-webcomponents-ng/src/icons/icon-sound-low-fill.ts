import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundLowFill as ObiSoundLowFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-low-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-low-fill.js';

@Component({
  selector: 'obi-sound-low-fill',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSoundLowFill {
  private _el: ObiSoundLowFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundLowFillElement>,
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

