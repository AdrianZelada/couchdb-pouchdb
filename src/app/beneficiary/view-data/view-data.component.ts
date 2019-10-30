import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss'],
})
export class ViewDataComponent implements OnInit {

  form: FormGroup;
  @Input() data: any = {};

  constructor(
    private fb: FormBuilder,
    public modalController: ModalController
  ) {

  }

  ngOnInit() {
      this.form = this.fb.group({
          email: new FormControl(this.data.email),
          firstName: new FormControl(this.data.firstName),
          lastName: new FormControl(this.data.lastName),
          status: new FormControl(this.data.status),
          username: new FormControl(this.data.username)
      });
  }

  save(){
    const data = Object.assign(this.data, this.form.getRawValue());
      this.modalController.dismiss(data);
  }

}
