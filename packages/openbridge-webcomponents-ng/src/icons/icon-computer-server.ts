import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComputerServer as ObiComputerServerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-computer-server.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-computer-server.js';

@Component({
  selector: 'obi-computer-server',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiComputerServer {
  private _el: ObiComputerServerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComputerServerElement>,
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

