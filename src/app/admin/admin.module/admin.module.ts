import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminMainComponent } from "../main/admin.main.component";
import { AdminRouter } from "./admin.router";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";
import { HeaderAdminComponent } from "../header/header.admin.component";
import { MatMenuModule } from "@angular/material/menu";
import { FooterComponent } from "src/app/utility/footer/footer.component";
import { AuthorMultiselectAutocompleteComponent } from "src/app/utility/author-multiselect-autocomplete/multiselect-autocomplete.component";
import { VoucherMultiselectAutocompleteComponent } from "src/app/utility/voucher-multiselect-autocomplete/multiselect-autocomplete.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

//
import { BookListAdminComponent } from "./../book-list/bookList_admin.component";
import { BookDetailAdminComponent } from "./../book-detail/book-detail_admin.component";

import { storeKey as BookCreateStoreKey } from "../book-create/book-create.store.action";
import { reducer as BookCreateReducer } from "../book-create/book-create.store.reducer";
import { storeKey as BookListStoreKey } from "../book-list/bookList_admin.store.action";
import { reducer as BookListReducer } from "../book-list/bookList_admin.store.reducer";
import { storeKey as BookDetailStoreKey } from "../book-detail/book-detail.store.action";
import { reducer as BookDetailReducer } from "../book-detail/book-detail.store.reducer";

import { storeKey as VoucherAutocompleteStoreKey } from "src/app/utility/voucher-multiselect-autocomplete/multiselect-autocomplete.store.action";
import { storeKey as AuthorAutocompleteStoreKey } from "src/app/utility/author-multiselect-autocomplete/multiselect-autocomplete.store.action";
import { storeKey as PublisherAutocompleteStoreKey } from "src/app/utility/publisher-multiselect-autocomplete/multiselect-autocomplete.store.action";
import { storeKey as CategoryAutocompleteStoreKey } from "src/app/utility/category-multiselect-autocomplete/multiselect-autocomplete.store.action";

import { reducer as VoucherAutocompleteReducer } from "src/app/utility/voucher-multiselect-autocomplete/multiselect-autocomplete.store.reducer";
import { reducer as AuthorAutocompleteReducer } from "src/app/utility/author-multiselect-autocomplete/multiselect-autocomplete.store.reducer";
import { reducer as PublisherAutocompleteReducer } from "src/app/utility/publisher-multiselect-autocomplete/multiselect-autocomplete.store.reducer";
import { reducer as CategoryAutocompleteReducer } from "src/app/utility/category-multiselect-autocomplete/multiselect-autocomplete.store.reducer";

import { storeKey as StayingAutocompleteStoreKey } from "src/app/utility/multiselect/staying-multiselect-autocomplete/multiselect-autocomplete.store.action";
import { reducer as StayingAutocompleteReducer } from "src/app/utility/multiselect/staying-multiselect-autocomplete/multiselect-autocomplete.store.reducer";

import { storeKey as ImageListStoreKey } from "../../utility/image_service/imageUpload.store.action";
import { reducer as ImageListReducer } from "../../utility/image_service/imageUpload.store.reducer";

import { BookCreateAdminComponent } from "../book-create/book-create_admin.component";

import { CategoryMultiselectAutocompleteComponent } from "src/app/utility/category-multiselect-autocomplete/multiselect-autocomplete.component";
import { PublisherMultiselectAutocompleteComponent } from "src/app/utility/publisher-multiselect-autocomplete/multiselect-autocomplete.component";

import { BookListEffects } from "../book-list/bookList_admin.store.effect";
import { BookCreateEffects } from "../book-create/book-create.store.effect";

import { VoucherAutoCompleteListEffects } from "src/app/utility/voucher-multiselect-autocomplete/multiselect-autocomplete.store.effect";
import { PublisherAutoCompleteListEffects } from "src/app/utility/publisher-multiselect-autocomplete/multiselect-autocomplete.store.effect";
import { CategoryAutoCompleteListEffects } from "src/app/utility/category-multiselect-autocomplete/multiselect-autocomplete.store.effect";
import { AuthorAutoCompleteListEffects } from "src/app/utility/author-multiselect-autocomplete/multiselect-autocomplete.store.effect";

