---
type: "youtube"
isFreeResource: true
resourceType: "guide"
resourceLabel: "Free Guide"
resourceCategory: "WordPress"
title: "Install WordPress Locally with XAMPP: Step-by-Step Guide"
seoTitle: "Install WordPress Locally with XAMPP: Step-by-Step Guide"
description: "Install WordPress locally with XAMPP on Windows. Follow the setup for Apache, MySQL, phpMyAdmin, htdocs, the database, and WordPress admin login."
category: "WordPress"
date: "2026-06-05"
updatedDate: "2026-07-14"
slug: "how-to-install-wordpress-locally-using-xampp"
primaryKeyword: "install WordPress locally with XAMPP"
keywordCluster:
  - install WordPress on localhost
  - XAMPP WordPress installation
  - WordPress local development
  - phpMyAdmin WordPress database
servicePage: "/services/wordpress-websites"
youtubeUrl: "https://youtu.be/JPdXXY-Sp2w"
youtubeEmbedUrl: "https://www.youtube.com/embed/JPdXXY-Sp2w"
thumbnail: "https://img.youtube.com/vi/JPdXXY-Sp2w/maxresdefault.jpg"
thumbnailAlt: "XAMPP and WordPress local installation workflow shown in the beginner tutorial"
tags:
  - WordPress
  - XAMPP WordPress installation
  - Install WordPress on localhost
  - WordPress local development
  - phpMyAdmin WordPress database
  - Apache MySQL WordPress
  - htdocs WordPress setup
  - Localhost WordPress tutorial
relatedPosts:
  - wordpress-website-checklist
  - wordpress-website-launch-checklist
  - fix-bad-website-design-wordpress-elementor
featured: true
---

## Install WordPress locally before you start building

If you are trying to install WordPress locally but XAMPP, phpMyAdmin, htdocs, and localhost all feel confusing, this guide will show you the clean way to set everything up.

It is for Windows beginners who want a private WordPress installation for practice, theme testing, or a client-site draft. You will set up Apache and MySQL, create the database in phpMyAdmin, place WordPress in `htdocs`, complete the installer, and verify the local site and admin login.

## What You Will Learn

- How to download and install XAMPP
- How to start Apache and MySQL
- What Apache does in a local WordPress setup
- What MySQL does in a local WordPress setup
- How to open localhost correctly
- How to use phpMyAdmin
- How to create a WordPress database
- How to copy WordPress files into htdocs
- Why the database name must match the WordPress setup
- Why XAMPP uses root as the default database username
- Why the password is empty on local XAMPP
- How WordPress files and the database connect

## Tools Used

- XAMPP
- Apache
- MySQL
- phpMyAdmin
- WordPress
- Windows
- Localhost

## Watch the Video Tutorial

