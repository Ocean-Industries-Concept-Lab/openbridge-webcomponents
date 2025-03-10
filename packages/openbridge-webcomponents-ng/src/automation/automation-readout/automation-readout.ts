import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AutomationReadoutPosition} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
import {LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {AutomationReadoutPosition} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
export type {LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import type {ObcAutomationReadout as ObcAutomationReadoutElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';

@Component({
  selector: 'obc-automation-readout',
  template: '<ng-content></ng-content>',
})
export class ObcAutomationReadout {
  private _el: ObcAutomationReadoutElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcAutomationReadoutElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set value(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.value = v));
  }

  get value() {
    return this._el.value;
  }
  
  @Input()
  set unit(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.unit = v));
  }

  get unit() {
    return this._el.unit;
  }
  
  @Input()
  set numberOfDigits(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.numberOfDigits = v));
  }

  get numberOfDigits() {
    return this._el.numberOfDigits;
  }
  
  @Input()
  set position(v: AutomationReadoutPosition) {
    this._ngZone.runOutsideAngular(() => (this._el.position = v));
  }

  get position() {
    return this._el.position;
  }
  
  @Input()
  set lineType(v: LineType | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.lineType = v));
  }

  get lineType() {
    return this._el.lineType;
  }
  

  
}

