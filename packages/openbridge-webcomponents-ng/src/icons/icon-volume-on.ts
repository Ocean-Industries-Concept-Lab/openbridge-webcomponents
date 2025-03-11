import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiVolumeOn as ObiVolumeOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-volume-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-volume-on.js';

@Component({
  selector: 'obi-volume-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiVolumeOn {
  private _el: ObiVolumeOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiVolumeOnElement>,
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

