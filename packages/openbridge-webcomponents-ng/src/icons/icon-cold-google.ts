import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiColdGoogle as ObiColdGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cold-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cold-google.js';

@Component({
  selector: 'obi-cold-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiColdGoogle {
  private _el: ObiColdGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiColdGoogleElement>,
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

