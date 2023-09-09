import { Component, Input } from "@angular/core";

@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.css"],
})
export class BookCardComponent {
  @Input()
  name?: string;

  @Input()
  totalSoldInMonth: number = 0;

  @Input()
  remainNumber: number = 0;

}
