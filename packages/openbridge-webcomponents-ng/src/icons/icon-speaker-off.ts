import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSpeakerOff as ObiSpeakerOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speaker-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speaker-off.js';

@Component({
  selector: 'obi-speaker-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSpeakerOff {
  private _el: ObiSpeakerOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSpeakerOffElement>,
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

