import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../modal/modal.service';
import { ApiService } from 'src/app/api.service';
import { Semester } from 'src/app/calendar/calendar';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @Output()
  public semesterChange: EventEmitter<number> = new EventEmitter<number>();
  public semesterLocked = false;
  private semesterList: Semester[];

  constructor(private api: ApiService, private modalController: ModalService) {

  }

  ngOnInit() {
    // this.api.getActiveSemesters().subscribe(
    //   (semesters: number[]) => this.semesterList = semesters
    // );
  }

  public openSemesterChangeModal(): void {
    this.modalController.showConfirmationModal(
      'Are you sure you want to change semester?',
      'Changing semester will discard any unsaved changes to the active timetable.',
      () => console.log('rewarewa'));
  }
}
