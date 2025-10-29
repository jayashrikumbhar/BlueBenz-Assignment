import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './common-component/header/header';
import { ToastContainerComponent } from './common-component/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
