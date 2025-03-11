import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCommandAutoTrack as ObiCommandAutoTrackElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-auto-track.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-command-auto-track.js';

@Component({
  selector: 'obi-command-auto-track',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCommandAutoTrack {
  private _el: ObiCommandAutoTrackElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCommandAutoTrackElement>,
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

