import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: any = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  show(): void {
    this.setLoading(true);
  }

  hide(): void {
    this.setLoading(false);
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
