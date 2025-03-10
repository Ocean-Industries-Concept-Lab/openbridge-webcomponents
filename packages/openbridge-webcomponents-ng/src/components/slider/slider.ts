import {
  Component,
  ElementRef,
  NgZone,
  Input,
  EventEmitter,
  Output

} from '@angular/core';
import {ObcSliderVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';
export type {ObcSliderVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';
import type {ObcSlider as ObcSliderElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';

@Component({
  selector: 'obc-slider',
  template: '<ng-content></ng-content>',
})
export class ObcSlider {
  private _el: ObcSliderElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcSliderElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
    this._el.addEventListener('value', (e: Event) => {
      // TODO(justinfagnani): we need to let the element say how to get a value
      // from an event, ex: e.value
      this.valueEvent.emit(e);
    });
    
  }

  
  @Input()
  set value(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set min(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.min = v));
  }

  get min() {
    return this._el.min;
  }
  
  @Input()
  set max(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.max = v));
  }

  get max() {
    return this._el.max;
  }
  
  @Input()
  set step(v: number | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.step = v));
  }

  get step() {
    return this._el.step;
  }
  
  @Input()
  set stepClick(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.stepClick = v));
  }

  get stepClick() {
    return this._el.stepClick;
  }
  
  @Input()
  set variant(v: ObcSliderVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  
  @Input()
  set hasLeftIcon(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasLeftIcon = v));
  }

  get hasLeftIcon() {
    return this._el.hasLeftIcon;
  }
  
  @Input()
  set hasRightIcon(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.hasRightIcon = v));
  }

  get hasRightIcon() {
    return this._el.hasRightIcon;
  }
  

  
  @Output()
  valueEvent = new EventEmitter<unknown>();
  
}

