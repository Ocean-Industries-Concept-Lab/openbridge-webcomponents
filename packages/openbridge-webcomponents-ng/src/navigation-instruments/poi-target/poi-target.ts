import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {TargetValue, Pointer} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
export type {TargetValue, Pointer} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
import type {ObcPoiTarget as ObcPoiTargetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target.js';

@Component({
  selector: 'obc-poi-target',
  template: '<ng-content></ng-content>',
})
export class ObcPoiTarget {
  private _el: ObcPoiTargetElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcPoiTargetElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set height(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.height = v));
  }

  get height() {
    return this._el.height;
  }
  
  @Input()
  set value(v: TargetValue) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set pointerType(v: Pointer) {
    this._ngZone.runOutsideAngular(() => (this._el.pointerType = v));
  }

  get pointerType() {
    return this._el.pointerType;
  }
  
  @Input()
  set relativeDirection(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.relativeDirection = v));
  }

  get relativeDirection() {
    return this._el.relativeDirection;
  }
  

  
}

