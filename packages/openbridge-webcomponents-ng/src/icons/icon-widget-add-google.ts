import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWidgetAddGoogle as ObiWidgetAddGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-widget-add-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-widget-add-google.js';

@Component({
  selector: 'obi-widget-add-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWidgetAddGoogle {
  private _el: ObiWidgetAddGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWidgetAddGoogleElement>,
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

