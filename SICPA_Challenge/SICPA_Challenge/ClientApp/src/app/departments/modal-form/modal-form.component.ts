import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Position } from '@shared/models/position';
import { FormResult } from '@shared/models/form-result';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Logger } from '@core';

import { ApiHttpService } from '@app/services/api-http.service';
import { ApiEndpointsService } from '@app/services/api-endpoints.service';
import { ToastService } from '@app/services/toast.service';
import { ConfirmationDialogService } from '@app/services/confirmation-dialog.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';

const log = new Logger('ModalFormComponent');

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponentDepartments implements OnInit {
  @Input() public position: Position;
  @Input() public formMode: string = 'New';
  @Input() public isAddNew: boolean;

  //Combobox
  @Input() list: string[];
  // two way binding for input text
  inputItem = '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;
  // the list to be shown after filtering
  filteredList: string[] = [];
  entryForm: FormGroup;
  error: string | undefined;
  id: any;
  result: FormResult;

  /**
 Multiselect
 */
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};

  /**
   *
   * @param activeModal
   * @param formBuilder
   * @param toastService
   * @param apiHttpService
   * @param apiEndpointsService
   * @param confirmationDialogService
   */

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public toastService: ToastService,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit() {
    this.createForm();
    log.debug('ngOnInit position:', this.position);
    log.debug('ngOnInit formMode:', this.formMode);
    log.debug('ngOnInit isAddNew:', this.isAddNew);
    if (this.position != undefined) {
      this.entryForm.setValue({
        id: this.position.id,
        positionNumber: this.position.positionNumber,
        positionTitle: this.position.positionTitle,
        positionDescription: this.position.positionDescription,
        positionSalary: this.position.positionSalary,
      });
    }
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  get(): void {
    this.apiHttpService.get(this.apiEndpointsService.getDepartments());
  }
  // CRUD > Update, map to REST/HTTP PUT
  patch(id: string, formdata: any): void {
    this.apiHttpService
      .patch(this.apiEndpointsService.patchDepartment(id), formdata)
      .subscribe(
        (resp: any) => {
          this.id = resp.data; //guid return in data
          if (this.entryForm.dirty) {
            this.position.id = this.entryForm.get('id').value;
            this.position.positionNumber =
              this.entryForm.get('positionNumber').value;
            this.position.positionTitle =
              this.entryForm.get('positionTitle').value;
            this.position.positionDescription = this.entryForm.get(
              'positionDescription'
            ).value;
            this.position.positionSalary =
              this.entryForm.get('positionSalary').value;
            this.result = {
              position: this.position,
              crudType: 'u',
              status: true,
            };
            // close the modal
            this.activeModal.close(this.result);
          }
        },
        (error) => {
          log.debug(error);
        }
      );
  }
  // CRUD > Delete, map to REST/HTTP DELETE
  // delete(id: any): void {
  //   this.apiHttpService
  //     .delete(this.apiEndpointsService.deletePositionByIdEndpoint(id), id)
  //     .subscribe(
  //       (resp: any) => {
  //         log.debug(resp);

  //         this.result = {
  //           position: this.position,
  //           crudType: 'd',
  //           status: true,
  //         };
  //         this.activeModal.close(this.result);
  //       },
  //       (error) => {
  //         log.debug(error);
  //       }
  //     );
  // }
  // CRUD > Create, map to REST/HTTP POST
  create(data: any): void {
    this.apiHttpService
      .post(this.apiEndpointsService.postDepartment(), data)
      .subscribe(
        (resp: any) => {
          this.id = resp.data; //guid return in data
          this.result = {
            position: this.position,
            crudType: 'c',
            status: true,
          };
          this.activeModal.close(this.result);
        },
        (error) => {
          log.debug(error);
        }
      );
  }
  // Handle Create button click
  onCreate() {
    this.create(this.entryForm.value);
    log.debug('OnInsert: ', this.entryForm.value);
    log.debug('OnInsert: ', this.entryForm.get('positionNumber').value);
  }
  // Handle Update button click
  onUpdate({ value, valid }: { value: Position; valid: boolean }) {
    log.debug('onUpdate value', value);
    log.debug('onUpdate valid', valid);
    if (this.entryForm.dirty) {
      this.patch(this.entryForm.get('id').value, this.entryForm.value);
    }
  }
  // Handle Delete button click
  // onDelee() {
  //   this.confirmationDialogService
  //     .confirm('Position deletion', 'Are you sure you want to delete?')
  //     .then((confirmed) => {
  //       if (confirmed) {
  //         this.delete(this.entryForm.get('id').value);
  //         log.debug('onDelee: ', this.entryForm.value);
  //       }
  //     })
  //     .catch(() => {
  //       log.debug('onDelee: ', 'Cancel');
  //     });
  // }

  // Handle Delete button click
  onCancel() {
    this.result = { position: this.position, crudType: '', status: true };
    this.activeModal.close(this.result);
  }

  // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      id: [''],
      positionNumber: ['', Validators.required],
      positionTitle: ['', Validators.required],
      positionDescription: ['', Validators.required],
      positionSalary: [
        '',
        RxwebValidators.numeric({ allowDecimal: true, isFormat: false }),
      ],
    });
  }

  /*
  ComboBox
  */
  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter((item) =>
        item.toLowerCase().startsWith(this.inputItem.toLowerCase())
      );
    }
  }
  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind: any) {
    this.inputItem = this.filteredList[ind];
    this.listHidden = true;
    this.selectedIndex = ind;
  }
  // navigate through the list of items
  onKeyPress(event: any) {
    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      } else if (event.key === 'Enter') {
        this.toggleListDisplay(0);
      } else if (event.key === 'ArrowDown') {
        this.listHidden = false;
        this.selectedIndex =
          (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName('list-item')
            [this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex =
          (this.selectedIndex - 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName('list-item')
            [this.selectedIndex].scrollIntoView();
        }
      }
    }
  }
  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    if (sender === 1) {
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.list.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.list;
        } else {
          this.showError = false;
        }
      }, 500);
    }
  }
}
