import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
import {AngleAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice';
import {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
import {PropellerType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller';
export type {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
export type {AngleAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice';
export type {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
export type {PropellerType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller';
import type {ObcAzimuthThruster as ObcAzimuthThrusterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/azimuth-thruster/azimuth-thruster.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/azimuth-thruster/azimuth-thruster.js';

@Component({
  selector: 'obc-azimuth-thruster',
  template: '<ng-content></ng-content>',
})
export class ObcAzimuthThruster {
  private _el: ObcAzimuthThrusterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAzimuthThrusterElement>,
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
  set angleSetpoint(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.angleSetpoint = v));
  }

  get angleSetpoint() {
    return this._el.angleSetpoint;
  }
  
  @Input()
  set atAngleSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.atAngleSetpoint = v));
  }

  get atAngleSetpoint() {
    return this._el.atAngleSetpoint;
  }
  
  @Input()
  set touching(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.touching = v));
  }

  get touching() {
    return this._el.touching;
  }
  
  @Input()
  set disableAutoAtAngleSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disableAutoAtAngleSetpoint = v));
  }

  get disableAutoAtAngleSetpoint() {
    return this._el.disableAutoAtAngleSetpoint;
  }
  
  @Input()
  set autoAtAngleSetpointDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.autoAtAngleSetpointDeadband = v));
  }

  get autoAtAngleSetpointDeadband() {
    return this._el.autoAtAngleSetpointDeadband;
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
  set atThrustSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.atThrustSetpoint = v));
  }

  get atThrustSetpoint() {
    return this._el.atThrustSetpoint;
  }
  
  @Input()
  set thrustSetpointAtZeroDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.thrustSetpointAtZeroDeadband = v));
  }

  get thrustSetpointAtZeroDeadband() {
    return this._el.thrustSetpointAtZeroDeadband;
  }
  
  @Input()
  set disableAutoAtThrustSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.disableAutoAtThrustSetpoint = v));
  }

  get disableAutoAtThrustSetpoint() {
    return this._el.disableAutoAtThrustSetpoint;
  }
  
  @Input()
  set autoAtThrustSetpointDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.autoAtThrustSetpointDeadband = v));
  }

  get autoAtThrustSetpointDeadband() {
    return this._el.autoAtThrustSetpointDeadband;
  }
  
  @Input()
  set state(v: InstrumentState) {
    this._ngZone.runOutsideAngular(() => (this._el.state = v));
  }

  get state() {
    return this._el.state;
  }
  
  @Input()
  set loading(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.loading = v));
  }

  get loading() {
    return this._el.loading;
  }
  
  @Input()
  set noPadding(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.noPadding = v));
  }

  get noPadding() {
    return this._el.noPadding;
  }
  
  @Input()
  set angleAdvices(v: AngleAdvice[]) {
    this._ngZone.runOutsideAngular(() => (this._el.angleAdvices = v));
  }

  get angleAdvices() {
    return this._el.angleAdvices;
  }
  
  @Input()
  set thrustAdvices(v: LinearAdvice[]) {
    this._ngZone.runOutsideAngular(() => (this._el.thrustAdvices = v));
  }

  get thrustAdvices() {
    return this._el.thrustAdvices;
  }
  
  @Input()
  set singleDirection(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.singleDirection = v));
  }

  get singleDirection() {
    return this._el.singleDirection;
  }
  
  @Input()
  set topPropeller(v: PropellerType) {
    this._ngZone.runOutsideAngular(() => (this._el.topPropeller = v));
  }

  get topPropeller() {
    return this._el.topPropeller;
  }
  
  @Input()
  set bottomPropeller(v: PropellerType) {
    this._ngZone.runOutsideAngular(() => (this._el.bottomPropeller = v));
  }

  get bottomPropeller() {
    return this._el.bottomPropeller;
  }
  

  
}

