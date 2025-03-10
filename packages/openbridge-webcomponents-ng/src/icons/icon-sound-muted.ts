import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundMuted as ObiSoundMutedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-muted.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-muted.js';

@Component({
  selector: 'obi-sound-muted',
  template: '<ng-content></ng-content>',
})
export class ObiSoundMuted {
  private _el: ObiSoundMutedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundMutedElement>,
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

