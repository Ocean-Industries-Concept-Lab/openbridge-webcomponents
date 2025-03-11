import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiNoteEditProposal as ObiNoteEditProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-note-edit-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-note-edit-proposal.js';

@Component({
  selector: 'obi-note-edit-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiNoteEditProposal {
  private _el: ObiNoteEditProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiNoteEditProposalElement>,
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

