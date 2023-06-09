# TransMedWebPTIN

Web interface for the TransMed - Transportation of Medicines project developed in the context of the subject "PTIN" in the Spring 2023 semester of the group A3.

## Local build/deployment with docker

Build the image with:

```
make build
```

Start the image with:

```
make start
```

Open http://localhost:300

You can check the logs of the started image with:

```
make logs
```

You can stop the image with:

```
make stop
```

## Running Locally without docker

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file in this way.
