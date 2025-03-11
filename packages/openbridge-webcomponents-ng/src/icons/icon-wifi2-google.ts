import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifi2Google as ObiWifi2GoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi2-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifi2-google.js';

@Component({
  selector: 'obi-wifi2-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiWifi2Google {
  private _el: ObiWifi2GoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifi2GoogleElement>,
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

