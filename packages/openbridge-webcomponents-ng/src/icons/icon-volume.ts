import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiVolume as ObiVolumeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-volume.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-volume.js';

@Component({
  selector: 'obi-volume',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiVolume {
  private _el: ObiVolumeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiVolumeElement>,
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

