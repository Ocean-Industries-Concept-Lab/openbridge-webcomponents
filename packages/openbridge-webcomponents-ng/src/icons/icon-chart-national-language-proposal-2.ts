import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartNationalLanguageProposal2 as ObiChartNationalLanguageProposal2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-national-language-proposal-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-national-language-proposal-2.js';

@Component({
  selector: 'obi-chart-national-language-proposal-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartNationalLanguageProposal2 {
  private _el: ObiChartNationalLanguageProposal2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartNationalLanguageProposal2Element>,
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

