import { Component, OnInit, Input } from '@angular/core';
import { UserPostsRO } from '@app/services/api.service';

@Component({
  selector: 'mono-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserPostsRO;
  constructor() { }

  ngOnInit() {
  }

}
