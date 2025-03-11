import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInputMouseGoogle as ObiInputMouseGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-mouse-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-input-mouse-google.js';

@Component({
  selector: 'obi-input-mouse-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiInputMouseGoogle {
  private _el: ObiInputMouseGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInputMouseGoogleElement>,
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

