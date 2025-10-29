import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  dismiss(id: string) {
    this.toastService.dismiss(id);
  }
}


