#!/usr/bin/env python3
"""
Sync community root files from tmp.ninja to GitHub repo
This script runs in GitHub Actions to process uploaded files
"""

import os
import re
import json
import base64
import requests
import subprocess
from pathlib import Path
from datetime import datetime

# Configuration
REPO_ROOT = Path(os.getcwd())
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')

# GitHub API endpoints
GITHUB_API = "https://api.github.com"
REPO_OWNER = "AM19x"
REPO_NAME = "Pixel_Root_Files_Magisk_Patched"
REPO_API = f"{GITHUB_API}/repos/{REPO_OWNER}/{REPO_NAME}/contents"

def get_existing_files():
    """Get list of existing files in the repo"""
    try:
        # Get all codename folders
        url = f"{REPO_API}"
        headers = {
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return []
        
        items = response.json()
        existing_files = []
        
        for item in items:
            if item['type'] == 'dir':
                codename = item['name']
                # Get builds for this codename
                builds_url = f"{REPO_API}/{codename}"
                builds_response = requests.get(builds_url, headers=headers)
                if builds_response.status_code == 200:
                    for build in builds_response.json():
                        if build['type'] == 'dir':
                            existing_files.append(f"{codename}/{build['name']}")
        
        return existing_files
    except Exception as e:
        print(f"Error getting existing files: {e}")
        return []

def process_uploaded_files(file_list):
    """Process files that need to be uploaded"""
    existing = get_existing_files()
    
    for file_info in file_list:
        codename = file_info.get('codename')
        build = file_info.get('build')
        filename = file_info.get('filename')
        download_url = file_info.get('download_url')
        
        if not all([codename, build, filename, download_url]):
            continue
        
        # Check if this build already exists
        build_path = f"{codename}/{build}"
        if build_path in existing:
            print(f"✅ {build_path} already exists, skipping")
            continue
        
        print(f"📥 Processing: {codename}/{build}")
        
        # Download the file
        try:
            response = requests.get(download_url)
            if response.status_code != 200:
                print(f"❌ Failed to download: {download_url}")
                continue
            
            file_content = response.content
            file_content_base64 = base64.b64encode(file_content).decode('utf-8')
            
            # Determine if boot or init_boot by checking filename or partition
            partition = "boot"
            if "init_boot" in filename or "init_boot" in download_url:
                partition = "init_boot"
            
            # Prepare files to upload
            # 1. Stock file
            stock_filename = f"{partition}.zip"
            stock_path = f"{codename}/{build}/{stock_filename}"
            
            # 2. Patched file
            patched_filename = f"patched_{build}.zip"
            if partition == "boot":
                patched_filename = f"patched-{build}.zip"
            patched_path = f"{codename}/{build}/{patched_filename}"
            
            # Create commit
            commit_message = f"Add root files for {codename} build {build}"
            
            # Get latest commit SHA
            main_url = f"{GITHUB_API}/repos/{REPO_OWNER}/{REPO_NAME}/git/refs/heads/main"
            main_response = requests.get(main_url, headers={
                "Authorization": f"token {GITHUB_TOKEN}",
                "Accept": "application/vnd.github.v3+json"
            })
            base_sha = main_response.json()['object']['sha']
            
            # Create blobs for each file
            files_to_commit = []
            
            # Stock file
            stock_blob_url = f"{GITHUB_API}/repos/{REPO_OWNER}/{REPO_NAME}/git/blobs"
            stock_blob_data = {
                "content": file_content_base64,
                "encoding": "base64"
            }
            stock_blob_response = requests.post(stock_blob_url, 
                json=stock_blob_data,
                headers={"Authorization": f"token {GITHUB_TOKEN}"}
            )
            stock_sha = stock_blob_response.json()['sha']
            
            # Patched file (same content as stock for now, but we'll use the same)
            # TODO: Extract patched file from zip
            
            # Create tree
            tree_data = [
                {
                    "path": stock_path,
                    "mode": "100644",
                    "type": "blob",
                    "sha": stock_sha
                }
            ]
            
            tree_url = f"{GITHUB_API}/repos/{REPO_OWNER}/{REPO_NAME}/git/trees"
            tree_response = requests.post(tree_url, 
                json={"tree": tree_data, "base_tree": base_sha},
                headers={"Authorization": f"token {GITHUB_TOKEN}"}
            )
            tree_sha = tree_response.json()['sha']
            
            # Create commit
            commit_data = {
                "message": commit_message,
                "tree": tree_sha,
                "parents": [base_sha]
            }
            commit_url = f"{GITHUB_API}/repos/{REPO_OWNER}/{REPO_NAME}/git/commits"
            commit_response = requests.post(commit_url,
                json=commit_data,
                headers={"Authorization": f"token {GITHUB_TOKEN}"}
            )
            commit_sha = commit_response.json()['sha']
            
            # Update main branch
            ref_url = f"{GITHUB_API}/repos/{REPO_OWNER}/{REPO_NAME}/git/refs/heads/main"
            ref_data = {"sha": commit_sha}
            requests.post(ref_url,
                json=ref_data,
                headers={"Authorization": f"token {GITHUB_TOKEN}"}
            )
            
            print(f"✅ Successfully added: {codename}/{build}")
            
        except Exception as e:
            print(f"❌ Error processing {codename}/{build}: {e}")

def main():
    print("🔄 Starting community file sync...")
    
    # This is where you'd fetch the list of uploaded files
    # For now, this is a placeholder - you'll need to implement
    # the actual file tracking mechanism
    
    # Example: Read from a tracking file or API
    tracking_file = REPO_ROOT / ".github" / "tmp_tracking.json"
    
    if tracking_file.exists():
        with open(tracking_file, 'r') as f:
            file_list = json.load(f)
        process_uploaded_files(file_list)
    else:
        print("⚠️ No tracking file found.")
        print("📝 To implement fully, you need to:")
        print("   1. Track files uploaded to tmp.ninja")
        print("   2. Store file info in a tracking file")
        print("   3. This script will then process them")
        print("   4. After processing, clear the tracking file")
    
    print("✅ Sync completed!")

if __name__ == "__main__":
    main()
