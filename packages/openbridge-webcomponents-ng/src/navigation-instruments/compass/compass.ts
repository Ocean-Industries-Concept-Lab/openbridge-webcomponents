import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {AngleAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice';
export type {AngleAdvice} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice';
import type {ObcCompass as ObcCompassElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass/compass.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass/compass.js';

@Component({
  selector: 'obc-compass',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcCompass {
  private _el: ObcCompassElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcCompassElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set heading(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.heading = v));
  }

  get heading() {
    return this._el.heading;
  }
  
  @Input()
  set courseOverGround(v: number) {
    this._ngZone.runOutsideAngular(() => (this._el.courseOverGround = v));
  }

  get courseOverGround() {
    return this._el.courseOverGround;
  }
  
  @Input()
  set headingAdvices(v: AngleAdvice[]) {
    this._ngZone.runOutsideAngular(() => (this._el.headingAdvices = v));
  }

  get headingAdvices() {
    return this._el.headingAdvices;
  }
  

  
}

