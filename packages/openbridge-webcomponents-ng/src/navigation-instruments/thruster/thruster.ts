import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
import {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
import {PropellerType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller';
export type {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
export type {LinearAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice';
export type {PropellerType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller';
import type {ObcThruster as ObcThrusterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/thruster.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/thruster.js';

@Component({
  selector: 'obc-thruster',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcThruster {
  private _el: ObcThrusterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcThrusterElement>,
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
  set setpoint(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.setpoint = v));
  }

  get setpoint() {
    return this._el.setpoint;
  }
  
  @Input()
  set touching(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.touching = v));
  }

  get touching() {
    return this._el.touching;
  }
  
  @Input()
  set atSetpoint(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.atSetpoint = v));
  }

  get atSetpoint() {
    return this._el.atSetpoint;
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
  set setpointAtZeroDeadband(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.setpointAtZeroDeadband = v));
  }

  get setpointAtZeroDeadband() {
    return this._el.setpointAtZeroDeadband;
  }
  
  @Input()
  set state(v: InstrumentState) {
    this._ngZone.runOutsideAngular(() => (this._el.state = v));
  }

  get state() {
    return this._el.state;
  }
  
  @Input()
  set tunnel(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.tunnel = v));
  }

  get tunnel() {
    return this._el.tunnel;
  }
  
  @Input()
  set singleSided(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.singleSided = v));
  }

  get singleSided() {
    return this._el.singleSided;
  }
  
  @Input()
  set singleDirection(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.singleDirection = v));
  }

  get singleDirection() {
    return this._el.singleDirection;
  }
  
  @Input()
  set singleDirectionHalfSize(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.singleDirectionHalfSize = v));
  }

  get singleDirectionHalfSize() {
    return this._el.singleDirectionHalfSize;
  }
  
  @Input()
  set advices(v: LinearAdvice[]) {
    this._ngZone.runOutsideAngular(() => (this._el.advices = v));
  }

  get advices() {
    return this._el.advices;
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

