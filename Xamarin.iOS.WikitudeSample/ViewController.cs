using System;
using Foundation;
using UIKit;
using Wikitude.Architect;

namespace Xamarin.iOS.WikitudeSample
{
	public partial class ViewController : UIViewController
	{
		protected WTArchitectView arView;
		protected WTNavigation architectWorldNavigation;

		protected ViewController(IntPtr handle) : base(handle)
		{
			// Note: this .ctor should not contain any initialization logic.
		}
		 
		public override void ViewDidLoad()
		{
			base.ViewDidLoad();
			NSError error;
			if(WTArchitectView.IsDeviceSupportedForRequiredFeatures(WTFeatures.WTFeature_2DTracking | WTFeatures.Geo,out error))
			{
				arView = new WTArchitectView();
				arView.Frame = UIScreen.MainScreen.Bounds;

				// ライセンスキーについては、SecrecKey.csに定義されていますが、Githubでは、公開されていません。別途定義してください。
				//public class SecretKey{
				//	public static string WT_LICENSE_KEY = "XXXXXXXXXX";
				//}
				arView.SetLicenseKey(SecretKey.WT_LICENSE_KEY);

				var url = NSBundle.MainBundle.BundleUrl.AbsoluteString + "ARchitectWorld/index.html";
				architectWorldNavigation = arView.LoadArchitectWorldFromURL(new NSUrl(url), WTFeatures.WTFeature_2DTracking | WTFeatures.Geo);

				View.AddSubview(arView);
			}
		}


		public override void ViewDidAppear(bool animated)
		{
			base.ViewDidAppear(animated);

			if (arView != null)
			{
				arView.Start(null,null);
			}
		}

		public override void ViewWillDisappear(bool animated)
		{
			base.ViewWillDisappear(animated);

			if (arView != null)
				arView.Stop();
		}

		public override void DidReceiveMemoryWarning()
		{
			base.DidReceiveMemoryWarning();
			// Release any cached data, images, etc that aren't in use.
		}

		// 全部の回転を許可する
		public override bool ShouldAutorotate()
		{
			return true;
		}

		public override UIInterfaceOrientationMask GetSupportedInterfaceOrientations()
		{
			return UIInterfaceOrientationMask.All;
		}
		// 回転に応じて、WTArchitectViewを回転させる
		public override void WillAnimateRotation(UIInterfaceOrientation toInterfaceOrientation, double duration)
		{
			//base.WillAnimateRotation(toInterfaceOrientation, duration);
			arView.SetShouldRotateToInterfaceOrientation(true, toInterfaceOrientation);
		}
	}
}

