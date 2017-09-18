import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class TodoService {

  constructor( private http:Http) { }
  getTodos(){
    return this.http.get("http://localhost:8080/todolist")
        .map(res => res.json());
  }
   addTodo(info){
    return this.http.post("http://localhost:8080/todolist",info)
        .map(res => res.json());
  }
  getTodo(id){
    return this.http.get("http://localhost:8080/todolist/"+id)
        .map(res => res.json());
  }
  deleteTodo(id){
    return this.http.delete("http://localhost:8080/todolist/"+id)
        //.map(res => res.json());
  }
  updateTodo(id, info){
    return this.http.put("http://localhost:8080/todolist/"+id,info)
        .map(res => res.json());
  }
}