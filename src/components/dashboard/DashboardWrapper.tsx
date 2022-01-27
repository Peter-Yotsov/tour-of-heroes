import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ReactWrapperComponent } from "src/components/react-wrapper/ReactWrapper";

const containerElementName = "DashboardContainer";

@Component({
  selector: "app-dashboard",
  template: `<span #${containerElementName}></span>`,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardWrapperComponent extends ReactWrapperComponent {
  @Output() public outputArguments = new EventEmitter<any>();

  @ViewChild(containerElementName, { static: false })
  override containerRef: ElementRef;

  constructor(router: Router) {
    super(router);
    this.handleOutputArguments = this.handleOutputArguments.bind(this);
  }

  public handleOutputArguments(event: any) {
    if (this.outputArguments) {
      this.outputArguments.emit(event);
      this.render();
    }
  }

  public override render() {
    ReactDOM.render(
      <div className={"i-am-classy"}>
        {this.component && (
          <this.component
            {...this.arguments}
            router={this.router}
            handleClick={this.handleOutputArguments}
          />
        )}
      </div>,
      this.containerRef.nativeElement
    );
  }
}
