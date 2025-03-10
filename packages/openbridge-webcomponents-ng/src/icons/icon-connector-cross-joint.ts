import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConnectorCrossJoint as ObiConnectorCrossJointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-cross-joint.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-connector-cross-joint.js';

@Component({
  selector: 'obi-connector-cross-joint',
  template: '<ng-content></ng-content>',
})
export class ObiConnectorCrossJoint {
  private _el: ObiConnectorCrossJointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConnectorCrossJointElement>,
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

