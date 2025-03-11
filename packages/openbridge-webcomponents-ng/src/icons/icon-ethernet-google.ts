import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEthernetGoogle as ObiEthernetGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ethernet-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ethernet-google.js';

@Component({
  selector: 'obi-ethernet-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEthernetGoogle {
  private _el: ObiEthernetGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEthernetGoogleElement>,
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

