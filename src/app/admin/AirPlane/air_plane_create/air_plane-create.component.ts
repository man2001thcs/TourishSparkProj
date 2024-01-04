import { Response } from "../../../model/response";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";

import { Observable, Subscription, map } from "rxjs";

import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AirPlaneParam } from "./air_plane-create.component.model";
import * as airPlaneActions from "./air_plane-create.store.action";
import { State as air_planeState } from "./air_plane-create.store.reducer";
import { Store } from "@ngrx/store";
import {
  createAirPlane,
  getMessage,
  getSysError,
} from "./air_plane-create.store.selector";

import { MessageService } from "src/app/utility/user_service/message.service";
import { AirPlane } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-air-plane-create",
  templateUrl: "./air_plane-create.component.html",
  styleUrls: ["./air_plane-create.component.css"],
})
export class AirPlaneCreateComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  isSubmitted = false;

  airPlaneParam!: AirPlaneParam;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  airPlaneState!: Observable<any>;
  createAirPlaneState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<air_planeState>,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: AirPlaneParam
  ) {
    this.createAirPlaneState = this.store.select(createAirPlane);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {

    this.store.dispatch(airPlaneActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createformGroup_info = this.fb.group({
      branchName: "",
      hotlineNumber: "",
      supportEmail: "",
      headQuarterAddress: "",
      discountFloat: 0,
      discountAmount: 0,
      description: "",
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(airPlaneActions.resetAirPlane());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.createformGroup_info.setValue({
      branchName: "",
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
        branchName: this.createformGroup_info.value.branchName,
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
        PREFIX ex: <http://example.org/planeairline#>
        INSERT DATA
        {
          ex:${uuid} a ex:PlaneAirline ;
            ex:PlaneId "${uuid}" ;
            ex:BranchName "${this.createformGroup_info.value.branchName}" ;
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
        console.log("AirPlane inserted successfully:", response);
        // Handle the response as needed
      });
    }
  }
}
