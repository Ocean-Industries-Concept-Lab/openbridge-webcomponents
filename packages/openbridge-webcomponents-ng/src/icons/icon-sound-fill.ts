import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundFill as ObiSoundFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-fill.js';

@Component({
  selector: 'obi-sound-fill',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSoundFill {
  private _el: ObiSoundFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundFillElement>,
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

