import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiContentCollapseGoogle as ObiContentCollapseGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-collapse-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-collapse-google.js';

@Component({
  selector: 'obi-content-collapse-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiContentCollapseGoogle {
  private _el: ObiContentCollapseGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiContentCollapseGoogleElement>,
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

