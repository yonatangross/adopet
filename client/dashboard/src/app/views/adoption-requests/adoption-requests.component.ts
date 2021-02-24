import { AdoptionRequest } from "./../../models";
import { AdoptionRequestService } from "./../../services/adoption-request.service";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-adoption-requests",
  templateUrl: "./adoption-requests.component.html",
  styles: [],
})
export class AdoptionRequestsComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];
  currentAdoptionRequest?: AdoptionRequest;
  currentIndex = -1;
  title = "";
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private AdoptionRequestService: AdoptionRequestService) {}

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

    this.AdoptionRequestService.getAll(params).subscribe(
      (response) => {
        this.adoptionRequests = response.pets;
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
    this.currentAdoptionRequest = undefined;
    this.currentIndex = -1;
  }

  setActivePet(AdoptionRequest: AdoptionRequest, index: number): void {
    this.currentAdoptionRequest = AdoptionRequest;
    this.currentIndex = index;
  }
}