import { OptionsScrollDirective } from "src/app/utility/config/multiselect-scroll.directive";
import { NgbDropdownModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { BookDetailEffects } from "../book-detail/book-detail.store.effect";
import { FileUploadComponent } from "src/app/utility/image_service/imageUpload.component";
import { NbChatModule } from "@nebular/theme";
import { MatCardModule } from "@angular/material/card";
import { ImageListEffects } from "src/app/utility/image_service/imageUpload.store.effect";

import { PassengerCarCreateComponent } from "../PassengerCar/passenger_car_create/passenger_car-create.component";
import { PassengerCarDetailComponent } from "../PassengerCar/passenger_car_detail/passenger_car-detail.component";
import { PassengerCarListComponent } from "../PassengerCar/passenger_car_list/passenger_car-list.component";

import { PassengerCarCreateEffects } from "../PassengerCar/passenger_car_create/passenger_car-create.store.effect";
import { PassengerCarEffects } from "../PassengerCar/passenger_car_detail/passenger_car-detail.store.effect";
import { PassengerCarListEffects } from "../PassengerCar/passenger_car_list/passenger_car-list.store.effect";

import { storeKey as PassengerCarCreateStoreKey } from "../PassengerCar/passenger_car_create/passenger_car-create.store.action";
import { reducer as PassengerCarCreateReducer } from "../PassengerCar/passenger_car_create/passenger_car-create.store.reducer";

import { storeKey as PassengerCarListStoreKey } from "../PassengerCar/passenger_car_list/passenger_car-list.store.action";
import { reducer as PassengerCarListReducer } from "../PassengerCar/passenger_car_list/passenger_car-list.store.reducer";

import { storeKey as PassengerCarDetailStoreKey } from "../PassengerCar/passenger_car_detail/passenger_car-detail.store.action";
import { reducer as PassengerCarDetailReducer } from "../PassengerCar/passenger_car_detail/passenger_car-detail.store.reducer";

import { AirPlaneCreateComponent } from "../AirPlane/air_plane_create/air_plane-create.component";
import { AirPlaneDetailComponent } from "../AirPlane/air_plane_detail/air_plane-detail.component";
import { AirPlaneListComponent } from "../AirPlane/air_plane_list/air_plane-list.component";

import { AirPlaneCreateEffects } from "../AirPlane/air_plane_create/air_plane-create.store.effect";
import { AirPlaneEffects } from "../AirPlane/air_plane_detail/air_plane-detail.store.effect";
import { AirPlaneListEffects } from "../AirPlane/air_plane_list/air_plane-list.store.effect";

import { storeKey as AirPlaneCreateStoreKey } from "../AirPlane/air_plane_create/air_plane-create.store.action";
import { reducer as AirPlaneCreateReducer } from "../AirPlane/air_plane_create/air_plane-create.store.reducer";

import { storeKey as AirPlaneListStoreKey } from "../AirPlane/air_plane_list/air_plane-list.store.action";
import { reducer as AirPlaneListReducer } from "../AirPlane/air_plane_list/air_plane-list.store.reducer";

import { storeKey as AirPlaneDetailStoreKey } from "../AirPlane/air_plane_detail/air_plane-detail.store.action";
import { reducer as AirPlaneDetailReducer } from "../AirPlane/air_plane_detail/air_plane-detail.store.reducer";

import { storeKey as HotelCreateStoreKey } from "../Hotel/hotel_create/hotel-create.store.action";
import { reducer as HotelCreateReducer } from "../Hotel/hotel_create/hotel-create.store.reducer";

import { storeKey as HotelListStoreKey } from "../Hotel/hotel_list/hotel-list.store.action";
import { reducer as HotelListReducer } from "../Hotel/hotel_list/hotel-list.store.reducer";

import { storeKey as HotelDetailStoreKey } from "../Hotel/hotel_detail/hotel-detail.store.action";
import { reducer as HotelDetailReducer } from "../Hotel/hotel_detail/hotel-detail.store.reducer";

import { storeKey as HomeStayCreateStoreKey } from "../HomeStay/homeStay_create/homeStay-create.store.action";
import { reducer as HomeStayCreateReducer } from "../HomeStay/homeStay_create/homeStay-create.store.reducer";

import { storeKey as HomeStayListStoreKey } from "../HomeStay/homeStay_list/homeStay-list.store.action";
import { reducer as HomeStayListReducer } from "../HomeStay/homeStay_list/homeStay-list.store.reducer";

import { storeKey as HomeStayDetailStoreKey } from "../HomeStay/homeStay_detail/homeStay-detail.store.action";
import { reducer as HomeStayDetailReducer } from "../HomeStay/homeStay_detail/homeStay-detail.store.reducer";

import { storeKey as RestaurantCreateStoreKey } from "../Restaurant/restaurant_create/restaurant-create.store.action";
import { reducer as RestaurantCreateReducer } from "../Restaurant/restaurant_create/restaurant-create.store.reducer";

import { storeKey as RestaurantListStoreKey } from "../Restaurant/restaurant_list/restaurant-list.store.action";
import { reducer as RestaurantListReducer } from "../Restaurant/restaurant_list/restaurant-list.store.reducer";

import { storeKey as RestaurantDetailStoreKey } from "../Restaurant/restaurant_detail/restaurant-detail.store.action";
import { reducer as RestaurantDetailReducer } from "../Restaurant/restaurant_detail/restaurant-detail.store.reducer";

import { SharedModule } from "src/app/shared.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { HotelCreateEffects } from "../Hotel/hotel_create/hotel-create.store.effect";
import { HotelEffects } from "../Hotel/hotel_detail/hotel-detail.store.effect";
import { HotelListEffects } from "../Hotel/hotel_list/hotel-list.store.effect";

import { HomeStayCreateEffects } from "../HomeStay/homeStay_create/homeStay-create.store.effect";
import { HomeStayEffects } from "../HomeStay/homeStay_detail/homeStay-detail.store.effect";
import { HomeStayListEffects } from "../HomeStay/homeStay_list/homeStay-list.store.effect";

import { HotelCreateComponent } from "../Hotel/hotel_create/hotel-create.component";
import { HotelDetailComponent } from "../Hotel/hotel_detail/hotel-detail.component";
import { HotelListComponent } from "../Hotel/hotel_list/hotel-list.component";

import { HomeStayCreateComponent } from "../HomeStay/homeStay_create/homeStay-create.component";
import { HomeStayDetailComponent } from "../HomeStay/homeStay_detail/homeStay-detail.component";
import { HomeStayListComponent } from "../HomeStay/homeStay_list/homeStay-list.component";

import { RestaurantCreateEffects } from "../Restaurant/restaurant_create/restaurant-create.store.effect";
import { RestaurantEffects } from "../Restaurant/restaurant_detail/restaurant-detail.store.effect";
import { RestaurantListEffects } from "../Restaurant/restaurant_list/restaurant-list.store.effect";

import { RestaurantCreateComponent } from "../Restaurant/restaurant_create/restaurant-create.component";
import { RestaurantDetailComponent } from "../Restaurant/restaurant_detail/restaurant-detail.component";
import { RestaurantListComponent } from "../Restaurant/restaurant_list/restaurant-list.component";
import { StayingMultiselectAutocompleteComponent } from "src/app/utility/multiselect/staying-multiselect-autocomplete/multiselect-autocomplete.component";

import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { TourishPlanCreateAdminComponent } from "../TourishPlan/tourishPlan-create/tourishPlan-create_admin.component";
import { TourishPlanListAdminComponent } from "../TourishPlan/tourishPlan-list/tourishPlanList_admin.component";
import { TourishPlanDetailAdminComponent } from "../TourishPlan/tourishPlan-detail/tourishPlan_admin.component";
import { ValidationComponent } from "src/app/utility/validation/validation.component";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { StayingAutoCompleteListEffects } from "src/app/utility/multiselect/staying-multiselect-autocomplete/multiselect-autocomplete.store.effect";

@NgModule({
  declarations: [
    PassengerCarCreateComponent,
    PassengerCarDetailComponent,
    PassengerCarListComponent,

    ValidationComponent,

    AirPlaneCreateComponent,
    AirPlaneDetailComponent,
    AirPlaneListComponent,

    HotelCreateComponent,
    HotelDetailComponent,
    HotelListComponent,

    HomeStayCreateComponent,
    HomeStayDetailComponent,
    HomeStayListComponent,

    RestaurantCreateComponent,
    RestaurantDetailComponent,
    RestaurantListComponent,

    TourishPlanCreateAdminComponent,
    TourishPlanListAdminComponent,
    TourishPlanDetailAdminComponent,

    BookListAdminComponent,
    BookDetailAdminComponent,
    BookCreateAdminComponent,

    AdminMainComponent,
    HeaderAdminComponent,

    AuthorMultiselectAutocompleteComponent,
    VoucherMultiselectAutocompleteComponent,
    CategoryMultiselectAutocompleteComponent,
    PublisherMultiselectAutocompleteComponent,

    StayingMultiselectAutocompleteComponent,

    FileUploadComponent,

    OptionsScrollDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRouter,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgbDropdownModule,
    MatProgressSpinnerModule,
    NgbNavModule,

    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatDatepickerModule,

    NbChatModule,

    StoreModule.forFeature(BookCreateStoreKey, BookCreateReducer),
    StoreModule.forFeature(BookListStoreKey, BookListReducer),
    StoreModule.forFeature(BookDetailStoreKey, BookDetailReducer),

    StoreModule.forFeature(
      VoucherAutocompleteStoreKey,
      VoucherAutocompleteReducer
    ),
    StoreModule.forFeature(
      PublisherAutocompleteStoreKey,
      PublisherAutocompleteReducer
    ),
    StoreModule.forFeature(
      AuthorAutocompleteStoreKey,
      AuthorAutocompleteReducer
    ),
    StoreModule.forFeature(
      CategoryAutocompleteStoreKey,
      CategoryAutocompleteReducer
    ),

    StoreModule.forFeature(
      PassengerCarCreateStoreKey,
      PassengerCarCreateReducer
    ),
    StoreModule.forFeature(PassengerCarListStoreKey, PassengerCarListReducer),
    StoreModule.forFeature(
      PassengerCarDetailStoreKey,
      PassengerCarDetailReducer
    ),

    StoreModule.forFeature(HotelCreateStoreKey, HotelCreateReducer),
    StoreModule.forFeature(HotelListStoreKey, HotelListReducer),
    StoreModule.forFeature(HotelDetailStoreKey, HotelDetailReducer),

    StoreModule.forFeature(HomeStayCreateStoreKey, HomeStayCreateReducer),
    StoreModule.forFeature(HomeStayListStoreKey, HomeStayListReducer),
    StoreModule.forFeature(HomeStayDetailStoreKey, HomeStayDetailReducer),

    StoreModule.forFeature(AirPlaneCreateStoreKey, AirPlaneCreateReducer),
    StoreModule.forFeature(AirPlaneListStoreKey, AirPlaneListReducer),
    StoreModule.forFeature(AirPlaneDetailStoreKey, AirPlaneDetailReducer),

    StoreModule.forFeature(RestaurantCreateStoreKey, RestaurantCreateReducer),
    StoreModule.forFeature(RestaurantListStoreKey, RestaurantListReducer),
    StoreModule.forFeature(RestaurantDetailStoreKey, RestaurantDetailReducer),

    StoreModule.forFeature(
      StayingAutocompleteStoreKey,
      StayingAutocompleteReducer
    ),

    StoreModule.forFeature(ImageListStoreKey, ImageListReducer),

    EffectsModule.forFeature([BookCreateEffects]),
    EffectsModule.forFeature([BookListEffects]),
    EffectsModule.forFeature([BookDetailEffects]),

    EffectsModule.forFeature([VoucherAutoCompleteListEffects]),
    EffectsModule.forFeature([PublisherAutoCompleteListEffects]),
    EffectsModule.forFeature([CategoryAutoCompleteListEffects]),
    EffectsModule.forFeature([AuthorAutoCompleteListEffects]),

    EffectsModule.forFeature([StayingAutoCompleteListEffects]),

    EffectsModule.forFeature([ImageListEffects]),

    EffectsModule.forFeature([PassengerCarCreateEffects]),
    EffectsModule.forFeature([PassengerCarEffects]),
    EffectsModule.forFeature([PassengerCarListEffects]),

    EffectsModule.forFeature([AirPlaneCreateEffects]),
    EffectsModule.forFeature([AirPlaneEffects]),
    EffectsModule.forFeature([AirPlaneListEffects]),

    EffectsModule.forFeature([HotelCreateEffects]),
    EffectsModule.forFeature([HotelEffects]),
    EffectsModule.forFeature([HotelListEffects]),

    EffectsModule.forFeature([HomeStayCreateEffects]),
    EffectsModule.forFeature([HomeStayEffects]),
    EffectsModule.forFeature([HomeStayListEffects]),

    EffectsModule.forFeature([RestaurantCreateEffects]),
    EffectsModule.forFeature([RestaurantEffects]),
    EffectsModule.forFeature([RestaurantListEffects]),
  ],
})
export class AdminModule {}
