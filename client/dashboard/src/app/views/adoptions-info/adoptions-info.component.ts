
import { AdoptionInfo } from "./../../models/adoptionInfo";
import { AdoptionInfoService } from "./../../services/adoption-info.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-adoptions-info',
  templateUrl: './adoptions-info.component.html',
  styles: [
  ]
})
export class AdoptionsInfoComponent implements OnInit {

  AdoptionsInfo: AdoptionInfo[] = [];
  currentAdoptionInfo?: AdoptionInfo;
  currentIndex = -1;
  title = "";

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private AdoptionInfoService: AdoptionInfoService) {}

  ngOnInit(): void {
    this.retrieveAdoptionsInfo();
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

  retrieveAdoptionsInfo(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.AdoptionInfoService.getAll(params).subscribe(
      (response) => {
        this.AdoptionsInfo = response.AdoptionsInfo;
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

  setActivePet(AdoptionInfo: AdoptionInfo, index: number): void {
    this.currentAdoptionInfo = AdoptionInfo;
    this.currentIndex = index;
  }
}
