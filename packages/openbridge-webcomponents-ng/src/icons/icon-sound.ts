import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSound as ObiSoundElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound.js';

@Component({
  selector: 'obi-sound',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSound {
  private _el: ObiSoundElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundElement>,
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

