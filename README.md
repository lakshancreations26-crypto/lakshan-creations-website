# Lakshan Creations phone shop

A responsive, dark-mode phone and accessories storefront built with plain HTML, CSS and JavaScript. No build tools or packages are required.

## Open the local demo

Open `index.html` in a browser or use Visual Studio Code's Live Server extension. Checkout opens WhatsApp with a prefilled order to `+94 77 927 3876`; the customer must tap **Send** in WhatsApp to submit it. The receipt also offers an email draft to `lakshancreations26@gmail.com`. Email drafts likewise need the customer to send them. This static demo does not charge payments or save orders on a server.

## Publish with GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/pages.yml`. To publish it:

1. Create a GitHub repository and upload the project files, including `.github/workflows/pages.yml`, to its `main` branch.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. Open **Actions** and check the **Deploy static site to GitHub Pages** workflow. It runs automatically when you push to `main`; you can also run it manually.
4. When the workflow succeeds, open **Settings → Pages** to find the public URL. For a normal repository, it is usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The site is static: the displayed phone products and prices are sample listings and should be replaced with the shop's real inventory; products, settings, and the bag are stored separately in each visitor's browser. Orders are handed off through WhatsApp/email and require the customer to press **Send**. This deployment does not add a shared inventory, online payment, or automatic order notifications.

The public **Updates** section and the always-visible update notice are in `index.html`. To announce another store update to everyone, change the notice and add an update card, then push/upload the changes to the repository; GitHub Actions will redeploy the site.

## Customize the shop

To preview the local customization panel, open the site with `?customize=1` (for example, `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/?customize=1`). You can edit the shop name, logo letter, announcement, delivery minimum, contact email, hero and story copy, image URLs, benefits, newsletter text, colours, heading style, and desktop product layout. Save changes to store them only in that browser; they do not update the public site for other visitors. To publish changes for everyone, edit the project files and push or upload them to the repository.

The inventory editor lets you add, edit and remove products, including product names, descriptions, categories, LKR prices, image URLs and badges. Products, settings and the shopping bag use this browser's local storage; they are not shared with other devices. Use **Restore default shop** to restore the starter content.

You can also edit `app.js`, `styles.css` and `index.html` directly. Product photos and the featured images use HTTPS image URLs, which you can replace with your own hosted images. After changing files, commit and push them to the repository's `main` branch to publish the update.

## Order notifications

The WhatsApp recipient and email address are configured in the store settings. A browser-only shop cannot silently send WhatsApp messages or email: the customer must tap **Send** in WhatsApp or their email app. For fully automatic notifications, deploy a secure server-side order endpoint and connect checkout to an email or WhatsApp Business provider; keep all credentials on the server, never in browser JavaScript or a public file. Real order handling also needs server-side validation, spam protection and a payment/delivery workflow.

Newsletter signups are also a local demo and are not submitted to a mailing list.
