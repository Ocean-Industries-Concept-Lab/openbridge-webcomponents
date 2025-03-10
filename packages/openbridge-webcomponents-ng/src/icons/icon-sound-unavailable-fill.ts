import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundUnavailableFill as ObiSoundUnavailableFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-unavailable-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-unavailable-fill.js';

@Component({
  selector: 'obi-sound-unavailable-fill',
  template: '<ng-content></ng-content>',
})
export class ObiSoundUnavailableFill {
  private _el: ObiSoundUnavailableFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundUnavailableFillElement>,
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

