import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  todoList: any[];
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.todoForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.loadTodDos();
  }

  loadTodDos() {
    this.userService.getTodo().subscribe(
      (res: any) => {
        this.todoList = res.result;
      },
      err => {
        alert(err.message);
        this.todoList = [];
      }
    );
  }

  addTodo() {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    }

    this.userService.addTodo(this.todoForm.value).subscribe(
      (res: any) => {
        this.todoList.push(res.result);
        this.todoForm.reset();
        this.submitted = false;
        alert(res.message);
      },
      err => {
        alert(err.message);
        this.todoList = [];
      }
    );
  }

  doneTodo(idx: number) {
    const todItem: any = this.todoList[idx];
    this.userService.deleteTodo(todItem._id).subscribe(
      (res: any) => {
        this.todoList[idx] = { ...this.todoList[idx], deleted: true };
        alert(res.message);
      },
      err => {
        alert(err.message);
      }
    );
  }
}
