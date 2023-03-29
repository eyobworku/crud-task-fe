import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  //to fetch all task list
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists('tasklists');
  }

  getAllTasks(taskListId: string): Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  }

  createTaskList(title: string){
    let data = {'title':title};
    this.apiConfigService.post('tasklists', data);
  }

  getAllTaskForATaskList(taskListId: string){
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  createTaskInsideATaskList(taskListId: string,title: string){
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`,{title});
  }

  deleteTaskList(taskListId:string){
    return this.apiConfigService.delete(`tasklists/${taskListId}`);
  }

  deleteATaskInsideATaskList(taskListId:string,taskId:string){
    return this.apiConfigService.delete(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId:string,taskObject:TaskModel): Observable<TaskModel>{
    let updateData = {'completed':!taskObject.completed};
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`,updateData);
  }
}
