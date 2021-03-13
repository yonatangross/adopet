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
  imageUrl: any;
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
  imageMessage = "";

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
      this.imageUrl = this.pet.primaryPicture;
      //console.log(this.pet);
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
    //console.log(pet);

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
  selectFile(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.imageMessage = "You must select an image";
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.imageMessage = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.imageMessage = "";
      this.imageUrl = reader.result;
    };
  }
  reloadPage(): void {
    window.location.reload();
  }
}
