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

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.adoptionInfoService
      .update(this.adoptionInfo._id, this.adoptionInfo)
      .subscribe(() => this.goBack());
  }

  onSubmit(): void {
    const { pet, adoptionRequest, adoptionDate } = this.form;

    let adoptionInfo = new AdoptionInfo();
    adoptionInfo = {
      _id: adoptionInfo._id,
      pet: this.form.pet,
      adoptionRequest: this.form.adoptionRequest,
      adoptionDate: this.form.adoptionDate,
    };

    console.log(adoptionInfo);

    this.adoptionInfoService.create(adoptionInfo).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
