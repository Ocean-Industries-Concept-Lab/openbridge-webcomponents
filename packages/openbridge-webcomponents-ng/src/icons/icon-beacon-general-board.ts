import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralBoard as ObiBeaconGeneralBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-board.js';

@Component({
  selector: 'obi-beacon-general-board',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralBoard {
  private _el: ObiBeaconGeneralBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralBoardElement>,
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

