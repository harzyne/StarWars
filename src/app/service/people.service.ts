import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwIfEmpty } from 'rxjs/operators';
import {SuperHero} from '../interface/superhero';

@Injectable()
export class PeopleService{
  private swURL: string = 'https://swapi.co/api';
  //https://swapi.co/api/
  constructor(private http : Http){
  }

  getAll(): Observable<SuperHero[]>{
    let allsuperHero$ = this.http
      .get(`${this.swURL}/people`)
      .pipe(map(mapPersons))
      .pipe(catchError(handleError));
      return allsuperHero$;
  }

  get(id: number): Observable<SuperHero> {
    //https://swapi.co/api/people/1/
    let superHero$ = this.http
      .get(`${this.swURL}/people/${id}`)
      .pipe(map(mapPerson))
      .pipe(catchError(handleError));
      return superHero$;
  }

}


function mapPersons(response:Response): SuperHero[]{
  return response.json().results.map(toPerson)
}

function mapPerson(response:Response): SuperHero{
  return toPerson(response.json());
}

function toPerson(r:any): SuperHero{
  let superHero = <SuperHero>({
    id: extractId(r),
    url: r.url,
    name: r.name,
    weight: Number.parseInt(r.mass),
    height: Number.parseInt(r.height),
    hair_color: r.hair_color,
	  skin_color: r.skin_color,
	  eye_color: r.eye_color,
    birth_year: r.birth_year,
    gender:r.gender
  });
  return superHero;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
  //.replace( /^\D+/g, '');
  let extractedId = personData.url.replace( /^\D+/g, '');
  //let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}



// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

