import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {Obi07ChartStyles as Obi07ChartStylesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-07-chart-styles.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-07-chart-styles.js';

@Component({
  selector: 'obi-07-chart-styles',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class Obi07ChartStyles {
  private _el: Obi07ChartStylesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<Obi07ChartStylesElement>,
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

