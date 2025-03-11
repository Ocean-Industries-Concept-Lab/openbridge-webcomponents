import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContentExpandGoogle as ObiContentExpandGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-expand-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-expand-google.js';

@Component({
  selector: 'obi-content-expand-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiContentExpandGoogle {
  private _el: ObiContentExpandGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContentExpandGoogleElement>,
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

