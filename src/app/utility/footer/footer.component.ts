import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  @Input() isNavOpen: boolean = true;
  @ViewChild("footerEle")
  footerElem!: ElementRef;

  ngAfterViewChecked(): void {
    if (this.isNavOpen) {
      if (this.footerElem.nativeElement !== undefined)
        this.footerElem.nativeElement.style["padding"] = "45px 6% 20px";
    } else {
      if (this.footerElem.nativeElement !== undefined)
        this.footerElem.nativeElement.style["padding"] = "45px 16% 20px";
    }
  }
}
