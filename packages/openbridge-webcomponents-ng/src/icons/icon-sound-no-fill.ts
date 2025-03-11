import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundNoFill as ObiSoundNoFillElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-no-fill.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-no-fill.js';

@Component({
  selector: 'obi-sound-no-fill',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSoundNoFill {
  private _el: ObiSoundNoFillElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundNoFillElement>,
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

