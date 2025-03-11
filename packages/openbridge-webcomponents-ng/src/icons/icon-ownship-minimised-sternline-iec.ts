import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiOwnshipMinimisedSternlineIec as ObiOwnshipMinimisedSternlineIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ownship-minimised-sternline-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ownship-minimised-sternline-iec.js';

@Component({
  selector: 'obi-ownship-minimised-sternline-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiOwnshipMinimisedSternlineIec {
  private _el: ObiOwnshipMinimisedSternlineIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiOwnshipMinimisedSternlineIecElement>,
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

