import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './components/site-layout/site-layout.component';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { ClickPreventDefaultDirective } from './directives/click-prevent-dafault.directive';
import { IfDirective } from './directives/if.directive';
import { FormComponent } from './components/forms/form.component';
import { FormControlComponent } from './components/forms/form-control-components';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    SiteLayoutComponent, 
    SiteLayoutHeaderComponent, 
    SiteLayoutFooterComponent, 
    ClickPreventDefaultDirective, 
    IfDirective, FormComponent,FormControlComponent, PageNotFoundComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    SiteLayoutComponent,
    SiteLayoutFooterComponent,
    SiteLayoutHeaderComponent,
    ClickPreventDefaultDirective,
    IfDirective,
    FormComponent,
    FormControlComponent
  ]
})
export class SharedModule { }
