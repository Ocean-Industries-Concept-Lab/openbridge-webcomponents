import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/index';
import {CornerLineDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/corner-line/corner-line.js';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/index';
export type {CornerLineDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/corner-line/corner-line.js';
import type {ObcCornerLine as ObcCornerLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/corner-line/corner-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/corner-line/corner-line.js';

@Component({
  selector: 'obc-corner-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcCornerLine {
  private _el: ObcCornerLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcCornerLineElement>,
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
  set direction(v: CornerLineDirection) {
    this._ngZone.runOutsideAngular(() => (this._el.direction = v));
  }

  get direction() {
    return this._el.direction;
  }
  
  @Input()
  set lineType(v: LineType) {
    this._ngZone.runOutsideAngular(() => (this._el.lineType = v));
  }

  get lineType() {
    return this._el.lineType;
  }
  

  
}

