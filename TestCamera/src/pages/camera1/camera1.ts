import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the Camera1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera1',
  templateUrl: 'camera1.html',
})
export class Camera1Page {

  myphoto:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Camera1Page');
  }

  takePhoto(){
  	const options: CameraOptions ={
  		quality: 70,
  		destinationType: this.camera.DestinationType.DATA_URL,
  		encodingType: this.camera.EncodingType.JPEG,
  		mediaType: this.camera.MediaType.PICTURE,
  		saveToPhotoAlbum: true
  	}
  	this.camera.getPicture(options).then((imageData) => {
  		this.myphoto = 'data:image/jpeg;base64,' + imageData;
  	}, (err)=>{
  		console.log("Error encountered", err);
  		//handle error
  	});
  }

}
