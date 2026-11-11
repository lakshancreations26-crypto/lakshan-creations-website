# Lakshan Creations electronics shop

A responsive electronics storefront built with plain HTML, CSS and JavaScript. No build tools or packages are required for the local demo.

## Open the local demo

Open `index.html` in a browser or use Visual Studio Code's Live Server extension. Checkout opens WhatsApp with a prefilled order to `+94 77 927 3876`; the customer must tap **Send** in WhatsApp to submit it. The receipt also offers an email draft to `lakshancreations26@gmail.com`. Email drafts likewise need the customer to send them. This static demo does not charge payments or save orders on a server.

## Publish with GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/pages.yml`. To publish it:

1. Create a GitHub repository and upload `index.html`, `app.js`, `styles.css`, and this README to its `main` branch.
2. In GitHub, create `.github/workflows/pages.yml` and copy in the workflow from this project.
3. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
4. Open **Actions**, select **Deploy static site to GitHub Pages**, and run the workflow (or push another change to `main`).
5. When the workflow succeeds, open **Settings → Pages** to find the public URL. For a normal repository, it is usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The site is static: products, settings, and the bag are stored separately in each visitor's browser. Orders are handed off through WhatsApp/email and require the customer to press **Send**. This deployment does not add a shared inventory, online payment, or automatic order notifications.

## Customize the shop

Select **Customize** in the top navigation. You can edit the shop name, logo letter, announcement, delivery minimum, contact email, hero and story copy, image URLs, benefits, newsletter text, colours, heading style, and desktop product layout. Save the changes to store them in this browser.

The inventory editor lets you add, edit and remove products, including product names, descriptions, categories, LKR prices, image URLs and badges. Products, settings and the shopping bag use this browser's local storage; they are not shared with other devices. Use **Restore default shop** to restore the starter content.

You can also edit `app.js`, `styles.css` and `index.html` directly. Product photos and the featured images use HTTPS image URLs, which you can replace with your own hosted images.

## Order notifications

The WhatsApp recipient and email address are configured in the store settings. A browser-only shop cannot silently send WhatsApp messages or email: the customer must tap **Send** in WhatsApp or their email app. For fully automatic notifications, deploy a secure server-side order endpoint and connect checkout to an email or WhatsApp Business provider; keep all credentials on the server, never in browser JavaScript or a public file. Real order handling also needs server-side validation, spam protection and a payment/delivery workflow.

Newsletter signups are also a local demo and are not submitted to a mailing list.
