import { Directive } from '@angular/core';

import {
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appIf]'
})
export class IfDirective implements OnChanges {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appIf.currentValue) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
