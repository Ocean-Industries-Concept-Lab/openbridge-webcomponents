import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContentCopyGoogle as ObiContentCopyGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-copy-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-copy-google.js';

@Component({
  selector: 'obi-content-copy-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiContentCopyGoogle {
  private _el: ObiContentCopyGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContentCopyGoogleElement>,
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

