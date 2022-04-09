import { Component, OnInit } from '@angular/core';

import { Position } from '@shared/models/position';
import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { DataTablesResponse } from '@shared/classes/data-tables-response';
import { Logger } from '@core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponentEnterprises } from './modal-form/modal-form.component';
import { ToastService } from '@app/services/toast.service';
import { FormResult } from '@shared/models/form-result';

const log = new Logger('Enterprises');
@Component({
  selector: 'enterprises',
  templateUrl: './enterprises.component.html',
})
export class EnterprisesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  position: Position;
  positions: Position[];

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    public toastService: ToastService,
    public modalService: NgbModal
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: true,
      ajax: (dataTablesParameters: Enterprises, callback) => {
        // Call WebAPI to get positions
        this.apiHttpService
          .get(this.apiEndpointsService.getEnterprises(), dataTablesParameters)
          .subscribe(
            (resp: DataTablesResponse) => {
              this.positions = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: [],
              });
            },
            (error) => {
              log.debug(error);
            }
          );
      },
      // Set column title and data field
      columns: [
        {
          title: 'Id',
          data: 'id',
        },
        {
          title: 'Created By',
          data: 'createdBy',
        },
        {
          title: 'Created Date',
          data: 'createdDate',
        },
        {
          title: 'Modified By',
          data: 'modifiedBy',
        },
        {
          title: 'Modified Date',
          data: 'modifiedDate',
        },
        {
          title: 'Status',
          data: 'status',
        },
        {
          title: 'Address',
          data: 'address',
        },
        {
          title: 'Name',
          data: 'name',
        },
        {
          title: 'Phone',
          data: 'phone',
        },
      ],
    };
  }
  // Hanble double click on a row
  openModal(position: Position, formMode: string, isAddNew: boolean) {
    // Open modal form component
    const modalRef = this.modalService.open(ModalFormComponentEnterprises);
    // pass into form component variable position
    modalRef.componentInstance.position = position;
    // pass into form component variable formMode
    modalRef.componentInstance.formMode = formMode;
    // pass into form component variable isAddNew
    modalRef.componentInstance.isAddNew = isAddNew;
    // handle result passing back from modal form component
    modalRef.result
      .then((result: FormResult) => {
        if (result) {
          log.debug('openModal', result);
          if (result.crudType == 'u') {
            if (result.status) {
              // toaster for CRUD\Update
              this.displayToaster('Confirmation', 'Data is updated');
            }
          }
          if (result.crudType == 'd') {
            if (result.status) {
              this.refreshPage();
              // toaster for CRUD\Delete
              this.displayToaster('Confirmation', 'Data is deleted');
            }
          }
          if (result.crudType == 'c') {
            if (result.status) {
              this.refreshPage();
              // toaster for CRUD\Create
              this.displayToaster('Confirmation', 'Data is saved');
            }
          }
          if (result.crudType == '') {
            // toaster for cancel
            this.displayToaster('Confirmation', 'Form is cancel');
          }
        }
      })
      .catch(() => {
        // user click outside of the modal form
        log.debug('Form: ', 'Cancel');
      });
  }

  //refresh page after delete or create
  refreshPage() {
    window.location.reload();
  }

  // toaster service
  displayToaster(headerText: string, bodyText: string) {
    this.toastService.show(bodyText, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: headerText,
    });
  }
}
