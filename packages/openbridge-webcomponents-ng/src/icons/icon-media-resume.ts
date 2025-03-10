import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMediaResume as ObiMediaResumeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-resume.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-media-resume.js';

@Component({
  selector: 'obi-media-resume',
  template: '<ng-content></ng-content>',
})
export class ObiMediaResume {
  private _el: ObiMediaResumeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMediaResumeElement>,
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

