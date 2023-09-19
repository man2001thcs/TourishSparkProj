import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { FileModel } from "../image_service/imageUpload.component.model";
import { TokenStorageService } from "../user_service/token.service";

@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.css"],
})
export class BookCardComponent implements OnChanges {
  @Input()
  name: string = "";

  @Input()
  cardType: string = "sale";

  @Input()
  id: string = "";

  @Input()
  totalSoldNumber: number = 0;

  @Input()
  totalSoldInMonth: number = 0;

  @Input()
  remainNumber: number = 0;

  @Input()
  currentPrice: number = 0;

  @Input()
  discountFloat: number = 0;

  imageList: FileModel[] = [];

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  ngOnChanges(): void {
    if (this.id !== "") {
      const params = new HttpParams()
        .append("resourceId", this.id)
        .append("resourceType", 1);

      this.http
        .get<any>("/api/GetFile", { params: params })
        .subscribe((state) => {
          this.imageList = state.data;
        });
    }
  }

  generateUrl(image: FileModel): string {
    if (this.imageList[0]) {
      return (
        "https://bookstore1storage.blob.core.windows.net/1-container/1" +
        "_" +
        image.id +
        image.fileType
      );
    } else {
      return "";
    }
  }

  generateDiscount(discountFloat: number): string {
    return (discountFloat * 100).toString() + "%";
  }

  getPrice() {
    return Math.round(this.currentPrice * (1 - this.discountFloat) * 100) / 100;
  }

  getName() {
    if (this.name.length > 24) {
      return this.name.substring(0, 24) + " ...";
    } else return this.name;
  }

  getNameSearch() {
    if (this.name.length > 24) {
      return this.name.substring(0, 34) + " ...";
    } else return this.name;
  }

  getLink() {
    const role = this.tokenService.getUserRole();
    if (role === "User") {
      return '/user/detail/' + this.id;
    } else {
      return '/guest/detail/' + this.id;
    }
  }
}
