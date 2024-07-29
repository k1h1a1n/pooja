import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
interface ResponseObject {
  getDynamicMenuList: MenuItem[];
  status: any;
  errorMessage: string | null;
  rowCount: number;
  errorCode: string | null;
  ex: any;


}
interface MenuItem {
  menuID: number;
  menuName: string;
  moduleID: number;
  menuLeve: number;
  pareMenuID: number;
  sequence: number;
  url: string;
  hasChil: string;
  aspSequence: number;
  isHidd: string;
  addOnModuelID: number;
  isBeta: any;
  submenus?: MenuItem[];
}
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  private http = inject(HttpClient);
  menuData: any;
  uniqueModuleList: any;
  processedData: any;
  defaultBackgroundColor = '#d8dde3'; // Default background color for menuLeve 1 elements
  defaultTextColor = '#353acd';



  constructor() {

  }
  ngOnInit() {

    this.getMenuData().subscribe((res: ResponseObject) => {
      this.menuData = res.getDynamicMenuList
      let uniqueModuleIDs = [...new Set(res.getDynamicMenuList.map((item) => item.moduleID))];
      this.processedData = this.processMenuItems(this.menuData)
       this.mapModuleIdData(uniqueModuleIDs);
     });
  }
 
  getMenuData(): Observable<ResponseObject> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const input = { "UserID": "deepalig@datacomp.in", "iuserid": "1" }
    return this.http.post<ResponseObject>(
      'http://imadminapiuat.imagicuat.in/api/Servicing/OfficeReports/GetDynamicMenuList', input
      , { headers }
    ).pipe(
      catchError(error => {
        console.error('Error fetching menu data:', error);
        return throwError(error);
      })
    );
  }


  mapModuleIdData(input: Array<number>) {
    const moduleData: any[] = [];
    let modifiedObject: any
    input.forEach((x) => {
      modifiedObject = {
        'name': '',
        'moduleId': x,
        'imgName': '',
        'submenu': []
      };
      switch (x) {
        case 1:
          modifiedObject.name = 'Life Insurance';
          modifiedObject.imgName = '../assets/images/datamaintenance.png';
          modifiedObject.submenu = this.processedData.filter((item: any) => item.moduleID === 1);
          break;
        case 2:
          modifiedObject.name = 'General Insurance';
          modifiedObject.imgName = '../assets/images/report.png';
          modifiedObject.submenu = this.processedData.filter((item: any) => item.moduleID === 2);

          break;
        case 3:
          modifiedObject.name = 'Other';
          modifiedObject.imgName = '../assets/images/mis.png'
          modifiedObject.submenu = this.processedData.filter((item: any) => item.moduleID === 3);

          break;
        case 4:
          modifiedObject.name = 'Common';
          modifiedObject.imgName = '../assets/images/valueaddon.png'
          modifiedObject.submenu = this.processedData.filter((item: any) => item.moduleID === 4);

          break;
        case 5:
          modifiedObject.name = 'Admin';
          modifiedObject.imgName = '../assets/images/toolsandutilities.png'
          modifiedObject.submenu = this.processedData.filter((item: any) => item.moduleID === 5);

          break;
        default:
          break;
      }
      moduleData.push(modifiedObject);
    })
    this.uniqueModuleList = moduleData;
    
  }


  isMenuOpen = false;



  onMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.closeAllMenus();
    }
  }




  closeAllMenus() {
    this.uniqueModuleList.forEach((module: { isActive: boolean; submenu: any[]; }) => {
      module.isActive = false;
      module.submenu.forEach(submenu => {
        submenu.isActive = false;
        submenu.isOpen = false;
        submenu.submenus.forEach((subItmes: { isActive: boolean; isOpen: boolean; backgroundColor: string; textColor: string; }) => {
          subItmes.isActive = false;
          subItmes.isOpen = false;

        });
      });
    });
  }



  onMenu1Click(module: { isActive: any; submenu: any; }) {
    // Close all other main menus and their submenus
    this.uniqueModuleList.forEach((m: { isActive: boolean; submenu: { isActive: boolean; isOpen: boolean; submenus: { isActive: boolean; isOpen: boolean; backgroundColor: string; textColor: string; }[]; }[]; }) => {
      if (m !== module) {
        m.isActive = false;
        m.submenu.forEach((s: { isActive: boolean; isOpen: boolean; submenus: { isActive: boolean; isOpen: boolean; backgroundColor: string; textColor: string; }[]; }) => {
          s.isActive = false;
          s.isOpen = false;
          s.submenus.forEach((subItmes: { isActive: boolean; isOpen: boolean; backgroundColor: string; textColor: string; }) => {
            subItmes.isActive = false;
            subItmes.isOpen = false;

          });
        });
      }
    });

    module.isActive = !module.isActive;
    module.submenu.forEach((submenu: { isOpen: boolean; isActive: boolean; submenus: { isOpen: boolean; isActive: boolean; }[]; }) => {
      submenu.isOpen = false;
      submenu.isActive = false;
      submenu.submenus.forEach((subItmes: { isOpen: boolean; isActive: boolean; }) => {
        subItmes.isOpen = false;
        subItmes.isActive = false;
      });
    }); // Close all submenus when main menu item is clicked
  }

  onMenu2Click(submenu: { isActive: boolean; isOpen: boolean; submenus: { isOpen: boolean; menuLeve: number; backgroundColor: string; textColor: string; }[]; }, module: { submenu: any[]; }) {
    // Close all other level 2 submenus in this module
    module.submenu.forEach(s => {
      if (s !== submenu) {
        s.isOpen = false;
        s.isActive = false;
        s.submenus.forEach((subItmes: { isOpen: boolean; isActive: boolean; backgroundColor: string; textColor: string; }) => {
          subItmes.isOpen = false;
          subItmes.isActive = false;

        });
      }
    });

    submenu.isActive = !submenu.isActive;
    submenu.isOpen = !submenu.isOpen;
    submenu.submenus.forEach((subItmes: { isOpen: boolean; menuLeve: number; backgroundColor: string; textColor: string; }) => {
      subItmes.isOpen = false; // Close all level 1 submenus when level 2 submenu is clicked
      if (subItmes.menuLeve === 1 && submenu.isOpen) {
        subItmes.backgroundColor = this.defaultBackgroundColor;
        subItmes.textColor = this.defaultTextColor;
      }
    });
  }

  onMenu3Click(subItmes: { isActive: boolean; isOpen: boolean; menuLeve: number; backgroundColor: string; textColor: string; }, submenu: { submenus: any[]; }) {
    // Close all other level 3 submenus in this submenu
    submenu.submenus.forEach(s => {
      if (s !== subItmes) {
        s.isOpen = false;
        s.isActive = false;

      }
    });

    subItmes.isActive = !subItmes.isActive;
    subItmes.isOpen = !subItmes.isOpen;
    if (subItmes.menuLeve === 1 && subItmes.isOpen) {
      subItmes.backgroundColor = this.defaultBackgroundColor;
      subItmes.textColor = this.defaultTextColor;
    }
  }


  processMenuItems(items: any[]): any[] {
    const output: any[] = [];
    let currentObject: any | null = null;
    let currentLevel1Object: any | null = null;

    for (const item of items) {
      if (item.menuLeve === 0) {
        if (currentObject) {
          output.push(currentObject);
        }
        // Start a new currentObject
        currentObject = { ...item, submenus: [], level1menus: [] };
        // Reset level1Object
        currentLevel1Object = null;
      } else if (item.menuLeve === 1) {
        // Add item to submenus of the currentObject
        if (currentObject) {
          currentLevel1Object = { ...item, level1menus: [] };
          currentObject.submenus?.push(currentLevel1Object);
        }
      } else if (item.menuLeve === 2) {
        // Add item to level1menus of the currentLevel1Object
        if (currentLevel1Object) {
          currentLevel1Object.level1menus?.push(item);
        } else if (currentObject) {
          // If no currentLevel1Object, add to submenus of currentObject
          currentObject.submenus?.push({ ...item, level1menus: [] });
        }
      }
    }

    // Push the last object to output
    if (currentObject) {
      output.push(currentObject);
    }

    return output;
  }
 
  setBackgroundColor(subItmes: any) {
    if (subItmes.menuLeve === 1) {
      subItmes.backgroundColor = this.defaultBackgroundColor;
      subItmes.textColor = this.defaultTextColor;
    }
  }// Set the desired background color here
}

