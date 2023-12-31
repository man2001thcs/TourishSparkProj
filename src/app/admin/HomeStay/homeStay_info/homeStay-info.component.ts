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


import { MessageService } from "src/app/utility/user_service/message.service";
import { AirPlane } from "src/app/model/baseModel";
import { FusekiService } from "src/app/utility/spark-sql-service/spark.sql.service";

@Component({
  selector: "app-air-plane-info",
  templateUrl: "./homeStay-info.component.html",
  styleUrls: ["./homeStay-info.component.css"],
})
export class HomeStayinfoComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  isSubmitted = false;

  imageLink = "https://commons.wikimedia.org/wiki/Special:FilePath/";
  imageList: string[] = [];

  this_announce = "";

  infoformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  airPlaneState!: Observable<any>;
  infoAirPlaneState!: Observable<any>;
  subscriptions: Subscription[] = [];

  dbpediaInfo: any;
  objectArray: any;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private messageService: MessageService,
    private fusekiService: FusekiService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const sparqlQuery = `
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbp: <http://dbpedia.org/property/>
    
    SELECT ?caption ?closingDate ?floorArea ?floors ?abstract
    WHERE {
      ?homeStay a dbo:HomeStay ;
             dbp:caption ?caption ;
             dbo:abstract ?abstract ;
             rdfs:label "${this.data.name}"@en.

      OPTIONAL {
        ?homeStay dbp:closingDate ?closingDate ;
        dbp:floorArea ?floorArea ;
        dbp:floors ?floors .
      }
      FILTER(LANG(?abstract) = "en")
    }
    `;

    const sparql2Query = `
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbp: <http://dbpedia.org/property/>
    
    SELECT ?images
    WHERE {
      ?airline a dbo:Airline ;
               dbp:image ?images ;
               rdfs:label "${this.data.name}"@en.
    }
    `;

    this.fusekiService.executeWikiDbQuery(sparqlQuery).subscribe((data: any) => {
      this.dbpediaInfo = data.results.bindings[0];
      this.mapToArray();
    });

    this.fusekiService.executeWikiDbQuery(sparql2Query).subscribe((data: any) => {
      if (data.results.bindings) {
        data.results.bindings.forEach((data1: any) => {
          if (data1.images != undefined)
            console.log(data1.images.value);
          this.imageList.push(data1.images.value);
        })
      }
      console.log(this.imageList);
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");

  }

  getEmbedUrl(): string {
    // Replace the URL with the desired DBpedia page URL
    const pageName = this.data.name;
    const pageNameWithUnderscores = pageName.replace(/ /g, '_');

    // Construct the full URL
    const pageUrl = `https://dbpedia.org/page/${pageNameWithUnderscores}`;

    // Encode the URL to handle special characters
    const encodedUrl = encodeURIComponent(pageUrl);

    // Use the encoded URL to create the embed URL
    const embedUrl = `https://dbpedia.org/page/${encodedUrl}?embed=1`;

    return embedUrl;
  }

  mapToArray(): Object | null {
    if (this.dbpediaInfo !== null) {
      this.objectArray = Object.entries(this.dbpediaInfo);
      console.log(this.objectArray);
      return Object.keys(this.dbpediaInfo).map((key) => this.dbpediaInfo[key]);
    }
    return null;
  }

}
