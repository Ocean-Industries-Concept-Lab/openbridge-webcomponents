import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandAutopilot as ObiCommandAutopilotElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-autopilot.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-autopilot.js';

@Component({
  selector: 'obi-command-autopilot',
  template: '<ng-content></ng-content>',
})
export class ObiCommandAutopilot {
  private _el: ObiCommandAutopilotElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandAutopilotElement>,
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

