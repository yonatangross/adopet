import { PetsComponent } from "./pets.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./create.component";
import { EditComponent } from "./edit.component";

const routes: Routes = [
  {
    path: "",
    component: PetsComponent,
    children: [
      { path: "create", component: CreateComponent },
      { path: "edit", component: EditComponent },

      // otherwise redirect to home
      { path: "**", redirectTo: "" },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
