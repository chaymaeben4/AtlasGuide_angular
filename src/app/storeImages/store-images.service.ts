import {Injectable, OnInit} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
// Import the CloudinaryModule.
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StoreImagesService implements OnInit {


  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }


  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.post('http://localhost:3000/uploadFile', formParams)
  }
}
