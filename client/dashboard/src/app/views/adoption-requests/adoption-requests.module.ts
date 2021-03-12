import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdoptionRequestsRoutingModule } from "./adoption-requests-routing.module";
import { AdoptionRequestsComponent } from "./adoption-requests.component";
import { AdoptionRequestDetailsComponent } from "./adoption-request-details.component";

@NgModule({
  declarations: [AdoptionRequestsComponent, AdoptionRequestDetailsComponent],
  imports: [
    CommonModule,
    AdoptionRequestsRoutingModule,
    FormsModule,
    RouterModule,
  ],
})
export class AdoptionRequestsModule {}
