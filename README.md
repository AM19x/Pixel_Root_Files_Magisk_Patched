# PixelRootFiles
Google Pixel Root files collection for all models.. started from Pixel 6 to 9 series all modesls

## File Types
Boot.img patched by magsik for pixel 6 series or older device
init_boot.img Patched by magisk for pixel 7 , 8, 9 series or newer

### How to use?
1. Unlock the bootloader of your pxel device
2. download root file by matching with build number
3. install android usb drivers
4. connect phone with computer in fastboot mode
5. download & extract platform tools & type cmd in address bar to opem command prompt in that directory
6. use fastboot command if boot.img then "fastboot flash boot {drag & drop patched boot.img or type location}"& if init_boot.img then "fastboot flash init_boot {patched init_boot.img location or drag & drop} & hit enter
7. wipe daata "fastboot -w"or you can boot into the recovery mode & factory reset
8. done.. your phone is rooted with magisk 30.7
