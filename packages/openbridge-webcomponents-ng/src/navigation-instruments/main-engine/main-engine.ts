import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
import {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
export type {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
export type {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
import type {ObcMainEngine as ObcMainEngineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/main-engine/main-engine.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/main-engine/main-engine.js';

@Component({
  selector: 'obc-main-engine',
  template: '<ng-content></ng-content>',
})
export class ObcMainEngine {
  private _el: ObcMainEngineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcMainEngineElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set thrust(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.thrust = v));
  }

  get thrust() {
    return this._el.thrust;
  }
  
  @Input()
  set thrustSetpoint(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.thrustSetpoint = v));
  }

  get thrustSetpoint() {
    return this._el.thrustSetpoint;
  }
  
  @Input()
  set thrustTouching(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.thrustTouching = v));
  }

  get thrustTouching() {
    return this._el.thrustTouching;
  }
  
  @Input()
  set atThrustSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.atThrustSetpoint = v));
  }

  get atThrustSetpoint() {
    return this._el.atThrustSetpoint;
  }
  
  @Input()
  set speed(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.speed = v));
  }

  get speed() {
    return this._el.speed;
  }
  
  @Input()
  set speedSetpoint(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.speedSetpoint = v));
  }

  get speedSetpoint() {
    return this._el.speedSetpoint;
  }
  
  @Input()
  set speedTouching(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.speedTouching = v));
  }

  get speedTouching() {
    return this._el.speedTouching;
  }
  
  @Input()
  set atSpeedSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.atSpeedSetpoint = v));
  }

  get atSpeedSetpoint() {
    return this._el.atSpeedSetpoint;
  }
  
  @Input()
  set disableAutoAtThrustSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disableAutoAtThrustSetpoint = v));
  }

  get disableAutoAtThrustSetpoint() {
    return this._el.disableAutoAtThrustSetpoint;
  }
  
  @Input()
  set disableAutoAtSpeedSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disableAutoAtSpeedSetpoint = v));
  }

  get disableAutoAtSpeedSetpoint() {
    return this._el.disableAutoAtSpeedSetpoint;
  }
  
  @Input()
  set autoAtThrustSetpointDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.autoAtThrustSetpointDeadband = v));
  }

  get autoAtThrustSetpointDeadband() {
    return this._el.autoAtThrustSetpointDeadband;
  }
  
  @Input()
  set autoAtSpeedSetpointDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.autoAtSpeedSetpointDeadband = v));
  }

  get autoAtSpeedSetpointDeadband() {
    return this._el.autoAtSpeedSetpointDeadband;
  }
  
  @Input()
  set thrustSetpointAtZeroDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.thrustSetpointAtZeroDeadband = v));
  }

  get thrustSetpointAtZeroDeadband() {
    return this._el.thrustSetpointAtZeroDeadband;
  }
  
  @Input()
  set speedSetpointAtZeroDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.speedSetpointAtZeroDeadband = v));
  }

  get speedSetpointAtZeroDeadband() {
    return this._el.speedSetpointAtZeroDeadband;
  }
  
  @Input()
  set state(v: InstrumentState) {
    this._ngZone.runOutsideAngular(() => (this._el.state = v));
  }

  get state() {
    return this._el.state;
  }
  
  @Input()
  set thrustAdvices(v: LinearAdvice[]) {
    this._ngZone.runOutsideAngular(() => (this._el.thrustAdvices = v));
  }

  get thrustAdvices() {
    return this._el.thrustAdvices;
  }
  

  
}

