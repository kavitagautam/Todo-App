import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from '../../interface/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}
  todos$ = new BehaviorSubject<TodoInterface[]>([]);

  addTodos(text: string): void {
    const newTodo: TodoInterface = {
      text,
      storyPoints: 0,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }
}
