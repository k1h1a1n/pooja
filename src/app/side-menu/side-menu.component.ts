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
  nestedMenuData: MenuItem[] = [];
  orderedMenuData: MenuItem[] = [];

  constructor() {

  }
  ngOnInit() {
    this.getMenuData().subscribe((res: ResponseObject) => {
      this.menuData = res.getDynamicMenuList
      let uniqueModuleIDs = [...new Set(res.getDynamicMenuList.map((item) => item.moduleID))];
      this.mapModuleIdData(uniqueModuleIDs);
      // debugger
      this.nestedMenuData = this.buildMenuHierarchy(this.menuData);
      console.log(this.nestedMenuData);

      // this.orderedMenuData = this.flattenMenuHierarchy(this.nestedMenuData);
      // console.log(this.orderedMenuData);
    
    });

  }


  // getMenuData(): Observable<ResponseObject> {
  //   // return this.http.get<ResponseObject>('assets/response_1718715757932.json');
  //   return this.http.get<ResponseObject>('http://imadminapiuat.imagicuat.in/api/Servicing/OfficeReports/GetDynamicMenuList')
  // }

  getMenuData(): Observable<ResponseObject> {
    const headers = new HttpHeaders({
      // 'Authorization': 'Bearer your_token_here', 
      'Content-Type': 'application/json'
    });
    
    const input = {"UserID":"deepalig@datacomp.in","iuserid":"1"}
    return this.http.post<ResponseObject>(
      'http://imadminapiuat.imagicuat.in/api/Servicing/OfficeReports/GetDynamicMenuList', input
      ,{headers}
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
          modifiedObject.submenu = this.processFirstLevelMenu(x, this.menuData);
          //process second level here
          
          break;
        case 2:
          modifiedObject.name = 'General Insurance';
          modifiedObject.imgName = '../assets/images/report.png';
          modifiedObject.submenu = this.processFirstLevelMenu(x, this.menuData);

          break;
        case 3:
          modifiedObject.name = 'Other';
          modifiedObject.imgName = '../assets/images/mis.png'
          modifiedObject.submenu = this.processFirstLevelMenu(x, this.menuData);

          break;
        case 4:
          modifiedObject.name = 'Common';
          modifiedObject.imgName = '../assets/images/valueaddon.png'
          modifiedObject.submenu = this.processFirstLevelMenu(x, this.menuData);

          break;
        case 5:
          modifiedObject.name = 'Admin';
          modifiedObject.imgName = '../assets/images/toolsandutilities.png'
          modifiedObject.submenu = this.processFirstLevelMenu(x, this.menuData);

          break;
        default:
          break;
      }
      moduleData.push(modifiedObject);
    })
    this.uniqueModuleList = moduleData;
    console.log(this.uniqueModuleList , 'binded data')
  }


  isMenuOpen = false;
  isMenu1Active = false;
  isMenu2Active = false;

  // onMenuOpen() {
  //   this.isMenuOpen = !this.isMenuOpen;
  //   // this.isMenu1Active = false
  //   // this.isMenu2Active=false
  //   // this.uniqueModuleList.forEach((item:any) => {
  //   //   item.isMenu1Active = false;
  //   //   item.submenus.forEach((subitem:any) => subitem.isMenu2Active = false);
  //   // });
  //   if (!this.isMenuOpen) {
  //     this.uniqueModuleList.forEach((item: any) => item.isActive = false);
  //     this.uniqueModuleList.forEach((item: any) => item.submenu.forEach((subItem: any) => subItem.isActive = false));
  //   }
  // }

  // onMenu1Click(menuItem: any) {
  //   if (!this.isMenuOpen) return;
  //   // this.uniqueModuleList.forEach((item:any) => item.isActive = false);
  //   // this.uniqueModuleList.forEach((item: any) => item.isActive = false);  
  //   menuItem.isActive = !menuItem.isActive;

  // }

  // onMenu2Click(submenuItem: any) {
  //   if (!this.isMenuOpen) return;
  //   // menuItem.submenu.forEach((subitem: any) => subitem.isActive = false);
  //   // parentMenu.submenu.forEach((item: any) => item.isActive = false);
  //   submenuItem.isActive = !submenuItem.isActive;
  // }



  //   onMenu1Click(){
  // this.uniqueModuleList.forEach((item:any) => {
  //       item.isActive = false;
  //     });
  //     this.isMenu1Active=!this.isMenu1Active
  //  }



  //   onMenu2Click(){
  //     // this.uniqueModuleList.item.submenu.forEach((sub:any)=>{
  //     //   sub.isActive=false;
  //     //  })
  //    this.isMenu2Active=!this.isMenu2Active
  //  }


  onMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.closeAllMenus();
    }
  }

  onMenu1Click(menuItem: any) {
    if (!this.isMenuOpen) return;
    const wasActive = menuItem.isActive;
    this.closeAllMenus();
    menuItem.isActive = !wasActive;  
  }

  onMenu2Click(submenuItem: any, parentMenu: any) {
    if (!this.isMenuOpen) return;
    const wasActive = submenuItem.isActive;
    parentMenu.submenu.forEach((item: any) => item.isActive = false);  
    submenuItem.isActive = !wasActive;  
  }

  private closeAllMenus() {
    this.uniqueModuleList.forEach((item: any) => {
      item.isActive = false;
      if (item.submenu) {
        item.submenu.forEach((subItem: any) => subItem.isActive = false);
      }
    });


  }


 private processFirstLevelMenu(moduleID: number, menuData: any[]) {
    let secondLevel: Array<any> = [];


    let firstLevel: Array<any> = [];
    menuData.forEach((menuData , index) => {
     
      if(
      menuData.moduleID === moduleID && menuData.hasChil === '1' && menuData.menuLeve === 0){
        firstLevel.push(menuData) 
      
    }
      else if(menuData.menuLeve === 1 &&  menuData.hasChil === '1' && menuData.moduleID === moduleID){
           // create submenus and add subitems in that
        // secondLevel.push(menuData) 
    
       
  }
     
    })
  
  
    return firstLevel;

    
    
  }

  private buildMenuHierarchy(data: MenuItem[]): MenuItem[] {
    const menuHierarchy: MenuItem[] = [];
    const map = new Map<number, MenuItem>();
    data.forEach(item => {
      map.set(item.menuID, item);
    });

    data.forEach(item => {
    
        const parent = map.get(item.pareMenuID);

        if (parent) {
          if (!parent.submenus) {
            parent.submenus = [];
          }
          parent.submenus.push(item)
        } else {
          menuHierarchy.push(item);
        }
      
    });

    return menuHierarchy;
  }



  // private buildMenuHierarchy(data: MenuItem[]): MenuItem[] {
  //   const menuHierarchy: MenuItem[] = [];
  //   const map = new Map<number, MenuItem>();

  //   // Create a map for quick lookup
  //   data.forEach(item => {
  //     item.submenus = []; // Initialize submenus array
  //     map.set(item.menuID, item);
  //   });

  //   // Build the hierarchy
  //   data.forEach(item => {
  //     if (item.menuLeve === 1) {
  //       // Top-level menu
  //       menuHierarchy.push(item);
  //     } else {
  //       // Submenu
  //       const parent = map.get(item.pareMenuID);
  //       if (parent) {
  //         parent.submenus?.push(item);
  //       }
  //     }
  //   });

  //   return menuHierarchy;
  // }

  // private flattenMenuHierarchy(menuHierarchy: MenuItem[]): MenuItem[] {
  //   const flattenedMenu: MenuItem[] = [];

  //   const traverse = (menu: MenuItem) => {
  //     flattenedMenu.push(menu);
  //     if (menu.menuLeve === 2 && menu.submenus && menu.submenus.length > 0) {
  //       menu.submenus.forEach(submenu => traverse(submenu));
  //     }
  //   };

  //   menuHierarchy.forEach(menu => traverse(menu));

  //   return flattenedMenu;
  // }


  // private processFirstLevelMenu(moduleID: number, menuData: any[]) {
  //   let firstLevel: Array<MenuItem> = [];
  
  //   menuData.forEach(menuItem => {
  //     if (menuItem.moduleID === moduleID && menuItem.menuLeve === 1) {
  //       menuItem.submenus = menuData.filter(subMenuItem => subMenuItem.pareMenuID === menuItem.menuID && subMenuItem.menuLeve === 2);
  //       firstLevel.push(menuItem);
  //     }
  //   });
  
  //   return firstLevel;
  // }

 
  // private buildMenuHierarchy(data: MenuItem[]): MenuItem[] {
  //   const menuHierarchy: MenuItem[] = [];
  
  //   // // Step 1: Map menu items by menuID for quick access
  //   data.forEach((item , index) => {
  //    if(item.hasChil == '1' && item.menuLeve !== 1){
  //     menuHierarchy.push(item)
  //    }
  //   })
  //   console.log(menuHierarchy)
  //   return menuHierarchy;
  // }
  
  
  
  
  // private buildMenuHierarchy(data: MenuItem[]): MenuItem[] {
  //   const menuHierarchy: MenuItem[] = [];
  //   const map = new Map<number, MenuItem>();
  
  //   // Create a map for quick lookup
  //   data.forEach(item => {
  //     item.submenus = []; // Initialize submenus array
  //     map.set(item.menuID, item);
  //   });
  
  //   // Build the hierarchy
  //   data.forEach(item => {
  //     if (item.menuLeve === 1) {
  //       // Top-level menu
  //       menuHierarchy.push(item);
  //     } else {
  //       // Submenu
  //       const parent = map.get(item.pareMenuID);
  //       if (parent) {
  //         parent.submenus?.push(item);
  //       }
  //     }
  //   });
  
  //   return menuHierarchy;
  // }
 
 


  // private flattenMenuHierarchy(menuHierarchy: MenuItem[]): MenuItem[] {
  //   const flattenedMenu: MenuItem[] = [];

  //   const traverse = (menu: MenuItem) => {
  //     flattenedMenu.push(menu);
  //     if (menu.menuLeve === 2 && menu.submenus && menu.submenus.length > 0) {
  //       menu.submenus.forEach(submenu => traverse(submenu));
  //     }
  //   };

  //   menuHierarchy.forEach(menu => traverse(menu));

  //   return flattenedMenu;
  // }
  

  
  

  
  


}
