---
title: "Idea to App MVP Part 2: Deploy AI-Generated Code with Firebase Hosting and a Custom Domain"
description: "Learn how to deploy AI-generated website code live with Firebase Hosting, including Firebase CLI setup, hosting initialization, custom domain setup, DNS records, verification, and final deployment checks."
category: "AI Workflows"
date: "2026-07-03"
slug: "idea-to-app-mvp-firebase-hosting-custom-domain"
youtubeUrl: "https://youtu.be/4OYUpTQG08w"
youtubeEmbedUrl: "https://www.youtube.com/embed/4OYUpTQG08w"
thumbnail: "https://img.youtube.com/vi/4OYUpTQG08w/maxresdefault.jpg"
thumbnailAlt: "Firebase Hosting tutorial showing how to deploy AI-generated website code with a custom domain"
tags:
  - Idea to App MVP
  - Firebase Hosting
  - AI website builder
  - Custom domain setup
  - DNS setup
  - React website deployment
  - Firebase CLI
  - AI coding workflow
featured: true
---

# Idea to App MVP Part 2: Deploy AI-Generated Code with Firebase Hosting and a Custom Domain

## Introduction

In this part of the Idea to App MVP series, you will learn how to take AI-generated website code and deploy it live using Firebase Hosting with a custom domain. This is the stage where the project stops living only inside your code editor and becomes a real website people can visit.

This tutorial walks through the practical Firebase Hosting workflow, including preparing the project, installing Firebase, adding the Firebase project, initializing hosting, connecting a custom domain, editing DNS records, waiting for verification, and checking the final result.

Instead of only showing the polished result, this video keeps the important real-world parts of the process. You see the setup steps, the waiting time, the DNS work, the mistakes, and the fixes that often happen when turning an AI-built project into a live MVP.

## What You Will Learn

- How to move from AI-generated code to a live website
- How Firebase Hosting fits into an MVP workflow
- How to install Firebase tools for a web project
- How to log in with the Firebase CLI
- How to add and select a Firebase project
- How to initialize Firebase Hosting
- How to configure hosting for a React-style single-page app
- How to connect a custom domain to Firebase Hosting
- How to verify domain ownership
- How to edit DNS records for Firebase Hosting
- How to handle waiting time, verification, and final checks

## Tools Used

- AI-generated website code
- Firebase Hosting
- Firebase CLI
- Firebase Console
- Domain DNS settings
- Custom domain records
- React-style single-page app hosting
- Repomix for project context

## Watch the Video Tutorial

