import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {ObcElevatedCardPosition, ObcElevatedCardSize, ObcElevatedCardTag} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';
export type {ObcElevatedCardPosition, ObcElevatedCardSize, ObcElevatedCardTag} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';
import type {ObcElevatedCard as ObcElevatedCardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card.js';

@Component({
  selector: 'obc-elevated-card',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcElevatedCard {
  private _el: ObcElevatedCardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcElevatedCardElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set position(v: ObcElevatedCardPosition) {
    this._ngZone.runOutsideAngular(() => (this._el.position = v));
  }

  get position() {
    return this._el.position;
  }
  
  @Input()
  set size(v: ObcElevatedCardSize) {
    this._ngZone.runOutsideAngular(() => (this._el.size = v));
  }

  get size() {
    return this._el.size;
  }
  
  @Input()
  set overrideTag(v: ObcElevatedCardTag | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.overrideTag = v));
  }

  get overrideTag() {
    return this._el.overrideTag;
  }
  
  @Input()
  set notClickable(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.notClickable = v));
  }

  get notClickable() {
    return this._el.notClickable;
  }
  
  @Input()
  set info(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.info = v));
  }

  get info() {
    return this._el.info;
  }
  
  @Input()
  set graphicBorder(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.graphicBorder = v));
  }

  get graphicBorder() {
    return this._el.graphicBorder;
  }
  
  @Input()
  set border(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.border = v));
  }

  get border() {
    return this._el.border;
  }
  
  @Input()
  set href(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.href = v));
  }

  get href() {
    return this._el.href;
  }
  
  @Input()
  set target(v: string | undefined) {
    this._ngZone.runOutsideAngular(() => (this._el.target = v));
  }

  get target() {
    return this._el.target;
  }
  

  
}

