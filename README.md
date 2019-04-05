# Stocktastic

A simple service to return live stock quotes.

## Prerequisites

- Register for a free developer account at https://iexcloud.io/cloud-login#/register
- Node.js version 10.15.3 (for local usage)
- Docker must be installed for container builds
- Add a .env file to the Stocktastic root directory and configure as follows (substituting your iexcloud public and secret keys):

```
IEXCLOUD_API_VERSION = "v1"
IEXCLOUD_PUBLIC_KEY = "pk_..."
IEXCLOUD_SECRET_KEY = "sk_..."
```

## Usage

Grab the latest source:

```
git clone https://github.com/njhoran/stocktastic
```

### Local

Install dependencies:

```
npm install
```

To run the test suite:

```
npm test
```

### Docker

Build a docker image:

```
./bin/docker-build.sh
```

Spin up a container instance:

```
./bin/docker-run.sh
```

#### Swagger Interface

The Swagger interface will be available at:

```
http:/localhost:3001/docs/
```

#### Curl Example

```
curl -X GET "http://localhost:3001/v1/stock/TSLA/price" -H "accept: application/json"
```
