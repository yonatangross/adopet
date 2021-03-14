import { TokenStorageService } from "./../../services/token-storage.service";
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
  adoptionRequestsLoaded: Promise<boolean>;
  adoptionsInfoLoaded: Promise<boolean>;

  adoptionRequests: AdoptionRequest[] = [];
  adoptionInfos: AdoptionInfo[] = [];
  petGroups: number[] = [];
  constructor(
    private petService: PetService,
    private adoptionRequestService: AdoptionRequestService,
    private adoptionInfoService: AdoptionInfoService,
    private tokenStorageService: TokenStorageService
  ) {}
  isOnline: boolean;
  ngOnInit(): void {
    this.isOnline = this.tokenStorageService.isOnline;

    const params = { title: "", page: 1, pageSize: 3 };
    this.petService.getAll(params).subscribe(
      (response) => {
        this.pets = response.pets;

        this.lineChart1Data = [
          {
            data: this.getPetsNumberByAge(this.pets),
          },
        ];

        this.barChart1Data = [
          {
            data: this.getPetsNumberByAnimalType(this.pets),
            barPercentage: 0.6,
          },
        ];
        this.petsLoaded = Promise.resolve(true);
      },
      (error) => {
        console.log(error);
      }
    );
    this.adoptionRequestService.getAll(params).subscribe(
      (response) => {
        this.adoptionRequests = response.adoptionRequests;
        this.lineChart3Data = [
          {
            data: this.getAdoptionRequestsByMonth(this.adoptionRequests),
          },
        ];
        this.adoptionRequestsLoaded = Promise.resolve(true);
      },
      (error) => {
        console.log(error);
      }
    );
    this.adoptionInfoService.getAll(params).subscribe(
      (response) => {
        this.adoptionInfos = response.adoptionsInfo;
        this.lineChart2Data = [
          {
            data: this.getAdoptionsByMonth(this.adoptionInfos),
          },
        ];
        this.adoptionsInfoLoaded = Promise.resolve(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public logout(): void {
    this.tokenStorageService.signOut();
    this.isOnline = this.tokenStorageService.isOnline = false;
  }

  private getPetsNumberByAnimalType = (pets: Pet[]): number[] => {
    const numberOfAnimalsByType: any[] = [0, 0];
    pets.forEach((pet) => {
      if (pet.animalType.toLowerCase() === "dog") numberOfAnimalsByType[0] += 1;
      else  numberOfAnimalsByType[1] += 1;
    });
    // console.log(numberOfAnimalsByType);

    return numberOfAnimalsByType;
  };

  private getPetsNumberByAge = (pets: Pet[]): number[] => {
    const numberOfAnimalsByAge: number[] = [0, 0, 0, 0];
    pets.forEach((pet) => {
      if (pet.age <= 1) numberOfAnimalsByAge[0] += 1;
      else if (pet.age <= 2) numberOfAnimalsByAge[1] += 1;
      else if (pet.age <= 12) numberOfAnimalsByAge[2] += 1;
      else numberOfAnimalsByAge[3] += 1;
    });
    // console.log(numberOfAnimalsByAge);

    return numberOfAnimalsByAge;
  };

  private getAdoptionsByMonth = (adoptionsInfo: AdoptionInfo[]): number[] => {
    const numberOfAdoptionsByMonth: number[] = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];

    adoptionsInfo.forEach((adoptionInfo) => {
      const date: Date = new Date(adoptionInfo.adoptionDate);
      const month = date.getMonth();
      numberOfAdoptionsByMonth[month]++;
    });

    return numberOfAdoptionsByMonth;
  };

  private getAdoptionRequestsByMonth = (
    adoptionRequests: AdoptionRequest[]
  ): number[] => {
    const numberOfAdoptionRequestsByMonth: number[] = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];

    adoptionRequests.forEach((adoptionRequest) => {
      const date: Date = new Date(adoptionRequest.createdAt);
      const month = date.getMonth();
      numberOfAdoptionRequestsByMonth[month]++;
    });

    return numberOfAdoptionRequestsByMonth;
  };

  radioModel: string = "Month";

  // lineChart1
  public lineChart1Data: Array<any>;
  public lineChart1Labels: Array<any> = ["Puppy", "Young", "Adult", "Senior"];
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
  public lineChart2Data: Array<any>;
  public lineChart2Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
        radius: 3,
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
  public lineChart3Data: Array<any>;
  public lineChart3Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
  public barChart1Data: Array<any>;
  public barChart1Labels: Array<any> = ["Dog", "Cat"];
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
