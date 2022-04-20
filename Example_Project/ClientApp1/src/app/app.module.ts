import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoryService } from './services/category-service.service';
import { ContactService } from './services/contact-service.service';
import { PhoneService } from './services/phone-service.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PhonesComponent } from './phones/phones.component';
import { CategoryComponent } from './category/category.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select';
import { SearchContactsComponent } from './search-contacts/search-contacts.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    CategoryComponent,
    ContactsComponent,
    HomeComponent,
    CounterComponent,
    HeaderComponent,
    FetchDataComponent,
    PhonesComponent,
    CategoryFormComponent,
    PhoneFormComponent,
    ContactFormComponent,
    SearchContactsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'category', component:  CategoryComponent, pathMatch: 'full'},
      { path: 'contacts', component:  ContactsComponent, pathMatch: 'full'},
      { path: 'phones', component:  PhonesComponent, pathMatch: 'full'},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule,
    NgbModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [CategoryService, ContactService, PhoneService, Title],
  bootstrap: [AppComponent],
  exports: [
    MatTableModule,
    MatListModule,
    MatIconModule,
  ]
})
export class AppModule { }
