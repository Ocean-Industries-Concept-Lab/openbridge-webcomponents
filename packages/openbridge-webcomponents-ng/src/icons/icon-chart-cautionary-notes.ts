import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartCautionaryNotes as ObiChartCautionaryNotesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-cautionary-notes.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-cautionary-notes.js';

@Component({
  selector: 'obi-chart-cautionary-notes',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartCautionaryNotes {
  private _el: ObiChartCautionaryNotesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartCautionaryNotesElement>,
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

