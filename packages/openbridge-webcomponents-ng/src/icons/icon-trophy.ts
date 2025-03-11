import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrophy as ObiTrophyElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trophy.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trophy.js';

@Component({
  selector: 'obi-trophy',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTrophy {
  private _el: ObiTrophyElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrophyElement>,
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

