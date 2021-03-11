import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AdoptionsInfoComponent } from "./adoptions-info.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdoptionsInfoRoutingModule } from "./adoptions-info-routing.module";
import { CreateComponent } from "./create.component";
import { AdoptionInfoDetailsComponent } from './adoption-info-details.component';

@NgModule({
  declarations: [CreateComponent, AdoptionsInfoComponent, AdoptionInfoDetailsComponent],
  imports: [CommonModule, AdoptionsInfoRoutingModule, RouterModule,FormsModule],
})
export class AdoptionsInfoModule {}
