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
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  text: string = '';
  // todoList: Observable<TodoInterface[]>;
  progressList: any = [];
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
    this.progressList = localStorage.getItem('progressLists')
      ? localStorage.getItem('progressLists').split(',')
      : [];
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(target.value);
  }

  addInProgress(): void {
    // this.todoService.addTodos(this.text);
    this.progressList.push(this.input);
    console.log(this.progressList);
    localStorage.setItem('progressLists', this.progressList);
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
