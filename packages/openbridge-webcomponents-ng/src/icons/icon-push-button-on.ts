import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPushButtonOn as ObiPushButtonOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-push-button-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-push-button-on.js';

@Component({
  selector: 'obi-push-button-on',
  template: '<ng-content></ng-content>',
})
export class ObiPushButtonOn {
  private _el: ObiPushButtonOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPushButtonOnElement>,
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

