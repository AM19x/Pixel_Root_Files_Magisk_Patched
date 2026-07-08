# Pixel Root Files - Magisk Patched Boot Images for Google Pixel

[![GitHub stars](https://img.shields.io/github/stars/AM19x/Pixel_Root_Files_Magisk_Patched?style=social)](https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AM19x/Pixel_Root_Files_Magisk_Patched?style=social)](https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched/network/members)
[![GitHub release](https://img.shields.io/github/v/release/AM19x/Pixel_Root_Files_Magisk_Patched)](https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched/releases)
[![GitHub issues](https://img.shields.io/github/issues/AM19x/Pixel_Root_Files_Magisk_Patched)](https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<div align="center">
  <img src="https://img.shields.io/badge/Pixel_Root_Files-Community_Driven-58A6FF?style=for-the-badge&logo=android&logoColor=white" alt="Pixel Root Files">
  <br>
  <img src="https://img.shields.io/badge/Magisk-30.7-00A3E0?style=for-the-badge&logo=magisk&logoColor=white" alt="Magisk 30.7">
  <img src="https://img.shields.io/badge/Powered_By-GSM6_Pixel_Tool_Pro-6A0DAD?style=for-the-badge&logo=github&logoColor=white" alt="Powered By GSM6 Pixel Tool Pro">
</div>

---

## 📋 About This Repository

This repository contains **Magisk patched boot and init_boot images** for all Google Pixel devices. The files are automatically collected from the community through **[GSM6 Pixel Tool Pro](https://gsm6.com/gsm6-pixel-tool-pro/)** – the world's first online server-based root tool for Google Pixel.

### 🔥 Why This Repo Exists

| Problem | Solution |
|---------|----------|
| Searching for root files after every OTA update | **One-click download** from this repo |
| Mismatched build numbers and boot images | **Build-specific** files organized by device |
| Outdated root methods and broken links | **Community-verified** files updated daily |
| Time wasted hunting for working Magisk patches | **All files in one place**, always available |

---

## 🚀 How to Use These Files

### Method 1: Use GSM6 Pixel Tool Pro (Recommended)

**The easiest way to root your Pixel:**

1. **Download** [GSM6 Pixel Tool Pro](https://gsm6.com/gsm6-pixel-tool-pro/)
2. **Select** your device build
3. **Click** "Root (Online)" – the tool automatically finds and downloads the right file
4. **Root** your device in minutes

<div align="center">
  <a href="https://gsm6.com/gsm6-pixel-tool-pro/">
    <img src="https://img.shields.io/badge/⬇️_Download_GSM6_Pixel_Tool_Pro-58A6FF?style=for-the-badge&logo=windows&logoColor=white" alt="Download GSM6 Pixel Tool Pro">
  </a>
</div>

### Method 2: Manual Download

1. Find your device codename and build number
2. Download the `Patched_*.zip` file from this repo
3. Extract the `.img` file
4. Flash using fastboot:
   ```bash
   # For Pixel 6 and older (boot partition)
   fastboot flash boot patched_boot.img
   
   # For Pixel 7, 8, 9 series (init_boot partition)
   fastboot flash init_boot patched_init_boot.img
   
   # Optional: Wipe data
   fastboot -w
   ```

> **⚠️ IMPORTANT:** Always backup your data before flashing. These files are provided for educational and legitimate repair purposes only.

---

## 📊 Repository Structure

```
Pixel_Root_Files_Magisk_Patched/
├── bluejay/                    # Device codename (Pixel 6a)
│   └── cp1a.260405.005/        # Build number
│       ├── boot.zip            # Stock boot image (backup)
│       └── Patched_cp1a.260405.005.zip  # Patched Magisk image
├── panther/                    # Pixel 7
│   └── ap1a.240305.019.a1/
│       ├── init_boot.zip       # Stock init_boot (backup)
│       └── Patched_ap1a.240305.019.a1.zip
├── shiba/                      # Pixel 8
│   └── ap1a.240305.019.a1/
│       ├── init_boot.zip
│       └── Patched_ap1a.240305.019.a1.zip
└── ... (all Pixel devices)
```

### 📱 Supported Devices

| Series | Codenames | Partition |
|--------|-----------|-----------|
| **Pixel 10** | frankel, blazer, mustang, rango, stallion | init_boot |
| **Pixel 9** | tokay, caiman, komodo, comet, tegu | init_boot |
| **Pixel 8** | shiba, husky, akita | init_boot |
| **Pixel Fold** | felix, tangorpro | init_boot |
| **Pixel 7** | panther, cheetah, lynx | init_boot |
| **Pixel 6** | oriole, raven, bluejay | boot |
| **Pixel 5** | redfin, barbet | boot |
| **Pixel 4** | flame, coral | boot |
| **Pixel 4a** | bramble, sunfish | boot |
| **Pixel 3** | crosshatch, blueline | boot |
| **Pixel 3a** | sargo, bonito | boot |
| **Pixel 2** | taimen, walleye | boot |
| **Pixel 1** | marlin, sailfish | boot |
| **Pixel Watch** | rhapsody, eos, swift, aurora, nova | boot |
| **Pixel Tablet** | tangor, t6 | boot |

> **Note:** Pixel 7, 8, 9, 10 series use `init_boot` partition. Pixel 6 and older use `boot` partition.

---

## 🤝 How to Contribute

### Upload Your Root File (Help Others!)

When you root your Pixel using **GSM6 Pixel Tool Pro**, the tool automatically offers to upload your patched file to this repository.

**How it works:**

1. **Root your device** using the Direct Root method
2. **Click "Yes"** when the tool asks to upload
3. **Your file** becomes available for everyone within a few hours
4. **Thousands of users** benefit from your contribution

### Why Contribute?

| Benefit | Description |
|---------|-------------|
| **Help Others** | Save time for thousands of Pixel users |
| **Build Reputation** | Your contributions help the community |
| **Keep the Database Alive** | Fresh files for new builds |
| **Support Open Source** | Keep root access free for everyone |

<div align="center">
  <a href="https://gsm6.com/gsm6-pixel-tool-pro/#server-backup-feature">
    <img src="https://img.shields.io/badge/📤_Contribute_Now-2EA043?style=for-the-badge&logo=github&logoColor=white" alt="Contribute Now">
  </a>
</div>

---

## 🔧 Technical Details

### File Types

| File | Description | Size |
|------|-------------|------|
| `boot.zip` | Stock boot image (backup) | ~14 MB |
| `init_boot.zip` | Stock init_boot image (backup) | ~3 MB |
| `Patched_*.zip` | Magisk patched image | ~14 MB / ~3 MB |

### Partition Reference

| Device | Partition | Flash Command |
|--------|-----------|---------------|
| Pixel 6 Series & older | boot | `fastboot flash boot` |
| Pixel 7, 8, 9, 10 Series | init_boot | `fastboot flash init_boot` |
| Pixel Fold Series | init_boot | `fastboot flash init_boot` |

### Magisk Version

All files are patched with **Magisk 30.7** – the latest stable version.

---

## 📦 JSON API

This repository automatically generates a JSON file with all available root files:

```
https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/pixel-root-files.json
```

### JSON Structure

```json
{
  "source": {
    "name": "GSM6 Pixel Tool Pro",
    "url": "https://gsm6.com/gsm6-pixel-tool-pro/",
    "repo": "https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched"
  },
  "community": {
    "contribute_url": "https://gsm6.com/gsm6-pixel-tool-pro/#server-backup-feature",
    "tool_name": "GSM6 Pixel Tool Pro",
    "tool_download": "https://gsm6.com/gsm6-pixel-tool-pro/",
    "how_to_contribute": [
      "1. Download and install GSM6 Pixel Tool Pro",
      "2. Root your Pixel device using the Direct Root method",
      "3. After successful root, the tool will ask to upload the file",
      "4. Click 'Yes' to share your root file with the community"
    ],
    "magisk_version": "30.7",
    "support_link": "https://gsm6.com/support/"
  },
  "generated_at": "2026-07-08T12:00:00.000Z",
  "total_devices": 15,
  "total_builds": 45,
  "total_files": 90,
  "devices": {
    "bluejay": {
      "cp1a.260405.005": [
        {
          "filename": "boot.zip",
          "url": "https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/bluejay/cp1a.260405.005/boot.zip",
          "size": 14390633,
          "size_mb": "13.72"
        },
        {
          "filename": "Patched_cp1a.260405.005.zip",
          "url": "https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/bluejay/cp1a.260405.005/Patched_cp1a.260405.005.zip",
          "size": 14731388,
          "size_mb": "14.05"
        }
      ]
    }
  }
}
```

### Use the JSON in Your Projects

```javascript
// Fetch all Pixel root files
fetch('https://raw.githubusercontent.com/AM19x/Pixel_Root_Files_Magisk_Patched/main/pixel-root-files.json')
  .then(response => response.json())
  .then(data => {
    console.log(`📱 ${data.total_devices} devices`);
    console.log(`📦 ${data.total_builds} builds`);
    console.log(`📄 ${data.total_files} files`);
  });
```

---

## 📡 Auto-Updates

This repository is automatically updated every **6 hours** via GitHub Actions:

- New files are added automatically
- The JSON API is regenerated
- All changes are committed by the **GSM6 Bot**

---

## 🔗 Related Links

| Resource | Link |
|----------|------|
| **GSM6 Pixel Tool Pro** | [Download](https://gsm6.com/gsm6-pixel-tool-pro/) |
| **GSM6 Official Website** | [gsm6.com](https://gsm6.com) |
| **Support Forum** | [forum.gsm6.com](https://forum.gsm6.com) |
| **Telegram Community** | [Join Channel](https://t.me/LearnMobileSoftware) |
| **YouTube Tutorials** | [Watch Videos](https://youtube.com/@gsm6) |

---

## ⚠️ Legal Disclaimer

<div align="center">
  <img src="https://img.shields.io/badge/⚠️_Important_Disclaimer-FF6B6B?style=for-the-badge" alt="Important Disclaimer">
</div>

> **These files are provided for educational, diagnostic, and legitimate repair purposes only.**
>
> - **Only use on devices you own** or have proper authorization to service
> - **Rooting may void your warranty** – proceed at your own risk
> - **Always backup your data** before flashing
> - **Verify file integrity** before flashing
> - **The author is not responsible** for any damage, data loss, or legal issues resulting from misuse
> - **Comply with all applicable laws** in your jurisdiction
> - **IMEI repair and CPID modifications** may be illegal in some countries

By using these files, you acknowledge that you understand and accept these terms.

---

## 📄 License

This repository is licensed under the **MIT License** – you are free to use, modify, and distribute the files, provided you give appropriate credit to [GSM6](https://gsm6.com) and [GSM6 Pixel Tool Pro](https://gsm6.com/gsm6-pixel-tool-pro/).

---

## 🙏 Credits

<div align="center">

### Built by the Community, Powered by GSM6

[![GSM6](https://img.shields.io/badge/GSM6-Your_Trusted_Source_for_Mobile_Software-58A6FF?style=for-the-badge)](https://gsm6.com)

</div>

| Contributor | Role |
|-------------|------|
| **[Abdul Malik (AM)](https://gsm6.com/author)** | Developer & Maintainer |
| **[GSM6](https://gsm6.com)** | Platform & Infrastructure |
| **[GSM6 Pixel Tool Pro](https://gsm6.com/gsm6-pixel-tool-pro/)** | File Collection Tool |
| **The Community** | Root File Contributors |

### Special Thanks

- **Magisk Team** – For the amazing Magisk tool
- **Google** – For creating the Pixel devices
- **All Contributors** – Every uploaded file helps someone

---

<div align="center">

### ⭐ Star This Repository ⭐

If this repository helped you, please give it a star! It helps others find these files.

[![GitHub stars](https://img.shields.io/github/stars/AM19x/Pixel_Root_Files_Magisk_Patched?style=social)](https://github.com/AM19x/Pixel_Root_Files_Magisk_Patched/stargazers)

**Made with ❤️ by the GSM6 Community**

[![GSM6](https://img.shields.io/badge/GSM6-Your_Trusted_Source_for_Mobile_Software-58A6FF?style=for-the-badge)](https://gsm6.com)

</div>
