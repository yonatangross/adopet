import { AdoptionRequestsComponent } from "./adoption-requests.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdoptionRequestsComponent,
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionRequestsRoutingModule {}
