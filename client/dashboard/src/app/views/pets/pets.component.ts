import { Pet } from "./../../models/pet";
import { PetService } from "./../../services/pet.service";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-pets",
  templateUrl: "./pets.component.html",
  styleUrls: [],
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];
  currentPet?: Pet;
  currentIndex = -1;
  title = " ";
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private PetService: PetService) {}

  ngOnInit(): void {
    this.retrievePets();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievePets(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.PetService.getAll(params).subscribe(
      (response) => {
        this.pets = response.pets;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePets();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePets();
  }

  refreshList(): void {
    this.retrievePets();
    this.currentPet = undefined;
    this.currentIndex = -1;
  }

  setActivePet(Pet: Pet, index: number): void {
    this.currentPet = Pet;
    this.currentIndex = index;
  }
}
