import { BancoService } from './../banco.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.page.html',
  styleUrls: ['./user-list-page.page.scss'],
})
export class UserListPagePage implements OnInit {
  result: any;
  constructor(private BancoService: BancoService) { }

  get(){
    alert("Get");
    this.BancoService.mostra()
    .then((response)=>{
      this.result = JSON.stringify(response);
    }
    )
    .catch((response)=>{
      this.result = JSON.stringify(response);
    })
  }

  ngOnInit() {
  }

}
