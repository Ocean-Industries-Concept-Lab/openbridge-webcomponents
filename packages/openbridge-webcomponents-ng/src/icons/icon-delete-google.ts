import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDeleteGoogle as ObiDeleteGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-delete-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-delete-google.js';

@Component({
  selector: 'obi-delete-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDeleteGoogle {
  private _el: ObiDeleteGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDeleteGoogleElement>,
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

