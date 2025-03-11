import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSortGoogle as ObiSortGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sort-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sort-google.js';

@Component({
  selector: 'obi-sort-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSortGoogle {
  private _el: ObiSortGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSortGoogleElement>,
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

