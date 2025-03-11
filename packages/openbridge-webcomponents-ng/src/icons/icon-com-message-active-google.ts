import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComMessageActiveGoogle as ObiComMessageActiveGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-message-active-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-message-active-google.js';

@Component({
  selector: 'obi-com-message-active-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiComMessageActiveGoogle {
  private _el: ObiComMessageActiveGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComMessageActiveGoogleElement>,
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

