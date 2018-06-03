import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {SuperHero} from '../interface/superhero';
import { PeopleService } from "../service/people.service";


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  superHero: SuperHero;
  sub:any;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
              private peopleService: PeopleService,
              private router: Router) { }

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.peopleService
        .get(id)
        .subscribe(
          success => this.superHero = success,
          error => this.errorMessage = error,
          () => this.isLoading = false
        );
    });
  }

  backToHome(){
    this.router.navigate(['/persons']);
  }

 

}
