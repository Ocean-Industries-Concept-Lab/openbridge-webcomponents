import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {PoiTargetButtonValue} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';
import {Pointer} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target';
export type {PoiTargetButtonValue} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';
export type {Pointer} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-target/poi-target';
import type {ObcPoiTargetButton as ObcPoiTargetButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/poi-target-button/poi-target-button.js';

@Component({
  selector: 'obc-poi-target-button',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcPoiTargetButton {
  private _el: ObcPoiTargetButtonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcPoiTargetButtonElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set value(v: PoiTargetButtonValue) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set pointer(v: Pointer) {
    this._ngZone.runOutsideAngular(() => (this._el.pointer = v));
  }

  get pointer() {
    return this._el.pointer;
  }
  
  @Input()
  set relativeDirection(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.relativeDirection = v));
  }

  get relativeDirection() {
    return this._el.relativeDirection;
  }
  

  
}

