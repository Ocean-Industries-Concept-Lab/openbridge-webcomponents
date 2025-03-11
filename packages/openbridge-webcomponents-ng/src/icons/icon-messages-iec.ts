import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMessagesIec as ObiMessagesIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-messages-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-messages-iec.js';

@Component({
  selector: 'obi-messages-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMessagesIec {
  private _el: ObiMessagesIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMessagesIecElement>,
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

