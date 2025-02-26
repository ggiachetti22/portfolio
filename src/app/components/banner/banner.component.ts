import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  public banner: String[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'C#Sharp', '.Net Core', 'Sql Server', 'GitHub', 'AWS', 'Azure'];
  public banner2: String[] = ['icons8-html-5-96.png', 'icons8-css-96.png', 'icons8-javascript-96.png', 'icons8-angularjs-96.png', 'icons8-c-sharp-logotipo-96.png', 'icons8-net-framework-96.png', 'icons8-servidor-microsoft-sql-96.png', 'icons8-github-96.png', 'icons8-aws-96.png', 'icons8-azur-96.png'];
  public conbiedArray = this.banner.map((a, i) => ({a, b: this.banner2[i]}));

} // BannerComponent;
