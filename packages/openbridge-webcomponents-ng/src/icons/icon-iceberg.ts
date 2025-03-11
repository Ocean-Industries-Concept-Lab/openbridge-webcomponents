import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiIceberg as ObiIcebergElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-iceberg.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-iceberg.js';

@Component({
  selector: 'obi-iceberg',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiIceberg {
  private _el: ObiIcebergElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiIcebergElement>,
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

