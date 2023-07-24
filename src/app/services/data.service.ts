import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom, tap } from 'rxjs';
import { KonkursModel } from './models/konkurs.model';
import { ProcDetailsModel } from './models/proc-details.models';
import { ProcDetailsResultModel } from './models/proc-details-result.model';
import { ProcConfigFieldModel } from './models/proc-config-field.models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private getDataUrl = 'http://127.0.0.1:8000/ViewProcs';
  private getIdProcedureUrl = 'http://127.0.0.1:8000/Proc/Details/';
  private configFieldNewUrl = 'http://127.0.0.1:8000/Proc/ConfigFieldNew/New';
  private configFieldUrl = 'http://127.0.0.1:8000/Proc/ConfigField/';
  private addProcedureUrl = 'http://127.0.0.1:8000/AddProc';
  private confUrl = '';

  private konkursesSubject$ = new BehaviorSubject<KonkursModel[]>([]);
  private procDetailsSubject$ = new Subject<ProcDetailsModel | null>();
  private procConfigFieldSubject$ = new Subject< { [key: string]: ProcConfigFieldModel }>();

  public konkurses$ = this.konkursesSubject$.asObservable();
  public procDetails$ = this.procDetailsSubject$.asObservable();
  public procConfigField$ = this.procConfigFieldSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getData(): KonkursModel[] {
    return this.konkursesSubject$.value;
  }

  fetchDataKonkurses(): void {
    this.http.get<any>(this.getDataUrl).subscribe((rawData) => {
      this.konkursesSubject$.next(rawData.items);
    });
  }

  fetchConfigField(konkursId: string): void {
    if (konkursId) {
      this.confUrl = this.configFieldUrl + konkursId;
    } else {
      this.confUrl = this.configFieldNewUrl;
    }
    this.http.get<any>(this.confUrl).subscribe((rawData) => {
      const configForm: { [key: string]: ProcConfigFieldModel } = {};
      rawData.items.forEach((item:any) => {
        configForm[item.fieldName] = item;
      });      
      this.procConfigFieldSubject$.next(configForm);
    });
  }

  fetchDataProcDetails(konkursId: string): void {
    this.procDetailsSubject$.next(null);
    this.http
      .get<ProcDetailsModel>(this.getIdProcedureUrl + konkursId)
      .subscribe((rawData) => {
        this.procDetailsSubject$.next(rawData ?? null);
      });
  }

  // createData(user: Data) {
  //     const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
  //     return this.http.post<Data>(this.url, JSON.stringify(user), { headers: myHeaders });
  // }

  async updateData(procDet: ProcDetailsModel): Promise<boolean> {
    const result = await firstValueFrom(
      this.http.post<ProcDetailsResultModel>(this.addProcedureUrl, procDet)
    );
    return result.statys;
  }

  // const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
  // return this.http.put<Data>(this.url, JSON.stringify(user), { headers: myHeaders });

  // deleteData(id: string) {
  //     return this.http.delete<Data>(this.url + '/' + id);
  // }
}
