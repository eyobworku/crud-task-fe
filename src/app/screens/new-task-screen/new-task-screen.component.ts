import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent {

  taskListId: string = '';
  constructor(
    private router: Router,
    private taskService: TaskService,
    private activatedRouter: ActivatedRoute
    ){
      this.activatedRouter.params.subscribe(
        (params: Params) => {
          this.taskListId = params['taskListId'];
        }
      );
    }

  ngOnInit(): void{
    
  }
  addNewTask(title: string){
    if(title){
      this.taskService.createTaskInsideATaskList(this.taskListId,title)
      .subscribe(()=>{
          this.router.navigate(['../'],{relativeTo: this.activatedRouter});
        }
      );
    }else{
      alert("Title cannot be empty!");
    }
  }
}
