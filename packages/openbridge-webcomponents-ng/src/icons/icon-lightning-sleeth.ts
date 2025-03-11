import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSleeth as ObiLightningSleethElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleeth.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleeth.js';

@Component({
  selector: 'obi-lightning-sleeth',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningSleeth {
  private _el: ObiLightningSleethElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSleethElement>,
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

