import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {TooltipVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tooltip/tooltip.js';
export type {TooltipVariant} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tooltip/tooltip.js';
import type {ObcTooltip as ObcTooltipElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tooltip/tooltip.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/tooltip/tooltip.js';

@Component({
  selector: 'obc-tooltip',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObcTooltip {
  private _el: ObcTooltipElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcTooltipElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set variant(v: TooltipVariant) {
    this._ngZone.runOutsideAngular(() => (this._el.variant = v));
  }

  get variant() {
    return this._el.variant;
  }
  
  @Input()
  set label(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.label = v));
  }

  get label() {
    return this._el.label;
  }
  
  @Input()
  set text(v: string) {
    this._ngZone.runOutsideAngular(() => (this._el.text = v));
  }

  get text() {
    return this._el.text;
  }
  
  @Input()
  set rightArrow(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.rightArrow = v));
  }

  get rightArrow() {
    return this._el.rightArrow;
  }
  

  
}

