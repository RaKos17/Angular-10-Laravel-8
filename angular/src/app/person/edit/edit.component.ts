import { Component, OnInit } from '@angular/core';

import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Person } from '../person';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any;
  person!: Person;
  form!: FormGroup ;

  constructor(
    public personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // tslint:disable-next-line: no-string-literal
    this.id = this.route.snapshot.params['idPerson'];
    this.personService.find(this.id).subscribe((data: Person)=>{
      this.person = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    // tslint:disable-next-line: no-console
    console.log(this.form.value);
    this.personService.update(this.id, this.form.value).subscribe(res => {
         // tslint:disable-next-line: no-console
         console.log('Person updated successfully!');
         this.router.navigateByUrl('person/index');
    })
  }



}
