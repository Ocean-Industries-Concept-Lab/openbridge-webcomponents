import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiStandby as ObiStandbyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-standby.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-standby.js';

@Component({
  selector: 'obi-standby',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiStandby {
  private _el: ObiStandbyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiStandbyElement>,
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

