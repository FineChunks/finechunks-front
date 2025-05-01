import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'finechunks-front';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.helloWorld().subscribe(data => {
      console.log(data);
    });
  }
}
