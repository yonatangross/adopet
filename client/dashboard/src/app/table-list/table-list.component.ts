import { Component, OnInit } from '@angular/core';
import { getPets } from 'api/PetAPI';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  
  constructor(private http: HttpClientModule) { 
   
  }

  ngOnInit() {
  }

  
}