Watch the full video tutorial here: [Idea to App MVP Part 2: Deploy AI-Generated Code with Firebase Hosting and a Custom Domain](https://youtu.be/4OYUpTQG08w).

Click this link to monitor your finance: [https://assetrax.online/](https://assetrax.online/).

## Idea to App MVP Series Context

This video is part of a larger Idea to App MVP workflow. The goal of the series is to show how an idea can move through AI-assisted planning, frontend generation, hosting, custom domain setup, authentication, database connection, and real app functionality.

This part focuses on deployment. Before adding backend features like login and database storage, the website needs a stable live URL. Firebase Hosting is useful here because it gives beginners a direct way to publish a web project, connect a custom domain, and prepare the app for the next Firebase services.

## Step-by-Step Firebase Hosting Workflow

### Step 1: Start the Deployment Stage

Timestamp: 0:00

The video begins by explaining the goal of this stage: taking AI-generated website code and moving it from a local project into a live hosted website.

This matters because an MVP is not only a design or a code folder. To test a real idea, you need a live version that users, clients, or collaborators can open.

### Step 2: Set Up Repomix for Project Context

Timestamp: 2:11

Repomix helps prepare the project context so the AI-assisted workflow can understand the codebase more clearly. This is useful when you are working with generated code and need to keep the project organized before deployment.

At this point, the focus is preparation. Before running Firebase commands, make sure the project files are in a clean state and you understand what needs to be deployed.

### Step 3: Install Firebase

Timestamp: 6:17

The next step is installing Firebase tools so your local project can communicate with Firebase. The Firebase CLI gives you commands for login, project selection, hosting initialization, and deployment.

This is one of the key steps in the workflow because Firebase Hosting is managed through both the Firebase Console and command line.

### Step 4: Set Up the Firebase CLI

Timestamp: 8:30

After installing Firebase, set up the Firebase CLI inside your development environment. This prepares your machine to run Firebase commands from the project folder.

For beginners, this step helps connect the local project workflow with the Firebase platform.

### Step 5: Log In to Firebase

Timestamp: 10:20

Use the Firebase CLI login flow to connect your terminal to your Firebase account. This allows Firebase to know which account and projects you are working with.

If login issues happen, check your browser session, Firebase account access, and whether the CLI command completed successfully.

### Step 6: Add the Firebase Project

Timestamp: 11:45

Inside Firebase, add a project for the app. This project becomes the home for hosting and future services like authentication and Firestore.

For an MVP, keeping all Firebase services under one project makes the workflow easier to manage as the app grows.

### Step 7: Create the Project Name

Timestamp: 13:30

Choose a clear Firebase project name that matches the app or MVP direction. A good project name helps you recognize the app later when you are managing hosting, authentication, database rules, or deployments.

Avoid random names if this project is becoming a real portfolio or client-style build.

### Step 8: Select the Firebase Project

Timestamp: 15:10

After creating or adding the project, select it during the Firebase CLI setup. This connects your local codebase to the correct Firebase project.

Selecting the wrong project can lead to deploying the right website to the wrong Firebase app, so take this step carefully.

### Step 9: Initialize Firebase Hosting

Timestamp: 18:17

Run the Firebase initialization flow and choose Hosting. This adds Firebase hosting configuration to the project and prepares it for deployment.

This is the step where the project becomes Firebase-aware. It tells Firebase how the website should be served.

### Step 10: Choose the Hosting Setup

Timestamp: 20:00

Firebase asks setup questions during initialization. Answer these based on the type of project you are deploying.

For a React-style web app, the setup should support the project build output and client-side routing.

### Step 11: Select the Public Folder

Timestamp: 22:10

Choose the correct public or build folder for Firebase Hosting. This folder is what Firebase uploads and serves as the website.

Selecting the wrong folder is a common deployment mistake. If the wrong folder is chosen, the live website may be blank, broken, or missing the app files.

### Step 12: Configure the Single-Page App

Timestamp: 24:00

When deploying a single-page app, Firebase needs to know how to handle routes. Configuring the site as a single-page app helps direct route requests back to the app entry point.

This is important for React-style websites where navigation may happen on the client side.

### Step 13: Add a Custom Domain

Timestamp: 26:27

After hosting is prepared, connect a custom domain to the Firebase project. This makes the app feel more professional and easier to share.

For the finance monitoring project, the live domain is [https://assetrax.online/](https://assetrax.online/).

### Step 14: Verify Domain Ownership

Timestamp: 28:40

Firebase needs to confirm that you own or control the domain. This usually involves adding verification records to your DNS settings.

This step can take time, so do not panic if verification is not instant.

### Step 15: Edit DNS Records

Timestamp: 31:07

Open your domain DNS settings and edit the records Firebase provides. DNS controls where the domain points, so accuracy matters.

Check record type, host/name, value, and whether old conflicting records need to be removed.

### Step 16: Add Firebase DNS Records

Timestamp: 33:30

Add the DNS records Firebase gives you for hosting. These records connect the custom domain to Firebase Hosting.

Be careful with copying values. A small typo can stop verification or prevent the website from loading correctly.

### Step 17: Wait for Domain Verification

Timestamp: 35:00

After DNS records are added, wait for Firebase and DNS propagation to finish. This is a normal part of custom domain setup.

Once verification completes, open the custom domain and check that the deployed website loads correctly.

## Common Beginner Mistakes

- Installing Firebase tools outside the right project workflow
- Logging into the wrong Firebase account
- Creating a Firebase project but not selecting it in the CLI
- Choosing the wrong public or build folder
- Forgetting to configure single-page app routing
- Adding DNS records incorrectly
- Leaving old DNS records that conflict with Firebase
- Expecting custom domain verification to happen instantly
- Not checking the final live website after deployment

## Timestamps

- 00:00 - Intro
- 02:11 - Repomix setup
- 06:17 - Install Firebase
- 08:30 - Firebase CLI setup
- 10:20 - Firebase login
- 11:45 - Add Firebase project
- 13:30 - Create project name
- 15:10 - Select Firebase project
- 18:17 - Initialize Firebase Hosting
- 20:00 - Choose Hosting setup
- 22:10 - Select public folder
- 24:00 - Configure single-page app
- 26:27 - Add custom domain
- 28:40 - Verify domain ownership
- 31:07 - Edit DNS records
- 33:30 - Add Firebase DNS records
- 35:00 - Wait for domain verification

## Final Result

By the end of this part, the AI-generated website is live on Firebase Hosting and connected to a custom domain. This gives the MVP a public URL that can be shared, tested, and improved.

You can open the live MVP here: [https://assetrax.online/](https://assetrax.online/).

This sets up the next stage of the series: turning the hosted frontend into a real app by adding Firebase Authentication and Firestore database support.

## Related Tutorials

- [Idea to App MVP Part 3: Add Google Sign-In and Firestore to a Firebase Web App](/blog/idea-to-app-mvp-firebase-auth-firestore)
- [How to Connect a Cloudflare Domain to Netlify Step by Step](/blog/connect-cloudflare-domain-to-netlify)
- [How to Build and Deploy a Photography Landing Page with OpenAI Codex, React, GitHub and Netlify](/blog/build-deploy-photography-landing-page-react-netlify)

## Conclusion

Firebase Hosting is a strong option when you want to move from AI-generated code to a real live website. It gives beginners a clear deployment path, custom domain support, and a foundation for adding more Firebase services later.

If this video helped you, you can support Aning Design Lab here: [Support Aning Design Lab](https://selar.com/showlove/aningdesignlab).

You can also contact Aning Design through [https://aningdesign.com/](https://aningdesign.com/), join the Telegram channel at [https://t.me/AningDzn](https://t.me/AningDzn), or join the WhatsApp community at [https://chat.whatsapp.com/HzRPHeQ7osYLTMUNrF0Qds](https://chat.whatsapp.com/HzRPHeQ7osYLTMUNrF0Qds).
