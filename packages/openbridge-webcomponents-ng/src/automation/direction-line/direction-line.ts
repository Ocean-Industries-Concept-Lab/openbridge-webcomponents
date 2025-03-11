import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
export type {LineMedium, LineType} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation';
import type {ObcDirectionLine as ObcDirectionLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/direction-line/direction-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/direction-line/direction-line.js';

@Component({
  selector: 'obc-direction-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcDirectionLine {
  private _el: ObcDirectionLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcDirectionLineElement>,
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

