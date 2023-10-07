import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import {
  NbContextMenuModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbThemeModule,
  NbUserModule,
} from "@nebular/theme";

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
import { FooterComponent } from "./utility/footer/footer.component";

@NgModule({
  declarations: [
    FooterComponent,
    OutsideClickDirective,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],

  exports: [
    FooterComponent,

    FormsModule,
    OutsideClickDirective,
  ],
})
export class SharedModule {}
