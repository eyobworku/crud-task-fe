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

  createTaskList(title: string): Observable<TaskListModel>{
    let data = {'title':title};
    return this.apiConfigService.postTaskList('tasklists', data);
  }

  getAllTaskForATaskList(taskListId: string){
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  createTaskInsideATaskList(taskListId: string,title: string){
    return this.apiConfigService.postTask(`tasklists/${taskListId}/tasks`,{title});
  }

  deleteTaskList(taskListId:string): Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  deleteATaskInsideATaskList(taskListId:string,taskId:string): Observable<TaskModel>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId:string,taskObject:TaskModel): Observable<TaskModel>{
    let updateData = {'completed':!taskObject.completed};
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`,updateData);
  }
}
