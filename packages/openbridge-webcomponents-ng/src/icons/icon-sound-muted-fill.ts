import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundMutedFill as ObiSoundMutedFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-muted-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-muted-fill.js';

@Component({
  selector: 'obi-sound-muted-fill',
  template: '<ng-content></ng-content>',
})
export class ObiSoundMutedFill {
  private _el: ObiSoundMutedFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundMutedFillElement>,
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

