import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartNationalLanguageProposal1 as ObiChartNationalLanguageProposal1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-national-language-proposal-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-national-language-proposal-1.js';

@Component({
  selector: 'obi-chart-national-language-proposal-1',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartNationalLanguageProposal1 {
  private _el: ObiChartNationalLanguageProposal1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartNationalLanguageProposal1Element>,
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

