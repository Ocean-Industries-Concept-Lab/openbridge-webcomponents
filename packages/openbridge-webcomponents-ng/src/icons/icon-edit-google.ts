import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEditGoogle as ObiEditGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-edit-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-edit-google.js';

@Component({
  selector: 'obi-edit-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEditGoogle {
  private _el: ObiEditGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEditGoogleElement>,
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

