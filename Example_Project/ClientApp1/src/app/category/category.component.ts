import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Category, CategoryService } from '../services/category-service.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations : [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CategoryComponent implements OnInit {

  _displayedColumns: string[] = ['title', 'delete', 'edit'];
  _categories : Category[] = [];
  _dataSource: any;

  constructor(private dataService: CategoryService,
    private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog,
     public titleService: Title) {
    this.titleService.setTitle('Category');
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
      .subscribe((data:any) => this.showResult(data));
  }

  showResult(data: any)
  {
     this._categories = data;
     this._dataSource = new MatTableDataSource(data);
     console.log(this._dataSource);
     this._dataSource.sort = this.sort;
  }

  remove(id:number)
  {
    console.log(id);
    this.dataService.Delete(id).subscribe(() => this.removeCategory(id));
  }

  removeCategory(cat_id: number): void {
    this._categories = this._categories.filter(({ id }) => id !== cat_id);        
  }

  onShowFormEdit(item: Category)
  {
     console.log("Selected Category: ");
     console.log(item);

    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '350px',
      data: {id: item.id, title: item.title},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result")
      console.log(result);
      this.dataService.Put(result.id,result);
    });
  }
  
  onShowForm()
  {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '350px',
      data: {id: 0, title: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataService.Post(result);
    });
  }
}
