import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import {EndPointDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/end-point-line/end-point-line.js';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {EndPointDirection} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/end-point-line/end-point-line.js';
import type {ObcEndPointLine as ObcEndPointLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/end-point-line/end-point-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/end-point-line/end-point-line.js';

@Component({
  selector: 'obc-end-point-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcEndPointLine {
  private _el: ObcEndPointLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcEndPointLineElement>,
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
  set direction(v: EndPointDirection) {
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

