import { AdoptionInfoService } from "./../../services/adoption-info.service";
import { AdoptionRequest } from "./../../models";
import { AdoptionRequestService } from "./../../services/adoption-request.service";
import { Component, OnInit } from "@angular/core";
import { PetService } from "./../../services/pet.service";
@Component({
  selector: "app-adoption-requests",
  templateUrl: "./adoption-requests.component.html",
  styles: [],
})
export class AdoptionRequestsComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];
  currentAdoptionRequest?: AdoptionRequest;
  currentIndex = -1;
  searchInput = "";
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(
    private adoptionRequestService: AdoptionRequestService,
    private adoptionInfoService: AdoptionInfoService,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.retrieveAdoptionRequests();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`searchInput`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAdoptionRequests(): void {
    const params = this.getRequestParams(
      this.searchInput,
      this.page,
      this.pageSize
    );

    this.adoptionRequestService.getAll(params).subscribe(
      (response) => {
        this.adoptionRequests = response.adoptionRequests;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAdoptionRequests();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAdoptionRequests();
  }

  refreshList(): void {
    this.retrieveAdoptionRequests();
    this.currentAdoptionRequest = undefined;
    this.currentIndex = -1;
  }

  setActiveAdoptionRequest(
    adoptionRequest: AdoptionRequest,
    index: number
  ): void {
    this.currentAdoptionRequest = adoptionRequest;
    this.currentIndex = index;
  }

  delete(adoptionRequest: AdoptionRequest): void {
    if (adoptionRequest.pet.isAdopted) {
      this.adoptionInfoService
        .getByPetId(adoptionRequest.pet._id)
        .subscribe((adoptionInfoResponse) => {
          //adoption is connected to this adoptionRequest
          const adoptionInfo = adoptionInfoResponse.adoptionInfo;
          if (!!adoptionInfo) {
            // console.log(`adoptionInfo:`);
            // console.log(adoptionInfo);
            // console.log(`adoptionRequest:`);
            // console.log(adoptionRequest);

            if (adoptionInfo.adoptionRequest._id !== adoptionRequest._id) {
              // not the same adopter
              this.adoptionRequestService
                .delete(adoptionRequest._id)
                .subscribe(() => {
                  this.refreshList();
                  
                  // console.log(`removed adoptionRequest ${adoptionRequest._id}`);
                });
            } else {
              // same adopt
              alert(
                "error while trying to delete this adoption request because its already adopted by this adopter."
              );
            }
          } else {
            // console.log("adoptionInfoResponse error");
          }
        });
    } else {
      //delete adoption request only.
      this.adoptionRequestService.delete(adoptionRequest._id).subscribe(() => {
        this.refreshList();
        // console.log(
        //   `removed adoptionRequest ${adoptionRequest._id} of pet that is waiting for adoption.`
        // );
      });
    }
  }

  searchTitle(): void {
    this.currentAdoptionRequest = undefined;
    this.currentIndex = -1;

    this.refreshList();
  }
}