Watch the full video tutorial here: [How to Install WordPress Locally Using XAMPP](https://youtu.be/JPdXXY-Sp2w).

The video embed appears near the top of this page so you can follow the XAMPP WordPress installation visually while using this written guide as a checklist.

## Step-by-Step Guide

### Step 1: Download and Install XAMPP

Timestamp: 02:15

Start by downloading [XAMPP for Windows from Apache Friends](https://www.apachefriends.org/download.html). XAMPP gives you the local server tools WordPress needs to run on your computer.

During installation, keep the default setup simple. For a beginner WordPress setup on Windows with XAMPP, the most important parts are Apache, MySQL, and phpMyAdmin.

### Step 2: Open XAMPP Control Panel

After installing XAMPP, open the XAMPP Control Panel. This is where you start and stop the local server services.

Think of the control panel as the switchboard for your local WordPress website. If Apache or MySQL is not running, WordPress will not load correctly.

### Step 3: Start Apache and MySQL

Timestamp: 03:30

Start Apache and MySQL from the XAMPP Control Panel.

Apache acts like the local web server. It allows your browser to open WordPress through localhost. MySQL stores the WordPress database, including pages, posts, users, settings, and other site information.

For a working XAMPP Apache MySQL WordPress setup, both services need to be running.

### Step 4: Open Localhost

Open your browser and go to:

```txt
http://localhost/
```

Localhost means your own computer. When Apache is running, localhost opens the local server instead of a live website on the internet.

If localhost opens correctly, XAMPP is ready for the next step.

### Step 5: Open phpMyAdmin

Timestamp: 05:20

Open phpMyAdmin from the XAMPP Control Panel or visit:

```txt
http://localhost/phpmyadmin/
```

phpMyAdmin is the browser tool you use to manage MySQL databases. For WordPress local development, phpMyAdmin is where you create the empty database that WordPress will connect to during installation.

### Step 6: Create a WordPress Database

Timestamp: 04:22

Inside phpMyAdmin, create a new database for your local WordPress website. Use a simple name with no spaces, such as:

```txt
wordpress_local
```

The database name matters because WordPress will ask for it during setup. If the name you type in WordPress does not match the database name in phpMyAdmin, WordPress cannot connect.

### Step 7: Download WordPress

Download WordPress from the [official WordPress download page](https://wordpress.org/download/). You will get a compressed file that contains the WordPress core files.

After downloading, extract the files so you can copy the WordPress folder into XAMPP.

### Step 8: Copy WordPress Files Into htdocs

Timestamp: 07:30

Find the XAMPP `htdocs` folder. On a typical Windows installation, it is often located here:

```txt
C:\xampp\htdocs
```

Copy your WordPress folder into `htdocs`. The folder name becomes part of your local website URL. For example, if the folder is named `mywebsite`, your local WordPress installer will open at:

```txt
http://localhost/mywebsite/
```

Folder naming matters. Keep it short, lowercase, and easy to type.

### Step 9: Open the Local WordPress Installer

Timestamp: 06:11

In your browser, open the local WordPress folder through localhost. If your folder is named `mywebsite`, visit:

```txt
http://localhost/mywebsite/
```

WordPress should load the installer. This means Apache can read the WordPress files from `htdocs`.

### Step 10: Connect WordPress to the Database

Timestamp: 08:45

WordPress will ask for database details. For a default local XAMPP setup, use:

- Database name: the name you created in phpMyAdmin
- Username: root
- Password: leave empty
- Database host: localhost
- Table prefix: keep the default unless you know why you are changing it

XAMPP uses `root` as the default local database username. On a normal local XAMPP setup, the password is empty. This is for local development only, not a live production website.

### Step 11: Create the WordPress Admin Account

Timestamp: 10:00

After the database connection works, WordPress will ask for your site title, admin username, password, and email address.

Create an admin account you can remember. This account is what you will use to log in to the local WordPress dashboard and build the website.

### Step 12: Test the Local WordPress Website

Timestamp: 11:10

After installation, open the local site and log in to the dashboard. Check both the front end and the admin area.

By this stage, your WordPress files in `htdocs` and your MySQL database in phpMyAdmin should be connected. That connection is the core idea behind installing WordPress on localhost.

## Common Problems and Fixes

### Apache Does Not Start

If Apache does not start, another app may already be using the same port. Close apps that may be using port 80 or 443, then try starting Apache again from the XAMPP Control Panel.

### MySQL Does Not Start

If MySQL does not start, restart XAMPP and check whether another database service is already running. WordPress needs MySQL running before it can connect to the database.

### phpMyAdmin Does Not Open

If phpMyAdmin does not open, confirm that Apache and MySQL are both running. Then open `http://localhost/phpmyadmin/` directly in your browser.

### Localhost Opens the Wrong Page

If localhost opens a page you did not expect, check the folder name inside `htdocs`. Your WordPress site URL depends on that folder name.

### WordPress Cannot Connect to the Database

If WordPress cannot connect to the database, check the database name, username, password, and host. For default local XAMPP, the username is `root`, the password is empty, and the host is `localhost`.

### Database Name Does Not Match

The database name in WordPress must match the database name you created in phpMyAdmin. Even a small spelling difference can stop the connection.

### Confusion Around Root Username

In local XAMPP, `root` is the default MySQL username. Beginners often try to create a new username too early, but for a basic local setup, `root` is the normal option.

### Confusion Around Empty Password

On a default local XAMPP setup, the database password is empty. Leave the password field blank during WordPress setup unless you manually changed the MySQL password.

### WordPress Folder Copied Incorrectly Into htdocs

Make sure you copied the actual WordPress files into the correct folder. If you accidentally create an extra nested folder, your URL may not open the installer where you expect.

## Timestamps

- 00:00 Intro and what we are building
- 00:33 Folder naming best practices
- 02:15 Installing XAMPP on Windows
- 03:30 Starting Apache and MySQL
- 04:22 Creating the WordPress database
- 05:20 Understanding phpMyAdmin, root, and localhost
- 06:11 Installing WordPress locally
- 07:30 Copying WordPress files into htdocs
- 08:45 Connecting WordPress to the database
- 10:00 Creating the WordPress admin account
- 11:10 Testing the local WordPress website
- 12:00 Final recap and outro

## Final Result

By the end of this tutorial, you should have a working local WordPress website running on XAMPP and connected to a local MySQL database.

You should also understand the basic relationship between Apache, MySQL, phpMyAdmin, localhost, htdocs, the root user, the empty local password, and the WordPress installer.

## Continue Learning

- [Use the WordPress website checklist before a full build](/blog/wordpress-website-checklist)
- [Review the WordPress launch checklist before going live](/blog/wordpress-website-launch-checklist)
- [Fix a weak WordPress design with Elementor](/blog/fix-bad-website-design-wordpress-elementor)
- [Use Claude AI with Elementor and WordPress MCP](/blog/claude-ai-elementor-wordpress-mcp-workflow)

## Build and test locally before launch

Learning how to install WordPress locally using XAMPP is one of the best first steps for WordPress beginners. It gives you a private place to practice, test ideas, build client drafts, and understand how WordPress files and databases work before moving a website live.

If you want more practical WordPress, web design, and website setup tutorials, watch the video on Aning Design Lab and explore more guides on [aningdesign.com](https://www.aningdesign.com/).

You can also contact AningDesign through [https://www.aningdesign.com/](https://www.aningdesign.com/), join the Telegram channel at [https://t.me/AningDzn](https://t.me/AningDzn), or support the work at [https://selar.com/showlove/aningdesignlab](https://selar.com/showlove/aningdesignlab).
