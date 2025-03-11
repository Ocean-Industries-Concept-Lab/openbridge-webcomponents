import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {Tickmark} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch-flat/tickmark-flat';
import {Label} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-flat/compass-flat';
import {SVGTemplateResult} from 'lit';
export type {Tickmark} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch-flat/tickmark-flat';
export type {Label} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-flat/compass-flat';
export type {SVGTemplateResult} from 'lit';
import type {ObcWatchFlat as ObcWatchFlatElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch-flat/watch-flat.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch-flat/watch-flat.js';

@Component({
  selector: 'obc-watch-flat',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcWatchFlat {
  private _el: ObcWatchFlatElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcWatchFlatElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set width(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.width = v));
  }

  get width() {
    return this._el.width;
  }
  
  @Input()
  set height(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.height = v));
  }

  get height() {
    return this._el.height;
  }
  
  @Input()
  set padding(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.padding = v));
  }

  get padding() {
    return this._el.padding;
  }
  
  @Input()
  set rotation(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.rotation = v));
  }

  get rotation() {
    return this._el.rotation;
  }
  
  @Input()
  set tickmarkSpacing(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.tickmarkSpacing = v));
  }

  get tickmarkSpacing() {
    return this._el.tickmarkSpacing;
  }
  
  @Input()
  set angleSetpoint(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.angleSetpoint = v));
  }

  get angleSetpoint() {
    return this._el.angleSetpoint;
  }
  
  @Input()
  set tickmarks(v: Tickmark[]) {
    this._ngZone.runOutsideAngular(() => (this._el.tickmarks = v));
  }

  get tickmarks() {
    return this._el.tickmarks;
  }
  
  @Input()
  set labels(v: Label[]) {
    this._ngZone.runOutsideAngular(() => (this._el.labels = v));
  }

  get labels() {
    return this._el.labels;
  }
  
  @Input()
  set FOVIndicator(v: SVGTemplateResult[]) {
    this._ngZone.runOutsideAngular(() => (this._el.FOVIndicator = v));
  }

  get FOVIndicator() {
    return this._el.FOVIndicator;
  }
  
  @Input()
  set trackHeight(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.trackHeight = v));
  }

  get trackHeight() {
    return this._el.trackHeight;
  }
  
  @Input()
  set ticksHeight(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.ticksHeight = v));
  }

  get ticksHeight() {
    return this._el.ticksHeight;
  }
  
  @Input()
  set borderRadius(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.borderRadius = v));
  }

  get borderRadius() {
    return this._el.borderRadius;
  }
  

  
}

