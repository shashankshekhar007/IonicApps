import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

/**
 * Generated class for the Recorder1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recorder1',
  templateUrl: 'recorder1.html',
})
export class Recorder1Page {
  
  recording:boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  audioListPlaying: boolean[] = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private media:Media, private file:File, public platform:Platform) {
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
    //this.playing = true;
    this.audio.setVolume(0.8);
    this.audioListPlaying[idx] = true;
  }

  pauseAudio(file,idx) {
    this.audio.pause();
    this.audioListPlaying[idx] = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Recorder1Page');
  }

}
