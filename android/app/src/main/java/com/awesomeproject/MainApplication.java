package com.awesomeproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.realm.react.RealmReactPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.audioStreaming.ReactNativeAudioStreamingPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RealmReactPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeAudioPackage(),
            new RNFetchBlobPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioStreamingPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
