import { Component, OnInit } from '@angular/core';
import { getPets } from 'api/PetAPI';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //petsArray = getPets();

}
