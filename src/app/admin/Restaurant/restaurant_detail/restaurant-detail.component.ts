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
import { RestaurantParam } from "./restaurant-detail.component.model";

import * as RestaurantActions from "./restaurant-detail.store.action";
import { State as RestaurantState } from "./restaurant-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editRestaurant,
  getRestaurant,
  getMessage,
  getSysError,
} from "./restaurant-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";
import { Restaurant } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./restaurant-detail.component.html",
  styleUrls: ["./restaurant-detail.component.css"],
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  isSubmitted = false;
  restaurant: Restaurant = {
    id: "",
    placeBranch: "",
    hotlineNumber: "",
    supportEmail: "",
    headQuarterAddress: "",
    discountFloat: 0,
    discountAmount: 0,
    description: "",
  };
  restaurantParam!: RestaurantParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  restaurantState!: Observable<any>;
  editRestaurantState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<RestaurantState>,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: RestaurantParam
  ) {
    this.restaurantState = this.store.select(getRestaurant);
    this.editRestaurantState = this.store.select(editRestaurant);
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

      description: ["", Validators.compose([Validators.required])]
    });

    this.getInfo();

    this.store.dispatch(RestaurantActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(RestaurantActions.resetRestaurant());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getInfo() {
    const sparqlQuery = `
      PREFIX ex: <http://example.org/restaurant#>
      SELECT ?restaurant ?id ?placeBranch ?hotline ?email ?address ?discountFloat ?discountAmount ?description ?createDate ?updateDate
      WHERE {
        ?restaurant a ex:Restaurant ;
                    ex:Id ?id ;
                    ex:PlaceBranch ?placeBranch ;
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
        placeBranch: bindings.placeBranch.value,
        hotlineNumber: bindings.hotline.value,
        supportEmail: bindings.email.value,
        headQuarterAddress: bindings.address.value,
        discountFloat: parseFloat(bindings.discountFloat.value),
        discountAmount: parseFloat(bindings.discountAmount.value),
        description: bindings.description.value,
        createDate: new Date(bindings.createDate.value),
        updateDate: new Date(bindings.updateDate.value),
      };
  
      this.restaurant = state;
      this.messageService.closeLoadingDialog();
  
      // Update your Angular form group with the retrieved data
      this.editformGroup_info.controls["placeBranch"].setValue(state.placeBranch);
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
      placeBranch: this.restaurant.placeBranch ?? "",
      hotlineNumber: this.restaurant.hotlineNumber ?? "",
      supportEmail: this.restaurant.supportEmail ?? "",
      headQuarterAddress: this.restaurant.headQuarterAddress ?? "",
      discountFloat: this.restaurant.discountFloat ?? 0,
      discountAmount: this.restaurant.discountAmount ?? 0,
      description: this.restaurant.description,
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    this.isSubmitted = true;
    if (this.editformGroup_info.valid) {
      const payload: Restaurant = {
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
        PREFIX ex: <http://example.org/restaurant#>
  
        DELETE {
          ?restaurantToUpdate ex:PlaceBranch ?oldPlaceBranch ;
                              ex:HotlineNumber ?oldHotline ;
                              ex:SupportEmail ?oldEmail ;
                              ex:HeadQuarterAddress ?oldAddress ;
                              ex:DiscountFloat ?oldDiscountFloat ;
                              ex:DiscountAmount ?oldDiscountAmount ;
                              ex:Description ?oldDescription ;
                              ex:UpdateDate ?oldUpdateDate .
        }
        INSERT {
          ?restaurantToUpdate ex:PlaceBranch "${this.editformGroup_info.value.placeBranch}" ;
                              ex:HotlineNumber "${this.editformGroup_info.value.hotlineNumber}" ;
                              ex:SupportEmail "${this.editformGroup_info.value.supportEmail}" ;
                              ex:HeadQuarterAddress "${this.editformGroup_info.value.headQuarterAddress}" ;
                              ex:DiscountFloat ${this.editformGroup_info.value.discountFloat} ;
                              ex:DiscountAmount ${this.editformGroup_info.value.discountAmount} ;
                              ex:Description "${this.editformGroup_info.value.description}" ;
                              ex:UpdateDate "${new Date().toISOString()}"^^xsd:dateTime .
        }
        WHERE {
          ?restaurantToUpdate a ex:Restaurant ;
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
        console.log("Restaurant updated successfully:", response);
        this.messageService.openMessageNotifyDialog("Update Ok");
        // Handle the response as needed
      });
    }
  }
  
}
