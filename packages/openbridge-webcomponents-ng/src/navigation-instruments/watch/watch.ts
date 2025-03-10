import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
import {Tickmark} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/tickmark';
import {AngleAdviceRaw} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice';
export type {InstrumentState} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types';
export type {Tickmark} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/tickmark';
export type {AngleAdviceRaw} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice';
import type {ObcWatch as ObcWatchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/watch.js';

@Component({
  selector: 'obc-watch',
  template: '<ng-content></ng-content>',
})
export class ObcWatch {
  private _el: ObcWatchElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcWatchElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set state(v: InstrumentState) {
    this._ngZone.runOutsideAngular(() => (this._el.state = v));
  }

  get state() {
    return this._el.state;
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
  set padding(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.padding = v));
  }

  get padding() {
    return this._el.padding;
  }
  
  @Input()
  set cutAngleStart(v: number | null) {
    this._ngZone.runOutsideAngular(() => (this._el.cutAngleStart = v));
  }

  get cutAngleStart() {
    return this._el.cutAngleStart;
  }
  
  @Input()
  set cutAngleEnd(v: number | null) {
    this._ngZone.runOutsideAngular(() => (this._el.cutAngleEnd = v));
  }

  get cutAngleEnd() {
    return this._el.cutAngleEnd;
  }
  
  @Input()
  set roundOutsideCut(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.roundOutsideCut = v));
  }

  get roundOutsideCut() {
    return this._el.roundOutsideCut;
  }
  
  @Input()
  set roundInsideCut(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.roundInsideCut = v));
  }

  get roundInsideCut() {
    return this._el.roundInsideCut;
  }
  
  @Input()
  set tickmarks(v: Tickmark[]) {
    this._ngZone.runOutsideAngular(() => (this._el.tickmarks = v));
  }

  get tickmarks() {
    return this._el.tickmarks;
  }
  
  @Input()
  set advices(v: AngleAdviceRaw[]) {
    this._ngZone.runOutsideAngular(() => (this._el.advices = v));
  }

  get advices() {
    return this._el.advices;
  }
  
  @Input()
  set crosshairEnabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.crosshairEnabled = v));
  }

  get crosshairEnabled() {
    return this._el.crosshairEnabled;
  }
  
  @Input()
  set labelFrameEnabled(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.labelFrameEnabled = v));
  }

  get labelFrameEnabled() {
    return this._el.labelFrameEnabled;
  }
  

  
}

