import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IColor } from '../interfaces/icolor';
import { ColorModel } from '../models/color-model';
import { ColorService } from '../services/color.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-new-color',
  templateUrl: './new-color.component.html',
  styleUrls: ['./new-color.component.scss']
})
export class NewColorComponent implements OnInit {
  colorData: ColorModel[]
  values!: number;
  logId = 0
  key: string | undefined;
  valu!: string;
  constructor(public colorService: ColorService,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.colorData = new Array<ColorModel>()
    this.aRoute.data.subscribe(data => {
      // console.log(data)
      this.colorData = (data[0] as IColor[]).map( cM => new ColorModel(cM.id, cM.uid, cM.hex_value, cM.color_name))
    })
  }

  ngOnInit(): void {
    this.colorService.color.subscribe(data => {
      if (data instanceof Array && data) {
        this.colorData = data
      } else if (data) {
        this.colorData.push(data)
      }
    })
  }

  fetchNewColor() {
    this.colorService.getRandomColor<IColor[]>(5).subscribe(data => {
      if (data) {
        this.colorData = data.map( cM => new ColorModel(cM.id, cM.uid, cM.hex_value, cM.color_name))
        this.colorData.push(new ColorModel(6, 'dfsdf', '#fff123', 'YellowTest'))
      }
    })
  }
  reloadCurrentPage(){
    window.location.reload();
   }

   @HostListener('document:keyup', ['$event'])
   handleKeyboardEvent(event: KeyboardEvent) {
      switch (event.key) {
         case ' ':
            window.location.reload();
            break;
         case 'c': 
            this.values=2;
            break;
        default:
            this.values=0;
      }
  }
  copyMessage(val: string){
    this.valu=val;
    this.values=1;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  copyMessageMultiple(val: string){
    this.valu=val;
    this.values=1;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value += val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
