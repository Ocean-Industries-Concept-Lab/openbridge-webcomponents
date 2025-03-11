import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import {ThreeWayLineDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {ThreeWayLineDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js';
import type {ObcThreeWayLine as ObcThreeWayLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js';

@Component({
  selector: 'obc-three-way-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcThreeWayLine {
  private _el: ObcThreeWayLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcThreeWayLineElement>,
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
  set direction(v: ThreeWayLineDirection) {
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

