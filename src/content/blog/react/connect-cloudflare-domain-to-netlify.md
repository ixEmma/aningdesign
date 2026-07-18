---
type: "youtube"
title: "How to Connect a Cloudflare Domain to Netlify"
seoTitle: "How to Connect a Cloudflare Domain to Netlify"
description: "Connect a Cloudflare-managed domain to Netlify by setting DNS records, verifying the domain, enabling SSL, and testing the root and www versions."
category: "React"
date: "2026-06-05"
updatedDate: "2026-07-14"
slug: "connect-cloudflare-domain-to-netlify"
primaryKeyword: "connect Cloudflare domain to Netlify"
keywordCluster:
  - Cloudflare Netlify DNS setup
  - Netlify custom domain setup
  - CNAME record for Netlify
  - Netlify SSL setup
servicePage: "/services/react-web-apps"
youtubeUrl: "https://youtu.be/IgiGB98V81s"
youtubeEmbedUrl: "https://www.youtube.com/embed/IgiGB98V81s"
thumbnail: "https://img.youtube.com/vi/IgiGB98V81s/maxresdefault.jpg"
thumbnailAlt: "Cloudflare DNS and Netlify custom domain setup shown in the tutorial"
tags:
  - Connect Cloudflare domain to Netlify
  - Cloudflare domain setup
  - Netlify custom domain setup
  - Cloudflare DNS settings
  - How to connect domain to Netlify
  - Point Cloudflare DNS to Netlify
  - Netlify DNS verification
  - CNAME record for Netlify
  - Netlify SSL setup
  - Custom domain not working Netlify
  - Cloudflare Netlify DNS tutorial
relatedPosts:
  - idea-to-app-mvp-firebase-hosting-custom-domain
  - website-launch-checklist
  - build-deploy-photography-landing-page-react-netlify
featured: true
---

## Connect Cloudflare DNS to Netlify

If your Netlify website is live but your custom domain is not opening, the issue is usually your DNS records. This guide shows you how to connect a Cloudflare domain to Netlify correctly.

It is for beginners whose domain uses Cloudflare DNS while the website is hosted on Netlify. You will add the domain in Netlify, update the required DNS records in Cloudflare, check for conflicts, verify SSL, and test both the root and `www` versions.

## What You Will Learn

- How DNS works in simple terms
- How to add a custom domain in Netlify
- How to open Cloudflare DNS settings
- How to point Cloudflare DNS to Netlify
- How to use CNAME records for Netlify
- How to verify a custom domain in Netlify
- How SSL works after the domain is connected
- How to fix a Netlify custom domain that is not working
- How vanfordexposures.com was connected to Netlify in the tutorial

## Tools Used

- Cloudflare
- Netlify
- DNS records
- CNAME records
- Custom domain settings
- SSL
- Browser
- Example domain: vanfordexposures.com

## Watch the Video Tutorial

