import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ProcDetailsModel } from 'src/app/services/models/proc-details.models';

@Component({
  selector: 'app-konkurs',
  templateUrl: './konkurs.component.html',
  styleUrls: ['./konkurs.component.css'],
})
export class KonkursComponent implements OnInit {
  private procSub?: Subscription;
  private confSub?: Subscription;

  konkursId$ = this.route.params.pipe(
    map((params) => params['konkursId']),
    filter((id) => !!id)
  );
  // selectedKonkurs$ = this.konkursId$.pipe(
  //   switchMap((id) =>
  //     this.dataService.konkurses$.pipe(
  //       map((konkurces) => konkurces.find((k) => k.konkursId == id))
  //     )
  //   ),
  //   filter((konkurs) => !!konkurs)
  // );

  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.procSub = this.konkursId$.subscribe((konkursId) => {
      this.dataService.fetchDataProcDetails(konkursId);
    });
    this.confSub = this.konkursId$.subscribe((konkursId) => {
      this.dataService.fetchConfigField(konkursId);
    });
  }

  ngOnDestroy(): void {
    this.procSub?.unsubscribe();
    this.confSub?.unsubscribe();
  }

  async submit(data: ProcDetailsModel): Promise<void> {
    const isOkey = await this.dataService.updateData(data);
    if (isOkey) {
      this.router.navigate(['/']);
    }
  }
}
