import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {POIStyle} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-config';
export type {POIStyle} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-config';
import type {ObcPoiGraphicLine as ObcPoiGraphicLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-graphic-line.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/poi-graphic-line/poi-graphic-line.js';

@Component({
  selector: 'obc-poi-graphic-line',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcPoiGraphicLine {
  private _el: ObcPoiGraphicLineElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcPoiGraphicLineElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set lineHeight(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.lineHeight = v));
  }

  get lineHeight() {
    return this._el.lineHeight;
  }
  
  @Input()
  set width(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.width = v));
  }

  get width() {
    return this._el.width;
  }
  
  @Input()
  set lineStart(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.lineStart = v));
  }

  get lineStart() {
    return this._el.lineStart;
  }
  
  @Input()
  set lineStyle(v: POIStyle) {
    this._ngZone.runOutsideAngular(() => (this._el.lineStyle = v));
  }

  get lineStyle() {
    return this._el.lineStyle;
  }
  

  
}

