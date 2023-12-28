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
import { State as HotelListState } from "./hotel-list.store.reducer";
import {
  getHotelList,
  getDeleteStatus,
  getMessage,
  getSysError,
} from "./hotel-list.store.selector";
import * as HotelListActions from "./hotel-list.store.action";
import { MatDialog } from "@angular/material/dialog";
import { HotelDetailComponent } from "../hotel_detail/hotel-detail.component";
import { HotelCreateComponent } from "../hotel_create/hotel-create.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { Hotel } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-hotelList",
  templateUrl: "./hotel-list.component.html",
  styleUrls: ["./hotel-list.component.css"],
})
export class HotelListComponent implements OnInit, AfterViewInit, OnDestroy {
  hotelList!: Hotel[];
  subscriptions: Subscription[] = [];
  searchPhase = "";

  hotelListState!: Observable<any>;
  hotelDeleteState!: Observable<any>;
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
  pageSize = 10;
  pageSizeOpstion = [5, 10];
  pageIndex = 0;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private store: Store<HotelListState>
  ) {
    this.hotelListState = this.store.select(getHotelList);
    this.hotelDeleteState = this.store.select(getDeleteStatus);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.sparkGet();

    this.store.dispatch(HotelListActions.initial());

    // this.store.dispatch(
    //   HotelListActions.getHotelList({
    //     payload: {
    //       page: this.pageIndex + 1,
    //       search: this.searchPhase,
    //     },
    //   })
    // );

    // this.messageService.openLoadingDialog();
  }
  ngAfterViewInit(): void {}

  sparkGet() {
    const offset = this.pageIndex * this.pageSize;

    const countQuery = `
    PREFIX ex: <http://example.org/hotel#>
    SELECT (COUNT(?hotel) as ?totalCount)
    WHERE {
      ?hotel a ex:Hotel .
    }
  `;

    const queryString = `
    PREFIX ex: <http://example.org/hotel#>
  
    SELECT ?hotel ?id ?branch ?hotline ?email ?address ?discountFloat ?discountAmount ?description ?createDate ?updateDate
    WHERE {
      ?hotel a ex:Hotel ;
             ex:HotelId ?id ;
             ex:PlaceBranch ?branch ;
             ex:HotlineNumber ?hotline ;
             ex:SupportEmail ?email ;
             ex:HeadQuarterAddress ?address ;
             ex:DiscountFloat ?discountFloat ;
             ex:DiscountAmount ?discountAmount ;
             ex:Description ?description ;
             ex:CreateDate ?createDate ;
             ex:UpdateDate ?updateDate .
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
      this.hotelList = bindings.map((binding: any) => {
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

  ngOnDestroy(): void {
    this.store.dispatch(HotelListActions.resetHotelList());
    this.messageService.closeAllDialog();

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(HotelDetailComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.sparkGet();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(HotelCreateComponent, {});

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
        const updateQuery = `
              PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
              PREFIX owl: <http://www.w3.org/2002/07/owl#>
              PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
              PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
              PREFIX ex: <http://example.org/hotel#>
        
              DELETE {
                ?hotelToDelete ?p ?o .
              }
              WHERE {
                ?hotelToDelete a ex:Hotel ;
                               ex:HotelId "${id}" .
                ?hotelToDelete ?p ?o .
              }
        `;

        this.fusekiService.insertFuseki(updateQuery).subscribe((response) => {
          console.log("Hotel inserted successfully:", response);
          this.messageService.openMessageNotifyDialog("Update Ok");
          // Handle the response as needed
        });
      }
    });
  }

  addData(): void {}

  search() {
    this.pageSize = 5;
    this.pageIndex = 0;

    this.sparkGet();
  }

  handlePageEvent(e: PageEvent) {
    // this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.sparkGet();
    // Handle the response data here
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState);
    if (sortState.active === "placeBranch") {
      if (sortState.direction === "asc") {
        this.messageService.openLoadingDialog();
      } else if (sortState.direction === "desc") {
        this.messageService.openLoadingDialog();
      }
    } else {
    }
  }
}
