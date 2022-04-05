import { Component } from '@angular/core';
import { bankclients , Bankclient } from './bankclient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bankclients = bankclients;
  isFormVisible = false;

  name = '';
  address= '';
  phonenumber= '';
  idcardNumber='';
  id = Math.floor(10000 + Math.random()*900000);

  showForm() {
    this.isFormVisible = true;
  }

  addBankclient() {
    this.bankclients.push({
      name : this.name,
      address : this.address,
      phonenumber : this.phonenumber,
      idcardNumber : this.idcardNumber,
      id : this.id
    });
    this.isFormVisible = false;
  }

  deleteBankclient(bankclient : Bankclient) {
    const index = this.bankclients.indexOf(bankclient);
    if (index > -1) {
      this.bankclients.splice(index,1);
    }
  }

  findBankclient(clientnumber : number) {
   bankclients.find(e => e.id === clientnumber );
  }
}
