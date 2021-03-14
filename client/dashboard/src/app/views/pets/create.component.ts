import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pet } from "../../models";
import { PetService } from "../../services/pet.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styles: [],
})
export class CreateComponent implements OnInit {
  petCreationFailed = false;

  pet: Pet;
  form: any = {
    name: null,
    gender: null,
    breed: null,
    animalType: null,
    age: null,
    primaryPicture: null,
  };
  isSuccessful = false;
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.petService
      .update(this.pet._id, this.pet)
      .subscribe(() => this.goBack());
  }

  onSubmit(): void {
    const { name, gender, breed, age, primaryPicture } = this.form;
    let pet = new Pet();
    pet = {
      _id: pet._id,
      name: name,
      gender: gender,
      breed: breed,
      animalType: this.form.animalType,
      age: age,
      isAdopted: false,
      primaryPicture: primaryPicture,
    };

    //console.log(pet);

    this.petService.create(pet).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
  changeAnimalType(e) {
    this.form.animalType = e.target.value;
    console.log(this.form.animalType);
  }
  changeAnimalGender(e) {
    this.form.gender = e.target.value;
    console.log(this.form.gender);
  }
  reloadPage(): void {
    window.location.reload();
  }
}
