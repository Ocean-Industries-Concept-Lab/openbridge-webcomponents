import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContentPasteGoogle as ObiContentPasteGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-paste-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-paste-google.js';

@Component({
  selector: 'obi-content-paste-google',
  template: '<ng-content></ng-content>',
})
export class ObiContentPasteGoogle {
  private _el: ObiContentPasteGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContentPasteGoogleElement>,
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

