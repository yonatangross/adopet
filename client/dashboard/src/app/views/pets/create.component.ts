import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../models';
import { PetService } from '../../services/pet.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
  ]
})


export class CreateComponent implements OnInit {
  pet: Pet;
  imageUrl: any;
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
  imageMessage = "";

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //this.getPet();
  }

  // getPet(): void {
  //   // const id: string = this.route.snapshot.paramMap.get("id");
  //   this.petService.get(id).subscribe((response) => {
  //     this.form = this.pet = response.pet;
  //     this.imageUrl = this.pet.primaryPicture;
  //     console.log(this.pet);
  //   });
  // }

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
      name,
      gender,
      breed,
      animalType,
      age,
      primaryPicture,
    } = this.form;

    let pet = new Pet();
    pet = {
      _id : pet._id,
      name : this.form.name,
      gender : this.form.gender,
      breed : this.form.breed,
      animalType : this.form.animalType,
      age : this.form.age,
      isAdopted : false,
      primaryPicture : "https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg",
    };
    console.log(pet);

    this.petService.create(pet).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
       
      }
    )

  }
  selectFile(event: any) {
   
    //Angular 11, for stricter type
    // if (!event.target.files[0] || event.target.files[0].length == 0) {
    //   this.imageMessage = "You must select an image";
    //   return;
    // }

    // var mimeType = event.target.files[0].type;

    // if (mimeType.match(/image\/*/) == null) {
    //   this.imageMessage = "Only images are supported";
    //   return;
    // }

    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);

    // reader.onload = (_event) => {
    //   this.imageMessage = "";
    //   this.imageUrl = reader.result;
    // };


  }
  reloadPage(): void {
    window.location.reload();
  }
}

