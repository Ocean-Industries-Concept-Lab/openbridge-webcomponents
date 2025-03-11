import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/index';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/index';
import type {ObcVerticalLine as ObcVerticalLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/vertical-line/vertical-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/vertical-line/vertical-line.js';

@Component({
  selector: 'obc-vertical-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcVerticalLine {
  private _el: ObcVerticalLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcVerticalLineElement>,
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

