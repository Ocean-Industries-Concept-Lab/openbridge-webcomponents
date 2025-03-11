import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparDanger as ObiBuoySparDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-danger.js';

@Component({
  selector: 'obi-buoy-spar-danger',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySparDanger {
  private _el: ObiBuoySparDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparDangerElement>,
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

