import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaRecord as ObiMediaRecordElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-record.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-record.js';

@Component({
  selector: 'obi-media-record',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMediaRecord {
  private _el: ObiMediaRecordElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaRecordElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

