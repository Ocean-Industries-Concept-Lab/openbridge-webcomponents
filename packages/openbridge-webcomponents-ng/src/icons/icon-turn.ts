import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTurn as ObiTurnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-turn.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-turn.js';

@Component({
  selector: 'obi-turn',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTurn {
  private _el: ObiTurnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTurnElement>,
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

