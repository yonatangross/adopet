import { AdoptionRequestService } from "./../../services/adoption-request.service";
import { AdoptionRequest } from "./../../models/adoptionRequest";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-adoption-request-details",
  templateUrl: "./adoption-request-details.component.html",
  styles: [],
})
export class AdoptionRequestDetailsComponent implements OnInit {
  adoptionRequest: AdoptionRequest;
  form: any = {
    _id: null,
    pet: null,
    fullName: null,
    email: null,
    phoneNumber: "+972-506543211",
    address: null,
    message: null,
  };
  isSuccessful = false;
  errorMessage = "";
  Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private adoptionRequestService: AdoptionRequestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAdoptionRequest();
  }

  getAdoptionRequest(): void {
    const id: string = this.route.snapshot.paramMap.get("id");
    this.adoptionRequestService.get(id).subscribe((response) => {
      this.form = this.adoptionRequest = response.adoptionRequest;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.adoptionRequestService
      .update(this.adoptionRequest._id, this.adoptionRequest)
      .subscribe(() => this.goBack());
  }

  onSubmit(): void {
    // console.log(`onSubmit:`);

    const {
      _id,
      pet,
      fullName,
      email,
      phoneNumber,
      createdAt,
      address,
      message,
    } = this.form;

    let adoptionRequest = new AdoptionRequest();
    adoptionRequest = {
      _id,
      pet,
      fullName,
      email,
      phoneNumber,
      address,
      message,
      createdAt,
    };

    this.adoptionRequestService.update(_id, adoptionRequest).subscribe(
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
