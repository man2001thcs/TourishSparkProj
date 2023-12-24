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
import { State as HomeStayListState } from "./homeStay-list.store.reducer";
import {
  getHomeStayList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./homeStay-list.store.selector";
import * as HomeStayListActions from "./homeStay-list.store.action";
import { MatDialog } from "@angular/material/dialog";
import { HomeStayDetailComponent } from "../homeStay_detail/homeStay-detail.component";
import { HomeStayCreateComponent } from "../homeStay_create/homeStay-create.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { HomeStay } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-homeStayList",
  templateUrl: "./homeStay-list.component.html",
  styleUrls: ["./homeStay-list.component.css"],
})
export class HomeStayListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  homeStayList!: HomeStay[];
  subscriptions: Subscription[] = [];

  homeStayListState!: Observable<any>;
  homeStayDeleteState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  searchPhase = "";

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

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private store: Store<HomeStayListState>
  ) {
    this.homeStayListState = this.store.select(getHomeStayList);
    this.homeStayDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.sparkGet();
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(HomeStayListActions.resetHomeStayList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  sparkGet() {
    const offset = this.pageIndex * this.pageSize;
  
    const countQuery = `
      PREFIX ex: <http://example.org/homestay#>
      SELECT (COUNT(?homeStay) as ?totalCount)
      WHERE {
        ?homeStay a ex:HomeStay .
        ${this.searchPhase ? `FILTER(contains(?branch, "${this.searchPhase}"))` : ''}
      }
    `;
  
    const queryString = `
    PREFIX ex: <http://example.org/homestay#>
  
    SELECT ?homeStay ?id ?branch ?hotline ?email ?address ?discountFloat ?discountAmount ?description ?createDate ?updateDate
    WHERE {
      ?homeStay a ex:HomeStay ;
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
      this.homeStayList = bindings.map((binding: any) => {
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
    const dialogRef = this.dialog.open(HomeStayDetailComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.sparkGet();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(HomeStayCreateComponent, {});

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
          PREFIX ex: <http://example.org/homestay#>
  
          DELETE {
            ?homeStayToDelete ?p ?o .
          }
          WHERE {
            ?homeStayToDelete a ex:HomeStay ;
                            ex:Id "${id}" .
            ?homeStayToDelete ?p ?o .
          }
        `;
  
        this.fusekiService.insertFuseki(deleteQuery).subscribe((response) => {
          console.log("HomeStay deleted successfully:", response);
          this.messageService.openMessageNotifyDialog("Delete Ok");
          // Handle the response as needed
        });
      }
    });
  }

  addData(): void {}

  search() {
    this.pageSize = 5;
    this.pageIndex = 0;

    this.messageService.openLoadingDialog();
    this.sparkGet();
  }

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(this.pageIndex);

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
