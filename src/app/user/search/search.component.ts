import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import { Author } from "src/app/admin/author-detail/author-detail.component.model";
import { Category } from "src/app/admin/category-detail/category-detail.component.model";
import { Publisher } from "src/app/admin/publisher-detail/publisher-detail.component.model";
import { getCategoryPhase } from "src/app/utility/config/categoryCode";
import { UserService } from "src/app/utility/user_service/user.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit, OnDestroy {
  
  searchQuery = "";
  data?: Observable<any>;

  authorList: Author[] = [];
  publisherList: Publisher[] = [];
  categoryList: Category[] = [];

  categorySelect: string[] = [];
  publisherSelect: string[] = [];
  authorSelect: string[] = [];

  categorySelectString = "";
  publisherSelectString = "";
  authorSelectString = "";

  priceFrom = 0;
  priceTo = 0;

  priceRange = [
    {
      title: "0đ - 150.000đ",
      from: 0,
      to: 150000,
    },
    {
      title: "150.000đ - 500.000đ",
      from: 150000,
      to: 500000,
    },
    {
      title: "500.000đ - 850.000đ",
      from: 500000,
      to: 850000,
    },
    {
      title: "850.000đ - 1.200.000đ",
      from: 850000,
      to: 1200000,
    },
    {
      title: "1.200.000đ trở lên",
      from: 1200000,
      to: 99999999,
    },
  ];

  subcription: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _api: UserService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.subcription.push(
      this._route.queryParams.subscribe((params) => {
        if (params) {
          console.log(params);
          console.log(params["keyword"]);
          this.searchQuery = params["keyword"] ?? "";
        }
      })
    );

    let data = this._route.snapshot.data["data"];
    
    if (data != null) {
      data.authorList.subscribe((data: any) => {
        this.authorList = data.data;
      });

      data.publisherList.subscribe((data: any) => {
        this.publisherList = data.data;
      });

      data.categoryList.subscribe((data: any) => {
        this.categoryList = data.data;
      });
    }
  }

  ngOnDestroy(): void {
    this.subcription.forEach((subscription) => subscription.unsubscribe());
  }

  publisherCheckChange($event: any, name: string) {
    if ($event) {
      if (!this.publisherSelect.includes(name)) this.publisherSelect.push(name);
    } else {
      if (this.publisherSelect.includes(name))
        this.publisherSelect.splice(
          this.publisherSelect.findIndex((publisher) => publisher === name),
          1
        );
    }

    this.publisherSelectString = this.publisherSelect.join(";");
  }

  categoryCheckChange($event: any, name: string) {
    if ($event) {
      if (!this.categorySelect.includes(name)) this.categorySelect.push(name);
    } else {
      if (this.categorySelect.includes(name))
        this.categorySelect.splice(
          this.categorySelect.findIndex((category) => category === name),
          1
        );
    }

    this.categorySelectString = this.categorySelect.join(";");
  }

  authorCheckChange($event: any, name: string) {
    if ($event) {
      if (!this.authorSelect.includes(name)) this.authorSelect.push(name);
    } else {
      if (this.authorSelect.includes(name))
        this.authorSelect.splice(
          this.authorSelect.findIndex((author) => author === name),
          1
        );
    }

    this.authorSelectString = this.authorSelect.join(";");
  }

  emptySearch() {
    console.log("ok");
    this.searchQuery = "";
  }

  priceRangeChange($event: any, from: number, to: number) {
    this.priceFrom = from;
    this.priceTo = to;
  }

  getCategoryPhase(key: string) {
    return getCategoryPhase(key);
  }
}
