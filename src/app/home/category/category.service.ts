import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {


  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }









  private selectedCategory = new BehaviorSubject<string | null>(null);

  getSelectedCategory() {
    return this.selectedCategory.asObservable();
  }

  setSelectedCategory(category: string | null) {
    this.selectedCategory.next(category);
  }
}
