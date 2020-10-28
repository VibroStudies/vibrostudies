import { Password } from "../Password";
import { EMail } from "../EMail";
import { User } from "../User";
import { UserDao } from "../UserDao.service";
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserPermission } from "../UserPermission";


const id = 111;
const firstName = "Anne";
const lastName = "Hermann";
const permission = UserPermission.ADMINISTRATOR;
const password = new Password("AnneIstMegaSuperDuperUndAdrianIstBlöd");
const email = new EMail("annehe@online.de");

describe('userDAO', () => {
    let injector: TestBed;
    let service: UserDao;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [UserDao]
        });
        injector = getTestBed();
        service = injector.get(UserDao);
        httpMock = injector.get(HttpTestingController);
      });



      // describe('#getAll', () => {
      //   it('should return an Observable<User[]>', () => {
      //     let users = service.getAll();
      //   });
      // });

});

function createUserDefault(): User {
    return new User(id, firstName, lastName, permission, email);
}


