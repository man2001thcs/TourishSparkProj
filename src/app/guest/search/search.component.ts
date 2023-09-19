import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import { Author } from "src/app/admin/author-detail/author-detail.component.model";
import { Category } from "src/app/admin/category-detail/category-detail.component.model";
import { Publisher } from "src/app/admin/publisher-detail/publisher-detail.component.model";
import { UserService } from "src/app/utility/user_service/user.service";
import { getCategoryPhase } from "src/app/utility/config/categoryCode";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
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

  pageIndexCategory = 1;
  pageIndexAuthor = 1;
  pageIndexPublisher = 1;

  isCategoryCanLoadMore = true;
  isAuthorCanLoadMore = true;
  isPublisherCanLoadMore = true;

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

  subscription: Subscription[] = [];
  searchQuery = "";

  constructor(private _route: ActivatedRoute, private _api: UserService) {}

  ngOnInit(): void {
    // this.article$ = this._route.paramMap.pipe(
    //   map(params => params.get('slug')),
    //   switchMap(slug => this._api.getArticleBySlug(slug))
    // );

    this.subscription.push(
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

  priceRangeChange($event: any, from: number, to: number) {
    this.priceFrom = from;
    this.priceTo = to;
  }

  getCategoryPhase(key: string){
    return getCategoryPhase(key);
  }

  loadMoreCategory(){
    this.pageIndexCategory = this.pageIndexCategory + 1;

    this. _api.getCategory(this.pageIndexCategory, 5).subscribe((state) => {

      if (state.count === state.data.length + this.categoryList.length){
        this.isCategoryCanLoadMore = false;
      }
      this.categoryList = this.categoryList.concat(state.data);
    });
  }

  loadMoreAuthor(){
    this.pageIndexAuthor = this.pageIndexAuthor + 1;

    this. _api.getAuthor(this.pageIndexAuthor, 5).subscribe((state) => {

      if (state.count === state.data.length + this.authorList.length){
        this.isAuthorCanLoadMore = false;
      }
      this.authorList = this.authorList.concat(state.data);
    });
  }

  loadMorePublisher(){
    this.pageIndexPublisher = this.pageIndexPublisher + 1;

    this. _api.getPublisher(this.pageIndexPublisher, 5).subscribe((state) => {

      if (state.count === state.data.length + this.publisherList.length){
        this.isPublisherCanLoadMore = false;
      }
      this.publisherList = this.publisherList.concat(state.data);
    });
  }
}
