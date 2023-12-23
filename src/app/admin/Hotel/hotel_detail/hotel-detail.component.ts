import { Response } from "../../../model/response";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import {
  ConfirmDialogComponent,
  DialogData,
} from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NotifyDialogComponent } from "src/app/utility/notification_admin/notify-dialog.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/model/book";
import { AdminService } from "../../service/admin.service";
import { CheckDeactivate } from "../../interface/admin.check_edit";
import { HotelParam } from "./hotel-detail.component.model";

import * as HotelActions from "./hotel-detail.store.action";
import { State as HotelState } from "./hotel-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editHotel,
  getHotel,
  getMessage,
  getSysError,
} from "./hotel-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";
import { Hotel } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./hotel-detail.component.html",
  styleUrls: ["./hotel-detail.component.css"],
})
export class HotelDetailComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  isSubmitted = false;
  hotel: Hotel = {
    id: "",
    placeBranch: "",
    hotlineNumber: "",
    supportEmail: "",
    headQuarterAddress: "",
    discountFloat: 0,
    discountAmount: 0,
    description: "",
  };
  hotelParam!: HotelParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  hotelState!: Observable<any>;
  editHotelState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<HotelState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    private fusekiService: FusekiService,
    @Inject(MAT_DIALOG_DATA) public data: HotelParam
  ) {
    this.hotelState = this.store.select(getHotel);
    this.editHotelState = this.store.select(editHotel);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.editformGroup_info = this.fb.group({
      id: [this.data.id, Validators.compose([Validators.required])],
      placeBranch: ["", Validators.compose([Validators.required])],
      hotlineNumber: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      supportEmail: ["", Validators.compose([Validators.required])],
      headQuarterAddress: ["", Validators.compose([Validators.required])],
      discountFloat: [0, Validators.compose([Validators.required])],
      discountAmount: [0, Validators.compose([Validators.required])],

      description: ["", Validators.compose([Validators.required])],
    });

    const sparqlQuery = `
    PREFIX ex: <http://example.org/hotel#>
    SELECT ?hotel ?id ?branch ?hotline ?email ?address ?discountFloat ?discountAmount ?description ?createDate ?updateDate
    WHERE {
      ?hotel a ex:Hotel ;
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

      FILTER (?id = "${this.data.id}")
    }
  `;

    this.fusekiService.queryFuseki(sparqlQuery).subscribe((response: any) => {
      console.log("res", JSON.stringify(response));
      const bindings = response.results.bindings[0];
      const state = {
        id: bindings.id.value,
        placeBranch: bindings.branch.value,
        hotlineNumber: bindings.hotline.value,
        supportEmail: bindings.email.value,
        headQuarterAddress: bindings.address.value,
        discountFloat: parseFloat(bindings.discountFloat.value),
        discountAmount: parseFloat(bindings.discountAmount.value),
        description: bindings.description.value,
        createDate: new Date(bindings.createDate.value),
        updateDate: new Date(bindings.updateDate.value),
      };

      this.hotel = state;
      this.messageService.closeLoadingDialog();
      this.editformGroup_info.controls["placeBranch"].setValue(
        state.placeBranch
      );
      this.editformGroup_info.controls["hotlineNumber"].setValue(
        state.hotlineNumber
      );
      this.editformGroup_info.controls["supportEmail"].setValue(
        state.supportEmail
      );
      this.editformGroup_info.controls["headQuarterAddress"].setValue(
        state.headQuarterAddress
      );

      this.editformGroup_info.controls["discountFloat"].setValue(
        state.discountFloat
      );

      this.editformGroup_info.controls["discountAmount"].setValue(
        state.discountAmount
      );

      this.editformGroup_info.controls["description"].setValue(
        state.description
      );

      // Handle the response data here
    });

    this.messageService.openLoadingDialog();

    // this.store.dispatch(
    //   HotelActions.getHotel({
    //     payload: {
    //       id: this.data.id,
    //     },
    //   })
    // );

    this.store.dispatch(HotelActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(HotelActions.resetHotel());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      placeBranch: this.hotel.placeBranch ?? "",
      hotlineNumber: this.hotel.hotlineNumber ?? "",
      supportEmail: this.hotel.supportEmail ?? "",
      headQuarterAddress: this.hotel.headQuarterAddress ?? "",
      discountFloat: this.hotel.discountFloat ?? 0,
      discountAmount: this.hotel.discountAmount ?? 0,
      description: this.hotel.description,
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    this.isSubmitted = true;
    if (this.editformGroup_info.valid) {
      const payload: Hotel = {
        id: this.data.id,
        placeBranch: this.editformGroup_info.value.placeBranch,
        hotlineNumber: this.editformGroup_info.value.hotlineNumber,
        supportEmail: this.editformGroup_info.value.supportEmail,
        headQuarterAddress: this.editformGroup_info.value.headQuarterAddress,
        discountFloat: this.editformGroup_info.value.discountFloat,
        discountAmount: this.editformGroup_info.value.discountAmount,
        description: this.editformGroup_info.value.description,
      };

      const updateQuery = `
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX ex: <http://example.org/hotel#>

      DELETE {
        ?hotelToUpdate ex:PlaceBranch ?oldPlaceBranch ;
                       ex:HotlineNumber ?oldHotline ;
                       ex:SupportEmail ?oldEmail ;
                       ex:HeadQuarterAddress ?oldAddress ;
                       ex:DiscountFloat ?oldDiscountFloat ;
                       ex:DiscountAmount ?oldDiscountAmount ;
                       ex:Description ?oldDescription ;
                       ex:UpdateDate ?oldUpdateDate .
      }
      INSERT {
        ?hotelToUpdate ex:PlaceBranch "${this.editformGroup_info.value.placeBranch}" ;
                       ex:HotlineNumber "${this.editformGroup_info.value.hotlineNumber}" ;
                       ex:SupportEmail "${this.editformGroup_info.value.supportEmail}" ;
                       ex:HeadQuarterAddress "${this.editformGroup_info.value.headQuarterAddress}" ;
                       ex:DiscountFloat ${this.editformGroup_info.value.discountFloat} ;
                       ex:DiscountAmount ${this.editformGroup_info.value.discountAmount} ;
                       ex:Description "${this.editformGroup_info.value.description}" ;
                       ex:UpdateDate "${new Date().toISOString()}"^^xsd:dateTime .
      }
      WHERE {
        ?hotelToUpdate a ex:Hotel ;
                       ex:Id "${this.data.id}" ;
                       ex:PlaceBranch ?oldPlaceBranch ;
                       ex:HotlineNumber ?oldHotline ;
                       ex:SupportEmail ?oldEmail ;
                       ex:HeadQuarterAddress ?oldAddress ;
                       ex:DiscountFloat ?oldDiscountFloat ;
                       ex:DiscountAmount ?oldDiscountAmount ;
                       ex:Description ?oldDescription ;
                       ex:UpdateDate ?oldUpdateDate .
      }
    `;

    this.fusekiService.insertFuseki(updateQuery).subscribe((response) => {
      console.log("Hotel inserted successfully:", response);
      this.messageService.openMessageNotifyDialog("Update Ok");
      // Handle the response as needed
    });

      // this.messageService.openLoadingDialog();
      // this.store.dispatch(
      //   HotelActions.editHotel({
      //     payload: payload,
      //   })
      // );
    }
  }
}
