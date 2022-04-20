import { Component,ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  list : any;

  constructor(private el: ElementRef) {
   this.list = this.el.nativeElement.querySelectorAll('.list');
  }

  ngOnInit(): void {
      this.list.forEach((item :any) =>
      item.addEventListener('click', this.activeLink)); 
  }

  activeLink()
  {
    this.list.forEach((item :any) => 
    item.classList.remove('active'));
    this.list.classList.add('active');
  }
}
