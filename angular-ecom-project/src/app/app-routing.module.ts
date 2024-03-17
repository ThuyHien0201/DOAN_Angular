import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { ShoppingPaymentGuideComponent } from './shopping-payment-guide/shopping-payment-guide.component';
import { WarrantyPolicyComponent } from './warranty-policy/warranty-policy.component';
import { StoreIntroductionComponent } from './store-introduction/store-introduction.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { SellerVoucherComponent } from './seller-voucher/seller-voucher.component';
import { SellerUpdateVoucherComponent } from './seller-update-voucher/seller-update-voucher.component';
import { SellerAddVoucherComponent } from './seller-add-voucher/seller-add-voucher.component';
import { BuyNowCheckoutComponent } from './buy-now-checkout/buy-now-checkout.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ProductListComponent,
    path: 'product',
  },
  {
    component: SellerAuthComponent,
    path: 'seller-auth',
  },
  {
    component:SellerHomeComponent,
    path:'seller-home',
    canActivate:[AuthGuard]
  },{
    component:SellerAddProductComponent,
    path:'seller-add-product',
    canActivate:[AuthGuard]
  },{
    component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[AuthGuard]
  },
  {
    component: SearchComponent,
    path:'search/:query'
    
  },
  {
    component: SearchComponent,
    path:'search/search/:query'
    
  },
  {
    component: SearchComponent,
    path:'product/search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },{
    component:UserAuthComponent,
    path:'user-auth'
  },{
    component:CartPageComponent,
    path:'cart-page'
  },{
    component:CheckoutComponent,
    path:'checkout'
  },{
    component:MyOrdersComponent,
    path:'my-orders'
  },{
    component:SellerOrdersComponent,
    path:'seller-orders'
  },
  {
    component: ShoppingPaymentGuideComponent,
    path: 'shopping-payment-guide',
  },
  {
    component: WarrantyPolicyComponent,
    path: 'warranty-policy',
  },
  {
    component: StoreIntroductionComponent,
    path: 'store-introduction',
  },
  {
    component: RecruitmentComponent,
    path: 'recruiment',
  },
  {
    component: ContactComponent,
    path: 'contact',
  }
  ,
  {
    component: ProfileComponent,
    path: 'profile',
  },
  {
    component: SellerVoucherComponent,
    path: 'seller-voucher',
  },
  {
    component: SellerUpdateVoucherComponent,
    path: 'seller-update-voucher/:id',
  },
  { 
    component: BuyNowCheckoutComponent ,
    path: 'buy-now-checkout/:productId'
  },
  {
    component: SellerAddVoucherComponent,
    path: 'seller-add-voucher',
  }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
