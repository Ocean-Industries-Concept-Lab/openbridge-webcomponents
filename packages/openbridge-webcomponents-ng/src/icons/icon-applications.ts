import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiApplications as ObiApplicationsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-applications.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-applications.js';

@Component({
  selector: 'obi-applications',
  template: '<ng-content></ng-content>',
})
export class ObiApplications {
  private _el: ObiApplicationsElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiApplicationsElement>,
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

