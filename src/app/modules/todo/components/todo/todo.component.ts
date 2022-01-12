import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage-service/local-storage.service';
import { TodoService } from '../../services/todo-service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  text: string = '';
  // todoList: Observable<TodoInterface[]>;
  todoList: any = [];
  input: any;
  task: FormControl = new FormControl();

  constructor(
    private todoService: TodoService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.task.valueChanges.subscribe((value: string) => {
      console.log(value);
      this.input = value;
    });
    console.log(localStorage.getItem('todoLists'));
    this.todoList = localStorage.getItem('todoLists')
      ? localStorage.getItem('todoLists').split(',')
      : [];
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(target.value);
  }

  addTodo(): void {
    // this.todoService.addTodos(this.text);
    this.todoList.push(this.input);
    console.log(this.todoList);
    localStorage.setItem('todoLists', this.todoList);
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
