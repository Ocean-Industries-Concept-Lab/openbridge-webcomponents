import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLigthSleet as ObiLightningLigthSleetElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-ligth-sleet.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-ligth-sleet.js';

@Component({
  selector: 'obi-lightning-ligth-sleet',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningLigthSleet {
  private _el: ObiLightningLigthSleetElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLigthSleetElement>,
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

