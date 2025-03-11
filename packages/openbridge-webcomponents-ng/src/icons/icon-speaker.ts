import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSpeaker as ObiSpeakerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speaker.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-speaker.js';

@Component({
  selector: 'obi-speaker',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSpeaker {
  private _el: ObiSpeakerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSpeakerElement>,
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

