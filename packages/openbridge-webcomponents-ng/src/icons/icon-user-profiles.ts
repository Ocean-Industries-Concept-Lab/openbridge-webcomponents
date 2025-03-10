import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiUserProfiles as ObiUserProfilesElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user-profiles.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-user-profiles.js';

@Component({
  selector: 'obi-user-profiles',
  template: '<ng-content></ng-content>',
})
export class ObiUserProfiles {
  private _el: ObiUserProfilesElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiUserProfilesElement>,
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

