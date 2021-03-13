import { AdoptionInfoService } from "./../../services/adoption-info.service";
import { AdoptionInfo } from "./../../models/adoptionInfo";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-adoption-info-details",
  templateUrl: "./adoption-info-details.component.html",
  styles: [],
})
export class AdoptionInfoDetailsComponent implements OnInit {
  adoptionInfo: AdoptionInfo;
  form: any = {
    _id: null,
    pet: null,
    adoptionRequest: null,
    adoptionDate: null,
  };
  isSuccessful = false;
  errorMessage = "";
  Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private adoptionInfoService: AdoptionInfoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAdoptionInfo();
  }

  getAdoptionInfo(): void {
    const id: string = this.route.snapshot.paramMap.get("id");
    this.adoptionInfoService.get(id).subscribe((response) => {
      this.form = this.adoptionInfo = response.adoptionInfo;
      this.form.adoptionDate = this.adoptionInfo.adoptionDate;
      // console.log(this.adoptionInfo.adoptionDate);
      // console.log(this.adoptionInfo);
    });
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
    const { _id, pet, adoptionRequest, adoptionDate } = this.form;

    let adoptionInfo = new AdoptionInfo();
    adoptionInfo = {
      _id,
      pet,
      adoptionRequest,
      adoptionDate,
    };
    //console.log(adoptionInfo);

    this.adoptionInfoService.update(_id, adoptionInfo).subscribe(
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
