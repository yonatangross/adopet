import { AdoptionsInfoComponent } from "./adoptions-info.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdoptionsInfoRoutingModule } from "./adoptions-info-routing.module";
import { CreateComponent } from "./create.component";
import { EditComponent } from "./edit.component";

@NgModule({
  declarations: [CreateComponent, EditComponent, AdoptionsInfoComponent],
  imports: [CommonModule, AdoptionsInfoRoutingModule],
})
export class AdoptionsInfoModule {}
