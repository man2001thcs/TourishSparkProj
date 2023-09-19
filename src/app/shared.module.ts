import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NbContextMenuModule, NbLayoutModule, NbMenuModule, NbThemeModule, NbUserModule } from "@nebular/theme";
import { BookCardComponent } from "./utility/book-card/book-card.component";

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
} from "@nebular/theme";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { OutsideClickDirective } from "./utility/clickDirective";

@NgModule({
  declarations: [BookCardComponent, OutsideClickDirective],
  imports: [
    CommonModule,
    RouterModule,

    FormsModule,

    NbInputModule,
    NbCardModule,
    NbUserModule,
    NbLayoutModule,
    NbTagModule,
    NbTabsetModule,
    NbSpinnerModule,
    NbRadioModule,
    NbCheckboxModule,
    NbDialogModule,
    NbSidebarModule,
    NbCheckboxModule,

    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,

    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
  ],

  exports: [
    BookCardComponent,

    FormsModule,
    OutsideClickDirective,
    NbInputModule,
    NbCardModule,
    NbLayoutModule,
    NbTagModule,
    NbTabsetModule,
    NbSpinnerModule,
    NbRadioModule,
    NbCheckboxModule,
    NbDialogModule,
    NbSidebarModule,
    NbCheckboxModule,
    NbUserModule,
    NbContextMenuModule,

    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,

    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
  ],
})
export class SharedModule {}
