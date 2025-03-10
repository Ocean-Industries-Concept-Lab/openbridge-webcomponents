import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import type {ObcLineOverlap as ObcLineOverlapElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/line-overlap/line-overlap.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/line-overlap/line-overlap.js';

@Component({
  selector: 'obc-line-overlap',
  template: '<ng-content></ng-content>',
})
export class ObcLineOverlap {
  private _el: ObcLineOverlapElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcLineOverlapElement>,
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

