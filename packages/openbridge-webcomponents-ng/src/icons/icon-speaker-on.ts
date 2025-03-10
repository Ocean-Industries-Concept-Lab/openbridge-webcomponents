import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSpeakerOn as ObiSpeakerOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speaker-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speaker-on.js';

@Component({
  selector: 'obi-speaker-on',
  template: '<ng-content></ng-content>',
})
export class ObiSpeakerOn {
  private _el: ObiSpeakerOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSpeakerOnElement>,
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

