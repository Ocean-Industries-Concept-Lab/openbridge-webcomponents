import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRock as ObiRockElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rock.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rock.js';

@Component({
  selector: 'obi-rock',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRock {
  private _el: ObiRockElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRockElement>,
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

