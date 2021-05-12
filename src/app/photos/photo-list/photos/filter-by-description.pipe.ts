import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../../photo/photo';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {
    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery.trim().toLowerCase();
        
        if(descriptionQuery){
            console.log(descriptionQuery,photos.filter(p=>p.description.toLowerCase().includes(descriptionQuery)));
            return photos.filter(p=>p.description.toLowerCase().includes(descriptionQuery));
        }else{
            return photos;
        }
    }
}