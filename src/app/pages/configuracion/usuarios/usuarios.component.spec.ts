import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UsuariosComponent } from "./usuarios.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UsuariosComponent", () => {

  let fixture: ComponentFixture<UsuariosComponent>;
  let component: UsuariosComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UsuariosComponent]
    });

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
