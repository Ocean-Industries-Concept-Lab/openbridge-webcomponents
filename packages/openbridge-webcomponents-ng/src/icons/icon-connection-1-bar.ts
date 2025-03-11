import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnection1Bar as ObiConnection1BarElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-1-bar.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connection-1-bar.js';

@Component({
  selector: 'obi-connection-1-bar',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConnection1Bar {
  private _el: ObiConnection1BarElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnection1BarElement>,
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

