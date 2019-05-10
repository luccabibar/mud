import { Component, OnInit } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})
export class CadastroUserPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  Mask()
  {
    $(document).ready(function(){
      $('#telefone').mask('(00) 0000-0000#');
    });
  }
}
