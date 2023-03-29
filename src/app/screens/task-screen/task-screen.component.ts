import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import TaskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] =[];
  tasks: TaskModel[]=[];
  taskListId: string='';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.taskService.getAllTaskLists().
    subscribe(alTaskList => {this.taskLists = alTaskList;
    //this.router.navigate(['task-list',this.taskLists[0]['_id']]);
  });
    
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.taskListId = params['taskListId'];
        if(this.taskListId){
          this.taskService.getAllTaskForATaskList(this.taskListId).subscribe(
            (tasks: TaskModel[]) => this.tasks = tasks
          );
        }
      }
    )
  }

  taskClicked(task: TaskModel){
    this.taskService.updateTaskStatus(this.taskListId,task)
    .subscribe(() => task.completed = !task.completed);
  }
}
