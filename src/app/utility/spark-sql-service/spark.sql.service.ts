import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FusekiService {
  private fusekiQueryEndpoint = 'http://localhost:3030/TourishDb/query'; // Replace with your Fuseki endpoint
  private fusekiUpdateEndpoint = 'http://localhost:3030/TourishDb/update'; 
  private dbpediaEndpoint = 'http://dbpedia.org/sparql';
  constructor(private http: HttpClient) { }

  queryFuseki(queryString: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `query=${encodeURIComponent(queryString)}`;

    return this.http.post(this.fusekiQueryEndpoint, body, { headers });
  }

  insertFuseki(inputData: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `update=${encodeURIComponent(inputData)}`;

    return this.http.post(this.fusekiUpdateEndpoint, body, { headers });
  }

  executeWikiDbQuery(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
    });

    const params = {
      query: query,
      format: 'json',
    };

    return this.http.get<any>(this.dbpediaEndpoint, { headers, params });
  }
  
}