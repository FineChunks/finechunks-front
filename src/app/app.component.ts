import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
=======
import { HttpService } from '@services/http.service';
import { HomeComponent } from './modules/home/home.component';
>>>>>>> 6d4d7eb (feat: basic home html)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'finechunks-front';
}
