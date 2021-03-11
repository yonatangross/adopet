import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdoptionRequestsRoutingModule } from "./adoption-requests-routing.module";
import { AdoptionRequestsComponent } from "./adoption-requests.component";
import { AdoptionRequestDetailsComponent } from './adoption-request-details.component';

@NgModule({
  declarations: [AdoptionRequestsComponent, AdoptionRequestDetailsComponent],
  imports: [CommonModule, AdoptionRequestsRoutingModule, RouterModule],
})
export class AdoptionRequestsModule {}
