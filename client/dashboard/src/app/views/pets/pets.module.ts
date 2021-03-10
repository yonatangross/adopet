import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PetsRoutingModule } from "./pets-routing.module";
import { PetsComponent } from "./pets.component";
import { CreateComponent } from "./create.component";
import { PetDetailsComponent } from "./pet-details.component";

@NgModule({
  declarations: [PetsComponent, CreateComponent, PetDetailsComponent],
  imports: [CommonModule, PetsRoutingModule, RouterModule, FormsModule],
})
export class PetsModule {}
