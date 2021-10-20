import { Component, OnInit } from '@angular/core';

import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  persons: Person[] = [];

  constructor(public personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getAll().subscribe((data: Person[])=>{
      this.persons = data;
      // tslint:disable-next-line: no-console
      console.log(this.persons);
    })
  }

  deletePerson(id:any){
    this.personService.delete(id).subscribe(res => {
         this.persons = this.persons.filter(item => item.id !== id);
         // tslint:disable-next-line: no-console
         console.log('Person deleted successfully!');
    })
  }

}
