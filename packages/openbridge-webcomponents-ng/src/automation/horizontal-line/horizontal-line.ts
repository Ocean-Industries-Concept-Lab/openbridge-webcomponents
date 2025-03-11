import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/index';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/index';
import type {ObcHorizontalLine as ObcHorizontalLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/horizontal-line/horizontal-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/horizontal-line/horizontal-line.js';

@Component({
  selector: 'obc-horizontal-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcHorizontalLine {
  private _el: ObcHorizontalLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcHorizontalLineElement>,
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
  
  @Input()
  set length(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.length = v));
  }

  get length() {
    return this._el.length;
  }
  

  
}

