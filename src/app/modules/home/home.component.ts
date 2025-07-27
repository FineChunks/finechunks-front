import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/common/token.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected isConnected = false;

  constructor(private readonly tokenService: TokenService) {}

  ngOnInit(): void {
    this.isConnected = this.tokenService.hasToken();
  }
}
