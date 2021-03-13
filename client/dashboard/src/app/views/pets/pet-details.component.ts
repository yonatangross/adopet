import { PetService } from "./../../services/pet.service";
import { Pet } from "./../../models/pet";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-pet-details",
  templateUrl: "./pet-details.component.html",
  styles: [],
})
export class PetDetailsComponent implements OnInit {
  pet: Pet;
  form: any = {
    _id: null,
    name: null,
    gender: null,
    breed: null,
    animalType: null,
    age: null,
    isAdopted: false,
    primaryPicture: null,
  };
  isSuccessful = false;
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPet();
  }

  getPet(): void {
    const id: string = this.route.snapshot.paramMap.get("id");
    this.petService.get(id).subscribe((response) => {
      this.form = this.pet = response.pet;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.petService
      .update(this.pet._id, this.pet)
      .subscribe(() => this.goBack());
  }

  onSubmit(): void {
    const {
      _id,
      name,
      gender,
      breed,
      animalType,
      age,
      isAdopted,
      primaryPicture,
    } = this.form;

    let pet = new Pet();
    pet = {
      _id,
      name,
      gender,
      breed,
      animalType,
      age,
      isAdopted,
      primaryPicture,
    };

    this.petService.update(_id, pet).subscribe(
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
