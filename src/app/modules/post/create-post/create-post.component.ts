import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    tags: new FormControl([]),
  })

  ngOnInit() {
  }
}
