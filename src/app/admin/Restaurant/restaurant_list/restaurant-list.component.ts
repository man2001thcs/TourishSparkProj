import { AdminService } from "../../service/admin.service";

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { State as RestaurantListState } from "./restaurant-list.store.reducer";
import {
  getRestaurantList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./restaurant-list.store.selector";
import * as RestaurantListActions from "./restaurant-list.store.action";
import { MatDialog } from "@angular/material/dialog";
import { RestaurantDetailComponent } from "../restaurant_detail/restaurant-detail.component";
import { RestaurantCreateComponent } from "../restaurant_create/restaurant-create.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { Restaurant } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-restaurantList",
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.css"],
})
export class RestaurantListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  restaurantList!: Restaurant[];
  subscriptions: Subscription[] = [];

  restaurantListState!: Observable<any>;
  restaurantDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  displayedColumns: string[] = [
    "id",
    "placeBranch",
    "hotlineNumber",
    "supportEmail",
    "headQuarterAddress",
    "discountFloat",
    "discountAmount",
    "description",

    "createDate",

    "edit",
    "delete",
  ];
  @ViewChild(MatPaginator) paraginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  clickedRows = new Set<any>();

  length = 0;
  pageSize = 5;
  pageSizeOpstion = [5, 10];
  pageIndex = 0;
  searchPhase = "";

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private store: Store<RestaurantListState>
  ) {
    this.restaurantListState = this.store.select(getRestaurantList);
    this.restaurantDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.sparkGet();
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(RestaurantListActions.resetRestaurantList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  sparkGet() {
    const offset = this.pageIndex * this.pageSize;
  
    const countQuery = `
      PREFIX ex: <http://example.org/restaurant#>
      SELECT (COUNT(?restaurant) as ?totalCount)
      WHERE {
        ?restaurant a ex:Restaurant .
        ${this.searchPhase ? `FILTER(contains(?branch, "${this.searchPhase}"))` : ''}
      }
    `;
  
    const queryString = `
      PREFIX ex: <http://example.org/restaurant#>
    
      SELECT ?restaurant ?id ?branch ?hotline ?email ?address ?discountFloat ?discountAmount ?description ?createDate ?updateDate
      WHERE {
        ?restaurant a ex:Restaurant ;
               ex:Id ?id ;
               ex:PlaceBranch ?branch ;
               ex:HotlineNumber ?hotline ;
               ex:SupportEmail ?email ;
               ex:HeadQuarterAddress ?address ;
               ex:DiscountFloat ?discountFloat ;
               ex:DiscountAmount ?discountAmount ;
               ex:Description ?description ;
               ex:CreateDate ?createDate ;
               ex:UpdateDate ?updateDate .
        ${this.searchPhase ? `FILTER(contains(?branch, "${this.searchPhase}"))` : ''}
      }
      LIMIT ${this.pageSize}
      OFFSET ${offset}
    `;
  
    this.fusekiService.queryFuseki(countQuery).subscribe((response) => {
      console.log("res", JSON.stringify(response));
      this.length = parseInt(response.results.bindings[0].totalCount.value, 10);
      // Handle the response data here
    });
  
    this.fusekiService.queryFuseki(queryString).subscribe((response) => {
      console.log("res", JSON.stringify(response));
      const bindings = response.results.bindings;
      this.restaurantList = bindings.map((binding: any) => {
        return {
          id: binding.id.value,
          placeBranch: binding.branch.value,
          hotlineNumber: binding.hotline.value,
          supportEmail: binding.email.value,
          headQuarterAddress: binding.address.value,
          discountFloat: parseFloat(binding.discountFloat.value),
          discountAmount: parseFloat(binding.discountAmount.value),
          description: binding.description.value,
          createDate: new Date(binding.createDate.value),
          updateDate: new Date(binding.updateDate.value),
        };
      });
    });
  }

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(RestaurantDetailComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.sparkGet();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(RestaurantCreateComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.sparkGet();
    });
  }

  async openConfirmDialog(this_announce: string) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this_announce,
      },
    });

    await ref.afterClosed().subscribe((result) => {
      return result;
    });
  }

  openDeleteDialog(id: string) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Bạn có muốn xóa đối tác này không?",
      },
    });
  
    ref.afterClosed().subscribe((result) => {
      if (result) {
        const deleteQuery = `
          PREFIX ex: <http://example.org/restaurant#>
  
          DELETE {
            ?restaurantToDelete ?p ?o .
          }
          WHERE {
            ?restaurantToDelete a ex:Restaurant ;
                               ex:Id "${id}" .
            ?restaurantToDelete ?p ?o .
          }
        `;
  
        this.fusekiService.insertFuseki(deleteQuery).subscribe((response) => {
          console.log("Restaurant deleted successfully:", response);
          this.messageService.openMessageNotifyDialog("Delete Ok");
          // Handle the response as needed
        });
      }
    });
  }

  addData(): void {}

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageIndex);

    this.sparkGet();
  }

  search() {
    this.pageSize = 5;
    this.pageIndex = 0;

    this.sparkGet();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState);
    if ((sortState.active = "name")) {
      if (sortState.direction === "asc") {
        this.sparkGet();

      } else if (sortState.direction === "desc") {
        this.sparkGet();
      }
    } else {
    }
  }
}
