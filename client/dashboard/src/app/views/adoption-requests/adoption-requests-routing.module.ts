import { AdoptionRequestDetailsComponent } from "./adoption-request-details.component";
import { AdoptionRequestsComponent } from "./adoption-requests.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdoptionRequestsComponent,
  },
  { path: ":id", component: AdoptionRequestDetailsComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionRequestsRoutingModule {}
