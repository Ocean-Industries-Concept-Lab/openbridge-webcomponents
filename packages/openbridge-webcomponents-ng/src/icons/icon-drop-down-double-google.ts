import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDropDownDoubleGoogle as ObiDropDownDoubleGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-drop-down-double-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-drop-down-double-google.js';

@Component({
  selector: 'obi-drop-down-double-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDropDownDoubleGoogle {
  private _el: ObiDropDownDoubleGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDropDownDoubleGoogleElement>,
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

