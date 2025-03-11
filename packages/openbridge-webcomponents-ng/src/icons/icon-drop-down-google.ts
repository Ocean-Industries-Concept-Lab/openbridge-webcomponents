import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDropDownGoogle as ObiDropDownGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-drop-down-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-drop-down-google.js';

@Component({
  selector: 'obi-drop-down-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDropDownGoogle {
  private _el: ObiDropDownGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDropDownGoogleElement>,
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

