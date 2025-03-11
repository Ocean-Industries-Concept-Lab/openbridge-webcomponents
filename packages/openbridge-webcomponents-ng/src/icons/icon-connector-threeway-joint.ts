import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorThreewayJoint as ObiConnectorThreewayJointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-threeway-joint.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-threeway-joint.js';

@Component({
  selector: 'obi-connector-threeway-joint',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConnectorThreewayJoint {
  private _el: ObiConnectorThreewayJointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorThreewayJointElement>,
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

