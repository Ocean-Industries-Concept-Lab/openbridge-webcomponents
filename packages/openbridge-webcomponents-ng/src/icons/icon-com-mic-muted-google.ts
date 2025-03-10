import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComMicMutedGoogle as ObiComMicMutedGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-mic-muted-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-mic-muted-google.js';

@Component({
  selector: 'obi-com-mic-muted-google',
  template: '<ng-content></ng-content>',
})
export class ObiComMicMutedGoogle {
  private _el: ObiComMicMutedGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComMicMutedGoogleElement>,
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

