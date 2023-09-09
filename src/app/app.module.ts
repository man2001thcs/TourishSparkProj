import { ConfirmDialogComponent } from 'src/app/utility/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestModule } from './guest/guest.module/guest.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorTagDynamicComponent } from './utility/author-tag-dynamic/author-tag-dynamic.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifyDialogComponent } from './utility/notification/notify-dialog.component';
import { FailNotifyDialogComponent } from './utility/notification/fail-notify-dialog.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './utility/user_service/http.inceptor';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { BookCardComponent } from './utility/book-card/book-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AuthorTagDynamicComponent,
    NotifyDialogComponent,
    FailNotifyDialogComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    
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

    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
