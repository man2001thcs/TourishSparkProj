import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
      console.log("init");
  }
}
