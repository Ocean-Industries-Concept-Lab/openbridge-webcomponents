import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComMicrophone as ObiComMicrophoneElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-microphone.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-microphone.js';

@Component({
  selector: 'obi-com-microphone',
  template: '<ng-content></ng-content>',
})
export class ObiComMicrophone {
  private _el: ObiComMicrophoneElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComMicrophoneElement>,
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

