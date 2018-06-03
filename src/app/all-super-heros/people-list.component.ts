import { Component, OnInit } from '@angular/core';
import {SuperHero} from '../interface/superhero';
import { PeopleService } from "../service/people.service";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  allsuperHero: SuperHero[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private peopleService: PeopleService) { }

  ngOnInit(){
    this.peopleService
      .getAll()
      .subscribe(
       success => this.allsuperHero = success,
       error => this.errorMessage = error,
       () => this.isLoading = false);

        // console.log("first instance of people json array",this.people[0]);
  }

}
