import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproduct:any[],searchTerm:string,propertyName:string): any[] {
    //for holding the search result
    const result:any[]=[]
    if(!allproduct||searchTerm==''||propertyName==''){
      return allproduct;
    }
    allproduct.forEach((item:any)=>{
      //propertyName = search term
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
         result.push(item)
      }
    })
    return result;
  }

}
