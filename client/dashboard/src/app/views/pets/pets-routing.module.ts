import { PetDetailsComponent } from "./pet-details.component";
import { PetsComponent } from "./pets.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create.component";

const routes: Routes = [
  {
    path: "",
    component: PetsComponent,
  },
  { path: "create", component: CreateComponent },
  { path: ":id", component: PetDetailsComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" },
  //todo: add redirect to notfound page.
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}