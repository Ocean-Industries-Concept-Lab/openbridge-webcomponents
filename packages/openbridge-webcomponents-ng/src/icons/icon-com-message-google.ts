import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComMessageGoogle as ObiComMessageGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-message-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-message-google.js';

@Component({
  selector: 'obi-com-message-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiComMessageGoogle {
  private _el: ObiComMessageGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComMessageGoogleElement>,
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

