import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSignal = signal<Toast[]>([]);

  readonly toasts = this.toastsSignal.asReadonly();

  show(message: string, type: ToastType = 'info', durationMs = 3000): string {
    const id = crypto.randomUUID();
    const toast: Toast = { id, message, type, durationMs };
    this.toastsSignal.update(list => [...list, toast]);
    if (durationMs > 0) {
      setTimeout(() => this.dismiss(id), durationMs);
    }
    return id;
  }

  success(message: string, durationMs = 3000) { 
    this.show(message, 'success', durationMs); 
  }

  error(message: string, durationMs = 3000) { 
    this.show(message, 'error', durationMs); 
  }

  info(message: string, durationMs = 3000) { 
    this.show(message, 'info', durationMs); 
  }

  warning(message: string, durationMs = 3000) { 
    this.show(message, 'warning', durationMs); 
  }

  dismiss(id: string) {
    this.toastsSignal.update(list => list.filter(t => t.id !== id));
  }

  clear() {
    this.toastsSignal.set([]);
  }
}


