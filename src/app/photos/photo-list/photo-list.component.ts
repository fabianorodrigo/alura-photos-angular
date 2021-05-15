import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photos.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  //implementar a interface OnInit forçará a implementação do ngOnInit

  photos: Photo[] = [];
  filter = '';
  hasMore: false;
  currentPage = 1;
  userName = '';
  //padrão debounce com uso de um Subject
  debounce: Subject<string> = new Subject<string>();

  constructor(private activateRoute: ActivatedRoute, private photoService: PhotoService) {}

  //fase do ciclo de vida Angular que ocorre após instanciação do
  //componente e depois do componente receber os "inbound properties"
  ngOnInit(): void {
    this.userName = this.activateRoute.snapshot.params.user;
    this.photos = this.activateRoute.snapshot.data.photos; //pega do resolve setado no module app.routing.module.ts

    //************************************************************************ */
    //DAQUI PRA BAIXO, é gambita por não ter conseguido rodar a API da alura
    /*const userName = this.activateRoute.snapshot.params.usuario;
    if (userName === 'fabiano') {
      this.photos = [
        {
          url: 'https://uploads-ssl.webflow.com/5fa55b2822303ed3e04a22da/5fb5364bf8849937693160db_27.png',
          description: 'Ancine',
        },
        {
          url: 'http://dsgov.estaleiro.serpro.gov.br/assets/img/govbr-logo-large.png',
          description: 'govbr',
        },
        {
          url: 'https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e',
          description: 'Stack',
        },
        {
          url: 'https://assets.umbler.com/site/home/2021/header-app-dashboard.png?v=20210428030328',
          description: 'Umbler',
        },
        {
          url: 'https://pbs.twimg.com/card_img/1387120330481754118/YgXB4tsx?format=jpg&name=small',
          description: 'Prettier',
        },
      ];
    } else {
      this.photos = [
        {
          url:
            'https://s2.glbimg.com/x8GqURWkuqSUW7G56YxUVlFWL5U=/0x0:1700x1065/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/j/Y/uArM7YRvCyVOA7DvSReA/china1.jpg',
          description: 'Foguete',
        },
        {
          url:
            'https://s2.glbimg.com/LMLg9k_ETyaiJkUNpYAOaBIDZ1Q=/85x47:1648x927/540x304/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/6/s/JJicXXQ2O7P9GOwjD40A/ez3vlz-wyaeaasc.jpg',
          description: 'Galeano',
        },
        {
          url: 'https://assets.umbler.com/site/home/2021/header-app-dashboard.png?v=20210428030328',
          description: 'Umbler',
        },
      ];
    }*/
  }

  load() {
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(photos => {
      //tem que ser o concat pra poder mudar a referência e o componente filho entender
      //que mudou e, assim, fazer nova renderização
      this.photos = this.photos.concat(photos);
      if (!photos.length) {
        this.hasMore = false;
      }
    });
  }
}
