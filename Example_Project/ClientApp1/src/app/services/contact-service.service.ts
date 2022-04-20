import { Injectable } from '@angular/core';
import { Category, IRequests } from './category-service.service';
import { HttpClient } from '@angular/common/http';
import { Phone } from './phone-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements IRequests {
  constructor(public http: HttpClient) {
  }

  Get(): any {
    return this.http.get<Contact[]>('api/contacts');
  }

  GetByName(name: string)
  {
    return this.http.get<Contact[]>('api/Contacts/name/' + name)
  }

  GetByPhoneNumber(phone: string)
  {
    return this.http.get<Contact[]>('api/Contacts/phone/' + phone);
  }

  Post(item: any) {
    const body = { firstName: item.firstName,
      lastName: item.lastName,
      eMail: item.eMail,
      address: item.address,
      category: item.category,
      phones: item.phones };
    
      console.log(body);

    this.http.post<Contact>('api/contacts', body).subscribe({
      next: data => {
          console.log(data);
      },
      error: error => {
          console.error('There was an error!', error.error);
      }
    });
  }

  Delete(id: number) { 
    console.log(id);
    this.http.delete('api/contacts/' + id).subscribe({
      next: data => {
          console.log("Delete Successfull!");
      },
      error: error => {
          console.error('There was an error!', error.error);
      }
    });
  }

  Put(id: number, item: any): void {
    const body = { id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      eMail: item.eMail,
      address: item.address,
      birthday: item.birthday,
      category: item.category,
      phones: item.phones  };

      console.log(body);

    this.http.put<Contact>('api/contacts/' + id, body)
        .subscribe(data => console.log(data));
  }
}

export interface Contact
{
  id: number;
  firstName: string;
  lastName: string;
  eMail: string;
  address: string;
  birthday: Date;
  category: Category;
  phones: Phone[];
}