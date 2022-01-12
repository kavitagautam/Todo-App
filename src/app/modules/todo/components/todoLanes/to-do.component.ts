import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoInterface } from '../../interface/todo.model';
import { LocalStorageService } from '../../services/localStorage-service/local-storage.service';
import { TodoService } from '../../services/todo-service/todo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  text: string = '';
  // todoList: Observable<TodoInterface[]>;
  todoList: any = [];
  progressList: any = [];
  doneList: any = [];
  input: string = '';
  task: FormControl = new FormControl();

  constructor(
    private todoService: TodoService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.task.valueChanges.subscribe((value: string) => {
      this.input = value;
    });

    this.todoList = localStorage.getItem('todoLists')
      ? localStorage.getItem('todoLists').split(',')
      : [];

    this.progressList = localStorage.getItem('progressLists')
      ? localStorage.getItem('progressLists').split(',')
      : [];

    this.doneList = localStorage.getItem('doneLists')
      ? localStorage.getItem('doneLists').split(',')
      : [];

    // this.todoList = this.todoService.todos$.pipe((todos) => {
    //   console.log(todos);
    //   return todos;
    // });
  }

  // changeText(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.text = target.value;
  //   console.log(target.value);
  // }

  addTodo(): void {
    // this.todoService.addTodos(this.text);
    this.todoList.push(this.input);
    console.log(this.todoList);
    localStorage.setItem('todoLists', this.todoList);
    this.task.setValue(null);
    return;
  }

  addInProgress(): void {
    // this.todoService.addTodos(this.text);
    this.progressList.push(this.input);
    console.log(this.progressList);
    localStorage.setItem('progressLists', this.progressList);
    this.task.setValue(null);
    return;
  }

  addDone(): void {
    // this.todoService.addTodos(this.text);
    this.doneList.push(this.input);
    console.log(this.doneList);
    localStorage.setItem('doneLists', this.doneList);
    this.task.setValue(null);
    return;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
