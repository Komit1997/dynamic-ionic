import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, NgControlStatusGroup, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
//import { AdvanceJSon} from '../../assets/icon/advance_form.json';
import { FormJSon} from '../../assets/simple_form.json';



export interface Options{
    label?:string;
    placeholder?:string;
    required?:boolean;
    type?:string;
    children?: Array<FormControlObject>;
}

export interface FormControlObject{
    key:string;
    type:string;
    options:Options;
}

@Component({
    selector:'app-home-page',
    templateUrl:'home-page.html',
    styleUrls:['home-page.css'],
})

export class HomePage{
    myForm:FormGroup ;
   // advanceForm=AdvanceJSon; 
    simpleForm= FormJSon;

    constructor( private fb :FormBuilder , private alertCtrl:AlertController){
           console.log (this.simpleForm);
           this.myForm = this.fb.group({});

           this.createControls(this.simpleForm);
    }

    createControls( controls:Array<FormControlObject>) {
    
        for(let control of controls){
            const newFormcontrol = new FormControl();

            if(control.options.required){
                newFormcontrol.setValidators(Validators.required);
            }else if(control.type == "group"){
              const newGroup = new FormGroup({});
              control.options.children.map(child =>{
                  const newControl = new FormControl();
                  newGroup.addControl(child.key, newControl);
              });
              this.myForm.addControl(control.key, newGroup);
            } else if (control.type == "array"){
                const newArray = new FormArray([]);
              
                const oneGroup = new  FormGroup({}) ; 
                control.options.children.map(child =>{
                 oneGroup.addControl(child.key, newFormcontrol)

                });
                newArray.push(oneGroup);
                this.myForm.addControl(control.key,newArray);
            }

            this.myForm.addControl(control.key,newFormcontrol)
        }
    }
     addArrayGroup(arrayName, objectSchemaChildren){
        const control = this.getFormarray(arrayName);

        const oneGroup = new  FormGroup({}) ; 
      objectSchemaChildren.map(child =>{
         oneGroup.addControl(child.key,new FormControl())      
      });
         control.push(oneGroup);
     }
    
    removeArrayGroup(arrayName, index){
        const control = this.getFormarray(arrayName);
       control.removeAt(index);
     
    }

    getFormarray(key){
        return <FormArray>this.myForm.controls[key];
      }
  

    async submitForm(){
        const alert = await this.alertCtrl.create({
            header:'Your Form',
            message: JSON.stringify(this.myForm.value),
            buttons:['OK']
        });

        await alert.present();

    }

}