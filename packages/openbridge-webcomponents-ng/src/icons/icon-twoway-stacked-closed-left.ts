import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTwowayStackedClosedLeft as ObiTwowayStackedClosedLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-closed-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-twoway-stacked-closed-left.js';

@Component({
  selector: 'obi-twoway-stacked-closed-left',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTwowayStackedClosedLeft {
  private _el: ObiTwowayStackedClosedLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTwowayStackedClosedLeftElement>,
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

