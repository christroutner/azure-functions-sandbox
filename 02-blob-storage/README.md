# 02 Blob Storage Examples

This example is copied from here:
https://github.com/Azure-Samples/azure-sdk-for-js-storage-blob-stream-nodejs/tree/master

Notes:
- Use the v12 example
- Setup required to execute this example:
  - Create a storage account. You'll need the account name and the primary access key
  - Create a container named 'images'
  - Create a container named 'thumbnails'

This example uses the @azure/storage-blob npm package. It creates a front-end app that takes
a file and uploads it to the 'images' container.


---
page_type: sample
languages:
- javascript
- nodejs
products:
- azure
- azure-storage
description: "How to stream blobs to Azure Blob Storage with Node.js."
urlFragment: stream-blobs-nodejs
---

# How to stream blobs to Azure Blob Storage with Node.js

## SDK Versions
In this sample, you will find the following folders:

* **v10** - references Storage Blob SDK v10
* **v12** - references Storage Blob SDK v12

## Prerequisites
If you don't have a Microsoft Azure subscription, you can get a [free account] before you begin.

Clone the repository to your machine:

```bash
git clone https://github.com/Azure-Samples/azure-sdk-for-js-storage-blob-stream-nodejs.git
```

Then, switch to the appropriate folder:

```bash
cd v10
```

or

```bash
cd v12
```

Install dependencies via `npm`:

```bash
npm install
```

## This Sample shows how to do following operations of Storage Blobs
* Create a storage account.
* Create a container.
* Upload a stream to [blockblob].

## Adding your storage account name and key
Navigate to your storage account in the [Azure Portal] and copy the account name and key (under **Settings** > **Access keys**) into the `.env.example` file. Save the file and then rename it from `.env.example` to `.env`.

## Running the sample
Start the server:

```bash
npm start
```

Navigate to [http://localhost:3000] and upload an image to blob storage.

You can use the [Azure Storage Explorer] to view blob containers and verify your upload is successful.

<!-- LINKS -->
[blockblob]: https://docs.microsoft.com/en-us/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs
[Azure Portal]: https://portal.azure.com
[http://localhost:3000]: http://localhost:3000
[Azure Storage Explorer]: https://azure.microsoft.com/features/storage-explorer/
[free account]: http://go.microsoft.com/fwlink/?LinkId=330212

