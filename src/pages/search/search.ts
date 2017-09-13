import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController,NavParams } from 'ionic-angular';
import { WoocommerceService } from '../../providers/woocommerce-service';
import { ProductDetailsPage } from '../product-details/product-details';
import { TranslateService } from '@ngx-translate/core';
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  myInput: string = '';
  products: Array<any>;
  loadingModal: any;
  noResult: boolean;
  errorModal: any;
  searchTerm: string = '';
  value: any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public wooService: WoocommerceService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public translateService: TranslateService, public navParams: NavParams) {
    this.noResult = false;
    this.getProducts();
  }
  // setFilteredItems() {
  //   console.log(this.searchTerm);
  //   this.products = this.filterItems(this.searchTerm);
  // }

  getItems(searchTerm){
      if (!searchTerm) {
        return;
      }
      this.products = this.products.filter((product) => {
        if(product.name && searchTerm) {
          if (product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      }); 
  }

  getProducts() {
    this.translateService.get(['Notice', 'Loading', 'NetWork_Error', 'OK']).subscribe(value => {
      this.value = value;
      this.loadingModal = this.loadingCtrl.create({
        content: value['Loading']
      });
      this.loadingModal.present();
        this.products = this.navParams.get('products');
        if(this.products.length == 0){
          this.noResult = true;
        }else{

        }
        this.loadingModal.dismiss();
      }, (reson) => {
        this.loadingModal.dismiss();
        this.alertCtrl.create({
          title: this.value['Notice'],
          message: this.value['NetWork_Error'],
          buttons: [this.value['OK']]
        }).present();
      });
    }
  onClose() {
    this.viewCtrl.dismiss();
  }

  viewProduct(id) {
    this.navCtrl.push(ProductDetailsPage, { id: id });
  }
}
