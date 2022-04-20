import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../services/category-service.service';

import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  formCat : FormGroup = new FormGroup({
		"title": new FormControl(this.data.title, [Validators.required, Validators.minLength(2),
       Validators.maxLength(30) ])
	});
  
  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category)
  {
		this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
              this.formCat.controls["title"].setValue(queryParam['title']);
            }
     );
  }

  ngOnInit(): void {
  }

  onCloseDialog(): void{
    this.dialogRef.close();
  }
}
