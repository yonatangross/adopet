import { AdoptionRequestsComponent } from "./adoption-requests.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "../pets/create.component";

const routes: Routes = [
  {
    path: "",
    component: AdoptionRequestsComponent,
    children: [
      { path: "create", component: CreateComponent },

      // otherwise redirect to home
      { path: "**", redirectTo: "" },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionRequestsRoutingModule {}
