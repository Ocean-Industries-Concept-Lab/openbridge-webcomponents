import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {POIStyle} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-config.js';
export type {POIStyle} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-config.js';
import type {ObcPoiLine as ObcPoiLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-line/poi-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-line/poi-line.js';

@Component({
  selector: 'obc-poi-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcPoiLine {
  private _el: ObcPoiLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcPoiLineElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set height(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.height = v));
  }

  get height() {
    return this._el.height;
  }
  
  @Input()
  set poiStyle(v: POIStyle) {
    this._ngZone.runOutsideAngular(() => (this._el.poiStyle = v));
  }

  get poiStyle() {
    return this._el.poiStyle;
  }
  

  
}

