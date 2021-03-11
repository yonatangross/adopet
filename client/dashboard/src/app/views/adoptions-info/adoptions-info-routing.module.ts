import { AdoptionInfoDetailsComponent } from "./adoption-info-details.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create.component";
import { AdoptionsInfoComponent } from "./adoptions-info.component";

const routes: Routes = [
  {
    path: "",
    component: AdoptionsInfoComponent,
  },
  { path: "create", component: CreateComponent },
  { path: ":id", component: AdoptionInfoDetailsComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionsInfoRoutingModule {}
