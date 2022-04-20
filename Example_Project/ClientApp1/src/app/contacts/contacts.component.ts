import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Category, CategoryService } from '../services/category-service.service';
import { Contact, ContactService } from '../services/contact-service.service';
import { Phone, PhoneService } from '../services/phone-service.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  
  displayedColumns: string[] = ['firstName', 'lastName', 'eMail' ,
    'address' , 'category', 'phones' ,
    'delete', 'edit'];
  _contacts: Contact[] = [];
  _categories: Category[] = [];
  _phones: Phone[] = [];
  _dataSource: any;

  _nameText: string;
  _phoneText: string;

  _nameChanged: Subject<string> = new Subject<string>();
  _phoneChanged: Subject<string> = new Subject<string>();

  _nameModelChangeSubscription: Subscription;
  _phoneModelChangeSubscription: Subscription;

  constructor(private dataService: ContactService,private _liveAnnouncer: LiveAnnouncer,private dataServiceCategory: CategoryService,
     private dataServicePhone: PhoneService,
     public dialog: MatDialog, public titleService: Title) {
    this.titleService.setTitle('Contacts');
  }

  @ViewChild(MatSort) sort: any;

  applyFilter(event: Event) : void{
    const filterValue = (event.target as HTMLInputElement).value;
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
      
      this.dataServiceCategory.Get()
      .subscribe((data:any) => 
      this._categories = data);
      
      this.dataServicePhone.Get()
      .subscribe((data:any) => 
      this._phones = data);

      // Debounce 1.5 sec
      this._nameModelChangeSubscription = this._nameChanged
      .pipe(
        debounceTime(1500),
        distinctUntilChanged()
      )
      .subscribe(newText => {
        if(newText == undefined || newText == '')
           return;

        this._nameText = newText;
        this.dataService.GetByName(this._nameText).subscribe((data: any) =>
                                                         this.showResult(data));
      });

       // Debounce 1.5 sec
      this._phoneModelChangeSubscription = this._phoneChanged
       .pipe(
         debounceTime(1500),
         distinctUntilChanged()
       )
       .subscribe(newText => {
         if(newText == undefined || newText == '')
            return;

            console.log(newText);
 
         this._phoneText = newText;
         this.dataService.GetByPhoneNumber(this._phoneText.replace('+','')).subscribe((data: any) =>
                                                          this.showResult(data));
       });
  }

  ngOnDestroy() {
    this._nameModelChangeSubscription.unsubscribe();
    this._phoneModelChangeSubscription.unsubscribe();
  }

  showResult(data: any)
  {
    if(data.lenght == 0)
     return;

     this._contacts = data;
     this._dataSource = new MatTableDataSource(data);
     this._dataSource.sort = this.sort;
  }

  remove(id:number)
  {
     this.dataService.Delete(id);
     this.removeItem(id);
  }

  removeItem(_id: number): void {
    this._contacts = this._contacts.filter(({ id }) => id !== _id);        
  }

  onShowFormEdit(item: Contact)
  {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '500px',
      data: {id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        eMail: item.eMail,
        address: item.address,
        birthday: item.birthday,
        category: item.category,
        categories: this._categories,
        phones: this._phones,
        selected_phones: item.phones},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.Put(result.id,result);
    });
  }
  
  onShowForm()
  {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '600px',
      data: {id: 0,
        firstName: '',
        lastName: '',
        eMail: '',
        address: '',
        birthday: '',
        category: { id: 0, title: '' },
        categories: this._categories,
        phones: this._phones,
        selected_phones: [] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      let obj = { firstName: result.firstName, lastName: result.lastName,
       eMail: result.eMail, birthday: result.birthday, address: result.address,
       category: result.category, phones: result.selected_phones
      }

      console.log(obj);

      this.dataService.Post(obj);
    });
  }

}
