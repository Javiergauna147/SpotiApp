import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('Spotify services listo');
  }

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer QDBGqPzB9IYzCZLDypsJME3H0wQaQQBcWGsDw6pSQaW9E4Jvyw1S0-MBGKvwD2mcFmThTt8ZmGZMP5fX6w'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases(){ 
    return this.getQuery('browse/new-releases?limit=20').pipe( map( data => data['albums'].items));
  }

  getArtistas( termino:string ) {
    return this.getQuery(`search?q=${ termino }&type=artist&market=ar&limit=15`).pipe( map( data => data['artists'].items));
  }

  getArtista( id:string ) {
    return this.getQuery(`artists/${ id }`);
  }

  getTopTracks( id:string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=ar`).pipe( map( data => data['tracks']));
  }

}
