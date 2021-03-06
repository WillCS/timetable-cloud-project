import { Component, OnInit } from '@angular/core';
import { ClassListing, TimetableSession, ClassType, NULL_SESSION } from 'src/app/calendar/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  public year: number;
  public semester: number;

  public classList: ClassListing[] = [];

  public selections: Map<string, Map<string, number>>;

  public editing = false;
  public editingClassName: string;
  public editingClassType: string;
  public focusedSession: TimetableSession;

  constructor(public api: ApiService) {
    this.selections = new Map<string, Map<string, number>>();
  }

  ngOnInit() {

  }

  public handleSessionClicked(session: TimetableSession): void {
    if(this.editing) {
      this.selections.get(this.editingClassName).set(session.classType, session.classStream);
    } else {
      this.editingClassName = session.className;
      this.editingClassType = session.classType;
    }

    this.editing = !this.editing;
  }

  public handleSessionEntered(session: TimetableSession): void {
    this.focusedSession = session;
  }

  public handleSessionLeft(): void {
    this.focusedSession = null;
  }

  public addClass(newClass: ClassListing): void {
    if(!this.classList.some(c => c.name === newClass.name)) {
      this.classList.push(newClass);

      if(!this.selections.has(newClass.name)) {
          const classMap: Map<string, number> = new Map<string, number>();
          newClass.classes.forEach((classType: ClassType) => {
              classMap.set(classType.name, 0);
          });
          this.selections.set(newClass.name, classMap);
      }
    }
  }

  public removeClass(className: string): void {
    this.classList = this.classList.filter(c => className !== c.name);

    if(this.selections.has(className)) {
      this.selections.delete(className);
    }
  }

  public SetSelection(className: string, classType: string, selection: number): void {
      if(this.selections.has(className) && this.selections[className].has(classType)) {
          this.selections[className][classType] = selection;
      }
  }

  public GetSelection(className: string, classType: string): number {
      if(this.selections.has(className) && this.selections[className].has(classType)) {
          return this.selections[className][classType];
      }
  }

  public onSearched(searchTerm: string): void {
    this.api.getClass(searchTerm, this.year, this.semester).subscribe(
      (newClass: ClassListing) => {
        this.addClass(newClass);
      });
  }

  public onClassCloseClicked(className: string): void {
    this.removeClass(className);
  }
}
