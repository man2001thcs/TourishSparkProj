import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { OutsideClickDirective } from "./utility/clickDirective";
import { FooterComponent } from "./utility/footer/footer.component";
import {MatStepperModule} from '@angular/material/stepper';
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { ValidationComponent } from "./utility/validation/validation.component";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    FooterComponent,
    OutsideClickDirective,
    
    ValidationComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
  ],

  exports: [
    FooterComponent,
    NgbAlertModule,
    MatStepperModule,
    FormsModule,
    OutsideClickDirective,
    ValidationComponent
  ],
})
export class SharedModule {}
