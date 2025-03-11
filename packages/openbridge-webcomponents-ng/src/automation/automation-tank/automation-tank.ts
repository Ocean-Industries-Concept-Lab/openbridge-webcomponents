import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import {TankTrend, TankVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js';
export type {LineMedium} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {TankTrend, TankVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js';
import type {ObcAutomationTank as ObcAutomationTankElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js';

@Component({
  selector: 'obc-automation-tank',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcAutomationTank {
  private _el: ObcAutomationTankElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAutomationTankElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set medium(v: LineMedium) {
    this._ngZone.runOutsideAngular(() => (this._el.medium = v));
  }

  get medium() {
    return this._el.medium;
  }
  
  @Input()
  set value(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set max(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.max = v));
  }

  get max() {
    return this._el.max;
  }
  
  @Input()
  set trend(v: TankTrend) {
    this._ngZone.runOutsideAngular(() => (this._el.trend = v));
  }

  get trend() {
    return this._el.trend;
  }
  
  @Input()
  set variant(v: TankVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  
  @Input()
  set tag(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.tag = v));
  }

  get tag() {
    return this._el.tag;
  }
  

  
}

