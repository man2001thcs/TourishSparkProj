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
import { RestaurantParam } from "./restaurant-create.component.model";
import * as restaurantActions from "./restaurant-create.store.action";
import { State as passenger_carState } from "./restaurant-create.store.reducer";
import { Store } from "@ngrx/store";
import {
  createRestaurant,
  getMessage,
  getSysError,
} from "./restaurant-create.store.selector";
import { FailNotifyDialogComponent } from "src/app/utility/notification_admin/fail-notify-dialog.component";
import { MessageService } from "src/app/utility/user_service/message.service";
import { Restaurant } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-book-create",
  templateUrl: "./restaurant-create.component.html",
  styleUrls: ["./restaurant-create.component.css"],
})
export class RestaurantCreateComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;

  restaurantParam!: RestaurantParam;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  restaurantState!: Observable<any>;
  createRestaurantState!: Observable<any>;
  subscriptions: Subscription[] = [];

  isSubmitted = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<passenger_carState>,
    private messageService: MessageService,
    private fusekiService : FusekiService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: RestaurantParam
  ) {
    this.createRestaurantState = this.store.select(createRestaurant);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {

    this.store.dispatch(restaurantActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createformGroup_info = this.fb.group({
      placeBranch: ["", Validators.compose([Validators.required])],
      hotlineNumber: ["", Validators.compose([Validators.required])],
      supportEmail: ["", Validators.compose([Validators.required])],
      headQuarterAddress: ["", Validators.compose([Validators.required])],
      discountFloat: [0, Validators.compose([Validators.required])],
      discountAmount: [0, Validators.compose([Validators.required])],
      description: ["", Validators.compose([Validators.required])],
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(restaurantActions.resetRestaurant());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.createformGroup_info.setValue({
      placeBranch: "",
      hotlineNumber: "",
      supportEmail: "",
      headQuarterAddress: "",
      discountFloat: 0,
      discountAmount: 0,
      description: "",
    });
  }

  formSubmit_create_info(): void {
    this.isSubmitted = true;
    if (this.createformGroup_info.valid) {
      const payload = {
        placeBranch: this.createformGroup_info.value.placeBranch,
        hotlineNumber: this.createformGroup_info.value.hotlineNumber,
        supportEmail: this.createformGroup_info.value.supportEmail,
        headQuarterAddress: this.createformGroup_info.value.headQuarterAddress,
        discountFloat: this.createformGroup_info.value.discountFloat,
        discountAmount: this.createformGroup_info.value.discountAmount,
        description: this.createformGroup_info.value.description,
      };
  
      const now = new Date();
      const formattedNow = now.toISOString();
  
      const uuid = self.crypto.randomUUID();
  
      const sparqlQuery = `
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX ex: <http://example.org/restaurant#>
        INSERT DATA
        {
          ex:${uuid} a ex:Restaurant ;
            ex:RestaurantId "${uuid}" ;
            ex:PlaceBranch "${this.createformGroup_info.value.placeBranch}" ;
            ex:HotlineNumber "${this.createformGroup_info.value.hotlineNumber}" ;
            ex:SupportEmail "${this.createformGroup_info.value.supportEmail}" ;
            ex:HeadQuarterAddress "${this.createformGroup_info.value.headQuarterAddress}" ;
            ex:DiscountFloat ${this.createformGroup_info.value.discountFloat} ;
            ex:DiscountAmount ${this.createformGroup_info.value.discountAmount} ;
            ex:Description "${this.createformGroup_info.value.description}" ;
            ex:CreateDate "${formattedNow}"^^xsd:dateTime ;
            ex:UpdateDate "${formattedNow}"^^xsd:dateTime .
        }
      `;
  
      this.fusekiService.insertFuseki(sparqlQuery).subscribe((response) => {
        console.log("Restaurant inserted successfully:", response);
        // Handle the response as needed
      });
    }
  }
}
