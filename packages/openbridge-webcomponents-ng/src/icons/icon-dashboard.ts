import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDashboard as ObiDashboardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dashboard.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-dashboard.js';

@Component({
  selector: 'obi-dashboard',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDashboard {
  private _el: ObiDashboardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDashboardElement>,
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

