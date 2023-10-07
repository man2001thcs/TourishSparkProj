import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthorTagDynamicComponent } from "./utility/author-tag-dynamic/author-tag-dynamic.component";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { NotifyDialogComponent } from "./utility/notification_admin/notify-dialog.component";
import { FailNotifyDialogComponent } from "./utility/notification_admin/fail-notify-dialog.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./utility/user_service/http.inceptor";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { NbLayoutModule, NbThemeModule } from "@nebular/theme";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { CommonModule } from "@angular/common";
import { FooterComponent } from "./utility/footer/footer.component";
import { LoadingDialogComponent } from "./utility/notification_admin/loading-dialog.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AuthorTagDynamicComponent,
    NotifyDialogComponent,
    FailNotifyDialogComponent,
    LoadingDialogComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CommonModule,

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,

    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
