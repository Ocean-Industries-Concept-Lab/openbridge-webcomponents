import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiScreenRecording as ObiScreenRecordingElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-recording.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-screen-recording.js';

@Component({
  selector: 'obi-screen-recording',
  template: '<ng-content></ng-content>',
})
export class ObiScreenRecording {
  private _el: ObiScreenRecordingElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiScreenRecordingElement>,
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

