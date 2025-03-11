import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPushButtonOff as ObiPushButtonOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-push-button-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-push-button-off.js';

@Component({
  selector: 'obi-push-button-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPushButtonOff {
  private _el: ObiPushButtonOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPushButtonOffElement>,
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

