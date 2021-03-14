import { AdoptionInfo } from "./../../models/adoptionInfo";
import { AdoptionInfoService } from "./../../services/adoption-info.service";
import { Component, OnInit } from "@angular/core";
import { PetService } from "./../../services/pet.service";
import { AdoptionRequestService } from "./../../services/adoption-request.service";

@Component({
  selector: "app-adoptions-info",
  templateUrl: "./adoptions-info.component.html",
  styles: [],
})
export class AdoptionsInfoComponent implements OnInit {
  adoptionsInfo: AdoptionInfo[] = [];
  currentAdoptionInfo?: AdoptionInfo;
  currentIndex = -1;
  searchInput = "";
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [5, 10, 15];

  constructor(
    private adoptionInfoService: AdoptionInfoService,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.retrieveAdoptionsInfo();
  }

  getRequestParams(searchInput: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    params[`searchInput`] = searchInput;

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAdoptionsInfo(): void {
    const params = this.getRequestParams(
      this.searchInput,
      this.page,
      this.pageSize
    );

    this.adoptionInfoService.getAll(params).subscribe(
      (response) => {
        this.adoptionsInfo = response.adoptionsInfo;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAdoptionsInfo();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAdoptionsInfo();
  }

  refreshList(): void {
    this.retrieveAdoptionsInfo();
    this.currentAdoptionInfo = undefined;
    this.currentIndex = -1;
  }

  setActiveAdoptionInfo(AdoptionInfo: AdoptionInfo, index: number): void {
    this.currentAdoptionInfo = AdoptionInfo;
    this.currentIndex = index;
  }

  delete(adoptionInfo: AdoptionInfo): void {
    if (adoptionInfo.pet.isAdopted) {
      this.petService
        .update(adoptionInfo.pet._id, { isAdopted: false })
        .subscribe(() => {
          this.adoptionInfoService.delete(adoptionInfo._id).subscribe(
            () => {
              this.refreshList();
            },
            (error) => {
              console.log(error);
            }
          );
        }),
        (error) => {
          console.log(error);
        };
    } else {
      console.log(
        "error while trying to delete adoptionInfo, pet is not adopted."
      );
    }
  }

  searchTitle(): void {
    this.currentAdoptionInfo = undefined;
    this.currentIndex = -1;

    this.refreshList();
  }
}
