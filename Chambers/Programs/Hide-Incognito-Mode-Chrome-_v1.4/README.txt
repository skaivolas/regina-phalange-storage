///
This tiny and efficient extension can help you use certain websites which don't allow incognito mode. Some websites
will not let you read their content while using private / incognito mode (unless you pay them a fee), and this extension can help you fool them
into thinking that you're not actually using incognito mode, even though you are!
///

- This will not work on all websites, but should work on most websites *if they tell you they do not allow private or incognito mode*.
- This extension will only activate the incognito-cloaking behavior on incognito browser tabs.
- You must still activate incognito tabs yourself.

IMPORTANT - This extension requires special installation.

///
You install it the same way as any other extension, but after you install it you MUST change the extension
configuration to allow this extension to run in private mode. If you don't do this, it won't work! To configure it, goto
Menu > More Tools > Extensions, then find this extension and click the "More Details" button. Then, enable "Allow in incognito".
See config screenshots at http://rehfeld.us/browser-extensions/hide-incognito-mode/setup.html
///

How it works (technical stuff):
///
Chrome / Webkit does not allow the window.RequestFileSystem / window.webkitRequestFileSystem API to operate properly
in private mode, and many websites use this fact as a way to detect if you're in private mode. Specifically, websites just try to
create a temporary file using the api and then monitor whether the success or error callback gets called. However, recently (mostly since Chrome 74)
websites are now sometimes looking at the disk storage quota returned by StorageManager.estimate() because the value differs when
running in incognito, and is capped at 120MB when running in incognito.
///

///
This extension will install a shim to overwrite the native implementation of window.RequestFileSystem with new code that will always call the success callback.
It does not actually attempt to emulate the api and allow writing to the filesystem - it only calls the success callback and that's it.
It's very unlikely, but it may break some websites which legitimately try to use the filesystem api while you're in private mode.
While the api doesn't even work in private mode, it's possible the web page has an obscure dependency on some part of the api's behavior that may get
modified by the shim. But again, it's very unlikely.
///

///
As for the disk storage quota sniffing - Chrome is likely to change this soon so that the quota doesn't differ in incognito, closing this
incognito detection loophole that websites currently exploit. But for now we will patch it too by installing a shim
for StorageManager.estimate() aka navigator.storage.estimate(). The shim will modify the StorageEstimate object returned, faking the quota to say that it is 120MB + 1 more byte.
Currently, the incognito mode storage limit is 120MB, and most websites just look for 120MB, so adding 1 more byte should fool them, while minimizing the chance
of incompatibilities by making the client think they have more disk space than they really do.
///

///
In the future, I may add the ability to
whitelist / blacklist websites, so that you can choose which sites or urls this extensions will activate for. For now,
Chrome allows you to activate extensions on a per-site basis via the extension "Site access" setting.
///

Tip - Users that enjoy this extension may also like other extensions which perform similar functionalities, such as Nano Defender + Nano Adblocker (but make sure to enable "allow in incognito").

---------
Credits
---------
Icons by oNline Web Fonts http://www.onlinewebfonts.com

---------
Change log
---------
V1.4 - Sep 7, 2019 Improved setup instructions.
V1.3 - Aug 22, 2019 Removed storage permission.
V1.2 - Aug 21, 2019 Added new patch to prevent disk storage quota sniffing as an incognito detection method. This has become popular on some websites since Chrome 74.
V1.1 - Only show setup instructions on initial install.
V1.0 - Initial release.