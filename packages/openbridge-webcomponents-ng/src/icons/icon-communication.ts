import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommunication as ObiCommunicationElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-communication.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-communication.js';

@Component({
  selector: 'obi-communication',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCommunication {
  private _el: ObiCommunicationElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommunicationElement>,
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

