import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import type {ObcLineCross as ObcLineCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/line-cross/line-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/line-cross/line-cross.js';

@Component({
  selector: 'obc-line-cross',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcLineCross {
  private _el: ObcLineCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcLineCrossElement>,
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
  set lineType(v: LineType) {
    this._ngZone.runOutsideAngular(() => (this._el.lineType = v));
  }

  get lineType() {
    return this._el.lineType;
  }
  

  
}

