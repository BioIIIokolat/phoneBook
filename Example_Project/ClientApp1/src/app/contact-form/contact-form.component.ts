import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  
  formContact : FormGroup = new FormGroup({
		"firstName": new FormControl(this.data.firstName, [Validators.required, Validators.minLength(2),
       Validators.maxLength(30),
        Validators.pattern(('[-_a-zA-Z0-9]*'))]),
    "lastName":  new FormControl(this.data.lastName, [Validators.required, Validators.minLength(2),
      Validators.maxLength(30),
       Validators.pattern(('[-_a-zA-Z0-9]*'))]),
    "address":  new FormControl(this.data.address, [Validators.required, Validators.minLength(2),
      Validators.maxLength(30),
       Validators.pattern(('[-_a-zA-Z0-9]*'))]),
    "email":  new FormControl(this.data.eMail, [Validators.required, Validators.email]),
    "category":  new FormControl(this.data.category,
       [Validators.required]),
    "phones":  new FormControl(this.data.phones, [Validators.required]),
	});
  
  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    console.log(data);
		this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
              this.formContact.controls["firstName"].setValue(queryParam['firstName']);
              this.formContact.controls["lastName"].setValue(queryParam['lastName']);
              this.formContact.controls["address"].setValue(queryParam['address']);
              this.formContact.controls["email"].setValue(queryParam['email']);
              this.formContact.controls["category"].setValue(queryParam['category']);
              this.formContact.controls["phones"].setValue(queryParam['phones']);
            }
     );
  }

  ngOnInit(): void {
  }

  onCloseDialog(): void{
    this.dialogRef.close();
  }

  changePhones(e: any): void
  {
    console.log(e);
    this.data.selected_phones = e.value;
  }

  selectCategory(e: any): void
  {
    console.log(e);
    this.data.category = e.value;
  }
}
