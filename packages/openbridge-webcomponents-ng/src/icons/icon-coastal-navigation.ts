import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCoastalNavigation as ObiCoastalNavigationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-coastal-navigation.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-coastal-navigation.js';

@Component({
  selector: 'obi-coastal-navigation',
  template: '<ng-content></ng-content>',
})
export class ObiCoastalNavigation {
  private _el: ObiCoastalNavigationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCoastalNavigationElement>,
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

