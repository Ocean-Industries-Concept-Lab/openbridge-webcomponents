import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObcRudder as ObcRudderElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/rudder/rudder.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/rudder/rudder.js';

@Component({
  selector: 'obc-rudder',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcRudder {
  private _el: ObcRudderElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcRudderElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set angle(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.angle = v));
  }

  get angle() {
    return this._el.angle;
  }
  
  @Input()
  set setpoint(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.setpoint = v));
  }

  get setpoint() {
    return this._el.setpoint;
  }
  
  @Input()
  set atSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.atSetpoint = v));
  }

  get atSetpoint() {
    return this._el.atSetpoint;
  }
  
  @Input()
  set touching(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.touching = v));
  }

  get touching() {
    return this._el.touching;
  }
  
  @Input()
  set disableAutoAtSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disableAutoAtSetpoint = v));
  }

  get disableAutoAtSetpoint() {
    return this._el.disableAutoAtSetpoint;
  }
  
  @Input()
  set autoAtSetpointDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.autoAtSetpointDeadband = v));
  }

  get autoAtSetpointDeadband() {
    return this._el.autoAtSetpointDeadband;
  }
  
  @Input()
  set maxAngle(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.maxAngle = v));
  }

  get maxAngle() {
    return this._el.maxAngle;
  }
  

  
}

