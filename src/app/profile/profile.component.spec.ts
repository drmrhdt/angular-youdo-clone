import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProfileComponent } from './profile.component'
import { RouterModule } from '@angular/router'

describe('ProfileComponent', () => {
    let component: ProfileComponent
    let fixture: ComponentFixture<ProfileComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [HttpClientTestingModule, RouterModule.forRoot([])]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
