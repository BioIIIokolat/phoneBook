import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements IRequests {
  constructor(public http: HttpClient) {
  }

    Get(): any {
       return this.http.get<Category[]>('api/categories');
    }

    Post(item: Category) : any {
      const body = { title: item.title };
      this.http.post<Category>('api/categories', body).subscribe({
        next: data => {
            console.log(data);
        },
        error: error => {
            console.error('There was an error!', error);
        }
      });
    }

    Delete(id: number) : any {
      this.http.delete('api/categories/' + id).subscribe({
        next: data => {
            console.log("Delete Successfull!");
        },
        error: error => {
            console.error('There was an error!', error);
        }
      });
    }

    Put(id: number, item: any): void {
      const body = {id: item.id, title: item.title };
      this.http.put<Category>('api/categories/' + id, body)
          .subscribe(data => console.log(data));
    }
}

export interface IRequests {
  Get() :any[];
  Post(item: any): any;
  Delete(id: number): any;
  Put(id: number, item: any): void;
}

export interface Category {
  id: number;
  title: string;
}
