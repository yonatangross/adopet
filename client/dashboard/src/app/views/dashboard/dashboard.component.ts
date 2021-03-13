import { TokenStorageService } from './../../services/token-storage.service';
import { SocketioService } from "./../../services/socketio.service";
import { pets } from "./../../../../../front/src/data";
import { AdoptionInfo } from "./../../models/adoptionInfo";
import { AdoptionRequest } from "./../../models/adoptionRequest";
import { Pet } from "./../../models/pet";
import { AdoptionInfoService } from "./../../services/adoption-info.service";
import { AdoptionRequestService } from "./../../services/adoption-request.service";
import { PetService } from "./../../services/pet.service";
import { Component, OnInit } from "@angular/core";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import * as _ from "lodash";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  pets: Pet[] = [];
  petsLoaded: Promise<boolean>;
  adoptionRequests: AdoptionRequest[] = [];
  adoptionInfos: AdoptionInfo[] = [];
  petGroups: number[] = [];
  constructor(
    private petService: PetService,
    private adoptionRequestService: AdoptionRequestService,
    private adoptionInfoService: AdoptionInfoService, // private SocketioService: SocketioService
    private tokenStorageService: TokenStorageService
  ) {}
  isOnline:boolean;
  ngOnInit(): void {
    this.isOnline=this.tokenStorageService.isOnline();
    const params = { title: "", page: 1, pageSize: 3 };
    this.petService.getAll(params).subscribe(
      (response) => {
        this.pets = response.pets;
        Promise.resolve(true);
      },
      (error) => {
        console.log(error);
      }
    );
    this.adoptionRequestService.getAll(params).subscribe(
      (response) => (this.adoptionRequests = response.adoptionRequests),
      (error) => {
        console.log(error);
      }
    );
    this.adoptionInfoService.getAll(params).subscribe(
      (response) => (this.adoptionInfos = response.adoptionsInfo),
      (error) => {
        console.log(error);
      }
    );
  }
  public logout():void{
    this.tokenStorageService.signOut();
  }

  private getPetsNumberByAnimalType = (pets: Pet[]): number[] => {
    const numberOfAnimalsByType: number[] = [0, 0];
    pets.forEach((pet) => {
      if (pet.animalType.toLowerCase() === "dog") numberOfAnimalsByType[0] += 1;
      else numberOfAnimalsByType[1] += 1;
    });
    console.log(numberOfAnimalsByType);

    return numberOfAnimalsByType;
  };

  radioModel: string = "Month";

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: this.getPetsNumberByAnimalType(this.pets),
      label: "Series A",
    },
  ];
  public lineChart1Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 40 - 5,
            max: 84 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle("--primary"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart1Legend = false;
  public lineChart1Type: Chart.ChartType = "line";

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "Series A",
    },
  ];
  public lineChart2Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 1 - 5,
            max: 34 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart2Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle("--info"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart2Legend = false;
  public lineChart2Type: Chart.ChartType = "line";

  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "Series A",
    },
  ];
  public lineChart3Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart3Legend = false;
  public lineChart3Type: Chart.ChartType = "line";

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: "Series A",
      barPercentage: 0.6,
    },
  ];
  public barChart1Labels: Array<any> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.3)",
      borderWidth: 0,
    },
  ];
  public barChart1Legend = false;
  public barChart1Type: Chart.ChartType = "bar";
}
