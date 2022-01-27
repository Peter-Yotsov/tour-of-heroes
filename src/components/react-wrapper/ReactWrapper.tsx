import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  Input,
} from "@angular/core";
import * as React from "react";

import * as ReactDOM from "react-dom";

import { Router } from "@angular/router";

const containerElementName = "ReactContainer";

@Component({
  selector: "app-react",
  template: `<span #${containerElementName}></span>`,
  styleUrls: ["./ReactWrapper.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ReactWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @Input() public arguments: any;
  @Input() public component: Function;

  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;

  constructor(public router: Router) {
    window.React = React;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  public render() {
    ReactDOM.render(
      <div className={"i-am-classy"}>
        {this.component && (
          <this.component {...this.arguments} router={this.router} />
        )}
      </div>,
      this.containerRef.nativeElement
    );
  }
}
