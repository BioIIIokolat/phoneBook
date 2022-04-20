import { Component, OnInit, ViewChild } from '@angular/core';
import { Phone, PhoneService } from '../services/phone-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PhoneFormComponent } from '../phone-form/phone-form.component';
import { Title } from '@angular/platform-browser';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {

  displayedColumns: string[] = ['phoneNumber', 'country', 'provider' , 'delete', 'edit'];
  _phones : Phone[] = [];
  _dataSource: any;

  constructor(private dataService: PhoneService, public titleService: Title, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {
    this.titleService.setTitle('Phones');
  }

  @ViewChild(MatSort) sort: any;

  applyFilter(event: Event) : void{
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this._dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
      this.dataService.Get()
      .subscribe((data:any) => 
      this.showResult(data));
  }

  
  showResult(data: any)
  {
     this._phones = data;
     this._dataSource = new MatTableDataSource(data);
     console.log(this._dataSource);
     this._dataSource.sort = this.sort;
  }

  remove(id:number)
  {
     console.log(id);
     this.dataService.Delete(id);
     this.removeCategory(id);
  }

  removeCategory(cat_id: number): void {
    this._phones = this._phones.filter(({ id }) => id !== cat_id);        
  }

  onShowFormEdit(item: Phone)
  {
     console.log("Selected Category: ");
     console.log(item);

    const dialogRef = this.dialog.open(PhoneFormComponent, {
      width: '500px',
      data: {id: item.id, phoneNumber: item.phoneNumber, country: item.country, provider: item.provider},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result")
      console.log(result);

      this.dataService.Put(result.id,result);
    });
  }
  
  onShowForm()
  {
    const dialogRef = this.dialog.open(PhoneFormComponent, {
      width: '500px',
      data: {id: 0, phoneNumber: '', country: 'Ukraine', provider: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined)
         return;
      console.log('The dialog was closed');
      console.log(result);
      this.dataService.Post(result);
    });
  }

}
