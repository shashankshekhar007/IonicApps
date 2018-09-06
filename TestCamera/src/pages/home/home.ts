import { Component } from '@angular/core';
import { NavController, Platform, PageTransition } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Camera1Page } from '../camera1/camera1';
import { Recorder1Page } from '../recorder1/recorder1';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  camera1 = Camera1Page;
  recorder1 = Recorder1Page;
  myphoto:any;
  recording:boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  audioListPlaying: boolean[] = [];
  playing:boolean = true;
  constructor(public navCtrl: NavController, private camera:Camera, private media:Media, private file:File, public platform:Platform) {

  }
  getAudioList(){
  	if(localStorage.getItem("audiolist")){
  		this.audioList = JSON.parse(localStorage.getItem("audiolist"));
  		console.log(this.audioList);
  	}
  }

  ionViewWillEnter(){
  	this.getAudioList();
  }

  startRecord(){
  	if(this.platform.is('ios')){
  		this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
  		this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
  		this.audio = this.media.create(this.filePath);
  	}
  	else if (this.platform.is('android')) {
	    this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
	    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
	    this.audio = this.media.create(this.filePath);
	  }
	this.audio.startRecord();
	this.recording = true;

  }

  stopRecord(){
  	this.audio.stopRecord();
  	let data = { filename: this.fileName };
	this.audioList.push(data);
	localStorage.setItem("audiolist", JSON.stringify(this.audioList));
	this.recording = false;
	this.audioListPlaying.push(false);
	this.getAudioList();
  }

  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } 
    else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.playing = true;
    this.audio.setVolume(0.8);
    this.audioListPlaying[idx] = true;
  }

  pauseAudio(file,idx) {
    this.audio.pause();
    this.audioListPlaying[idx] = false;
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
