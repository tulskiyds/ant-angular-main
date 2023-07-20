import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ProcDetailsModel } from 'src/app/services/models/proc-details.models';

@Component({
  selector: 'app-proc-details-form',
  templateUrl: './proc-details-form.component.html',
  styleUrls: ['./proc-details-form.component.css'],
})
export class ProcDetailsFormComponent implements OnInit {
  constructor(private formBuilder: UntypedFormBuilder) {}

  konkursForm = this.formBuilder.group({
    id: [null],
    konkursId: [null],
    konkursNr: [null],
    konkursName: [null],
    bukrs: [null],
    orgKey: [null],
    stat: [null],
    crtDate: [null],
    crtUser: [null],
    lotId: [null],
    lotNr: [null],
    lotName: [null],
    ekorg: [null],
    finanLimitWovat: [null],
    vatRate: [null],
    finanLimitWvat: [null],
    lifnr: [null],
    lifnrName: [null],
    ofrDate: [null],
    ofrTime: [null],
    priceNds: [null],
    priceSNds: [null],
    deliverDate: [null],
    deliverTime: [null],
    winFld: [null],
  });

  @Input()
  public set initialModel(value: ProcDetailsModel | undefined) {
    this.mapInitialModel(value);
  }

  @Output() submitModel = new EventEmitter<ProcDetailsModel>();

  ngOnInit(): void {}

  handleSubmit(): void{
    this.submitModel.emit(this.konkursForm.value);
  }

  private mapInitialModel(source: ProcDetailsModel | undefined): void {
    if (!source) return;

    this.konkursForm.setValue({
      id: source.id,
      konkursId: source.konkursId,
      konkursNr: source.konkursNr,
      konkursName: source.konkursName,
      bukrs: source.bukrs,
      orgKey: source.orgKey,
      stat: source.stat,
      crtDate: source.crtDate,
      crtUser: source.crtUser,
      lotId: source.lotId,
      lotNr: source.lotNr,
      lotName: source.lotName,
      ekorg: source.ekorg,
      finanLimitWovat: source.finanLimitWovat,
      vatRate: source.vatRate,
      finanLimitWvat: source.finanLimitWvat,
      lifnr: source.lifnr,
      lifnrName: source.lifnrName,
      ofrDate: source.ofrDate,
      ofrTime: source.ofrTime,
      priceNds: source.priceNds,
      priceSNds: source.priceSNds,
      deliverDate: source.deliverDate,
      deliverTime: source.deliverTime,
      winFld: source.winFld,
    });
  }
}
