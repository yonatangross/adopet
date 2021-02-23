import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PetsRoutingModule } from "./pets-routing.module";
import { PetsComponent } from "./pets.component";
import { CreateComponent } from "./create.component";
import { EditComponent } from "./edit.component";

@NgModule({
  declarations: [PetsComponent, CreateComponent, EditComponent],
  imports: [CommonModule, PetsRoutingModule],
})
export class PetsModule {}
