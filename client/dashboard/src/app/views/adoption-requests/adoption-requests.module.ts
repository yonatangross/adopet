import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdoptionRequestsRoutingModule } from "./adoption-requests-routing.module";
import { AdoptionRequestsComponent } from "./adoption-requests.component";

@NgModule({
  declarations: [AdoptionRequestsComponent],
  imports: [CommonModule, AdoptionRequestsRoutingModule, RouterModule],
})
export class AdoptionRequestsModule {}
