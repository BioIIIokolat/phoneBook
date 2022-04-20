import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Phone } from '../services/phone-service.service';

import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.css']
})
export class PhoneFormComponent implements OnInit {

  error: boolean = false;

  formPhone : FormGroup = new FormGroup({
		"phoneNumber": new FormControl(this.data.phoneNumber, [Validators.required]),
		"country": new FormControl(this.data.country, [Validators.required]),
		"provider": new FormControl(this.data.provider, [Validators.required])
	});
  
  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<PhoneFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Phone)
  {
		this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
              this.formPhone.controls["phoneNumber"].setValue(queryParam['phoneNumber']);
              this.formPhone.controls["country"].setValue(queryParam['country']);
              this.formPhone.controls["provider"].setValue(queryParam['provider']);
            }
     );
  }

          hasError(e: any)
          {
            console.log(e);
            this.error = e;
          }

          getNumber(e: any)
          {
            console.log('GetNumber:');
            console.log(e);
            this.data.phoneNumber = e;
          }

          onCountryChange(e: any)
          {
            this.data.country = e.name;
          }
          
  ngOnInit(): void {
  }

  onCloseDialog(): void{
    this.dialogRef.close();
  }
}