Watch the full video tutorial here: [How to Connect a Cloudflare Domain to Netlify](https://youtu.be/IgiGB98V81s).

The video embed appears near the top of this page so you can follow the DNS setup visually while using this written guide as a checklist.

## Step-by-Step Guide

### Step 1: Understand What DNS Does

Timestamp: 02:20

Think of DNS like directions for your domain. Cloudflare controls the directions, and Netlify is where your website lives. When the DNS records are correct, visitors who type your domain are sent to the Netlify-hosted website.

If DNS records are wrong, the Netlify site can be live but the custom domain will still fail. This is why domain setup usually comes down to checking the records carefully.

### Step 2: Open Your Netlify Website Project

Open the Netlify dashboard and choose the website project you want to connect to your custom domain.

Make sure the site itself is already deployed and working on the default Netlify URL. It is easier to fix custom domain issues when you know the Netlify deployment is already live.

### Step 3: Add Your Custom Domain in Netlify

Timestamp: 04:10

Inside the Netlify project, go to the domain settings and add your custom domain. In the tutorial, the example domain is:

```txt
vanfordexposures.com
```

Netlify will check the domain and show instructions for verification. These instructions tell you what DNS records need to be added or updated in Cloudflare.

### Step 4: Open Your Cloudflare DNS Settings

Timestamp: 04:58

Log in to Cloudflare, choose the domain, and open the DNS settings. This is where you control the records that point the domain to the correct website host.

For a Cloudflare Netlify DNS tutorial, this is the key area. Do not change random settings across the dashboard. Stay focused on the DNS records Netlify needs.

### Step 5: Add or Update the Correct DNS Records

Add or update the records that Netlify asks for. The exact records can depend on whether you are connecting the root domain, the `www` version, or both.

Before adding new records, check if old records already exist. Old A records, CNAME records, or duplicate entries can conflict with the Netlify setup.

### Step 6: Use the Correct CNAME Record for Netlify

For the `www` version, Netlify commonly uses a CNAME record that points to your Netlify site address.

For example, the `www` record may need to point to a Netlify target like:

```txt
your-site-name.netlify.app
```

The important part is that the CNAME target must match the Netlify project you are connecting. If the CNAME points to the wrong target, the custom domain will not open the right website.

### Step 7: Check for Conflicting DNS Records

Conflicting DNS records are one of the most common reasons a custom domain does not work on Netlify. If multiple records are trying to control the same domain or subdomain, the browser may not reach the correct site.

Check for duplicate `www` records, old A records, old CNAME records, or records from previous hosting setups. Clean up only the records that conflict with the Netlify instructions.

### Step 8: Verify the Custom Domain in Netlify

Timestamp: 08:25

Go back to Netlify and check the domain verification status. Netlify may show that verification is pending while DNS changes update across the internet.

If verification does not complete immediately, do not keep changing records every few seconds. Confirm that the records are correct, then give DNS time to update.

### Step 9: Wait for DNS Propagation

DNS propagation means the updated records are spreading across DNS servers. Sometimes the change works quickly. Other times it can take longer.

If the domain is still not opening, wait and test again. Repeatedly changing records can make troubleshooting harder.

### Step 10: Enable or Verify SSL in Netlify

Timestamp: 09:23

After the domain is connected, Netlify can issue SSL so the website opens securely with HTTPS.

SSL may not be ready immediately. If Netlify says the certificate is pending, give it time and check again after the domain verification is complete.

### Step 11: Test the Final Custom Domain

Open the custom domain in your browser and confirm that it loads the correct Netlify website. Test both versions if you set them up:

```txt
https://vanfordexposures.com
https://www.vanfordexposures.com
```

This helps you catch cases where the root domain works but `www` does not, or where `www` works but the root domain does not.

### Step 12: Confirm the Website Opens Securely With HTTPS

The final check is HTTPS. Your website should open with a secure connection, and the browser should not show certificate warnings.

If HTTPS is not ready yet, check the SSL status in Netlify, confirm the DNS records are correct in Cloudflare, and allow time for the certificate to finish.

## Common Problems and Fixes

### Netlify Website Is Live but the Custom Domain Does Not Open

Check the DNS records in Cloudflare. The Netlify deployment can be working while the custom domain fails because the domain is not pointing to the right place yet.

### Wrong DNS Record Added in Cloudflare

Compare your Cloudflare records with the instructions shown in Netlify. Fix records that point to old hosting, the wrong Netlify site, or an incorrect target.

### Too Many Conflicting DNS Records

Remove duplicate or conflicting records for the same hostname. Keep the DNS setup clean so Cloudflare has one clear direction for the domain.

### CNAME Record Points to the Wrong Target

Make sure the CNAME target points to the correct Netlify site address. A small typo or wrong site name can break the connection.

### Domain Verification Is Still Pending in Netlify

If verification is pending, wait for DNS propagation after confirming the records are correct. Do not keep changing settings unless you find a real mistake.

### SSL Certificate Is Not Ready Yet

SSL can take time after the domain connects. Check Netlify SSL settings and wait for the certificate to finish issuing.

### Cloudflare Proxy Setting Causes Confusion

Cloudflare proxy settings can make troubleshooting harder for beginners. If the domain is not verifying, review whether Netlify expects a DNS-only record while you are testing.

### DNS Propagation Takes Time

DNS changes are not always instant. Give the update time to spread before assuming the setup is broken.

### The www Version Works but the Root Domain Does Not

Check the root domain records in Cloudflare and confirm the root domain is also added in Netlify. The `www` and root versions may need separate setup.

### The Root Domain Works but the www Version Does Not

Check the `www` CNAME record and confirm it points to the correct Netlify target. Also confirm the `www` version is added or covered in Netlify domain settings.

## Timestamps

- 00:00 Intro
- 01:05 Video overview
- 02:20 Explaining DNS
- 04:10 Add domain to Netlify
- 04:58 DNS setup on Cloudflare
- 08:25 Verification
- 09:23 SSL

## Final Result

By the end of this tutorial, you should understand how to point a Cloudflare-managed domain to a Netlify-hosted website, verify the domain, and check SSL so the website opens securely.

You should also understand why DNS records matter, why CNAME targets must be correct, and why a custom domain can fail even when the Netlify website itself is already live.

## Continue Learning

- [How to Build and Deploy a Photography Landing Page with OpenAI Codex, React, GitHub and Netlify](/blog/build-deploy-photography-landing-page-react-netlify)
- [Deploy an MVP with Firebase Hosting and a custom domain](/blog/idea-to-app-mvp-firebase-hosting-custom-domain)
- [Use the website launch checklist before going live](/blog/website-launch-checklist)
- [Review the WordPress launch checklist for a CMS deployment](/blog/wordpress-website-launch-checklist)

## Keep DNS changes focused and verifiable

Connecting a Cloudflare domain to Netlify becomes much easier when you understand the flow: Netlify hosts the website, Cloudflare controls the DNS records, and SSL makes the final domain open securely with HTTPS.

If you want more practical website setup, DNS, deployment, WordPress, React, and web design tutorials, watch the full video on Aning Design Lab and explore more guides on [aningdesign.com](https://www.aningdesign.com/).

You can also contact AningDesign through [https://www.aningdesign.com/](https://www.aningdesign.com/), join the Telegram channel at [https://t.me/AningDzn](https://t.me/AningDzn), or support the work at [https://selar.com/showlove/aningdesignlab](https://selar.com/showlove/aningdesignlab).
