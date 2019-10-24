import {Component, OnInit} from '@angular/core';
import {ThmedicalappoitmentsService} from '../services/thmedicalappoitments.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  list: Array<any> = [];

  constructor(private appointmentsService: ThmedicalappoitmentsService) {

  }

  ngOnInit() {
    this.appointmentsService.appoitments$
      .pipe(
        map((response: Array<any>) => {
          return response.map((obj) => {
            return obj.doc
          })
        })
      )
      .subscribe((res: Array<any>) =>{
        this.list = res;
      })
  }

  updateState(item: any) {
      console.log(item);
      item.screening = !item.screening;
      this.appointmentsService.update(item).then((res) => {
          console.log(res);
      })
  }

}
