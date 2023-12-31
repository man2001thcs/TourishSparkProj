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
import { PassengerCarParam } from "./passenger_car-detail.component.model";

import * as PassengerCarActions from "./passenger_car-detail.store.action";
import { State as PassengerCarState } from "./passenger_car-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editPassengerCar,
  getPassengerCar,
  getMessage,
  getSysError,
} from "./passenger_car-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";
import { PassengerCar } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./passenger_car-detail.component.html",
  styleUrls: ["./passenger_car-detail.component.css"],
})
export class PassengerCarDetailComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  isSubmitted = false;

  passengerCar: PassengerCar = {
    id: "",
    branchName: "",
    hotlineNumber: "",
    supportEmail: "",
    headQuarterAddress: "",
    discountFloat: 0,
    discountAmount: 0,
    description: "",
  };
  passengerCarParam!: PassengerCarParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  passengerCarState!: Observable<any>;
  editPassengerCarState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<PassengerCarState>,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: PassengerCarParam
  ) {
    this.passengerCarState = this.store.select(getPassengerCar);
    this.editPassengerCarState = this.store.select(editPassengerCar);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.editformGroup_info = this.fb.group({
      id: [this.data.id, Validators.compose([Validators.required])],
      branchName: ["", Validators.compose([Validators.required])],
      hotlineNumber: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      supportEmail: ["", Validators.compose([Validators.required])],
      headQuarterAddress: ["", Validators.compose([Validators.required])],
      discountFloat: [0, Validators.compose([Validators.required])],
      discountAmount: [0, Validators.compose([Validators.required])],

      description: "",
    });

    this.getInfo();

    this.store.dispatch(PassengerCarActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(PassengerCarActions.resetPassengerCar());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getInfo() {
    const sparqlQuery = `
    PREFIX ex: <http://example.org/passengercar#>
      SELECT ?car ?id ?branch ?hotline ?email ?address ?discountFloat ?discountAmount ?description ?createDate ?updateDate
      WHERE {
        ?car a ex:PassengerCar ;
             ex:CarId ?id ;
             ex:BranchName ?branch ;
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
        branchName: bindings.branch.value,
        hotlineNumber: bindings.hotline.value,
        supportEmail: bindings.email.value,
        headQuarterAddress: bindings.address.value,
        discountFloat: parseFloat(bindings.discountFloat.value),
        discountAmount: parseFloat(bindings.discountAmount.value),
        description: bindings.description.value,
        createDate: new Date(bindings.createDate.value),
        updateDate: new Date(bindings.updateDate.value),
      };
  
      this.passengerCar = state;
      this.messageService.closeLoadingDialog();
  
      // Update your Angular form group with the retrieved data
      this.editformGroup_info.controls["branchName"].setValue(state.branchName);
      this.editformGroup_info.controls["hotlineNumber"].setValue(state.hotlineNumber);
      this.editformGroup_info.controls["supportEmail"].setValue(state.supportEmail);
      this.editformGroup_info.controls["headQuarterAddress"].setValue(state.headQuarterAddress);
      this.editformGroup_info.controls["discountFloat"].setValue(state.discountFloat);
      this.editformGroup_info.controls["discountAmount"].setValue(state.discountAmount);
      this.editformGroup_info.controls["description"].setValue(state.description);
  
      // Handle the response data here
    });
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      branchName: this.passengerCar.branchName ?? "",
      hotlineNumber: this.passengerCar.hotlineNumber ?? "",
      supportEmail: this.passengerCar.supportEmail ?? "",
      headQuarterAddress: this.passengerCar.headQuarterAddress ?? "",
      discountFloat: this.passengerCar.discountFloat ?? 0,
      discountAmount: this.passengerCar.discountAmount ?? 0,
      description: this.passengerCar.description,
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    this.isSubmitted = true;
    if (this.editformGroup_info.valid) {
      const payload: PassengerCar = {
        id: this.data.id,
        branchName: this.editformGroup_info.value.branchName,
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
        PREFIX ex: <http://example.org/passengercar#>
  
        DELETE {
          ?passengerCarToUpdate ex:BranchName ?oldBranchName ;
                                ex:HotlineNumber ?oldHotline ;
                                ex:SupportEmail ?oldEmail ;
                                ex:HeadQuarterAddress ?oldAddress ;
                                ex:DiscountFloat ?oldDiscountFloat ;
                                ex:DiscountAmount ?oldDiscountAmount ;
                                ex:Description ?oldDescription ;
                                ex:UpdateDate ?oldUpdateDate .
        }
        INSERT {
          ?passengerCarToUpdate ex:BranchName "${
            this.editformGroup_info.value.branchName
          }" ;
                                ex:HotlineNumber "${
                                  this.editformGroup_info.value.hotlineNumber
                                }" ;
                                ex:SupportEmail "${
                                  this.editformGroup_info.value.supportEmail
                                }" ;
                                ex:HeadQuarterAddress "${
                                  this.editformGroup_info.value
                                    .headQuarterAddress
                                }" ;
                                ex:DiscountFloat ${
                                  this.editformGroup_info.value.discountFloat
                                } ;
                                ex:DiscountAmount ${
                                  this.editformGroup_info.value.discountAmount
                                } ;
                                ex:Description "${
                                  this.editformGroup_info.value.description
                                }" ;
                                ex:UpdateDate "${new Date().toISOString()}"^^xsd:dateTime .
        }
        WHERE {
          ?passengerCarToUpdate a ex:PassengerCar ;
                                ex:CarId "${this.data.id}" ;
                                ex:BranchName ?oldBranchName ;
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
        console.log("PassengerCar updated successfully:", response);
        this.messageService.openMessageNotifyDialog("Update Ok");
        // Handle the response as needed
      });
    }
  }
}
