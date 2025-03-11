import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSoundNo as ObiSoundNoElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-no.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sound-no.js';

@Component({
  selector: 'obi-sound-no',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSoundNo {
  private _el: ObiSoundNoElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSoundNoElement>,
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

