import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';
import {BreadcrumbItem} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb.js';
export type {BreadcrumbItem} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb.js';
import type {ObcBreadcrumb as ObcBreadcrumbElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/breadcrumb/breadcrumb.js';

@Component({
  selector: 'obc-breadcrumb',
  template: '<ng-content></ng-content>',
})
export class ObcBreadcrumb {
  private _el: ObcBreadcrumbElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObcBreadcrumbElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set items(v: BreadcrumbItem[]) {
    this._ngZone.runOutsideAngular(() => (this._el.items = v));
  }

  get items() {
    return this._el.items;
  }
  

  
}

