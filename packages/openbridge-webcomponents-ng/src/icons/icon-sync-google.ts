import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSyncGoogle as ObiSyncGoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sync-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sync-google.js';

@Component({
  selector: 'obi-sync-google',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSyncGoogle {
  private _el: ObiSyncGoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSyncGoogleElement>,
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

