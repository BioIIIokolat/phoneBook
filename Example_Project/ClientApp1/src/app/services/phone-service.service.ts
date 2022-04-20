import { Injectable } from '@angular/core';
import { IRequests } from './category-service.service';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhoneService implements IRequests {

  constructor(public http: HttpClient) {
  }

  Get(): any {
    return this.http.get<Phone[]>('api/phones');
  }

  Post(item: any) {
    const body = { phoneNumber: item.phoneNumber, country: item.country, provider: item.provider };
    this.http.post<Phone>('api/phones', body).subscribe({
      next: data => {
          console.log(data);
      },
      error: error => {
          console.error('There was an error!', error);
      }
    });
  }

  Delete(id: number) {
    this.http.delete('api/phones/' + id).subscribe({
      next: data => {
          console.log("Delete Successfull!");
      },
      error: error => {
          console.error('There was an error!', error);
      }
    });
  }

  Put(id: number, item: any): void {
    const body = { id: item.id, phoneNumber: item.phoneNumber,
                   country: item.country, provider: item.provider };

    this.http.put<Phone>('api/phones/' + id, body)
        .subscribe(data => console.log(data));
  }
}

export interface Phone
{
  id: number;
  phoneNumber: string;
  country: string;
  provider: string;
}
