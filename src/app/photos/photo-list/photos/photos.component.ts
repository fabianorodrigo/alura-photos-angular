/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Photo} from '../../photo/photo';

@Component({
    selector: 'ap-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit, OnChanges {
    @Input() photos: Photo[] = [];
    rows: any[] = [];

    ngOnInit(): void {
        this.rows = this.groupColumns(this.photos);
    }
    ngOnChanges(changes: SimpleChanges): void {
        //se houve mudança na inbound property 'photos'
        //o changes vai ter essa propriedade dinamicamente
        if (changes.photos) {
            this.rows = this.groupColumns(this.photos);
        }
    }

    groupColumns(photos: Photo[]) {
        const newRows = [];
        for (let index = 0; index < photos.length; index += 3) {
            newRows.push(photos.slice(index, index + 3));
        }
        return newRows;
    }
}
