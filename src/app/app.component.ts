import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms'
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {
  title = 'Todo';
  myForm: any;
  todos: Todo;
  model = new Todo();
  chgid:number;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
}
getTodos() {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      })
  }

  addTodo() {
    if (!this.model.id){
    this.todoService.addTodo(this.model)
      .subscribe(todos => {
        this.model = todos;
        this.getTodos();
        this.clearModel();
      });
    }
    else {
      console.log('editTodo ' + this.model.id);
       this.todoService.updateTodo(this.model.id,this.model)
      .subscribe(todos => {
        this.model = todos;
        this.getTodos();
        this.clearModel();
      });
    }
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id)
      .subscribe(() => {
        this.getTodos();
      });
  }

  editTodo(id){
    console.log('updateTodo ' + id);
    this.todoService.getTodo(id)
        .subscribe(todo=>{
          this.model = todo;
        })
  }

 getTodo(id){
    this.todoService.getTodo(id)
        .subscribe(todo=>{
          this.model = todo;
        })
}

clearModel(){
 this.model.id=0;
 this.model.name="";
 this.model.status="";
 this.model.priority="";
 this.model.isCompleted="";
}
public isCompleted = [
    { value: 'false', display: 'False' },
    { value: 'true', display: 'True' }
   
];
}
