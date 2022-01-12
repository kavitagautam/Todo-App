import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage-service/local-storage.service';
import { TodoService } from '../../services/todo-service/todo.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css'],
})
export class DoneComponent implements OnInit {
  text: string = '';
  // todoList: Observable<TodoInterface[]>;
  doneList: any = [];
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
    console.log(localStorage.getItem('doneLists'));
    this.doneList = localStorage.getItem('doneLists')
      ? localStorage.getItem('doneLists').split(',')
      : [];
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(target.value);
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
