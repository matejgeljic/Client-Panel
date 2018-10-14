import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean;

  constructor(
    private ClientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;

    //Get ID from url
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.ClientService.getClient(this.id).subscribe(client => this.client = client);
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      //Add ID to Client
      value.id = this.id;
      //Update Client
      this.ClientService.updateClient(value);
      this.flashMessage.show('Client updated', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
