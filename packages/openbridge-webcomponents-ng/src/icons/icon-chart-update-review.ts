import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartUpdateReview as ObiChartUpdateReviewElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-update-review.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-update-review.js';

@Component({
  selector: 'obi-chart-update-review',
  template: '<ng-content></ng-content>',
})
export class ObiChartUpdateReview {
  private _el: ObiChartUpdateReviewElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartUpdateReviewElement>,
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

