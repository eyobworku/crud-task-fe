import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  // API call to backend
  getTaskLists(url: string){
    return this.httpClient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  getTasks(url: string){
    return this.httpClient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  post(url: string, data: Object){
    return this.httpClient.post(`${this.API_BASE_URL}/${url}`,data);
  }

  put(url: string, data: Object){
    return this.httpClient.put(`${this.API_BASE_URL}/${url}`,data);
  }

  patch(url: string, data: Object){
    return this.httpClient.patch<TaskModel>(`${this.API_BASE_URL}/${url}`,data);
  }

  delete(url: string){
    return this.httpClient.delete(`${this.API_BASE_URL}/${url}`);
  }
}
