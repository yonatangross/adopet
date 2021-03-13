import { PetService } from "./../../services/pet.service";
import { AdoptionRequest } from "./../../models/adoptionRequest";
import { AdoptionRequestService } from "./../../services/adoption-request.service";
import { AdoptionInfoService } from "./../../services/adoption-info.service";
import { AdoptionInfo } from "./../../models/adoptionInfo";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styles: [],
})
export class CreateComponent implements OnInit {
  adoptionInfo: AdoptionInfo;

  adoptionRequestsGroups: { _id: string; data: AdoptionRequest[] }[];
  form: any = {
    pet: null,
    adoptionRequest: null,
    adoptionDate: null,
  };
  isSuccessful = false;
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private adoptionInfoService: AdoptionInfoService,
    private adoptionRequestService: AdoptionRequestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.adoptionRequestService.getAllGroups().subscribe(
      (response) => {
        this.adoptionRequestsGroups = response.adoptionRequestsGroups;
      },
      (error) => {
        console.log(`error occurred during getAllGroups func ${error}`);
      }
    );
  }

  retrieveAdoptionRequestsGroups(): void {
    this.adoptionRequestService.getAllGroups().subscribe(
      (response) => {
        this.adoptionRequestsGroups = response.adoptionRequestsGroups;
      },
      (error) => {
        console.log(`error occurred during getAllGroups func ${error}`);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  createAdoptionInfo(petId: string, adoptionRequest: AdoptionRequest) {
    let adoptionInfo = {
      petId: petId,
      adoptionRequestId: adoptionRequest._id,
      adoptionDate: new Date(),
    };

    this.adoptionInfoService.create(adoptionInfo).subscribe(
      (response) => {
        //("created adoption successfull!");
        this.refreshList();
      },
      (error) => {
        console.log("error while creating ");

        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveAdoptionRequestsGroups();
    window.location.reload();
  }
}
